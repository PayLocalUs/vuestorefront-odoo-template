<template>
  <div class="AppSlider">
    <transition-group
      v-touch:swipe.right="next"
      v-touch:swipe.left="prev"
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
        v-for="(image, index) in images"
        v-show="activeIndex === index"
        :key="image"
        alt=""
      >
        <img :src="image" class="AppSlider__image" />
        <!--         <figcaption>Todo: Figure out how to display</figcaption> -->
      </figure>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'AppSlider',
  props: {
    images: {
      default: () => [],
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
      if (!this.images[nextIndex]) {
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
    animation: kenburns 8s;
    animation-fill-mode: forwards;
  }

  &__enterActive,
  &__leaveActive {
    transition: opacity 1s;
  }

  &__enter,
  &__leaveTo {
    opacity: 0;
  }

  &__controls {
    display: flex;
    justify-content: space-between;
  }

  // 1. Reset native button styles.
  &__control {
    padding: 0; // 1
    border: none; // 1
    background-color: transparent; // 1
    font-size: 1.25em;
  }

  @keyframes kenburns {
    100% {
      transform: scale3d(1.25, 1.25, 1.25) translate3d(-10%, -5%, 0);
    }
  }
}
</style>
