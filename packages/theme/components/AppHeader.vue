<template>
  <div>
    <TopBar
      class="desktop-only"
      :class="{
        'topbar-on-top': isSearchOpen || isMegaMenuOpen
      }"
      :is-mega-menu="isMegaMenu"
      v-on:topbarAccount="handleAccountClick"
    />
    <SfHeader
      class="sf-header--has-mobile-search"
      :class="{
        'header-on-top': isSearchOpen || isMegaMenuOpen
      }"
    >
      <template #logo v-if="isMegaMenu === true">
        <nuxt-link :to="localePath('/')" class="">
          <SfImage
            src="/cf-icon.svg"
            alt="Cooke Furniture"
            :width="72"
            :height="72"
            style="margin-left: 1rem"
          />
        </nuxt-link>
      </template>

      <template #navigation v-if="isMegaMenu === false">
        <div v-for="(item, index) in navItems" :key="index">
          <div v-if="item.isDropdown === true">
            <NavDropdown
              :title="item.name.toUpperCase()"
              :titleUrl="item.url"
              :options="item.dropdownOptions"
            />
          </div>
          <div v-else-if="item.isDropdown === false">
            <NuxtLink :to="item.url" class="sf-menu-item__label nav-item">{{
              item.name.toUpperCase()
            }}</NuxtLink>
          </div>
        </div>
      </template>

      <template
        #navigation
        v-else-if="isMegaMenu === true && isSearchOpen === false"
      >
        <SfHeaderNavigationItem
          v-for="(category, index) in navCategories"
          :link="localePath(`/c/${category.slug}/${category.id}`)"
          :key="index"
          :label="category.name"
          class="mega-menu-item"
          :class="{
            'active-menu': selectedMenuItem === category.name && isMegaMenuOpen
          }"
          @mouseover="handleMouseOver(category.name)"
        />
        <SfHeaderNavigationItem
          :link="localePath(`/design`)"
          label="design"
          class="mega-menu-item"
          :class="{
            'active-menu': selectedMenuItem === 'design' && isMegaMenuOpen
          }"
          @mouseover="handleMouseOver('design')"
        />
      </template>

      <template
        #navigation
        v-else-if="isMegaMenu === true && isSearchOpen === true"
      >
        <SfSearchBar
          ref="searchBarRef"
          :placeholder="$t('Search for items')"
          aria-label="Search"
          class="header-search"
          :value="term"
          @input="handleSearch"
          @keydown.enter="handleSearch($event)"
          @focus="isSearchOpen = true"
          @keydown.esc="closeSearch"
          v-click-outside="closeSearch"
        >
        </SfSearchBar>
      </template>

      <template #aside>
        <nuxt-link
          :to="localePath('/')"
          class="smartphone-only"
          v-if="isMegaMenu === false"
        >
          <SfImage
            src="/CookeFurniture.png"
            alt="Cooke Furniture"
            class=""
            :width="null"
            :height="null"
          />
        </nuxt-link>
      </template>
      <template #header-icons>
        <div class="sf-header__icons">
          <SfButton
            v-if="isMegaMenu === false"
            class="sf-button--pure sf-header__action"
            @click="handleAccountClick"
          >
            <SfIcon :icon="accountIcon" size="1.25rem" />
          </SfButton>
          <SfButton
            class="sf-button--pure sf-header__action"
            @click="
              toggleCartSidebar();
              isMegaMenuOpen = false;
            "
          >
            <SfIcon class="sf-header__icon" icon="empty_cart" size="1.25rem" />

            <SfBadge
              v-if="cartTotalItems"
              class="sf-badge--number cart-badge"
              >{{ cartTotalItems }}</SfBadge
            >
          </SfButton>
          <SfButton
            class="sf-button--pure sf-header__action"
            @click="toggleMegaMenu"
          >
            <SfIcon
              class="sf-header__icon"
              :icon="isMegaMenu ? 'list' : 'tiles'"
              size="1.25rem"
            />
          </SfButton>
        </div>
      </template>

      <template #search v-if="isMegaMenu === false">
        <SfSearchBar
          ref="searchBarRef"
          :placeholder="$t('Search for items')"
          aria-label="Search"
          class="sf-header__search"
          :value="term"
          @input="handleSearch"
          @keydown.enter="handleSearch($event)"
          @focus="isSearchOpen = true"
          @keydown.esc="closeSearch"
          v-click-outside="closeSearch"
        >
          <template #icon>
            <SfButton
              v-if="!!term"
              class="sf-search-bar__button sf-button--pure"
              @click="closeOrFocusSearchBar"
            >
              <span class="sf-search-bar__icon">
                <SfIcon color="var(--c-text)" size="18px" icon="cross" />
              </span>
            </SfButton>
            <SfButton
              v-else
              class="sf-search-bar__button sf-button--pure"
              @click="
                isSearchOpen ? (isSearchOpen = false) : (isSearchOpen = true)
              "
            >
              <span class="sf-search-bar__icon">
                <SfIcon color="var(--c-text)" size="20px" icon="search" />
              </span>
            </SfButton>
          </template>
        </SfSearchBar>
      </template>

      <template #search v-else-if="isMegaMenu === true">
        <SfSearchBar
          ref="searchBarRef"
          :placeholder="$t('Search for items')"
          aria-label="Search"
          class="sf-header__search smartphone-only"
          :value="term"
          @input="handleSearch"
          @keydown.enter="handleSearch($event)"
          @focus="isSearchOpen = true"
        >
        </SfSearchBar>
        <SfButton
          class="sf-button--pure sf-header__action"
          @click="
            isMegaMenuOpen = false;
            isSearchOpen = true;
            focusSearchBar();
          "
        >
          <SfIcon class="sf-header__icon" icon="search" size="1.25rem" />
        </SfButton>
      </template>
    </SfHeader>
    <SearchResults
      :visible="isSearchOpen"
      :result="formatedResult"
      @close="closeSearch"
      @removeSearchResults="removeSearchResults"
    />
    <MegaMenu
      :visible="isMegaMenuOpen"
      :navItems="megaMenuItems"
      :menuItem="selectedMenuItem"
      @close="closeMegaMenu"
      @mouseleave="closeMegaMenu"
    />
  </div>
