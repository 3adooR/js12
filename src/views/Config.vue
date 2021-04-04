<template>
  <div class="config">
    <h1>{{ pgName }}</h1>
    <Cfg/>
  </div>
</template>

<script>
import Cfg from "@/components/Config";

export default {
  name: 'Config',
  setup() {
    const pgName = 'Конфигурация';
    document.title = pgName;
    return {pgName}
  },
  components: {Cfg}
}
</script>

<style scoped>
h1 {
  margin-bottom: 1em;
}
</style>