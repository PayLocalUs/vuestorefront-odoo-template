<template>
  <SfTopBar
    class="topbar"
    :class="{ 'add-padding': isMegaMenu === false }"
    v-on:topbarAccount="$emit('topbarAccount')"
  >
    <template #left>
      <div class="spacer">
        <div style="display: flex; justify-content: space-between; width: 8rem">
          <SfLink
            v-for="item in social"
            :key="item.url"
            :link="item.url"
            target="_blank"
          >
            <SfImage
              :src="addBasePath('/icons/' + item.name + '.svg')"
              :alt="item.name"
              :width="16"
              :height="16"
            />
          </SfLink>
        </div>
      </div>
    </template>

    <template #center v-if="isMegaMenu === false">
      <nuxt-link :to="localePath('/')" class="">
        <SfImage
          src="/CookeFurniture.png"
          alt="Cooke Furniture"
          :width="null"
          :height="null"
          style="padding-right: 4rem"
        />
      </nuxt-link>
    </template>

    <template #right>
      <SfButton
        class="sf-button--text topbar__button"
        v-if="isMegaMenu === true"
      >
        <NuxtLink to="/about">About</NuxtLink>
      </SfButton>
      <SfButton class="sf-button--text topbar__button">Contact</SfButton>
      <SfButton
        class="sf-button--text topbar__button"
        v-if="isMegaMenu === true"
        @click="$emit('topbarAccount')"
        >Sign In or Join</SfButton
      >
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar, SfImage, SfLink } from '@storefront-ui/vue';
import { addBasePath } from '@vue-storefront/core';

export default {
  components: {
    SfTopBar,
    SfButton,
    SfImage,
    SfLink
  },
  props: {
    isMegaMenu: Boolean
  },
  emits: ['topbarAccount'],
  setup() {
    return {
      addBasePath
    };
  },
  data() {
    return {
      social: [
        {
          name: 'facebook',
          url: 'https://www.facebook.com/firepittables'
        },
        {
          name: 'instagram',
          url: 'https://instagram.com/cookefurniture/'
        },
        {
          name: 'linkedin-in',
          url: 'https://www.linkedin.com/company/cooke-furniture'
        },
        {
          name: 'twitter',
          url: 'https://twitter.com/CookeFurniture'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  z-index: 1;
  background-color: var(--c-white);
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}
.add-padding {
  padding-top: var(--spacer-base);
  padding-bottom: var(--spacer-sm);
}
.spacer {
  margin-left: var(--spacer-sm);
}
</style>
