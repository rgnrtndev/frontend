import { ref, computed, onMounted } from 'vue';
import { getSliders } from '@/api/sliderApi';

interface Slider {
  id: number;
  title: string;
  description: string;
  imageBase64: string;
}

export function useSliders() {
  const sliders = ref<Slider[]>([]);
  const loading = ref<boolean>(true);
  const error = ref<string | null>(null);
  const currentIndex = ref(0);
  const carouselRef = ref<HTMLDivElement | null>(null);

  const fetchCarouselSliders = async () => {
    try {
      const data = await getSliders();

      if (data.code === '00') {
        sliders.value = data.result.map((item: Slider) => ({
          id: item.id,
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

  // Menambahkan slide kloning untuk animasi carousel
  const allSlides = computed(() => {
    if (sliders.value.length === 0) return [];
    const firstClone = sliders.value[0];
    const lastClone = sliders.value[sliders.value.length - 1];
    return [lastClone, ...sliders.value, firstClone];
  });

  // Mengatur style carousel
  const carouselStyle = computed(() => ({
    transform: `translateX(-${(currentIndex.value + 1) * 100}%)`,
  }));

  // Navigasi ke slide sebelumnya
  const prevSlide = () => {
    currentIndex.value--;
    updateCarousel();

    if (currentIndex.value < 0) {
      setTimeout(() => {
        if (carouselRef.value) carouselRef.value.style.transition = 'none';
        currentIndex.value = sliders.value.length - 1;
      }, 500);
    }
  };

  // Navigasi ke slide berikutnya
  const nextSlide = () => {
    currentIndex.value++;
    updateCarousel();

    if (currentIndex.value >= sliders.value.length) {
      setTimeout(() => {
        if (carouselRef.value) carouselRef.value.style.transition = 'none';
        currentIndex.value = 0;
      }, 500);
    }
  };

  // Update transisi carousel
  const updateCarousel = () => {
    if (carouselRef.value) {
      carouselRef.value.style.transition = 'transform 0.5s ease-in-out';
    }
  };

  // Lifecycle hook
  onMounted(() => {
    fetchCarouselSliders();
    setInterval(() => {
      nextSlide();
    }, 5000); // Auto-slide setiap 5 detik
  });

  return {
    sliders,
    loading,
    error,
    currentIndex,
    allSlides,
    carouselStyle,
    carouselRef,
    prevSlide,
    nextSlide,
  };
}
