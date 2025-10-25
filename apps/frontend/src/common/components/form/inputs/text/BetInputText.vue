<template>
  <div
    class="flex"
    :class="{
      'flex-col': !isHorizontal,
    }"
  >
    <label class="label mb-1">{{ label }} <span v-if="isRequired">*</span></label>
    <input
      class="input"
      :type="type"
      :placeholder="placeholder"
      :required="isRequired"
      :disabled="isDisabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <div class="h-[20px] mb-1">
      <BetFadeTransition>
        <span v-if="error" class="text-error">{{ error }}</span>
      </BetFadeTransition>
    </div>
  </div>
</template>

<script setup lang="ts">
import BetFadeTransition from '@/common/components/transitions/BetFadeTransition.vue'

interface Props {
  label?: string
  modelValue?: string
  placeholder?: string
  error?: string
  type: 'text' | 'password' | 'email'
  isHorizontal?: boolean
  isRequired?: boolean
  isDisabled?: boolean
}

defineProps<Props>()
defineEmits<{
  (e: 'update:modelValue', value?: string): void
}>()
</script>
