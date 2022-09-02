<template>
  <div @mouseleave="$emit('close')">
    <SfMegaMenu :visible="isMegaMenuOpen" :title="$t('Menu')" class="search">
      <SfMegaMenuColumn />
      <SfMegaMenuColumn title="Categories">
        <SfList v-for="(item, i) in navItems" v-if="item.name === menuItem">
          <SfListItem v-for="(cat, i) in categoryTree.items">
            <SfMenuItem :label="cat.label" />
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
            :to="localePath(goToProduct(product))"
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
        <!-- <SfProductCard
          v-for="(product, index) in tempProducts"
          v-if="product.title === menuItem"
          :key="index"
          class="result-card"
          :imageWidth="344"
          :imageHeight="344"
          image-tag="nuxt-img"
          :image="product.imgUrl"
          :alt="product.name"
          :link="localePath(goToProduct(product))"
          @click="$emit('close')"
        >
          <template #title>
            <h4>FEATRURED</h4>
            <p>{{ product.name }}</p>
          </template>
        </SfProductCard> -->
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
import { ref, watch, computed } from '@nuxtjs/composition-api';
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
    menuItem: {
      type: String
    },
    navItems: {
      type: Array
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
    const { result } = useFacet();

    const products = computed(() => facetGetters.getProducts(result.value));

    const categoryTree = computed(() =>
      facetGetters.getCategoryTree(result.value)
    );

    const currentCategory = computed(() => {
      const categories = result.value?.data?.categories || [];
      return categories[0] || {};
    });

    const goToProduct = (product) => {
      return `/p/${productGetters.getId(product)}/${productGetters.getSlug(
        product
      )}`;
    };

    const tempProducts = [
      {
        title: 'COOKE COLLECTION',
        name: 'COOKE Balboa Fire Pit Table',
        imgUrl:
          'https://cooke.paylocal.net/web/image/product.template/827/image_1920'
      },
      {
        title: 'SOCAL COLLECTION',
        name: 'Santa Barbara Circular Fire Pit Table',
        imgUrl:
          'https://cooke.paylocal.net/web/image/product.template/838/image_1920'
      },
      {
        title: 'DESIGN',
        name: 'Custom Designs',
        imgUrl:
          'https://cookefurniture.com/wp-content/cache/pdfpreview/bce91aa423ed9e6320dba5db10d25fd9.png'
      },
      {
        title: 'STORE',
        name: 'Replacement Burners',
        imgUrl:
          'https://cooke.paylocal.net/web/image/product.template/604/image_1920'
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
    return {
      goToProduct,
      uiHelper,
      isMegaMenuOpen,
      categoryGetters,
      productGetters,
      useFacet,
      facetGetters,
      products,
      tempProducts,
      categoryTree,
      currentCategory
    };
  }
};
</script>
<style lang="scss" scoped>
.search {
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
