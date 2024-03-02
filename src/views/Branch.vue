<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const generators = [
  { id: 1, name: 'g1', label: 'g1' },
  { id: 2, name: 'g2', label: 'g2' },
  { id: 3, name: 'g3', label: 'g3' },
]

function navGen(generatorId) {
  router.replace(`/branch/1/generator/${generatorId}`)
}

</script>
<template>
  <q-dialog :model-value="true" position="right" no-route-dismiss @hide="router.push('/')">
    <q-card class="full-height relative-position" style="min-width: 960px;">
      <div class="q-ma-lg">
        <div class="row q-my-md justify-between items-center">
          <div class="text-subtitle1 text-weight-medium text-uppercase">A. Branch Name</div>
          <div class="date-picker">
            <q-icon name="date_range" />
            <span>25 February 2024</span>
            <q-icon name="arrow_forward" />
            <span>25 March 2024</span>
          </div>
        </div>
        <div class="row q-pa-md justify-between bg-blue-grey-1">
          <div class="row q-gutter-x-sm branch-panel-item">
            <div>total capacity</div>
            <div>2400 KV</div>
          </div>

          <div class="row q-gutter-x-md">
            <div class="row q-gutter-x-md branch-panel-item">
              <div>min</div>
              <div>225 KV</div>
            </div>
            <div class="row q-gutter-x-md branch-panel-item">
              <div>MAX</div>
              <div>225 KV</div>
            </div>
          </div>

        </div>
        <div style="margin: 20px 5% 0 0;">
          <div class="row text-blue-grey-6">

            <div class="col-2 row">Generators</div>
            <div class="col">
              <div class="row justify-between no-wrap">
                <span v-for="value in new Array(18).fill(0)">100</span>
                <span style="margin-right: -5%;">KV</span>
              </div>
            </div>
          </div>

          <q-separator class="q-mt-sm q-mb-lg" style="margin-right: -5%;" />

          <div v-for="generator in new Array(6).fill(0)" class="row items-center q-mb-md">
            <div class="col-1">
              <!-- <q-icon name="sym_r_thumb_up" /> -->
              <div class="row q-pa-xs justify-around bg-green-2 rounded-borders">
                <div class="text-green-9 text-weight-medium">40%</div>
                <div class="text-green-10 text-weight-bold">G1</div>
              </div>
            </div>
            <div class="col-1"></div>

            <div class="col-grow">
              <div class="row justify-end bg-blue-2 q-pa-xs rounded-borders" style="width: 100%;">240</div>
            </div>

          </div>
        </div>
      </div>
      <q-card class="generator-panel absolute-bottom">
        <q-tabs align="left">
          <q-tab v-for="generator in generators" :key="generator.name" v-bind="generator" @click="navGen(generator.id)" />
        </q-tabs>
        <router-view></router-view>
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
