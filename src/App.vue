<script setup>
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto p-4 sm:p-6">
      <nav class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-2">
          <router-link
            to="/"
            class="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            Home
          </router-link>
          <router-link
            to="/admin"
            class="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            Admin
          </router-link>
        </div>
      </nav>

      <router-view />
    </div>
  </div>
</template>
