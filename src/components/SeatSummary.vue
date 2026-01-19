<script setup>
defineProps({
  summary: { type: Object, default: null },
  loading: { type: Boolean, default: false },
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div class="rounded-2xl bg-white shadow p-4">
      <p class="text-sm text-gray-500">Total Seats</p>
      <p class="text-2xl font-semibold mt-1">
        {{ loading ? "..." : summary?.totalSeats ?? 0 }}
      </p>
    </div>

    <div class="rounded-2xl bg-white shadow p-4">
      <p class="text-sm text-gray-500">Registered</p>
      <p class="text-2xl font-semibold mt-1">
        {{ loading ? "..." : summary?.registeredCount ?? 0 }}
      </p>
    </div>

    <div class="rounded-2xl bg-white shadow p-4 border border-gray-100">
      <p class="text-sm text-gray-500">Remaining</p>
      <p
        class="text-2xl font-semibold mt-1"
        :class="(summary?.remainingSeats ?? 0) === 0 ? 'text-red-600' : 'text-emerald-600'"
      >
        {{ loading ? "..." : summary?.remainingSeats ?? 0 }}
      </p>
    </div>
  </div>
</template>
