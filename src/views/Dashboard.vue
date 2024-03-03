<script setup>
import { inject, computed, ref } from 'vue'

const data = inject('dashboard-data')
const issueState = ref('all') // all, running, stopped

const issues = computed(() => {
  let issueArr
  if (issueState.value === 'running') {
    issueArr = data.runningWithIssue
  } else if (issueState.value === 'stopped') {
    issueArr = data.stoppedWithIssue
  } else {
    issueArr = [...data.runningWithIssue, ...data.stoppedWithIssue]
  }
  return issueArr
})

</script>

<template>
  <q-page padding>
    <div class="q-ma-lg dashboard-header">
      <div>
        <div>Total Branches</div>
        <div class="text-h5">{{ data.branchCount }}</div>
      </div>
      <div>
        <div>Total Generators</div>
        <div class="text-h5">{{ data.generatorCount }}</div>
      </div>
      <div>
        <div>Total Issues</div>
        <div class="text-h5">{{ data.issueCount }}</div>
      </div>
      <div>
        <div>Running with Issues</div>
        <div class="text-h5">{{ data.runningWithIssueCount }}</div>
      </div>
      <div>
        <div>Stopped with Issues</div>
        <div class="text-h5">{{ data.stoppedWithIssueCount }}</div>
      </div>
    </div>

    <div class="row q-pa-lg q-gutter-lg" style="min-height: inherit;">
      <!-- <q-input filled dense label="Search for Branches" /> -->

      <q-scroll-area class="col">
        <div class="q-gutter-md">
          <router-link v-for="branch in  data.branches " v-bind="$props" custom v-slot="{ isActive, navigate, href }"
          :to="`/branch/${branch.id}/generator/${branch.generators[0].id}`">
            <q-card v-bind="$attrs" :href="href" @click="navigate" :class="isActive ? '' : ''" flat bordered>
              <q-card-section>
                <div class="text-subtitle1 q-mb-sm">{{ branch.name }}</div>
                <div class="row q-gutter-x-sm">
                  <template v-for="generator in branch.generators">
                    <div :class="generator.statusLog.state === 'running' ? 'bg-green-3' : 'bg-grey-4'"
                      class="dashboard-branch-card-generator">
                      <q-icon v-if="generator.statusLog.status !== 'healthy'" class="text-red-9 text-h6"
                        name="sym_r_error" />
                    </div>
                  </template>
                </div>
              </q-card-section>
            </q-card>
          </router-link>
        </div>
      </q-scroll-area>

      <q-scroll-area class="col">
        <div class="q-gutter-sm">
          <q-card v-for="   log    in   issues    " flat bordered>
            <q-card-section>
              <div class="row justify-between">
                <div class="text-subtitle2">{{ log.name }}</div>
                <div class="text-subtitle2">2 days ago</div>
              </div>
              <div class="q-pa-sm q-mt-sm bg-amber-1">{{ log.generators[0].statusLog.title }}</div>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <component :is="Component"></component>
          <template #fallback>
            Loading...
          </template>
        </Suspense>
      </template>
    </RouterView>
  </q-page>
</template>

<style lang="scss">
.dashboard-header {
  display: flex;
  gap: 24px;

  div {
    flex: 1;
    padding: 12px;
    background-color: $blue-grey-1;
    border-radius: 8px;
  }
}

.dashboard-branch-card-generator {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  width: 24px;
  height: 24px;
  border-radius: 2px;

}
</style>
