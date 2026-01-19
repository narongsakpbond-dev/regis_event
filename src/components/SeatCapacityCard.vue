<script setup>
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  saving: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "save"]);
</script>

<template>
  <div class="rounded-2xl bg-white shadow p-4">
    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h2 class="text-lg font-semibold">Seat Capacity</h2>
        <p class="text-sm text-gray-600">Set total seats (cannot be less than registered).</p>
      </div>

      <div class="flex items-center gap-2">
        <input
          :value="modelValue"
          @input="emit('update:modelValue', Number($event.target.value))"
          type="number"
          min="0"
          class="w-40 rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        />
        <button
          @click="emit('save')"
          :disabled="saving"
          class="rounded-xl bg-gray-900 text-white px-4 py-2 font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {{ saving ? "Saving..." : "Save" }}
        </button>
      </div>
    </div>
  </div>
</template>
