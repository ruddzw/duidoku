<template>
  <div class="app">
    <app-header />
    <app-main />
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppMain from '@/components/AppMain'
import AppFooter from '@/components/AppFooter'

export default {
  components: {
    AppHeader,
    AppMain,
    AppFooter
  }
}
</script>

<style lang="scss" scoped>
.app {
  // Let header/game/footer take the space they need, and fill .app

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  main {
    // Grow to take the space left over by the header and footer
    flex-grow: 1;
  }
}
</style>
