<script setup lang="ts">
import { useAnnouncements } from '@/composables/useAnnouncements';
import Card from '@/components/CardComponent.vue';

const { cards, cardsContainer } = useAnnouncements();
console.log("Cards: ", cards.value);
</script>

<template>
    <section class="pt-20 pb-4 px-4 bg-gray-50" ref="cardsContainer">
      <h2 class="text-3xl text-center font-bold text-gray-500">Informasi Terbaru</h2>
      <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        <card
          v-for="card in cards"
          :key="card.id"
          :title="card.title"
          :description="card.description"
          :imageBase64="card.imageBase64"
        />
      </div>
    </section>
</template>
