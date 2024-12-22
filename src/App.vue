<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue';
import AppHeader from './components/AppHeader.vue';
import SliderComponent from './components/SliderComponent.vue';
import AppAnnouncement from './components/AppAnnouncement.vue';
</script>

<template>
  <main-layout>
    <AppHeader />
    <SliderComponent />
    <AppAnnouncement />
  </main-layout>

  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <!-- <RouterView /> -->
</template>
