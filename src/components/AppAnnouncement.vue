<script lang="ts" setup>
import { ref, onMounted } from 'vue';

interface Card {
  title: string;
  description: string;
  imageBase64: string;
}

// State untuk data kartu dan elemen DOM
const cards = ref<Card[]>([]);
const cardsContainer = ref<HTMLElement | null>(null);
const infoSection = ref<HTMLElement | null>(null);
const title = ref<HTMLElement | null>(null);
const description = ref<HTMLElement | null>(null);
const viewportHeight = ref(window.innerHeight);

// Ambil data dari API
const fetchCards = async () => {
  try {
    const response = await fetch('http://localhost:8081/rcc/api/v1/announcement/list');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // const data = await response.json();

    const data: {
      code: string;
      messageIdn: string;
      messageEng: string;
      result: Card[];
    } = await response.json();
    if (data.code === '00') {
      cards.value = data.result.map((item) => ({
        title: item.title,
        description: item.description.length > 50
          ? item.description.substring(0, 50) + '...'
          : item.description,
        imageBase64: item.imageBase64 || 'https://via.placeholder.com/1280x720',
      }));
    } else {
      console.error('Failed to fetch data:', data.messageEng);
    }
  } catch (error) {
    console.error('Error fetching cards:', error);
  }
};

// Animasi scroll untuk kartu
const animateCards = () => {
  const cardsElements = cardsContainer.value?.querySelectorAll('.card');
  if (cardsElements) {
    cardsElements.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.top <= viewportHeight.value * 0.9 && rect.bottom >= viewportHeight.value * 0.1) {
        card.classList.add('slide-in');
        card.classList.remove('slide-out');
      } else {
        card.classList.add('slide-out');
        card.classList.remove('slide-in');
      }
    });
  }
};

// Event scroll
const onScroll = () => {
  animateCards();
};

// Lifecycle hooks
onMounted(() => {
  fetchCards();
  window.addEventListener('scroll', onScroll);

  // Intersection Observer untuk animasi teks
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        title.value?.classList.add('opacity-100', 'text-gray-950');
        description.value?.classList.add('opacity-100', 'text-gray-950');
      } else {
        title.value?.classList.remove('opacity-100', 'text-gray');
        description.value?.classList.remove('opacity-100', 'text-gray');
      }
    });
  }, { threshold: 0.1 });

  if (infoSection.value) {
    observer.observe(infoSection.value);
  }
});
</script>

<template>
  <div class="bg-white text-black font-sans antialiased">
    <!-- Title Section -->
    <section class="pt-20 pb-4 px-4 bg-gray-50" id="info-section" ref="infoSection">
      <h2
        class="text-3xl text-center font-bold text-gray opacity-0 transition-opacity duration-2000 ease-in-out delay-500"
        ref="title">
        Berikut Informasi Terbaru Kami
      </h2>
      <p class="text-sm text-center text-gray mt-4 opacity-0 transition-opacity duration-2000 ease-in-out delay-500"
        ref="description">
        Tetaplah terupdate dengan berita, tren, dan perkembangan terkini. Kami menyajikan informasi terbaru agar Anda
        selalu mendapatkan informasi yang relevan dan akurat.
      </p>
    </section>

    <!-- Content Section -->
    <section id="content" class="py-10 px-4">
      <div class="max-w-6xl mx-auto space-y-16" ref="cardsContainer">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div v-for="(card, index) in cards" :key="index"
            class="card opacity-0 transition-opacity duration-500 bg-zinc-900 shadow-lg rounded-lg overflow-hidden flex flex-col">

            <!-- Image or Video Container -->
            <div class="w-full h-64 sm:flex sm:justify-center">
              <img :src="card.imageBase64" :alt="card.title" class="w-full h-full object-cover" />
            </div>

            <!-- Content Container -->
            <div class="p-6 flex-1">
              <h3 class="text-2xl font-semibold text-white mb-4 flex items-center">
                {{ card.title }}
              </h3>
              <p class="text-gray-300 text-lg leading-relaxed">
                {{ card.description }}
              </p>
              <!-- Detail Button -->
              <button
                class="static mt-2 bottom-4 left-4 px-4 py-2 text-sm font-semibold text-white bg-blue-950 hover:bg-blue-700 rounded transition">
                Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Keyframes for sliding animation */
@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutToLeft {
  from {
    transform: translateX(0);
    opacity: 1;
  }

  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

.card {
  animation: slideInFromLeft 1s ease-out forwards;
}

.card.slide-out {
  animation: slideOutToLeft 1s ease-out forwards;
}
</style>
