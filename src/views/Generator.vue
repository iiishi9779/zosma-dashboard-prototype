<script setup>

</script>
<template>
  <div class="row q-ma-md q-gutter-md">
    <fieldset class="col-5 generator-details">
      <legend>Generator Details</legend>
      <div class="row">
        <span class="col-6">serial No.</span>
        <span class="col q-pl-lg">41214138</span>
      </div>

      <hr>

      <div class="row">
        <span class="col-6">model no.</span>
        <span class="col q-pl-lg">KTA38-G2</span>
      </div>

      <hr>

      <div class="row">
        <span class="col-6">Genset (Brand)</span>
        <span class="col q-pl-lg">CUMMINS</span>
      </div>

      <hr>

      <div class="row">
        <span class="col-6">Capacity (available / install)</span>
        <div class="col q-pl-lg">
          <span>450 / 600</span>
          <span class="q-pl-sm">(40%)</span>
        </div>
      </div>

    </fieldset>

    <q-scroll-area class="col q-pl-lg">
      <div v-for="value in new Array(4).fill(0)" class="row justify-between q-mb-sm q-py-sm q-px-md bg-blue-grey-2">
        <div class="col">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
        <div class="col-3 text-right">12/02/24 - 12:45</div>
      </div>
    </q-scroll-area>
  </div>
</template>
<style lang="scss"></style>