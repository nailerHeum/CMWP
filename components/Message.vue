<template lang="html">
  <div class="message">
    <div :class="alert" class="uk-card-default uk-margin-small-top uk-padding-small" uk-alert>
        <p class="uk-text-large uk-text-center"><i :class="icon"></i> <strong>{{ message }}</strong></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['icon', 'alert', 'message']
}
</script>

<style lang="scss">
@import "~assets/css/components/message";
@import "~assets/css/media";
</style>
