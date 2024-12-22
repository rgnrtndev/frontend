<template>
  <div class="relative w-full overflow-hidden">
    <!-- Loading dan Error Handling -->
    <!-- <div v-if="loading" class="flex items-center justify-center h-screen">
      <p>Loading...</p>
    </div> -->
    <div v-if="error" class="flex items-center justify-center h-screen text-red-500">
      <p>{{ error }}</p>
    </div>

    <!-- Carousel -->
    <div v-else class="carousel flex transition-transform duration-500 ease-in-out" :style="carouselStyle" ref="carouselRef">
      <div v-for="slide in allSlides" :key="slide.id"
        :style="{ backgroundImage: `url(${slide.imageBase64})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        class="flex-none w-full flex flex-col items-center justify-center h-screen p-6">
        <h1 class="text-4xl font-bold text-white mb-4">{{ slide.title }}</h1>
        <p class="text-gray-200 text-center text-lg">{{ slide.description }}</p>
      </div>
    </div>

    <!-- Tombol Navigasi -->
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

<script lang="ts" setup>
import { useSliders } from '@/composables/useSliders';

// Ambil data dan metode dari useCarousel
const {
  // loading,
  error,
  allSlides,
  carouselStyle,
  carouselRef,
  prevSlide,
  nextSlide,
} = useSliders();
</script>

<style scoped>
.carousel {
  scroll-behavior: smooth;
}
</style>
