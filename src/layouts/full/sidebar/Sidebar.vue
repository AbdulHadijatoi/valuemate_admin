<script setup lang="ts">
import { shallowRef, computed, onMounted } from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';
import { useAuthStore } from '@/stores/auth';
import sidebarItems from './sidebarItem';
import { useSupportChat } from '@/composables/useSupportChat';

import NavGroup from './NavGroup/NavGroup.vue';
import NavItem from './NavItem/NavItem.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import Logo from '../logo/LogoMain.vue';

const customizer = useCustomizerStore();
const authStore = useAuthStore();
const { unreadCount, refreshUnreadCount } = useSupportChat();

// Make sidebar items reactive and update chip for Support Chat
const sidebarMenu = computed(() => {
  return sidebarItems.map(item => {
    if (item.title === 'Support Chat') {
      return {
        ...item,
        chip: unreadCount.value > 0 ? unreadCount.value.toString() : undefined,
        chipColor: unreadCount.value > 0 ? 'error' : undefined,
      };
    }
    return item;
  });
});

// Fetch unread count once on mount (no continuous polling)
onMounted(() => {
  if (authStore.isAuthenticated) {
    refreshUnreadCount();
  }
});
</script>

<template>
  <v-navigation-drawer
    left
    v-model="customizer.Sidebar_drawer"
    elevation="0"
    rail-width="75"
    mobile-breakpoint="lg"
    app
    class="leftSidebar"
    :rail="customizer.mini_sidebar"
    expand-on-hover
  >
    <!---Logo part -->

    <div class="">
      <Logo />
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <v-list class="pa-4">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else class="leftPadding" />
          <!---End Single Item-->
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
