<template>
  <SfFooter :column="2" multiple class="footer" :open="['About']">
    <SfFooterColumn class="desktop-only">
      <nuxt-link :to="localePath('/')" class="">
        <SfImage src="/footer-logo.png" alt="Cooke Furniture" />
      </nuxt-link>
    </SfFooterColumn>
    <SfFooterColumn class="desktop-only" title="Subscribe to our newsletter">
      <template>
        <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
          <form
            @submit.prevent="handleSubmit(onSubscribe)"
            style="display: flex; height: 46px"
          >
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <SfInput
                class="sf-input--outline"
                type="text"
                :valid="!errors[0]"
                v-model="emailAddress"
                :errorMessage="errors[0]"
                placeholder="Type your email address"
                style="
                  width: 242px;
                  max-height: 46px;
                  font-size: 16px;
                  color: #43464e;
                  background-color: #f1f2f3;
                  --input-border-color: #f1f2f3;
                "
              />
            </ValidationProvider>
            <SfButton style="width: 116px" type="submit" :disabled="loading"
              >Subscribe</SfButton
            >
          </form>
        </ValidationObserver>
      </template>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('About')">
      <SfList>
        <SfListItem v-for="item in aboutUs" :key="item.url">
          <SfMenuItem :label="$t(item.name)" :link="item.url" />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn title="Social" class="desktop-only">
      <div class="footer__socials">
        <SfLink
          v-for="item in social"
          :key="item.url"
          class="sf-circle-icon color-light sf-button"
          style="margin-right: 1.25rem"
          :aria-disabled="false"
          :link="item.url"
          aria-label="button-icon"
        >
          <span style="margin-top: 0.2rem"
            ><SfImage
              :src="addBasePath('/icons/' + item.name + '.svg')"
              :alt="item.name"
              :width="24"
              :height="24"
          /></span>
        </SfLink>
      </div>
    </SfFooterColumn>
    <div class="footer-text" style="padding-right: 2rem">
      David Cooke Industries LLC - 80 Running Iron Road Bishop, CA 93514 |
      Phone: (888) 303-2453 |
    </div>
    <div class="footer-text">
      © 2022 COOKE FURNITURE - All Rights Reserved | Terms and Conditions |
      Policies
    </div>
    <div class="sf-footer-column smartphone-only">
      <div
        style="
          display: flex;
          flex-direction: column;
          jusify-content: space-around;
          align-items: center;
          width: 100%;
        "
      >
        <div
          class="sf-footer-column__title"
          style="align-self: flex-start; width: auto"
        >
          Social
        </div>
        <div
          style="
            display: flex;
            justify-content: space-around;
            width: 100%;
            margin-bottom: 32px;
          "
        >
          <SfLink
            v-for="item in social"
            :key="item.url"
            class="sf-circle-icon color-light sf-button"
            style="margin-right: 1.25rem"
            :aria-disabled="false"
            :link="item.url"
            aria-label="button-icon"
          >
            <span style="margin-top: 0.2rem"
              ><SfImage
                :src="addBasePath('/icons/' + item.name + '.svg')"
                :alt="item.name"
                :width="24"
                :height="24"
            /></span>
          </SfLink>
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 38px;
          "
        >
          <template>
            <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
              <form
                @submit.prevent="handleSubmit(onSubscribe)"
                style="display: flex; height: 46px"
              >
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <SfInput
                    id="email-smartphone"
                    name="email-smartphone"
                    class="sf-input--outline"
                    type="text"
                    :valid="!errors[0]"
                    v-model="emailAddress"
                    :errorMessage="errors[0]"
                    placeholder="Type your email address"
                    style="
                      width: 242px;
                      min-height: auto;
                      height: 32px;
                      font-size: 16px;
                      color: #43464e;
                      background-color: #f1f2f3;
                      --input-border-color: #f1f2f3;
                    "
                  />
                </ValidationProvider>
                <SfButton
                  style="width: 116px; height: 32px"
                  type="submit"
                  :disabled="loading"
                  >Subscribe</SfButton
                >
              </form>
            </ValidationObserver>
          </template>
        </div>
        <SfLink link="#">
          <SfImage
            src="/footer-logo.png"
            alt="logo"
            class="sf-footer__bottom-logo"
            style="margin-bottom: 38px"
          />
        </SfLink>
      </div>
    </div>
  </SfFooter>
</template>

<script>
import {
  SfFooter,
  SfList,
  SfImage,
  SfMenuItem,
  SfInput,
  SfButton,
  SfLink
} from '@storefront-ui/vue';
import { ref } from '@nuxtjs/composition-api';
import { addBasePath } from '@vue-storefront/core';
import { useNewsLetter } from '@vue-storefront/odoo';
import LocaleSelector from '~/components/LocaleSelector';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { useUiNotification } from '~/composables';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    SfLink,
    SfFooter,
    LocaleSelector,
    SfList,
    SfImage,
    SfMenuItem,
    SfInput,
    SfButton
  },
  setup() {
    const { sendSubscription, loading } = useNewsLetter();
    const emailAddress = ref('');
    const { send } = useUiNotification();

    const onSubscribe = async (emailAddress) => {
      const data = await sendSubscription({ email: emailAddress });

      if (data?.subscribed) {
        send({
          message: 'Subscribe successfull!',
          type: 'success'
        });
      }
      if (!data?.subscribed) {
        send({
          message: 'Something wrong!',
          type: 'danger'
        });
      }
    };

    return {
      onSubscribe,
      emailAddress,
      sendSubscription,
      loading,
      addBasePath
    };
  },
  data() {
    return {
      aboutUs: [
        { name: 'About Cooke', url: '/about-us' },
        { name: 'Contact', url: '/contact' },
        { name: 'Sitemap', url: '/sitemap' }
      ],
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
      ],
      isMobile: false,
      desktopMin: 1024
    };
  }
};
</script>

<style lang="scss">
.footer {
  margin-bottom: 3.75rem;
  @include for-desktop {
    margin-bottom: 0;
  }
  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);
    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }
  &__social-image {
    margin: 0 var(--spacer-2xs) 0 0;
  }
}
.sf-footer {
  @include for-desktop {
    border-top: var(--spacer-xs) solid var(--c-primary);
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }
  &__container {
    margin: var(--spacer-sm);
    @include for-desktop {
      max-width: 69rem;
      margin: 0 auto;
    }
  }
}
.footer-text {
  color: var(--c-white);
  font-size: var(--font-size--xs);
  padding-bottom: 3.75rem;
}
</style>
