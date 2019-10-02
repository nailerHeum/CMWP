<template lang="html">
  <footer class="uk-text-center" :class="{ 'pos-rel' : relative, 'pos-fix' : !relative }">
    &copy; 2017 ~ {{ thisYear() }}  Created by 전지원.</strong>
  </footer>
</template>

<script>
export default {
  props: ['relative'],
  methods: {
    thisYear () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss">
  footer {
    color: #0054A6;
    padding: 2rem;
  }

  footer.pos-rel {
    position: relative !important;
    margin-top: 20px;
  }

  footer.pos-fix {
      position: fixed;
      width: 100vw;
      left: 0;
      bottom: 0;
      padding: 10px 0;
      background: #fff;
      box-shadow: 0 0 5px rgba(0,0,0,.12);
      z-index: 1050;
  }
</style>
