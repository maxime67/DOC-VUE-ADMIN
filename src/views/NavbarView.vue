<script setup>
import {useAuthStore} from '@/stores/auth';
import {storeToRefs} from 'pinia';

const authStore = useAuthStore();
// Only destructure the refs, not the methods
const {isLoggedIn} = storeToRefs(authStore);
</script>
<template>
  <nav class="block w-full px-4 py-2 mx-auto bg-white lg:px-8 lg:py-3">
    <div class="flex flex-wrap items-center justify-between mx-auto text-slate-800">
      <RouterLink to="/">
        <a href="#" class="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold">
          <img class="w-52 rounded-md" :src="'../logo/easysetup-logo.svg'"/>
        </a>
      </RouterLink>
      <div v-if="isLoggedIn">
        <router-link to="/add/documentation">
          <div class="hidden lg:block">
            <ul class="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <img class="w-12 rounded-md" :src="`../logo/new.png`"/>
              </li>
            </ul>
          </div>
        </router-link>
      </div>
      <div v-else-if="!isLoggedIn">
      <router-link to="/login">
        <button>Login</button>
      </router-link>
      </div>

    </div>
  </nav>
</template>
<style scoped>

</style>
