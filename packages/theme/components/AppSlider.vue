<template>
  <div class="AppSlider">
    <transition-group
      :duration="1000"
      style="height: 90vh; width: 100%"
      tag="div"
      enter-active-class="AppSlider__enterActive"
      enter-class="AppSlider__enter"
      leave-active-class="AppSlider__leaveActive"
      leave-to-class="AppSlider__leaveTo"
      class="AppSlider__slides"
    >
      <figure
        v-for="(slide, index) in slides"
        v-show="activeIndex === index"
        :key="slide.image"
        alt=""
      >
        <img
          :src="slide.image"
          class="AppSlider__image"
          :style="{ 'animation-name': slide.imageAnimation }"
        />
        <figcaption
          class="AppSlider__caption"
          :data-caption="slide.captionData"
        >
          <div class="cap__container">
            <h1 class="c-mm__cap__h1">{{ slide.title }}</h1>
            <h3 class="c-mm__cap__h3">
              {{ slide.subtitle }}
            </h3>
          </div>
        </figcaption>
      </figure>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'AppSlider',
  props: {
    slides: {
      default: () => [{}],
      type: Array
    },
    interval: {
      default: 10000,
      type: Number
    }
  },
  data() {
    return {
      activeIndex: 0,
      paused: false,
      time: this.interval
    };
  },
  created() {
    this.startInterval();
  },
  methods: {
    goToIndex(index) {
      this.activeIndex = index;
      this.time = this.interval;
    },
    next() {
      let nextIndex = this.activeIndex + 1;

      // Go to the first image if the active
      // image ist the last one.
      if (!this.slides[nextIndex]) {
        nextIndex = 0;
      }

      this.goToIndex(nextIndex);
    },
    prev() {
      let nextIndex = this.activeIndex - 1;

      // Go to the last image if the active
      // image is the first one.
      if (!this.images[nextIndex]) {
        nextIndex = this.images.length - 1;
      }

      this.goToIndex(nextIndex);
    },
    startInterval() {
      const precision = 100;
      const clock = setInterval(() => {
        if (!this.paused) this.time -= precision;
        if (this.time <= 0) this.next();
      }, precision);

      // Clear the interval if the component
      // is destroyed to prevent memory leaks.
      this.$once('hook:destroyed', () => clearInterval(clock));
    }
  }
};
</script>

<style lang="scss">
figcaption {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 55vh;
}

.AppSlider {
  &__slides {
    position: relative;
    overflow: hidden;
  }

  &__image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation-duration: 8s;
    animation-fill-mode: forwards;
  }

  &__caption {
    color: rgba(255, 255, 255, 0.9);
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.1);
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    z-index: 1;
  }

  &__enterActive,
  &__leaveActive {
    transition: opacity 1s;
  }

  &__enter,
  &__leaveTo {
    opacity: 0;
  }

  .cap__container {
    overflow: hidden;
  }

  @media screen and (min-width: 600px) {
    [data-caption] {
      text-align: start;
    }
    [data-caption*='bottom'] {
      justify-content: end;
    }
    [data-caption*='right'] {
      align-items: flex-end;
    }
    [data-caption*='left'] {
      align-items: flex-start;
    }
    [data-caption*='top'] {
      justify-content: start;
    }
    [data-caption*='center'] {
      justify-content: center;
      align-items: center;
    }
  }

  .c-mm__cap__h1 {
    opacity: 0;
    margin-block: 0;
    font-weight: 600;
    animation: titleAnimationFade 10s;
  }

  .c-mm__cap__h3 {
    opacity: 0;
    margin-block: 0;
    font-weight: 400;
    animation: textAnimationFade 10s;
  }

  @keyframes kenburns-top {
    0% {
      transform: scale(1) translateY(0);
      transform-origin: 50% 16%;
    }
    100% {
      transform: scale(1.1) translateY(-3px);
      transform-origin: top;
    }
  }
  @keyframes kenburns-top-right {
    0% {
      transform: scale(1) translate(0, 0);
      transform-origin: 84% 16%;
    }
    100% {
      transform: scale(1.1) translate(3px, -1px);
      transform-origin: right top;
    }
  }
  @keyframes kenburns-right {
    0% {
      transform: scale(1) translate(0, 0);
      transform-origin: 84% 50%;
    }
    100% {
      transform: scale(1.1) translateX(3px);
      transform-origin: right;
    }
  }
  @keyframes kenburns-bottom-right {
    0% {
      transform: scale(1) translate(0, 0);
      transform-origin: 84% 84%;
    }
    100% {
      transform: scale(1.1) translate(3px, 1px);
      transform-origin: right bottom;
    }
  }
  @keyframes kenburns-bottom {
    0% {
      transform: scale(1) translateY(0);
      transform-origin: 50% 84%;
    }
    100% {
      transform: scale(1.1) translateY(3px);
      transform-origin: bottom;
    }
  }
  @keyframes kenburns-bottom-left {
    0% {
      transform: scale(1) translate(0, 0);
      transform-origin: 16% 84%;
    }
    100% {
      transform: scale(1.1) translate(-5px, 1px);
      transform-origin: left bottom;
    }
  }
  @keyframes kenburns-left {
    0% {
      transform: scale(1) translate(0, 0);
      transform-origin: 16% 50%;
    }
    100% {
      transform: scale(1.15) translate(-3px, 1px);
      transform-origin: left;
    }
  }
  @keyframes kenburns-top-left {
    0% {
      transform: scale(1) translate(0, 0);
      transform-origin: 16% 16%;
    }
    100% {
      transform: scale(1.1) translate(-3px, -1px);
      transform-origin: top left;
    }
  }

  @keyframes titleAnimationFade {
    15% {
      opacity: 0;
      transform: scale3d(0.9, 0.9, 0.9);
    }
    20% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
    80% {
      opacity: 1;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes textAnimationFade {
    16% {
      opacity: 0;
      transform: translate3d(0, 200%, 0);
    }
    26% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    90% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes kenburns {
    100% {
      transform: scale3d(1.25, 1.25, 1.25) translate3d(-10%, -5%, 0);
    }
  }
}
</style>
