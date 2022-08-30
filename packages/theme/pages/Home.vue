<template>
  <div id="home">
    <LazyHydrate when-visible>
      <div class="frontPageAnimation">
        <!-- <app-slider :slides="sliders" /> -->
      </div>
    </LazyHydrate>

    <div class="sf-heading">
      <h2 class="sf-heading__title h2">WELCOME TO COOKE FURNITURE</h2>
      <div class="sf-heading__description">
        We specialize in the creation of stunning designer custom outdoor fire
        pit tables by using the finest quality stainless steel, acid washed
        copper and magnificent granite and marble from all over the world. The
        product line is constantly growing and changing as new pieces are
        designed. All stainless steel outdoor furniture products and fire pits
        are guaranteed to have life long structural integrity in any condition.
        Every piece is engineered to endure and manufactured in California.
      </div>
    </div>

    <LazyHydrate when-visible>
      <SfHero class="hero">
        <SfHeroItem
          v-for="(hero, i) in heroes"
          :key="i"
          :background="hero.background"
          :image="hero.image"
          :class="hero.className"
          :buttonText="hero.buttonText"
          :link="hero.link"
        >
          <template #title>
            <NuxtLink :to="hero.link">
              <h2 class="sf-heading__title h2 hero-title">
                {{ hero.title }}
              </h2>
            </NuxtLink>
          </template>
          <template #subtitle>
            <div class="hero-text sf-heading__description">
              {{ hero.subtitle }}
            </div>
          </template>
        </SfHeroItem>
      </SfHero>
    </LazyHydrate>

    <div class="sf-heading">
      <h3 class="sf-heading__title h3">Perfectly designed and constructed</h3>
      <div class="sf-heading__description">
        Our product line continually expands to include new options for our
        customers. Whether you are searching for a contemporary outdoor fire pit
        or stainless steel outdoor furniture products, you can enjoy durable and
        exceptionally constructed products that are built to last. Each piece
        has been engineered and manufactured in California, adhering to the
        highest quality standards. Our fire pits have been perfectly designed
        and constructed with superior workmanship and attention to detail.
      </div>
    </div>

    <LazyHydrate when-visible>
      <SfBannerGrid :banner-grid="2" class="banner-grid">
        <template v-for="item in banners" v-slot:[item.slot]>
          <SfBanner
            :key="item.slot"
            :link="localePath(item.link)"
            :image="item.image"
            :class="item.class"
          />
        </template>
      </SfBannerGrid>
    </LazyHydrate>
  </div>
</template>
<script>
import {
  SfHero,
  SfBanner,
  SfSection,
  SfImage,
  SfBannerGrid,
  SfHeading,
  SfArrow,
  SfButton,
  SfIcon,
  SfLoader
} from '@storefront-ui/vue';
import LazyHydrate from 'vue-lazy-hydration';
import cacheControl from './../helpers/cacheControl';
import { addBasePath } from '@vue-storefront/core';
import AppSlider from '../components/AppSlider.vue';

export default {
  name: 'Home',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  components: {
    SfHero,
    SfBanner,
    SfSection,
    SfImage,
    SfBannerGrid,
    SfHeading,
    SfArrow,
    SfButton,
    LazyHydrate,
    SfIcon,
    AppSlider,
    SfLoader
  },
  setup() {
    const heroes = [
      {
        title: 'Cooke Collection',
        subtitle:
          'Our COOKE Collection is tailored to design professionals including architects and interior designers since the collection allows for full customization.',
        background: '#eceff1',
        image: addBasePath('/homepage/Cooke-Collection-Banner.jpg'),
        buttonText: 'Learn More',
        link: '/'
      },
      {
        title: 'SoCal Collection',
        subtitle:
          'Our SoCal Collection is produced in quantity and is made from sturdy aluminum to offer high value American products.',
        background: '#efebe9',
        image: addBasePath('/homepage/SoCal-Collection-Banner.jpg'),
        className:
          'sf-hero-item--position-bg-top-left sf-hero-item--align-right',
        buttonText: 'Learn More',
        link: '/'
      },
      {
        title: 'Shop Parts',
        subtitle:
          'Here we are going to need some text for the rest of the store.',
        background: '#1f2937',
        image: addBasePath(''),
        buttonText: 'Shop Now',
        link: '/category'
      }
    ];
    const banners = [
      {
        slot: 'banner-A',
        image: addBasePath('/homepage/gallery-6.jpg'),
        class: 'sf-banner--slim desktop-only',
        link: ''
      },
      {
        slot: 'banner-C',
        image: addBasePath('/homepage/gallery-2.jpg'),
        class: 'sf-banner--slim banner-central desktop-only',
        link: ''
      },
      {
        slot: 'banner-B',
        image: addBasePath('/homepage/gallery-4.jpg'),
        class: 'sf-banner--slim banner-central',
        link: ''
      },
      {
        slot: 'banner-D',
        image: addBasePath('/homepage/gallery-3.jpg'),
        class: '',
        link: ''
      }
    ];
    const sliders = [
      {
        image: addBasePath('slideshow/2.jpg'),
        imageAnimation: 'kenburns-bottom-right',
        title: 'Contemporary Fire Pits',
        subtitle: 'Constructed from large format stone.',
        captionData: 'left'
      },
      {
        image: 'slideshow/1.jpg',
        imageAnimation: 'kenburns-top',
        title: 'Premium WindScreens',
        subtitle: 'For residential and commercial use.',
        captionData: 'bottom left'
      },

      {
        image: 'slideshow/3.jpg',
        imageAnimation: 'kenburns-bottom-left',
        title: 'Premium Surfaces',
        subtitle: 'Dekton, Neolith, Granite, Marble and Quartize table tops.',
        captionData: 'bottom left'
      },

      {
        image: 'slideshow/4.jpg',
        imageAnimation: 'kenburns-right',
        title: 'Withstand Oceanside Elements',
        subtitle: 'Made from the highest quality materials.',
        captionData: 'bottom right'
      },

      {
        image: 'slideshow/5.jpg',
        imageAnimation: 'kenburns-bottom-right',
        title: 'Automated Fire Pits',
        subtitle: 'Built for commercial and residential applications.',
        captionData: 'left'
      },

      {
        image: 'slideshow/6.jpg',
        imageAnimation: 'kenburns-bottom',
        title: 'Custom Fire Features',
        subtitle: 'The Cooke DESIGN process is easy, fun and free.',
        captionData: 'bottom left'
      },

      {
        image: 'slideshow/7.png',
        imageAnimation: 'kenburns-bottom',
        title: 'The Perfect Match',
        subtitle: 'Be Bold. Your Colors. Your Look.',
        captionData: 'center'
      }
    ];

    return {
      addBasePath,
      banners,
      heroes,
      sliders
    };
  }
};
</script>

<style lang="scss" scoped>
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.frontPageAnimation {
  position: relative;
  margin-bottom: 3rem;
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        ::v-deep .sf-hero-item__subtitle,
        ::v-deep .sf-hero-item__title {
          text-align: right;
          width: 100%;
          padding-left: var(--spacer-sm);
        }
      }
    }
  }
  ::v-deep .sf-arrow {
    --icon-color: white;
  }
}

.hero-title {
  color: var(--c-light);
  font-size: 2.5rem;
  font-weight: 400;
  padding-bottom: 0.75rem;
}

.hero-text {
  color: var(--c-light);
  font-size: 1.25rem;
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
      text-decoration: none;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }
  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}
</style>
