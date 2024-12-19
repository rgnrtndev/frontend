<template>
  <div class="relative w-full overflow-hidden">
    <!-- Carousel Container -->
    <div class="carousel flex transition-transform duration-500 ease-in-out" :style="carouselStyle" ref="carouselRef">
      <div v-for="(slide, index) in allSlides" :key="index"
        :class="['flex-none w-full flex flex-col items-center justify-center h-screen p-6', slide.bg]">
        <h1 class="text-4xl font-bold text-black mb-4">{{ slide.title }}</h1>
        <p class="text-gray-500 text-center text-lg">{{ slide.description }}</p>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <button
      class="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-white rounded-full shadow-lg p-4 opacity-30 hover:opacity-100 hover:bg-gray-700 focus:outline-none transition-opacity"
      @click="prevSlide">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      class="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-white rounded-full shadow-lg p-4 opacity-30 hover:opacity-100 hover:bg-gray-700 focus:outline-none transition-opacity"
      @click="nextSlide">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';

export default defineComponent({
  name: 'AppCarousel',

  setup() {
    const slidesData = [
      { title: 'Selamat Datang di Situs Kami', description: 'Temukan konten dan fitur menarik di sini.', bg: 'bg-white' },
      { title: 'Jelajahi Kemungkinan Baru', description: 'Semua yang Anda butuhkan di satu tempat.', bg: 'bg-gray-white' },
      { title: 'Bergabunglah Dengan Kami Hari Ini', description: 'Jadilah bagian dari komunitas kami yang berkembang.', bg: 'bg-gray-white' },
    ];


    const currentIndex = ref(0);
    const carouselRef = ref<HTMLDivElement | null>(null);

    const allSlides = computed(() => {
      const firstClone = slidesData[0];
      const lastClone = slidesData[slidesData.length - 1];
      return [lastClone, ...slidesData, firstClone];
    });

    const carouselStyle = computed(() => {
      return {
        transform: `translateX(-${(currentIndex.value + 1) * 100}%)`,
      };
    });

    const updateCarousel = () => {
      const carousel = carouselRef.value;
      if (carousel) {
        carousel.style.transition = 'transform 0.5s ease-in-out';
      }
    };

    const prevSlide = () => {
      currentIndex.value--;
      updateCarousel();

      if (currentIndex.value < 0) {
        setTimeout(() => {
          const carousel = carouselRef.value;
          if (carousel) {
            carousel.style.transition = 'none';
          }
          currentIndex.value = slidesData.length - 1;
        }, 500);
      }
    };

    const nextSlide = () => {
      currentIndex.value++;
      updateCarousel();

      if (currentIndex.value >= slidesData.length) {
        setTimeout(() => {
          const carousel = carouselRef.value;
          if (carousel) {
            carousel.style.transition = 'none';
          }
          currentIndex.value = 0;
        }, 500);
      }
    };

    onMounted(() => {
      const carousel = carouselRef.value;
      if (carousel) {
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(-100%)`;
      }

      // Auto-slide every 5 seconds
      setInterval(() => {
        nextSlide();
      }, 5000);
    });

    return {
      allSlides,
      carouselRef,
      carouselStyle,
      prevSlide,
      nextSlide,
    };
  },
});
</script>

<style scoped>
.carousel {
  scroll-behavior: smooth;
}
</style>
