<template>
    <nuxt />
</template>

<style lang="scss">
@import '~assets/css/reset';
@import '~assets/css/fonts/fonts';
#iedetected {
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 1000000;
  width: 100vw;
  height: 100vh;
  > .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    > h1 {
      font-size: 10rem;
      padding: 2rem 0;
    }
    > h2, p {
      font-size: 1.6rem;
    }
    > img {
      margin-top: 4rem;
    }
  }
}
</style>
