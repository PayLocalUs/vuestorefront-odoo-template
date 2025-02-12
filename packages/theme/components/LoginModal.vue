<template>
  <SfModal :visible="isLoginModalOpen" class="modal" @close="toggleLoginModal">
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar smartphone-only"
        :close="true"
        :title="isLogin ? 'Log in' : 'Sign in'"
        @click:close="toggleLoginModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div v-if="isLogin">
        <p class="reset-pass-text" v-show="isForgottenPassword">
          {{
            $t(
              'Enter your email to receive instructions on how to reset your password'
            )
          }}
        </p>
        <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
          <form
            class="form"
            @submit.prevent="
              handleSubmit(
                isForgottenPassword ? handlePasswordRecovery : handleLogin
              )
            "
          >
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <SfInput
                data-cy="login-input_email"
                v-model="form.email"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="email"
                label="Your email"
                class="form__element"
              />
            </ValidationProvider>
            <template v-if="!isForgottenPassword">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <SfInput
                  data-cy="login-input_password"
                  v-model="form.password"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="password"
                  label="Password"
                  type="password"
                  class="form__element"
                />
              </ValidationProvider>
              <SfCheckbox
                data-cy="login-checkbox-remember-me"
                v-model="rememberMe"
                name="remember-me"
                label="Remember me"
                class="form__element checkbox"
              />
            </template>

            <SfButton
              data-cy="login-btn_submit"
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="loading"
            >
              <SfLoader :class="{ loader: loading }" :loading="loading">
                <div>
                  {{ isForgottenPassword ? $t('Reset password') : $t('Login') }}
                </div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
        <div class="action">
          <SfButton
            data-cy="login-btn_forgot-password"
            class="sf-button--text"
            @click="isForgottenPassword = !isForgottenPassword"
          >
            {{ isForgottenPassword ? $t('Login?') : $t('Forgotten password?') }}
          </SfButton>
        </div>
        <div class="bottom">
          <p class="bottom__paragraph">{{ $t('No account') }}</p>
          <SfButton
            data-cy="login-btn_sign-up"
            class="sf-button--text"
            @click="displayChoosedTrue(() => (isCreateAccount = true))"
          >
            {{ $t('Register today') }}
          </SfButton>
        </div>
      </div>
      <div v-else class="form">
        <ValidationObserver v-slot="{ handleSubmit }" key="sign-up">
          <form
            class="form"
            @submit.prevent="handleSubmit(handleRegister)"
            autocomplete="off"
          >
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <SfInput
                data-cy="login-input_email"
                v-model="form.email"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="email"
                label="Your email"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                data-cy="login-input_name"
                v-model="form.name"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="name"
                label="Name"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                data-cy="login-input_password"
                v-model="form.password"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="password"
                label="Password"
                type="password"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider
              :rules="{ required: { allowFalse: false } }"
              v-slot="{ errors }"
            >
              <SfCheckbox
                v-model="createAccount"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="create-account"
                label="I want to create an account"
                class="form__element"
              />
            </ValidationProvider>

            <SfButton
              data-cy="login-btn_submit"
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="loading"
            >
              <SfLoader :class="{ loader: loading }" :loading="loading">
                <div>{{ $t('Create an account') }}</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
        <div class="action">
          {{ $t('or') }}
          <SfButton
            data-cy="login-btn_login-into-account"
            class="sf-button--text"
            @click="displayChoosedTrue(() => (isLogin = true))"
          >
            {{ $t('login in to your account') }}
          </SfButton>
        </div>
      </div>
    </transition>
  </SfModal>
</template>
<script>
import { ref, watch } from '@nuxtjs/composition-api';
import { useUiNotification } from '~/composables';

import {
  SfModal,
  SfInput,
  SfButton,
  SfCheckbox,
  SfLoader,
  SfAlert,
  SfBar
} from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { useUser, usePassword } from '@vue-storefront/odoo';
import { useUiState } from '~/composables';

extend('email', {
  ...email,
  message: 'Invalid email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  name: 'LoginModal',
  components: {
    SfModal,
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
    SfAlert,
    ValidationProvider,
    ValidationObserver,
    SfBar
  },
  setup() {
    const { isLoginModalOpen, toggleLoginModal } = useUiState();
    const { send } = useUiNotification();
    const form = ref({});

    const isLogin = ref(false);
    const isForgottenPassword = ref(false);
    const isCreateAccount = ref(true);

    const createAccount = ref(false);
    const rememberMe = ref(false);
    const { register, login, loading, error, user } = useUser();
    const {
      sendResetPassword,
      errors: errorPassword,
      resetPasswordErrors
    } = usePassword();

    watch(isLoginModalOpen, () => {
      if (isLoginModalOpen) {
        form.value = {};
        resetPasswordErrors();
      }
    });

    const handleForm = (fn, params, customQuery) => async () => {
      await fn({ user: params, customQuery });

      if (error.value.login) {
        send({ message: error?.value?.login?.message, type: 'danger' });
        return;
      }
      if (error.value.register) {
        send({ message: error?.value?.register?.message, type: 'danger' });
        return;
      }
      if (isForgottenPassword.value) {
        send({
          message: `Thanks! If there is an account registered with the ${form.value.email} email, you will find message with a password reset link in your inbox. If the message is not arriving in your inbox, try another email address you might’ve used to register.`,
          type: 'info'
        });
      }

      if (user.value !== null) {
        toggleLoginModal();
      }
    };

    const displayChoosedTrue = async (fn) => {
      isLogin.value = false;
      isForgottenPassword.value = false;
      isCreateAccount.value = false;
      fn();
    };

    const showIsForgottenPassword = () => {
      isForgottenPassword.value = true;
      isLogin.value = true;
    };

    const handleRegister = async () => handleForm(register, form.value)();

    const handleLogin = async () =>
      handleForm(login, {
        username: form.value.email,
        password: form.value.password
      })();

    const handlePasswordRecovery = async () =>
      handleForm(sendResetPassword, {
        email: form.value.email
      })();

    return {
      form,
      loading,
      errorPassword,
      isLogin,
      error,
      handlePasswordRecovery,
      createAccount,
      isForgottenPassword,
      rememberMe,
      isLoginModalOpen,
      toggleLoginModal,
      handleLogin,
      handleRegister,
      displayChoosedTrue,
      isCreateAccount,
      showIsForgottenPassword
    };
  }
};
</script>

<style lang="scss" scoped>
.reset-pass-text {
  margin-bottom: var(--spacer-xl);
}

.form {
  margin-top: var(--spacer-sm);
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
  }
}
.action {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6
    var(--font-family--secondary);
  & > * {
    margin: 0 0 0 var(--spacer-xs);
  }
}
.action {
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
}
.checkbox {
  margin-bottom: var(--spacer-2xl);
}
.bottom {
  text-align: center;
  margin-bottom: var(--spacer-lg);
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight--semibold);
  font-family: var(--font-family--secondary);
  &__paragraph {
    color: var(--c-primary);
    margin: 0 0 var(--spacer-base) 0;
    @include for-desktop {
      margin: 0;
    }
  }
}
</style>
