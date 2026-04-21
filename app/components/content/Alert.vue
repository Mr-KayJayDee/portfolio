<script setup lang="ts">
interface Props {
  type?: 'info' | 'warning' | 'tip' | 'danger'
}
const props = withDefaults(defineProps<Props>(), {
  type: 'info',
})

const iconMap = {
  info: 'i-heroicons-information-circle',
  warning: 'i-heroicons-exclamation-triangle',
  tip: 'i-heroicons-light-bulb',
  danger: 'i-heroicons-x-circle',
}
const colorMap = {
  info: 'info',
  warning: 'warning',
  tip: 'success',
  danger: 'error',
}
</script>

<template>
  <UAlert
    :icon="iconMap[props.type]"
    :color="colorMap[props.type] as any"
    variant="soft"
    class="my-4"
  >
    <template #description>
      <ContentSlot :use="$slots.default" unwrap="p" />
    </template>
  </UAlert>
</template>
