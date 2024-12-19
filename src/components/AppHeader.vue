<template>
  <header class="bg-white text-black p-4 sticky top-0 z-50 transition-all duration-300 ease-in-out"
    :class="{ 'shadow-lg': isScrolled }">
    <div class="flex justify-between lg:justify-center items-center">
      <!-- Logo -->
      <div class="text-xl font-bold lg:mr-8">
        <a href="#" class="hover:text-gray-600 transition-colors duration-200">LOGOHERE</a>
      </div>

      <!-- Mobile Menu Button -->
      <div class="lg:hidden">
        <button @click="toggleMobileMenu" class="text-black focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav class="hidden lg:flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 navigation">
        <ul class="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0">
          <li v-for="(menu, index) in menus" :key="index" class="relative group">
            <a href="#" class="text-black lg:text-black hover:text-gray-600 transition-colors duration-200">{{
              menu.title }}</a>

            <!-- Submenu yang muncul saat hover pada elemen induk atau submenu -->
            <ul v-if="menu.submenus"
              class="group-hover:block absolute left-0 hidden mt-2 space-y-2 bg-white shadow-lg rounded-lg transition-all duration-300 ease-in-out opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 min-w-[200px]">

              <li v-for="(submenu, subIndex) in menu.submenus" :key="subIndex" class="relative group">
                <a href="#" class="block px-4 py-2 text-black hover:text-gray-600 transition-colors duration-200">
                  {{ submenu }}
                </a>
              </li>

            </ul>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Mobile Navigation Menu -->
    <nav v-show="isMobileMenuOpen" class="lg:hidden mt-4">
      <ul class="space-y-4">
        <li v-for="(menu, index) in menus" :key="index" class="relative">
          <div class="flex justify-between items-center" @click="toggleSubMenu(index)">
            <a class="text-black hover:text-gray-600 transition-colors duration-200">{{ menu.title }}</a>
          </div>
          <ul v-if="menu.submenus" v-show="openSubMenu === index"
            class="mt-2 space-y-2 bg-white shadow-lg rounded-lg transition-all duration-500 ease-in-out" :style="{
              maxHeight: openSubMenu === index ? '500px' : '0px',
              opacity: openSubMenu === index ? 1 : 0,
              padding: openSubMenu === index ? '0.5rem 0' : '0 0',
              transform: openSubMenu === index ? 'translateY(0)' : 'translateY(-10px)',
              overflow: 'hidden',
            }">
            <li v-for="(submenu, subIndex) in menu.submenus" :key="subIndex"
              class="transition-all duration-300 ease-in-out" :style="{
                transform: openSubMenu === index ? 'translateX(0)' : 'translateX(-10px)',
                opacity: openSubMenu === index ? 1 : 0,
                transitionDelay: `${subIndex * 50}ms`,
              }">
              <a class="block px-4 py-2 text-black hover:text-gray-600 transition-colors duration-200">{{ submenu }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted, type Ref } from "vue";

export default {
  setup() {
    const isMobileMenuOpen = ref(false);
    const isScrolled = ref(false);
    const openSubMenu: Ref<number | null> = ref(null);

    const menus: { title: string; submenus?: string[] }[] = [
      {
        title: "Beranda",
        submenus: ["Slide", "Pengumuman", "Artikel", "Galeri"],
      },
      {
        title: "Tentang Kami",
        submenus: ["Visi Misi", "Sejarah", "Board", "Alamat Gereja"],
      },
      {
        title: "Hubungi Kami",
        submenus: ["Kontak", "Form Doa"],
      },
    ];

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const toggleSubMenu = (index: number) => {
      openSubMenu.value = openSubMenu.value === index ? null : index;
    };

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 0;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      isMobileMenuOpen,
      isScrolled,
      menus,
      openSubMenu,
      toggleMobileMenu,
      toggleSubMenu,
    };
  },
};
</script>

<style>
/* Pastikan hanya berlaku untuk navigation tertentu */
.navigation ul {
  position: relative;
}

.navigation ul li {
  position: relative;
}

.navigation ul li a {
  padding: 12px;
}

.navigation ul li ul {
  position: absolute;
  left: 0;
  top: 100%;
  display: none;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
}

.navigation ul li:hover>ul {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

.navigation ul li ul li a {
  background-color: #fff;
  padding: 10px;
  transition: all 0.2s ease;
}

.navigation ul li:hover ul {
  pointer-events: auto;
}
</style>
