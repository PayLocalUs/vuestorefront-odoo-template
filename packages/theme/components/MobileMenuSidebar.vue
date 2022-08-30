<template>
  <div id="mobileMenu">
    <SfSidebar
      :visible="isMobileMenuOpen"
      :button="false"
      :title="currentParentMenu"
      @close="backMenu"
      class="sidebar sf-sidebar--right"
    >
      <SfLoader :class="{ loading }" :loading="loading">
        <SfAccordion showChevron transition="sf-expand">
          <SfAccordionItem
            v-for="(item, i) in accordion"
            :key="i"
            :header="item.name"
          >
            <template>
              <SfList class="list">
                <SfListItem
                  class="list__item"
                  v-for="(option, j) in item.options"
                  :key="j"
                >
                  <SfMenuItem :label="option.name" :link="option.url">
                    <template #label>
                      <a @click="toggleMenu"> {{ option.name }} </a>
                    </template>
                  </SfMenuItem>
                </SfListItem>
              </SfList>
            </template>
          </SfAccordionItem>

          <!--           TODO: Refactor with working categories?

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
      <div style="margin-top: 2rem">
        <SfMenuItem label="ABOUT US" link="/about">
          <template #label>
            <a @click="toggleMenu"> ABOUT US </a>
          </template>
        </SfMenuItem>
      </div>
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

    const toggleMenu = () => {
      toggleMobileMenu();
    };

    onSSR(async () => {});

    const accordion = [
      {
        name: 'COOKE COLLECTION',
        options: [
          {
            name: 'Explore Cooke Collection',
            url: 'example9.com'
          },
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
        options: [
          {
            name: 'Explore SoCal Collection',
            url: 'example9.com'
          },
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
        options: [
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
        options: [
          {
            name: 'View all Categories',
            url: 'example5.com'
          },
          {
            name: 'These are just',
            url: 'example6.com'
          },
          {
            name: 'Example Categories',
            url: 'example7.com'
          },
          {
            name: 'Need to Implement',
            url: 'example8.com'
          }
        ]
      }
    ];

    const navItems = [
      {
        name: 'ABOUT US',
        url: '/category'
      }
    ];

    return {
      accordion,
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
      productGetters,
      toggleMenu
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/mobileMenuSideBar.scss';
</style>
