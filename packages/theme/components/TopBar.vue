<template>
  <SfTopBar class="topbar">
    <template #left>
      <div class="spacer">
        <SfButton class="sf-button--text">{{
          $t('Here will be SM icons')
        }}</SfButton>
      </div>
    </template>

    <template #center>
      <nuxt-link :to="localePath('/')" class="">
        <SfImage src="/CookeFurniture.png" alt="Cooke Furniture" class="" />
      </nuxt-link>
    </template>
    <template #right>
      <SfButton class="sf-button--text topbar__button">Contact Us</SfButton>
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar, SfImage } from '@storefront-ui/vue';

export default {
  components: {
    SfTopBar,
    SfButton,
    SfImage
  }
};
</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  z-index: 1;
  background-color: var(--c-white);
  padding-top: var(--spacer-base);
  padding-bottom: var(--spacer-sm);
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}
.spacer {
  margin-left: var(--spacer-sm);
}
</style>
