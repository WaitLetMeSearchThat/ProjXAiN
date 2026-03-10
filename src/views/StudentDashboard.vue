<template>
  <div class="view-shell">
    <div class="view-content space-y-6">
      <div class="view-card p-6">
        <RoleFeatures />
      </div>
      <div class="view-card p-6">
        <ProgramProspectusOverview />
      </div>
    </div>
  </div>
</template>

<script setup>
import RoleFeatures from '@/Components/RoleFeatures.vue'
import GradeInquiryChatbot from '@/Components/GradeInquiryChatbot.vue';
import ProgramProspectusOverview from '@/Components/ProgramProspectusOverview.vue';
</script>
