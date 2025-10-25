<template>
  <div class="flex flex-1 h-screen">
    <!-- TODO: Dynamic layout -->
    <component :is="'PublicLayout'">
      <RouterView />
    </component>
  </div>
</template>

<script lang="ts" setup></script>
