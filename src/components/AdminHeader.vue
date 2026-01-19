<script setup>
defineProps({
  modelValue: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue", "logout"]);
</script>

<template>
  <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <div>
      <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      <p class="text-sm text-gray-600">Manage capacity & view full registrations</p>
    </div>

    <div class="flex items-center gap-2">
      <span class="text-xs text-gray-500">admin-key</span>
      <input
        type="password"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        class="w-44 rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        placeholder="admin-key"
      />
      <button
        type="button"
        @click="emit('logout')"
        class="rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
      >
        Logout
      </button>
    </div>
  </header>
</template>
