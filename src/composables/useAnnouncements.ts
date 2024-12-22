import { ref, onMounted, nextTick } from 'vue';
import { getAnnouncements } from '@/api/announcementApi';

interface Card {
  id: number;
  title: string;
  description: string;
  imageBase64: string;
}

export function useAnnouncements() {
  const cards = ref<Card[]>([]);
  const cardsContainer = ref<HTMLElement | null>(null);
  const viewportHeight = ref(window.innerHeight);

  const fetchCards = async () => {
    try {
      const data = await getAnnouncements();

      if (data.code === '00') {
        cards.value = data.result.map((item: Card) => ({
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

    // Tunggu hingga DOM selesai dirender
    await nextTick();
    animateCards(); // Jalankan animasi awal untuk elemen yang terlihat
  };

  const animateCards = () => {
    if (!cardsContainer.value) return; // Validasi cardsContainer

    const cardsElements = cardsContainer.value?.querySelectorAll('.card');
    if (cardsElements) {
      cardsElements.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (
          rect.top <= viewportHeight.value * 0.9 &&
          rect.bottom >= viewportHeight.value * 0.1
        ) {
          card.classList.add('slide-in');
          card.classList.remove('slide-out');
        } else {
          card.classList.add('slide-out');
          card.classList.remove('slide-in');
        }
      });
    }
  };

  const onScroll = () => {
    animateCards();
  };

  onMounted(() => {
    fetchCards();
    window.addEventListener('scroll', onScroll);
  });

  return { cards, cardsContainer, fetchCards };
}
