<template>
  <footer>
    <p>Copyright © 200<a href="/v1">8</a> - {{ new Date().getFullYear() }} <a href="http://www.ruddzw.com">Rudd Zwolinski</a>.</p>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import 'styles/variables';

footer {
  margin: 1vh;
  font-family: $copyFont;
  text-align: center;
  color: $standardFontColor;

  p {
    font-size: 2.25vh;
    line-height: 1.5em;
    margin: 1em 0;
  }
}
</style>
