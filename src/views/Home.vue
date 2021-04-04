<template>
  <div class="home">
    <h1>{{ pgName }}</h1>
    <Training/>
  </div>
</template>

<script>
import Training from '@/components/Training'

export default {
  name: 'Home',
  setup() {
    const pgName = 'Тренировка';
    document.title = pgName;
    return {pgName}
  },
  components: {Training}
}
</script>
