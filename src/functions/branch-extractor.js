export function getBranchData(branchId, reportData) {
  return reportData.branches.find(branch => branch.id == branchId)
}

export function getGeneratorData(generatorId, branchData) {
  return branchData.generators.find(generator => generator.id == generatorId)
}

function getGeneratorLoadSorted({ from, to }, generatorData) {
  return generatorData.dailyLogs.filter(log => {
    return new Date(log.date) >= new Date(from) && new Date(log.date) <= new Date(to)
  }).sort((a, b) => a.load - b.load)
}

export function getBranchLoad(dateRange, branchData) {
  const loads = []
  const generatorLoads = []
  let capacity = 0

  branchData.generators.forEach((generator) => {
    const loadData = getGeneratorLoadSorted(dateRange, generator)
    loads.push(loadData[0], loadData[loadData.length - 1])
    generatorLoads.push({ generatorId: generator.id, min: loadData[0], max: loadData[loadData.length - 1] })
    capacity += generator.availableCapacity
  })

  loads.sort((a, b) => a.load - b.load)

  return { capacity, min: loads[0], max: loads[loads.length - 1], generatorLoadData: generatorLoads }
}

export class BranchExtractor {
  constructor() {
    this.branch = null
  }

  getBranch(branchId) {
    let branch = null

    report.forEach(region => {
      const searchBranch = region.branches.find(branch => branch.id == branchId)
      if (searchBranch) { branch = searchBranch }
    })

    return branch;
  }

  getBranchLoad(branchId, gte, lt) {
    const branch = this.getBranch(branchId)
    const generatorExtractor = new GeneratorExtractor();
    const branchGenerators = []
    const loads = []

    branch.generators.forEach(generator => {
      const generatorLoads = generatorExtractor.getGeneratorLoad(generator, gte, lt)
      const { minLoad, maxLoad } = generatorLoads
      branchGenerators.push(generatorLoads)
      loads.push(minLoad, maxLoad)
    })

    loads.sort((a, b) => a.load - b.load)

    const minLoad = loads[0]
    const maxLoad = loads[loads.length - 1]

    const branchLoads = {
      id: branch.id,
      name: branch.name,
      minLoad,
      maxLoad,
      generators: branchGenerators,
    }

    return branchLoads
  }

  getBranchStatus(branchId, dateRange, filter) {
    const branch = this.getBranch(branchId)
    const generatorExtractor = new GeneratorExtractor();
    const branchStatusLogs = []

    branch.generators.forEach(generator => {
      const generatorStatusLogs = generatorExtractor.getGeneratorStatus(generator, dateRange, filter)
      branchStatusLogs.push(generatorStatusLogs)
    })

    return branchStatusLogs
  }
}