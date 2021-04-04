<template>
  <MDBModal v-model="show">
      <slot></slot>
  </MDBModal>
</template>

<script>
import {ref} from "vue";
import {MDBModal} from 'mdb-vue-ui-kit';

export default {
  name: 'Modal',
  setup() {
    const show = ref(false);
    return {
      show
    };
  },
  components: {
    MDBModal,
  }
};
</script>