<template>
  <SfTopBar class="topbar">
    <template #left>
      <nuxt-link :to="localePath('/')" class="">
        <SfImage
          src="/cf-icon.svg"
          alt="Cooke Furniture"
          :width="36"
          :height="36"
          style="margin-left: 1rem"
        />
      </nuxt-link>
    </template>
    <template #right>
      <SfButton
        class="sf-button--pure sf-header__action"
        @click="toggleCartSidebar()"
      >
        <SfIcon class="sf-header__icon" icon="empty_cart" size="1.25rem" />

        <SfBadge v-if="cartTotalItems" class="sf-badge--number cart-badge">{{
          cartTotalItems
        }}</SfBadge>
      </SfButton>
    </template>
  </SfTopBar>
</template>

<script>
import {
  SfButton,
  SfTopBar,
  SfImage,
  SfIcon,
  SfBadge
} from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { useCart, cartGetters } from '@vue-storefront/odoo';
import { useUiState } from '~/composables';
import { computed } from '@nuxtjs/composition-api';

export default {
  components: {
    SfTopBar,
    SfButton,
    SfImage,
    SfIcon,
    SfBadge
  },
  setup() {
    const { toggleCartSidebar } = useUiState();
    const { load: loadCart, cart } = useCart();
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    onSSR(async () => {
      await Promise.all([loadCart()]);
    });

    return {
      toggleCartSidebar,
      cartTotalItems
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/shared/styles/components/organisms/SfTopBar.scss';

.topbar {
  position: relative;
  padding: var(--spacer-base) 0;
  z-index: 2;
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}
.sf-top-bar {
  background-color: white;
}
</style>
