<script setup>
import { onMounted } from "vue";
import SeatSummary from "../components/SeatSummary.vue";
import RegistrationForm from "../components/RegistrationForm.vue";
import RegistrationTable from "../components/RegistrationTable.vue";
import { usePublicStore } from "../stores/public.store";

const store = usePublicStore();

async function onRegister(payload) {
  try {
    await store.register(payload);
  } catch (err) {
    alert(err?.response?.data?.message || "Failed to register");
  }
}

onMounted(async () => {
  try {
    await store.init();
  } catch (err) {
    alert(err?.response?.data?.message || "Failed to load data");
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <header class="text-center space-y-1">
        <h1 class="text-2xl font-bold">Event Registration</h1>
        <p class="text-sm text-gray-600">Reserve your seat</p>
      </header>

      <SeatSummary :summary="store.summary" :loading="store.summaryLoading" />

      <RegistrationForm
        :disabled="(store.summary?.remainingSeats ?? 0) === 0"
        :loading="store.formLoading"
        @submit="onRegister"
      />

      <RegistrationTable
        :items="store.items"
        :pagination="store.pagination"
        :loading="store.tableLoading"
        :search="store.search"
        :sort="store.sort"
        :order="store.order"
        @update:search="store.setSearch($event)"
        @update:sort="store.setSort($event)"
        @update:order="store.setOrder($event)"
        @changePage="store.changePage"
      />

      <footer class="text-center text-xs text-gray-500 py-6">
        Built with Vue + Tailwind • API: /api/*
      </footer>
    </div>
  </div>
</template>