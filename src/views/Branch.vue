<script setup>
import { inject, ref } from 'vue'
import { date } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import { getBranchData, getBranchLoad } from "../functions/branch-extractor"

const router = useRouter()
const route = useRoute()

const { dashboardBranchId: id } = route.params
const reportData = inject('report')

const data = getBranchData(id, reportData)
const dateRange = ref({ from: '2024/01/08', to: '2024/02/17' })

const loadData = ref(getBranchLoad(dateRange.value, data))
const getGeneratorLoadValue = ref(intializeLoadValues(loadData.value.generatorLoadData))

const genId = ref(0)

function refresh() {
  loadData.value = getBranchLoad(dateRange.value, data)
  getGeneratorLoadValue.value = intializeLoadValues(loadData.value.generatorLoadData)
}

function intializeLoadValues(loadData) {
  return function getGeneratorLoad(generatorId) {
    return loadData.find(load => load.generatorId === generatorId)
  }
}

function navGen(generatorId) {
  genId.value = generatorId
  router.replace(`/branch/${id}/generator/${generatorId}`)
}
</script>

<template>
  <q-dialog :model-value="true" position="right" no-route-dismiss @hide="router.push('/')">
    <q-card class="full-height relative-position" style="min-width: 960px;">
      <div class="q-ma-lg">
        <div class="row q-my-md justify-between items-center">
          <div class="text-subtitle1 text-weight-medium text-uppercase">{{ data?.name }}</div>
          <div class="date-picker">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="dateRange" range @range-end="refresh()">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
            <q-icon name="sym_r_date_range" class="text-subtitle1" />
            <span>{{ date.formatDate(new Date(dateRange?.from), 'DD MMMM YYYY') }}</span>
            <q-icon name="sym_r_arrow_forward" />
            <span>{{ date.formatDate(new Date(dateRange?.to), 'DD MMMM YYYY') }}</span>
          </div>
        </div>
        <div class="row q-pa-md justify-between bg-blue-grey-1">
          <div class="row q-gutter-x-sm branch-panel-item">
            <div>total capacity</div>
            <div>{{ loadData.capacity }} KW</div>
          </div>

          <div class="row q-gutter-x-md">
            <div class="row q-gutter-x-md branch-panel-item">
              <div>min</div>
              <div>{{ loadData.min.load }} KW</div>
            </div>
            <div class="row q-gutter-x-md branch-panel-item">
              <div>MAX</div>
              <div>{{ loadData.max.load }} KW</div>
            </div>
          </div>

        </div>
        <div style="margin: 20px 5% 0 0;">
          <div class="row text-blue-grey-6">

            <div class="col-2 row">Generators</div>
            <div class="col">
              <div class="row justify-between no-wrap">
                <span v-for="value in [100,200,300,400,500,600,700,800,900,1000]">{{ value }}</span>
                <span style="margin-right: -5%;">KW</span>
              </div>
            </div>
          </div>

          <q-separator class="q-mt-sm q-mb-lg" style="margin-right: -5%;" />

          <div v-for="generator in data?.generators" class="row items-center q-mb-md">
            <div class="col-1">
              <div class="row q-pa-xs justify-around rounded-borders" :class="generator.statusLogs[0].state === 'running' ? 'bg-green-2' : 'bg-blue-grey-2'">
                <div class="text-green-9 text-weight-medium">{{ Math.round(generator.availableCapacity /
                  generator.installCapacity *
                  100) }}%</div>
                <div class="text-green-10 text-weight-bold">{{ generator.name }}</div>
              </div>
            </div>
            <div class="col-1 row justify-center">
              <pre>{{ generator.statusLogs[0].status }}</pre>
              <q-icon v-if="generator.statusLogs[0].status !== 'healthy'" class="text-h6" name="sym_r_error" />
            </div>
            <div class="col-grow">
              <div
                class="row justify-end bg-blue-2 q-pa-xs rounded-borders" 
                :style="`width: ${Math.round(getGeneratorLoadValue(generator.id).max.load / 1000 * 100)}%`">
                {{ Math.round(getGeneratorLoadValue(generator.id).max.load) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-card class="generator-panel absolute-bottom">
        <q-tabs align="left">
          <q-tab v-for="generator in data?.generators" :name="generator.name" :label="generator.name"
            :key="generator.name" v-bind="generator" @click="navGen(generator.id)" />
        </q-tabs>
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <Suspense>
              <component :key="genId" :is="Component"></component>
              <template #fallback>
                Loading...
              </template>
            </Suspense>
          </template>
        </RouterView>
      </q-card>
    </q-card>
  </q-dialog>
</template>

<style lang="scss">
.branch-panel-item {
  display: flex;
  font-size: small;
  text-transform: uppercase;

  div:first-child {
    font-weight: 500;
    color: $blue-grey-6;
  }

  div:last-child {
    font-weight: 600;
    color: $blue-grey-9;
  }
}

.date-picker {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid $blue-grey-3;
  color: $blue-grey-9;
  border-radius: 4px;
  padding: 4px 12px;
}

.generator-panel {
  height: 35%;
  background-color: $blue-grey-1;
}
</style>
