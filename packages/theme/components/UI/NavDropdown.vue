<template>
  <dropdown-menu
    class="custom-style"
    transition="zoom"
    @opened="writeToConsoleForOpened"
    @closed="writeToConsoleForClosed"
    mode="hover"
  >
    <button slot="trigger">
      <NuxtLink :to="titleUrl" class="sf-menu-item__label nav-item">
        {{ title }}
        <span class="carret">⌄</span>
      </NuxtLink>
    </button>
    <ul slot="body" class="dropdown-body">
      <li v-for="option in options" :key="option.url">
        <NuxtLink :to="option.url" class="dropdown-option">{{
          option.name
        }}</NuxtLink>
      </li>
    </ul>
  </dropdown-menu>
</template>

<script>
import DropdownMenu from 'v-dropdown-menu';
import { Sficon } from '@storefront-ui/vue';

export default {
  components: {
    DropdownMenu,
    Sficon
  },
  props: {
    title: String,
    titleUrl: String,
    options: Array
  },
  methods: {
    writeToConsoleForOpened(value) {
      console.log(value, 'opened');
    },
    writeToConsoleForClosed(value) {
      console.log(value, 'closed');
    }
  }
};
</script>
<style lang="scss">
@import 'v-dropdown-menu/dist/v-dropdown-menu.css';
.v-dropdown-menu {
  $this: &;
  &.custom-style & {
    &__container {
      border: 1px solid var(--c-primary);
      border-radius: 2px;
      transform: translate(12px, 6px);
      min-width: 180px;
    }
  }
}

.nav-item {
  margin: 0 var(--spacer-sm);
  color: var(--c-link);
}
.nav-item:hover {
  color: var(--c-primary);
}
.dropdown-option {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: 1rem;
  background: var(--component-select-option-background);
  color: inherit;
  min-height: var(
    --component-select-height,
    calc(
      var(--spacer-base) + var(--spacer-2xs) +
        var(--component-select-label-font-size, var(--font-size--lg))
    )
  );
  @include font(
    --component-select-option-font,
    var(--font-weight--light),
    var(--font-size--sm),
    1.2,
    var(--font-family--primary)
  );
  @include for-desktop {
    --component-select-option-padding: var(--spacer-xs);
    &:hover {
      --component-select-option-background: rgba(var(--c-gray-base), 0.1);
    }
  }
}
.carret {
  padding-left: 0.5rem;
}
</style>
