<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAdminStore } from "../stores/admin.store";

const router = useRouter();
const route = useRoute();

const store = useAdminStore();

const adminKey = ref(store.adminKey || "");
const showPassword = ref(false);
const saving = ref(false);

function onSubmit() {
  saving.value = true;
  try {
    store.setAdminKey(adminKey.value || "");
    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/admin";
    router.replace(redirect);
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-md mx-auto p-4 sm:p-6">
      <div class="rounded-2xl bg-white shadow p-4 space-y-4">
        <div>
          <h1 class="text-xl font-bold">Admin Login</h1>
          <p class="text-sm text-gray-600">Enter ADMIN_KEY to access admin page</p>
        </div>

        <form @submit.prevent="onSubmit" class="space-y-3">
          <div>
            <label class="text-sm text-gray-600">ADMIN_KEY</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="adminKey"
                class="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                placeholder="Enter admin key"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>
          <button
            type="submit"
            :disabled="saving"
            class="w-full rounded-xl bg-gray-900 text-white py-2.5 font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {{ saving ? "Saving..." : "Continue" }}
          </button>
        </form>

        <router-link
          to="/"
          class="block text-center text-sm text-gray-600 hover:text-gray-900"
        >
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>
