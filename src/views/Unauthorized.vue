<template>
  <div class="view-shell flex items-center justify-center p-4">
    <div class="view-card w-full max-w-lg p-8 text-center">
      <h2 class="text-3xl font-bold mb-2 text-rose-500">403 - Unauthorized</h2>
      <p class="mb-4 text-slate-500">You do not have permission to view this page.</p>
      <router-link to="/login" class="text-blue-500 underline">Go to Login</router-link>
    </div>
  </div>
</template>
