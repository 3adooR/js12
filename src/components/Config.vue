<template>
  <div class="row">
    <div class="col-6">
      <div class="form-group mb-3">
        <MDBRange label="Длительность" v-model="duration" :min="1" :max="15" :step="1"/>
      </div>
      <div class="form-group mb-3">
        <MDBRange label="Сложность" v-model="complexity" :min="1" :max="10" :step="1"/>
      </div>
    </div>
    <div class="col-6">
      <div class="form-group mb-3">
        <label class="form-label">Операции</label>
        <MDBCheckbox v-model="cfgSum" label="Суммирование"/>
        <MDBCheckbox v-model="cfgDiff" label="Разность"/>
        <MDBCheckbox v-model="cfgMulti" label="Умножение"/>
        <MDBCheckbox v-model="cfgDiv" label="Деление"/>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, watch} from "vue"
import {useStore} from "vuex"
import {MDBRange, MDBCheckbox} from "mdb-vue-ui-kit"

export default {
  name: 'Cfg',
  setup() {
    const store = useStore();

    const duration = ref(store.state.duration);
    const complexity = ref(store.state.complexity);
    const cfgSum = ref(store.state.cfgSum);
    const cfgDiff = ref(store.state.cfgDiff);
    const cfgMulti = ref(store.state.cfgMulti);
    const cfgDiv = ref(store.state.cfgDiv);

    watch([duration, complexity, cfgSum, cfgDiff, cfgMulti, cfgDiv], () => {
      store.state.duration = duration.value;
      store.state.complexity = complexity.value;
      store.state.cfgSum = cfgSum.value;
      store.state.cfgDiff = cfgDiff.value;
      store.state.cfgMulti = cfgMulti.value;
      store.state.cfgDiv = cfgDiv.value;
    });

    return {
      duration,
      complexity,
      cfgSum,
      cfgDiff,
      cfgMulti,
      cfgDiv,
    };
  },
  components: {
    MDBRange,
    MDBCheckbox
  }
}
</script>