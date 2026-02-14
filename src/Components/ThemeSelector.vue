<template>
  <div class="p-2 ">
    <select 
      id="theme-selector" 
      class="border nem  text-sm rounded-md p-2.5 shadow-2xl"
      v-model="selectedTheme"
      @change="setTheme(selectedTheme)"
    >
      <option class="h1  hover:rev" value="light">☀️ Light</option>
      <option class="h1  hover:rev" value="dark">🌙 Dark </option>
      <option class="h1  hover:rev" value="green">🟢 Green </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const THEMES = ['light', 'dark', 'green'];
const selectedTheme = ref('light'); // Default state

/**
 * Applies the new theme to the document body and saves it to local storage.
 * @param {string} themeName - The name of the theme to apply (e.g., 'dark').
 */
function setTheme(themeName) {
  const body = document.body;
  
  // 1. Clear all theme classes from the body
  // Uses the array of themes to dynamically remove classes like 'light-theme', 'dark-theme', etc.
  body.classList.remove(...THEMES.map(t => `${t}-theme`));

  // 2. Add the selected theme class to the body
  body.classList.add(`${themeName}-theme`);
  
  // 3. Persist the selection
  localStorage.setItem('theme', themeName);
  
  // 4. Update the component's internal state (v-model handles the select element)
  selectedTheme.value = themeName;
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  
  if (THEMES.includes(savedTheme)) {

    setTheme(savedTheme);
  } else {
    // Otherwise, apply the default theme
    setTheme('light');
  }
});

// 3. Expose the theme change function (optional, but useful if you need to change theme from outside)
// defineExpose({
//   setTheme
// });
</script>

<style scoped>
/* Scoped styles are optional. This section is just for reference */
/* The actual theme CSS (e.g., body.dark-theme { ... }) should be in a global CSS file. */
</style>