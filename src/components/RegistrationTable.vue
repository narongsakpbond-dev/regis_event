<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] },
  pagination: { type: Object, default: null },
  loading: { type: Boolean, default: false },
  search: { type: String, default: "" },
  sort: { type: String, default: "createdAt" },
  order: { type: String, default: "desc" },
});

const emit = defineEmits([
  "update:search",
  "update:sort",
  "update:order",
  "changePage",
]);

function toggleSort(field) {
  if (props.sort === field) {
    emit("update:order", props.order === "asc" ? "desc" : "asc");
    return;
  }
  emit("update:sort", field);
  emit("update:order", "asc");
}

function sortIndicator(field) {
  if (props.sort !== field) return "";
  return props.order === "asc" ? "▲" : "▼";
}
</script>

<template>
  <div class="rounded-2xl bg-white shadow p-4">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h2 class="text-lg font-semibold">รายชื่อผู้ลงทะเบียน</h2>

      <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <input
          :value="search"
          @input="emit('update:search', $event.target.value)"
          class="w-full sm:w-72 rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          placeholder="Search name..."
        />

        <select
          :value="sort"
          @change="emit('update:sort', $event.target.value)"
          class="w-full sm:w-44 rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white"
        >
          <option value="firstName">Sort: First Name</option>
          <option value="lastName">Sort: Last Name</option>
        </select>

        <select
          :value="order"
          @change="emit('update:order', $event.target.value)"
          class="w-full sm:w-32 rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white"
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>
    </div>

    <div class="mt-4 overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="text-left text-gray-500 border-b">
          <tr>
            <th
              class="py-2 select-none cursor-pointer"
              @click="toggleSort('firstName')"
            >
              First name {{ sortIndicator('firstName') }}
            </th>
            <th
              class="py-2 select-none cursor-pointer"
              @click="toggleSort('lastName')"
            >
              Last name {{ sortIndicator('lastName') }}
            </th>
          </tr>
        </thead>

        <tbody v-if="!loading">
          <tr v-for="r in items" :key="r._id || r.id" class="border-b last:border-0">
            <td class="py-2">{{ r.firstName }}</td>
            <td class="py-2">{{ r.lastName }}</td>
          </tr>

          <tr v-if="items.length === 0">
            <td colspan="2" class="py-6 text-center text-gray-500">
              No registrations
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="2" class="py-6 text-center text-gray-500">Loading...</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4 flex items-center justify-between text-sm text-gray-600">
      <p>
        Page {{ pagination?.page ?? 1 }} / {{ pagination?.totalPages ?? 1 }}
      </p>

      <div class="flex gap-2">
        <button
          class="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
          :disabled="(pagination?.page ?? 1) <= 1 || loading"
          @click="emit('changePage', (pagination?.page ?? 1) - 1)"
        >
          Prev
        </button>
        <button
          class="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
          :disabled="(pagination?.page ?? 1) >= (pagination?.totalPages ?? 1) || loading"
          @click="emit('changePage', (pagination?.page ?? 1) + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
