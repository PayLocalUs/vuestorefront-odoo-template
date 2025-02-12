<template>
  <div>
    <LazyHydrate when-visible>
      <AppHeader />
    </LazyHydrate>

    <div id="layout">
      <nuxt :key="route.fullPath" />

      <BottomNavigation />
      <MobileMenuSidebar />
      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
      <Notification />
    </div>
    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import AppFooter from '~/components/AppFooter.vue';
import TopBar from '~/components/TopBar.vue';
import MobileMenuSidebar from '~/components/MobileMenuSidebar.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import WishlistSidebar from '~/components/WishlistSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import Notification from '~/components/Notification';
import { onSSR } from '@vue-storefront/core';
import { useRoute } from '@nuxtjs/composition-api';
import { useCart, useStore, useUser, useWishlist } from '@vue-storefront/odoo';

export default {
  name: 'DefaultLayout',

  components: {
    LazyHydrate,
    TopBar,
    AppHeader,
    BottomNavigation,
    AppFooter,
    MobileMenuSidebar,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification
  },

  setup() {
    const route = useRoute();
    const { load: loadStores } = useStore();
    const { load: loadUser } = useUser();
    const { load: loadCart } = useCart();
    const { load: loadWishlist } = useWishlist();

    onSSR(async () => {
      await Promise.all([loadStores(), loadUser(), loadCart(), loadWishlist()]);
    });

    return {
      route
    };
  }
};
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles';

:root {
  @include generate-color-variants(--_c-bluesmoke-primary, #52798d);
  @include generate-color-variants(--_c-bluesmoke-secondary, #7e9cac);
  @include assign-color-variants(--c-primary, --_c-bluesmoke-primary);
  @include assign-color-variants(--c-primary-variant, --_c-bluesmoke-secondary);
}

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
