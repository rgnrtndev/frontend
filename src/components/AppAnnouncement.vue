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
    <section class="pt-10 pb-10 px-4 bg-gray-50" id="info-section" ref="infoSection">
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

<<<<<<< HEAD
=======
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

interface Card {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
}

export default defineComponent({
  setup() {
    const cardData: Card[] = [
      {
        title: "Feature One",
        description: "Discover the amazing features we’ve introduced to enhance your experience.",
        imageUrl: "https://via.placeholder.com/1280x720",
        videoUrl: "",
      },
      {
        title: "Feature Two",
        description: "Stay informed with the latest updates. Our goal is to keep you in the loop.",
        imageUrl: "",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        title: "Feature Three",
        description: "We are always working on new features to improve your experience.",
        imageUrl: "https://via.placeholder.com/1280x720",
        videoUrl: "",
      },
      {
        title: "Feature Four",
        description: "A fresh and exciting way to interact with our platform, now better than ever.",
        imageUrl: "",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        title: "Feature Five",
        description: "The latest features make everything faster and easier to use.",
        imageUrl: "https://via.placeholder.com/1280x720",
        videoUrl: "",
      },
    ];


    const limitedCardData = ref(
      cardData.slice(0, 3).map(card => ({
        ...card,
        description: card.description.length > 50
          ? card.description.substring(0, 50) + '...'
          : card.description,
      }))
    );

    const cardsContainer = ref<HTMLElement | null>(null);
    const cards = ref<NodeListOf<HTMLElement> | null>(null);
    const lastScroll = ref(0);
    const viewportHeight = ref(window.innerHeight);

    const infoSection = ref<HTMLElement | null>(null);
    const title = ref<HTMLElement | null>(null);
    const description = ref<HTMLElement | null>(null);

    // Track button visibility based on scroll position
    const showMoreButton = ref(false);


    // Scroll animation logic
    const animateCards = () => {
      if (cards.value) {
        cards.value.forEach((card) => {
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

    // Track scroll direction (up or down)
    const onScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll.value) {
        animateCards();
        showMoreButton.value = true;
      } else if (currentScroll < lastScroll.value) {
        animateCards();
        showMoreButton.value = false;
      }

      lastScroll.value = currentScroll;
    };

    onMounted(() => {
      // Initialize cards and scroll event
      cards.value = cardsContainer.value?.querySelectorAll('.card') || null;
      window.addEventListener('scroll', onScroll);

      // Intersection Observer for title section animation
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
      }, { threshold: 0.5 });

      if (infoSection.value) {
        observer.observe(infoSection.value);
      }
    });

    // Cleanup scroll event listener
    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll);
    });

    return {
      limitedCardData,
      infoSection,
      title,
      description,
      cardsContainer,
      showMoreButton,
    };
  },
});
</script>

>>>>>>> ecf34b96cf1b017f9f13fe6e6908e9bc42a89b6a
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

/* Custom transitions for the "Show More" button */
#show-more-btn {
  transition: all 0.5s ease-in-out;
}

/* Specific visibility and transform classes for Show More button */
#show-more-btn.opacity-0 {
  opacity: 0;
}

#show-more-btn.opacity-100 {
  opacity: 1;
}

#show-more-btn.translate-x-full {
  transform: translateX(100%);
}

#show-more-btn.translate-x-0 {
  transform: translateX(0);
}
</style>
