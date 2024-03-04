<script setup>
import { ref, inject, onUpdated } from "vue"
import { useRoute } from 'vue-router'
import IssueDialog from "./IssueDialog.vue"
import { getBranchData, getGeneratorData } from "../functions/branch-extractor"

const route = useRoute()

const reportData = inject('report')

const reportRef = ref(reportData)

const { dashboardBranchId: branchId, dashboardGeneratorId: generatorId } = route.params

const branchData = getBranchData(branchId, reportRef.value)
const data = ref(getGeneratorData(generatorId, branchData))


const createLog = (log) => {
  data.value.statusLogs.push(log)
  console.log(data.value)
}

const openDialog = ref(false)
</script>

<template>
  <div class="q-px-lg">
    <div class="row justify-end">
      <q-btn label="Add Log" @click="openDialog = true"></q-btn>
    </div>
    <div class="row q-gutter-md">
      <div class="col">
        <div class="col">
          <fieldset class="col-5 generator-details q-mb-sm">
            <legend>Generator Details</legend>
            <div class="row">
              <span class="col-6">serial No.</span>
              <span class="col q-pl-lg">{{ data.serialNumber }}</span>
            </div>
            <hr>
            <div class="row">
              <span class="col-6">model no.</span>
              <span class="col q-pl-lg">{{ data.model }}</span>
            </div>
            <hr>
            <div class="row">
              <span class="col-6">Genset (Brand)</span>
              <span class="col q-pl-lg">{{ data.brand }}</span>
            </div>
            <hr>
            <div class="row">
              <span class="col-6">Capacity (available / install)</span>
              <div class="col q-pl-lg">
                <span>{{ data.availableCapacity }} / {{ data.installedCapacity }}</span>
                <span class="q-pl-sm">({{ Math.round(data.availableCapacity /
        data.installCapacity *
        100) }}%)</span>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="col">
        <fieldset class="col-5 generator-details q-mb-sm">
          <legend>Generator Status</legend>
          <div class="row">
            <span class="col-6">State</span>
            <span class="col q-pl-lg">{{ data.statusLogs[data.statusLogs.length - 1].state }}</span>
          </div>
          <hr>
          <div class="row">
            <span class="col-6">Title</span>
            <span class="col q-pl-lg">{{ data.statusLogs[data.statusLogs.length - 1].title }}</span>
          </div>
          <hr>
          <div class="row">
            <span class="col-6">Description</span>
            <span class="col q-pl-lg">{{ data.statusLogs[data.statusLogs.length - 1].description }}</span>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
  <issue-dialog @create-log="createLog" v-model="openDialog"></issue-dialog>
</template>

<style lang="scss"></style>