</template>

<script>
import {
  SfImage,
  SfSearchBar,
  SfIcon,
  SfButton,
  SfOverlay,
  SfBadge,
  SfHeader,
  SfMenuItem
} from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import {
  useCart,
  useWishlist,
  useUser,
  cartGetters,
  categoryGetters,
  useCategory,
  useFacet
} from '@vue-storefront/odoo';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import { computed, ref, watch, onMounted } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers } from '~/composables';
import LocaleSelector from './LocaleSelector';
import SearchResults from '~/components/SearchResults';
import TopBar from '~/components/TopBar.vue';
import NavDropdown from '/components/UI/NavDropdown';
import MegaMenu from '~/components/MegaMenu';

import debounce from 'lodash.debounce';
import { mapMobileObserver } from '@storefront-ui/vue/src/utilities/mobile-observer.js';

export default {
  components: {
    SfHeader,
    SfImage,
    SfIcon,
    SfButton,
    SfSearchBar,
    LocaleSelector,
    SearchResults,
    SfOverlay,
    SfBadge,
    SfMenuItem,
    TopBar,
    NavDropdown,
    MegaMenu
  },
  directives: { clickOutside },
  setup(props, { root }) {
    const consoleLog = (arg) => {
      console.log(arg);
    };

    const searchBarRef = ref(null);
    const term = ref(null);
    const formatedResult = ref(null);
    const isSearchOpen = ref(false);
    const isMegaMenu = ref(true);
    const isMegaMenuOpen = ref(false);
    const selectedMenuItem = ref(null);
    const megaMenuItems = ref(null);

    const toggleMegaMenu = () => {
      isMegaMenu.value = !isMegaMenu.value;
    };

    const focusSearchBar = () => {
      // console.log(searchBarRef.value.$el);
      // return searchBarRef.value.$el.children[0].focus();
    };

    const { changeSearchTerm } = useUiHelpers();
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } =
      useUiState();

    const { load: loadUser, isAuthenticated } = useUser();
    const { load: loadCart, cart } = useCart();
    const { load: loadWishlist, wishlist } = useWishlist();
    const { search: searchProductApi, result } = useFacet('AppHeader:Search');
    const { categories: topCategories, search: searchTopCategoryApi } =
      useCategory('AppHeader:TopCategories');

    const filterCategoryReturnChildren = (arg) => {
      const filter = computed(() =>
        topCategories.value.filter((category) => category.name === arg)
      );
      const [result] = filter.value;
      return result.childs;
    };

    const handleMouseOver = (arg) => {
      isMegaMenuOpen.value = true;
      selectedMenuItem.value = arg;

      if (selectedMenuItem.value !== 'design') {
        megaMenuItems.value = filterCategoryReturnChildren(arg);
      }
    };

    const isMobile = computed(() => mapMobileObserver().isMobile.get());

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });
    const accountIcon = computed(() =>
      isAuthenticated.value ? 'profile_fill' : 'profile'
    );
    const removeSearchResults = () => {
      formatedResult.value = null;
    };

    const closeSearch = () => {
      if (!isSearchOpen.value) return;
      term.value = '';
      isSearchOpen.value = false;
    };

    const closeMegaMenu = () => {
      if (!isMegaMenuOpen.value) return;
      term.value = '';
      isMegaMenuOpen.value = false;
    };

    const handleSearch = debounce(async (paramValue) => {
      if (!paramValue.target) {
        term.value = paramValue;
      } else {
        term.value = paramValue.target.value;
      }
      if (term.value.length < 2) return;

      await searchProductApi({
        search: term.value,
        pageSize: 12,
        fetchCategory: true
      });

      formatedResult.value = {
        products: result?.value?.data?.products,
        categories: result?.value?.data?.categories
          .filter((category) => category.childs === null)
          .map((category) => categoryGetters.getTree(category))
      };
    }, 100);
    const closeOrFocusSearchBar = () => {
      if (isMobile.value) {
        return closeSearch();
      }
      term.value = '';
      return searchBarRef.value.$el.children[0].focus();
    };
    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }

      toggleLoginModal();
    };

    const navCategories = computed(() => topCategories.value);

    const navItems = [
      {
        name: 'COOKE Collection',
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
            url: 'example03.com'
          },
          {
            name: 'Fire Features',
            url: 'example04.com'
          },
          {
            name: 'Fire Pit Burners',
            url: 'example05.com'
          }
        ]
      },
      {
        name: 'SoCal Collection',
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
            url: 'example5.com'
          },
          {
            name: 'Costa Mesa Fire Pit Table',
            url: 'example6.com'
          },
          {
            name: 'Miami Fire Pit Table',
            url: 'example7.com'
          }
        ]
      },
      {
        name: 'design',
        url: '/category',
        isDropdown: true,
        dropdownOptions: [
          {
            name: 'Finishes and Accesories',
            url: 'example8.com'
          },
          {
            name: 'Custom Products',
            url: 'example9.com'
          },
          {
            name: 'Ideas Book',
            url: 'example99.com'
          },
          {
            name: 'Videos',
            url: 'example98.com'
          },
          {
            name: 'Manuals',
            url: 'example92.com'
          },
          {
            name: 'Product Specs',
            url: 'example82.com'
          }
        ]
      },
      {
        name: 'store',
        url: '/category',
        isDropdown: false
      },
      {
        name: 'about us',
        url: '/about',
        isDropdown: false
      }
    ];

    watch(
      () => term.value,
      (newVal, oldVal) => {
        const shouldSearchBeOpened =
          !isMobile.value &&
          term.value.length > 0 &&
          ((!oldVal && newVal) ||
            (newVal.length !== oldVal.length && isSearchOpen.value === false));
        if (shouldSearchBeOpened) {
          isSearchOpen.value = true;
        }
      }
    );

    onSSR(async () => {
      await Promise.all([
        searchTopCategoryApi({
          filter: { parent: true }
        }),
        loadUser(),
        loadWishlist(),
        loadCart()
      ]);
    });

    onMounted(() => {
      // topCategories.value.forEach((category) => {
      //   category.childs.forEach((child) => console.log(child.name));
      // });
    });

    return {
      wishlistHasItens: computed(
        () => wishlist.value?.wishlistItems.length > 0
      ),
      topCategories,
      navCategories,
      navItems,
      accountIcon,
      closeOrFocusSearchBar,
      cartTotalItems,
      removeSearchResults,
      isSearchOpen,
      searchBarRef,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      changeSearchTerm,
      formatedResult,
      term,
      isMobile,
      handleSearch,
      closeSearch,
      closeMegaMenu,
      isMegaMenu,
      toggleMegaMenu,
      isMegaMenuOpen,
      selectedMenuItem,
      handleMouseOver,
      megaMenuItems,
      focusSearchBar,
      consoleLog
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/shared/styles/components/organisms/SfHeader.scss';

.header-search {
  width: 36rem;
}

.sf-header {
  --header-padding: var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0;
  }
  &__logo-image {
    height: 100%;
  }
  ::v-deep .sf-header__navigation {
    --header-navigation-margin: 0 auto 0 auto;
    justify-content: end;
  }
  ::v-deep .sf-header-navigation-item {
    --header-navigation-item-flex: 0;
  }
}

.topbar-on-top {
  z-index: 4;
}

.header-on-top {
  z-index: 2;
}
.nav-item {
  margin: 0 var(--spacer-sm);
  color: var(--c-link);
}
.nav-item:hover {
  color: var(--c-primary);
}

.mega-menu-item {
  margin: 0;
  padding: 0 var(--spacer-sm);
}

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
.active-menu {
  --header-navigation-item-color: var(--c-primary-darken);
  --header-navigation-item-border-color: var(--c-primary-darken);
}
</style>
