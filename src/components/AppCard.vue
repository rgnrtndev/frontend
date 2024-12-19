<template>
  <div
    class="card opacity-0 transition-opacity duration-500 bg-zinc-900 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
    <!-- Alternate left/right based on index -->
    <div
      :class="['w-full', 'md:w-1/2', 'h-64', 'sm:flex', 'sm:justify-end', { 'order-1': isEvenIndex, 'order-2': !isEvenIndex }]">
      <img v-if="card.imageUrl" :src="card.imageUrl" :alt="card.title" class="w-full h-full object-cover" />
      <iframe v-if="card.videoUrl" :src="card.videoUrl" class="w-full h-full object-cover"
        allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
    <div :class="['p-6', 'flex-1', { 'order-2': isEvenIndex, 'order-1': !isEvenIndex }]">
      <h3 class="text-2xl font-semibold text-white mb-4">{{ card.title }}</h3>
      <p class="text-gray-300 text-lg leading-relaxed">{{ card.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export interface CardData {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
}

export default defineComponent({
  name: 'AppCard',
  props: {
    card: {
      type: Object as PropType<CardData>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    isEvenIndex(): boolean {
      return this.index % 2 === 0;
    }
  }
});
</script>

<style scoped>
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
</style>
