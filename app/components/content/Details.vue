<script setup lang="ts">
interface Props {
  summary?: string
  open?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  summary: 'Voir plus',
  open: false,
})
</script>

<template>
  <details
    :open="props.open"
    class="not-prose my-4 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden"
  >
    <summary
      class="flex cursor-pointer select-none items-center justify-between px-4 py-3
             text-sm font-medium text-neutral-700 dark:text-neutral-300
             hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors list-none"
    >
      {{ props.summary }}
      <svg
        class="size-4 shrink-0 text-neutral-400 transition-transform details-arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
        />
      </svg>
    </summary>
    <div
class="px-4 py-3 prose prose-neutral dark:prose-invert max-w-none
                prose-code:before:content-none prose-code:after:content-none
                prose-pre:p-0 prose-pre:bg-transparent text-sm">
      <slot />
    </div>
  </details>
</template>

<style scoped>
details[open] .details-arrow {
  transform: rotate(180deg);
}
</style>
