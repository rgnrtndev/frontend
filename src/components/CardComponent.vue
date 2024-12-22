<script setup lang="ts">
defineProps({
  title: String,
  description: String,
  imageBase64: String,
});
</script>

<template>
  <div class="card opacity-0 transition-opacity duration-500 bg-zinc-900 shadow-lg rounded-lg overflow-hidden flex flex-col">
    <div class="w-full h-64 sm:flex sm:justify-center">
      <img :src="imageBase64" :alt="title" class="w-full h-full object-cover" />
    </div>
    <div class="p-6 flex-1">
      <h3 class="text-2xl font-semibold text-white mb-4 flex items-center">
        {{ title }}
      </h3>
      <p class="text-gray-300 text-lg leading-relaxed">
        {{ description }}
      </p>
      <button
        class="mt-2 px-4 py-2 text-sm font-semibold text-white bg-blue-950 hover:bg-blue-700 rounded transition">
        Detail
      </button>
    </div>
  </div>
</template>
