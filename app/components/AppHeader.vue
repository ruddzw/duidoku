<template>
  <header>
    <h1>Duidoku</h1>
    <h2>Two-Player Competitive Sudoku</h2>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import 'styles/variables';

header {
  color: $standardFontColor;
  font-family: $headerFont;
  margin: 1vh;
  text-align: center;

  h1 {
    font-size: 10vh;
    margin-bottom: 1vh;
  }

  h2 {
    font-size: 3vh;
  }
}
</style>
