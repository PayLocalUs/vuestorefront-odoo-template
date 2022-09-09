<template>
  <div>
    <SfBanner
      title="COOKE Collection"
      description="Better By Design — Made in the USA"
      image="/homepage/Cooke-Collection-Banner.jpg"
      class="banner"
    />

    <SfSection
      titleHeading="COOKE Collection"
      :levelHeading="1"
      class="section"
    >
      <div>
        At Cooke Furniture, we specialize in adding Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Veniam quasi magnam velit ipsam aliquam
        sit minus ratione. Modi, sapiente mollitia recusandae officiis placeat
        veniam. Iusto officia consequatur, ut. Aliquam, voluptates.
      </div>
    </SfSection>

    <div class="banner-wrapper" v-for="(item, i) in bannerItems" :key="i">
      <SfBanner
        subtitle=" lorem ipsum dolor"
        description="This could also theoretically all be dynamic, if we had the data for it."
        buttonText="Shop Now"
        :link="localePath(`/c/${item.slug}/${item.id}`)"
        background="#52798d"
        :class="{ 'sf-banner--right': i % 2 != 0 }"
      >
        <template #title>
          <NuxtLink :to="localePath(`/c/${item.slug}/${item.id}`)">
            <h2 class="sf-banner__title h2 hero-title">
              {{ item.name }}
            </h2>
          </NuxtLink>
        </template>
      </SfBanner>
    </div>
  </div>
</template>

<script>
import { useFacet, useCategory } from '@vue-storefront/odoo';
import { computed, onMounted } from '@nuxtjs/composition-api';
import { SfSection, SfBanner } from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'Collection',
  components: {
    SfSection,
    SfBanner
  },
  setup() {
    const { result } = useFacet();
    const { categories: topCategories, search: searchTopCategoryApi } =
      useCategory('AppHeader:TopCategories');

    const bannerItems = computed(() => topCategories.value[0].childs);

    const banners = [{ name: 'test' }];

    onSSR(async () => {
      await Promise.all([
        searchTopCategoryApi({
          filter: { parent: true }
        })
      ]);
    });

    onMounted(() => {
      // console.log(bannerItems);
    });

    return {
      result,
      banners,
      bannerItems
    };
  }
};
</script>

<style lang="scss" scoped>
.banner-wrapper {
  margin-bottom: 2rem;
}
.sf-banner {
  &__subtitle {
    color: white;
  }
}
</style>
