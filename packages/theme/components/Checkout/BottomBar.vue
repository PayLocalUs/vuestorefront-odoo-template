<template>
  <SfTopBar class="topbar">
    <template #left>
      <SfButton class="sf-button--text">{{ $t('Help & FAQs') }}</SfButton>
    </template>
    <template #center>
      <p>{{ $t('Download') }}</p>
      <SfButton class="topbar__button sf-button--text">{{
        $t('Find out more')
      }}</SfButton>
    </template>
    <template #right>
      <div>@2022 Cooke, Inc. All rights reserved.</div>
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';

export default {
  components: {
    SfTopBar,
    SfButton
  }
};
</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  margin-top: var(--spacer-base);
  padding: var(--spacer-base) 0;
  z-index: 2;
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}
</style>
