<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

// Definisi tipe data untuk slider
interface Slider {
  id: number;
  title: string;
  description: string;
  imageBase64: string;
}

// State untuk data, loading, dan error
const sliders = ref<Slider[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const currentIndex = ref(0);
const carouselRef = ref<HTMLDivElement | null>(null);

// Fetch data slider dari API
const fetchSliders = async (): Promise<void> => {
  try {
    const response = await fetch('http://localhost:8081/rcc/api/v1/slider/list');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: {
      code: string;
      messageIdn: string;
      messageEng: string;
      result: Slider[];
    } = await response.json();

    if (data.code === '00') {
      sliders.value = data.result; // Mengambil bagian "result"
    } else {
      throw new Error(data.messageEng || 'Gagal');
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = 'An unknown error occurred';
    }
  } finally {
    loading.value = false;
  }
};

// Hitung semua slide termasuk clone
const allSlides = computed(() => {
  if (sliders.value.length === 0) return [];
  const firstClone = sliders.value[0];
  const lastClone = sliders.value[sliders.value.length - 1];
  return [lastClone, ...sliders.value, firstClone];
});

// Style carousel
const carouselStyle = computed(() => {
  return {
    transform: `translateX(-${(currentIndex.value + 1) * 100}%)`,
  };
});

// Update transisi carousel
const updateCarousel = () => {
  const carousel = carouselRef.value;
  if (carousel) {
    carousel.style.transition = 'transform 0.5s ease-in-out';
  }
};

// Fungsi untuk slide sebelumnya
const prevSlide = () => {
  currentIndex.value--;
  updateCarousel();

  if (currentIndex.value < 0) {
    setTimeout(() => {
      const carousel = carouselRef.value;
      if (carousel) {
        carousel.style.transition = 'none';
      }
      currentIndex.value = sliders.value.length - 1;
    }, 500);
  }
};

// Fungsi untuk slide berikutnya
const nextSlide = () => {
  currentIndex.value++;
  updateCarousel();

  if (currentIndex.value >= sliders.value.length) {
    setTimeout(() => {
      const carousel = carouselRef.value;
      if (carousel) {
        carousel.style.transition = 'none';
      }
      currentIndex.value = 0;
    }, 500);
  }
};

// Lifecycle onMounted
onMounted(() => {
  fetchSliders();
  setInterval(() => {
    nextSlide();
  }, 5000); // Auto-slide setiap 5 detik
});
</script>

<template>
  <div class="relative w-full overflow-hidden">
    <!-- Loading and Error Handling -->
    <div v-if="loading" class="flex items-center justify-center h-screen">
      <p>Loading...</p>
    </div>
    <div v-if="error" class="flex items-center justify-center h-screen text-red-500">
      <p>{{ error }}</p>
    </div>

    <!-- Carousel Container -->
    <div v-else class="carousel flex transition-transform duration-500 ease-in-out" :style="carouselStyle" ref="carouselRef">
      <div v-for="(slide, index) in allSlides" :key="index"
        :style="{ backgroundImage: `url(${slide.imageBase64})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        class="flex-none w-full flex flex-col items-center justify-center h-screen p-6">
        <h1 class="text-4xl font-bold text-white mb-4">{{ slide.title }}</h1>
        <p class="text-gray-200 text-center text-lg">{{ slide.description }}</p>
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

<style scoped>
.carousel {
  scroll-behavior: smooth;
}
</style>
