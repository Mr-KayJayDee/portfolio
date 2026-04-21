<script setup lang="ts">
interface Props {
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
}
const props = withDefaults(defineProps<Props>(), {
  language: '',
  filename: '',
})
</script>

<template>
  <div class="not-prose group my-6 overflow-hidden rounded-lg bg-[#0d1117] ring-1 ring-white/10">
    <!-- Header bar -->
    <div
      v-if="props.filename || props.language"
      class="flex items-center justify-between border-b border-white/10 px-4 py-2"
    >
      <span class="text-xs font-medium text-neutral-400">
        {{ props.filename || props.language }}
      </span>
      <span
        v-if="props.language && !props.filename"
        class="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wide text-neutral-500"
      >
        {{ props.language }}
      </span>
    </div>

    <!-- Code content -->
    <div class="overflow-x-auto">
      <pre class="m-0 bg-transparent p-4 text-sm leading-relaxed"><slot /></pre>
    </div>
  </div>
</template>
