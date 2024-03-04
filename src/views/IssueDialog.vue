<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 480px;">
      <q-card-section class="row items-center">
        <div class="text-h6">Add Log</div>
        <q-btn class="q-ml-auto" round dense flat icon="close" v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-form @submit="submitForm" class="q-gutter-md">
          <q-input filled v-model="title" label="Title" />
          <q-select filled v-model="state" :options="statusList" label="Status" />
          <q-select filled v-model="status" :options="stateList" label="State" />
          <q-input filled type="textarea" v-model="description" label="Description" />
          <q-card-actions align="right">
            <q-btn class="col" type="submit" label="Submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref, defineEmits } from 'vue'

const stateList = ['running', 'stopped']
const statusList = ['healthy', 'issue']

const emit = defineEmits([
  ...useDialogPluginComponent.emits,
  "createLog"
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
function onOKClick() {
  onDialogOK()
}
const issue = ref("")

const title = ref()
const state = ref()
const status = ref()
const description = ref()

const submitForm = () => {
  emit("createLog", {
    title,
    state,
    status,
    description
  })
}




</script>
