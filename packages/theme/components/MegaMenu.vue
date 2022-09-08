<template>
  <div @mouseleave="$emit('close')">
    <SfMegaMenu
      :visible="isMegaMenuOpen"
      :title="$t('Menu')"
      class="search drop-shadow"
    >
      <SfMegaMenuColumn />
      <SfMegaMenuColumn>
        <SfList>
          <SfListItem v-for="(item, i) in navItems" :key="i">
            <SfMenuItem
              :label="item.name"
              :link="localePath(`/c/${item.slug}/${item.id}`)"
            />
          </SfListItem>
        </SfList>
      </SfMegaMenuColumn>
      <SfMegaMenuColumn>
        <template #title>
          <nuxt-link
            v-for="(product, index) in tempProducts"
            v-if="product.title === menuItem"
            :key="index"
            class="result-card"
            :to="localePath(product.href)"
            @click="$emit('close')"
          >
            <transition>
              <div class="result-card">
                <SfImage
                  :src="product.imgUrl"
                  :alt="product.name"
                  :width="344"
                  :height="342"
                  :nuxtImgConfig="{ fit: 'cover' }"
                />
                <h4>FEATRURED</h4>
                <p>{{ product.name }}</p>
              </div>
            </transition>
          </nuxt-link>
        </template>
      </SfMegaMenuColumn>
    </SfMegaMenu>
  </div>
</template>
<script>
import {
  SfMegaMenu,
  SfList,
  SfBanner,
  SfProductCard,
  SfMenuItem,
  SfButton,
  SfImage
} from '@storefront-ui/vue';
import { ref, watch } from '@nuxtjs/composition-api';
import {
  productGetters,
  categoryGetters,
  useFacet,
  facetGetters
} from '@vue-storefront/odoo';

import { useUiHelpers } from '~/composables';

export default {
  name: 'MegaMenu',
  components: {
    SfMegaMenu,
    SfList,
    SfBanner,
    SfProductCard,
    SfMenuItem,
    SfButton,
    SfImage
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    navItems: {
      type: Array
    },
    menuItem: {
      type: String
    }
  },
  watch: {
    $route() {
      this.$emit('close');
    }
  },
  setup(props, { emit }) {
    const uiHelper = useUiHelpers();
    const isMegaMenuOpen = ref(props.visible);

    const tempProducts = [
      {
        title: 'COOKE Collection',
        name: 'COOKE Balboa Fire Pit Table',
        imgUrl:
          'https://cooke.paylocal.net/web/image/product.template/827/image_1920',
        href: '/p/827/zzz-bal-s48x36x4x21-cooke-balboa-fire-pit-table-48-x-36-x-21-stone-top-827'
      },
      {
        title: 'SoCal Collection',
        name: 'Santa Barbara Circular Fire Pit Table',
        imgUrl:
          'https://cooke.paylocal.net/web/image/product.template/838/image_1920',
        href: '/p/838/zzz-sb-cfpt-48-cooke-santa-barbara-circular-fire-pit-table-48-diameter-lounge-height-838'
      },
      {
        title: 'design',
        name: 'Custom Designs',
        imgUrl:
          'https://cookefurniture.com/wp-content/cache/pdfpreview/bce91aa423ed9e6320dba5db10d25fd9.png',
        href: ''
      }
    ];

    watch(
      () => props.visible,
      (newVal) => {
        isMegaMenuOpen.value = newVal;
        if (isMegaMenuOpen.value) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
          emit('removeSearchResults');
        }
      }
    );

    // onUpdated(() => {
    //   console.log(childs.value);
    // });

    return {
      uiHelper,
      isMegaMenuOpen,
      categoryGetters,
      productGetters,
      useFacet,
      facetGetters,
      tempProducts
    };
  }
};
</script>
<style lang="scss" scoped>
.drop-shadow {
  box-shadow: 0 48vh 2px -2px rgba(0, 0, 0, 0.5);
}
.search {
  min-height: 50vh;
  position: absolute;
  right: 0;
  left: 0;
  z-index: 3;
  --mega-menu-column-header-margin: var(--spacer-sm) 0 var(--spacer-xl);
  --mega-menu-content-padding: 0;
  --mega-menu-height: auto;
  @include for-desktop {
    --mega-menu-content-padding: var(--spacer-xl) 0;
  }
  &__wrapper-results {
    display: flex;
    flex-direction: column;
    @include for-desktop {
      flex-direction: row;
      flex: 1;
    }
  }
  &__categories {
    flex: 0 0 220px;
  }
  &__results {
    flex: 1;
  }
  &__header {
    margin-left: var(--spacer-sm);
  }
  ::v-deep .sf-bar {
    display: none;
  }
  ::v-deep .sf-mega-menu-column__header {
    display: none;
    @include for-desktop {
      display: flex;
    }
  }
}
.results {
  &--desktop {
    --scrollable-max-height: 35vh;
  }
  &--mobile {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: var(--c-white);
    padding: var(--spacer-base) var(--spacer-sm);
    --product-card-max-width: 9rem;
  }
}
.see-all {
  padding: var(--spacer-xl) 0 0 var(--spacer-sm);
}
.action-buttons {
  padding: var(--spacer-xl) var(--spacer-sm) var(--spacer-3xl);
  background: var(--c-white);
  width: 100%;
  &__button {
    width: calc(100% - 32px);
  }
}
.results-listing {
  display: flex;
  flex-wrap: wrap;
  margin-left: var(--spacer-2xs);
}
.result-card {
  margin: var(--spacer-sm) 0;
  @include for-desktop {
    margin: var(--spacer-2xs) 0;
  }
}
.before-results {
  box-sizing: border-box;
  padding: var(--spacer-base) var(--spacer-sm) var(--spacer-2xl);
  width: 100%;
  text-align: center;
  @include for-desktop {
    padding: 0;
  }
  &__picture {
    --image-width: 230px;
    margin-top: var(--spacer-2xl);
    @include for-desktop {
      --image-width: 18.75rem;
      margin-top: var(--spacer-base);
    }
  }
  &__paragraph {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    margin: 0;
    @include for-desktop {
      font-size: var(--font-size--lg);
    }
    &:first-of-type {
      margin: var(--spacer-xl) auto var(--spacer-xs);
    }
  }
  &__button {
    margin: var(--spacer-xl) auto;
    width: 100%;
  }
}
</style>
