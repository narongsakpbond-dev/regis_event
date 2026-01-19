<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import AdminHeader from "../components/AdminHeader.vue";
import SeatSummary from "../components/SeatSummary.vue";
import SeatCapacityCard from "../components/SeatCapacityCard.vue";
import AdminRegistrationsTable from "../components/AdminRegistrationsTable.vue";
import { useAdminStore } from "../stores/admin.store";

const router = useRouter();
const store = useAdminStore();

function onLogout() {
  store.clearAdminKey();
  router.replace({ name: "admin-login", query: { redirect: "/admin" } });
}

onMounted(async () => {
  try {
    await store.init();
  } catch (err) {
    if (err?.response?.status === 401) {
      store.clearAdminKey();
      router.replace({ name: "admin-login", query: { redirect: "/admin" } });
      return;
    }
    alert(err?.response?.data?.message || "Failed to load admin data");
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <AdminHeader v-model="store.adminKey" @logout="onLogout" />

      <SeatSummary :summary="store.summary" :loading="store.summaryLoading" />

      <SeatCapacityCard
        v-model="store.totalSeatsInput"
        :saving="store.seatSaving"
        @save="store.saveSeats"
      />

      <AdminRegistrationsTable
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
        Admin uses <span class="font-mono">admin-key</span> header
      </footer>
    </div>
  </div>
</template>
