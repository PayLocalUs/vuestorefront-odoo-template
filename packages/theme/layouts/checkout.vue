<template>
  <div style="padding: 0 1rem">
    <LazyHydrate when-visible>
      <CheckoutHeader />
    </LazyHydrate>
    <div id="layout">
      <nuxt :key="route.fullPath" />
      <CartSidebar />
    </div>
    <LazyHydrate when-visible>
      <BottomBar />
    </LazyHydrate>
  </div>
</template>

<script>
import { useRoute } from '@nuxtjs/composition-api';
import CartSidebar from '~/components/CartSidebar.vue';
import BottomBar from '~/components/Checkout/BottomBar.vue';
import CheckoutHeader from '~/components/Checkout/CheckoutHeader.vue';

export default {
  name: 'checkout',
  components: {
    BottomBar,
    CartSidebar,
    CheckoutHeader
  },

  setup() {
    const route = useRoute();

    return {
      route
    };
  }
};
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles';

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}

// Reset CSS
html {
  width: auto;
  @include for-mobile {
    overflow-x: hidden;
  }
}
body {
  overflow-x: hidden;
  color: var(--c-text);
  font-size: var(--font-size--base);
  font-family: var(--font-family--primary);
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: var(--c-link);
  &:hover {
    color: var(--c-link-hover);
  }
}
h1 {
  font-family: var(--font-family--secondary);
  font-size: var(--h1-font-size);
  line-height: 1.6;
  margin: 0;
}
h2 {
  font-family: var(--font-family--secondary);
  font-size: var(--h2-font-size);
  line-height: 1.6;
  margin: 0;
}
h3 {
  font-family: var(--font-family--secondary);
  font-size: var(--h3-font-size);
  line-height: 1.6;
  margin: 0;
}
h4 {
  font-family: var(--font-family--secondary);
  font-size: var(--h4-font-size);
  line-height: 1.6;
  margin: 0;
}
</style>
