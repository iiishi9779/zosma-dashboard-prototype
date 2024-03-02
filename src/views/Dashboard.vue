<script setup>

</script>
<template>
  <q-page padding>
    <div class="q-ma-lg dashboard-header">
      <div>
        <div>Total Branches</div>
        <div class="text-h5">32</div>
      </div>
      <div>
        <div>Total Generators</div>
        <div class="text-h5">32</div>
      </div>
      <div>
        <div>Total Issues</div>
        <div class="text-h5">8</div>
      </div>
      <div>
        <div>Running with Issues</div>
        <div class="text-h5">2</div>
      </div>
      <div>
        <div>Stopped with Issues</div>
        <div class="text-h5">6</div>
      </div>
    </div>

    <div class="row q-pa-lg q-gutter-lg" style="min-height: inherit;">
      <!-- <q-input filled dense label="Search for Branches" /> -->

      <q-scroll-area class="col">
        <div class="q-gutter-md">
          <router-link v-for="branch in new Array(12).fill(0)" v-bind="$props" custom
            v-slot="{ isActive, navigate, href }" to="/branch/1">
            <q-card v-bind="$attrs" :href="href" @click="navigate" :class="isActive ? '' : ''" flat bordered>
              <q-card-section>
                <div class="text-subtitle1 q-mb-sm">A. Branch Name</div>
                <div class="row q-gutter-x-sm">
                  <div v-for="generator in new Array(6).fill(0)" class="dashboard-branch-card-generator bg-amber-10">
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </router-link>
        </div>
      </q-scroll-area>

      <q-scroll-area class="col">
        <div class="q-gutter-sm">
          <q-card v-for="log in new Array(6).fill(0)" flat bordered>
            <q-card-section>
              <div class="row justify-between">
                <div class="text-subtitle2">A. Branch Name</div>
                <div class="text-subtitle2">2 days ago</div>
              </div>
              <div class="q-pa-sm q-mt-sm bg-amber-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <router-view></router-view>
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
  width: 24px;
  height: 24px;
  border-radius: 2px;
}
</style>
