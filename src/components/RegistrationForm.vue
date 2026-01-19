<script setup>
import { reactive } from "vue";

const props = defineProps({
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
});
const emit = defineEmits(["submit"]);

const form = reactive({
  firstName: "",
  lastName: "",
  phone: "",
});

function onSubmit() {
  emit("submit", { ...form });
}
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="rounded-2xl bg-white shadow p-4 space-y-4"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Register</h2>
      <span
        v-if="disabled"
        class="text-xs px-2 py-1 rounded-full bg-red-50 text-red-600"
      >
        Seats full
      </span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label class="text-sm text-gray-600">First name</label>
        <input
          v-model="form.firstName"
          :disabled="disabled || loading"
          class="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          placeholder="e.g. Narongsak"
          required
        />
      </div>

      <div>
        <label class="text-sm text-gray-600">Last name</label>
        <input
          v-model="form.lastName"
          :disabled="disabled || loading"
          class="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          placeholder="e.g. Poolprad"
          required
        />
      </div>
    </div>

    <div>
      <label class="text-sm text-gray-600">Phone</label>
      <input
        v-model="form.phone"
        :disabled="disabled || loading"
        class="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        placeholder="0812345678"
        required
      />
      <p class="text-xs text-gray-500 mt-1">10 digits recommended</p>
    </div>

    <button
      type="submit"
      :disabled="disabled || loading"
      class="w-full rounded-xl bg-gray-900 text-white py-2.5 font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ loading ? "Submitting..." : "Register" }}
    </button>
  </form>
</template>
