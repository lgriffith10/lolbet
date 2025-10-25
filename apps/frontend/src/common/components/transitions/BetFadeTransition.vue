<template>
  <Transition name="fade" mode="out-in" :duration="200">
    <slot />
  </Transition>
</template>
<script setup lang="ts"></script>
