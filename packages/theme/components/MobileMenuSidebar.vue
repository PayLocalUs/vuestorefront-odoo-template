<template>
  <div id="mobileMenu">
    <SfSidebar
      :visible="isMobileMenuOpen"
      :button="false"
      :title="currentParentMenu"
      @close="backMenu"
      class="sidebar sf-sidebar--right"
    >
      <template v-if="!isChildsOpened">
        <SfHeaderNavigationItem
          v-for="(category, index) in navItems"
          :key="index"
          data-cy="app-header-top-categories"
          class="nav-item"
          :label="category.name"
          @click="openChilds(category.name)"
        />
      </template>

      <SfLoader :class="{ loading }" :loading="loading">
        <SfAccordion showChevron transition="sf-expand" v-if="isChildsOpened">
          <SfAccordionItem
            v-for="(cat, i) in categoryTree.items"
            :key="i"
            :header="cat.label"
          >
            <template>
              <SfList class="list">
                <SfListItem
                  class="list__item"
                  v-for="(subCat, j) in cat.items"
                  :key="j"
                >
                  <SfMenuItem
                    :count="subCat.count || ''"
                    :data-cy="`category-link_subcategory_${subCat.slug}`"
                    :label="subCat.label"
                  >
                    <template #label="{ label }">
                      <a
                        @click="goToSubCategory(subCat)"
                        :class="subCat.isCurrent ? 'sidebar--cat-selected' : ''"
                      >
                        {{ label }}
                      </a>
                    </template>
                  </SfMenuItem>
                </SfListItem>
              </SfList>
            </template>
          </SfAccordionItem>

          <!--      TODO: Categories for general shop
          <SfAccordionItem
            v-for="(cat, i) in categoryTree.items"
            :key="i"
            :header="cat.label"
          >
            <template>
              <SfList class="list">
                <SfListItem
                  class="list__item"
                  v-for="(subCat, j) in cat.items"
                  :key="j"
                >
                  <SfMenuItem
                    :count="subCat.count || ''"
                    :data-cy="`category-link_subcategory_${subCat.slug}`"
                    :label="subCat.label"
                  >
                    <template #label="{ label }">
                      <a
                        @click="goToSubCategory(subCat)"
                        :class="subCat.isCurrent ? 'sidebar--cat-selected' : ''"
                      >
                        {{ label }}
                      </a>
                    </template>
                  </SfMenuItem>
                </SfListItem>
              </SfList>
            </template>
          </SfAccordionItem> -->
        </SfAccordion>
      </SfLoader>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfAccordion,
  SfLoader,
  SfList,
  SfMenuItem
} from '@storefront-ui/vue';
import {
  computed,
  defineComponent,
  ref,
  useRouter
} from '@nuxtjs/composition-api';
import {
  useUser,
  productGetters,
  useCategory,
  useFacet,
  facetGetters
} from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core';
import { useUiState, useUiHelpers } from '~/composables';

export default defineComponent({
  name: 'MobileMenuSidebar',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfAccordion,
    SfLoader,
    SfList,
    SfMenuItem
  },
  setup() {
    const isChildsOpened = ref(false);
    const currentParentMenu = ref('Menu');
    const router = useRouter();
    const { getCatLink, getFacetsFromURL } = useUiHelpers();
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const { isAuthenticated } = useUser();
    const { categories: topCategories } = useCategory(
      'AppHeader:TopCategories'
    );

    const { result, loading, search } = useFacet();

    const categoryTree = computed(() =>
      facetGetters.getCategoryTree(result.value)
    );

    const filteredTopCategories = computed(() =>
      topCategories.value.filter(
        (cat) => cat.name === 'WOMEN' || cat.name === 'MEN'
      )
    );

    const openChilds = async (menuName) => {
      currentParentMenu.value = menuName;
      const params = { ...getFacetsFromURL() };
      await search(params);
      isChildsOpened.value = true;
    };

    const backMenu = () => {
      if (!isChildsOpened.value) {
        toggleMobileMenu();
      }
      currentParentMenu.value = 'Menu';
      isChildsOpened.value = false;
    };

    const goToSubCategory = (subCategory) => {
      router.push(getCatLink(subCategory));
      toggleMobileMenu();
    };

    onSSR(async () => {});

    const navItems = [
      {
        name: 'COOKE COLLECTION',
        url: '/category',
        isDropdown: true,
        dropdownOptions: [
          {
            name: 'Fire Pit Tables',
            url: 'example9.com'
          },
          {
            name: 'Furniture',
            url: 'example0.com'
          },
          {
            name: 'Glass Windscreens',
            url: 'example01.com'
          },
          {
            name: 'BBQ Islands',
            url: 'example02.com'
          },
          {
            name: 'Planters',
            url: 'example02.com'
          },
          {
            name: 'Fire Features',
            url: 'example02.com'
          },
          {
            name: 'Fire Pit Burners',
            url: 'example02.com'
          }
        ]
      },
      {
        name: 'SOCAL COLLECTION',
        url: '/category',
        isDropdown: true,
        dropdownOptions: [
          {
            name: 'Santa Barbara Fire Pit Table',
            url: 'example1.com'
          },
          {
            name: 'Santa Barbara Lounge Table',
            url: 'example2.com'
          },
          {
            name: 'Parkway Firepit Table',
            url: 'example3.com'
          },
          {
            name: 'Palisades Fire Pit Table',
            url: 'example4.com'
          },
          {
            name: 'Olympic Fire Pit Table',
            url: 'example02.com'
          },
          {
            name: 'Costa Mesa Fire Pit Table',
            url: 'example02.com'
          },
          {
            name: 'Miami Fire Pit Table',
            url: 'example02.com'
          }
        ]
      },
      {
        name: 'DESIGN',
        url: '/category',
        isDropdown: true,
        dropdownOptions: [
          {
            name: 'Finishes and Accesories',
            url: 'example5.com'
          },
          {
            name: 'Custom Products',
            url: 'example6.com'
          },
          {
            name: 'Ideas Book',
            url: 'example7.com'
          },
          {
            name: 'Videos',
            url: 'example8.com'
          },
          {
            name: 'Manuals',
            url: 'example02.com'
          },
          {
            name: 'Product Specs',
            url: 'example02.com'
          }
        ]
      },
      {
        name: 'STORE',
        url: '/category',
        isDropdown: false
      },
      {
        name: 'ABOUT US',
        url: '/category',
        isDropdown: false
      }
    ];

    return {
      navItems,
      currentParentMenu,
      goToSubCategory,
      backMenu,
      isChildsOpened,
      openChilds,
      getCatLink,
      loading,
      categoryTree,
      filteredTopCategories,
      isAuthenticated,
      isMobileMenuOpen,
      toggleMobileMenu,
      productGetters
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/mobileMenuSideBar.scss';
</style>
