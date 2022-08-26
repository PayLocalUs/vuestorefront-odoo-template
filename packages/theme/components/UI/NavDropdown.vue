<template>
  <dropdown-menu
    class="dropdown"
    transition="zoom"
    @opened="writeToConsoleForOpened"
    @closed="writeToConsoleForClosed"
    mode="hover"
  >
    <button slot="trigger">
      <NuxtLink :to="titleUrl" class="sf-menu-item__label nav-item">{{
        title
      }}</NuxtLink>
    </button>
    <ul slot="body">
      <li v-for="option in options" :key="option.url">
        <a :href="option.url" class="dropdown-option">{{ option.name }}</a>
      </li>
    </ul>
  </dropdown-menu>
</template>

<script>
import DropdownMenu from 'v-dropdown-menu';
import 'v-dropdown-menu/dist/v-dropdown-menu.css';
export default {
  components: {
    DropdownMenu
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
<style lang="scss" scoped>
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
  padding: var(--component-select-option-padding, var(--spacer-sm));
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
</style>
