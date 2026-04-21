<script setup lang="ts">
interface Props {
  type?: 'info' | 'warning' | 'tip' | 'danger'
}
const props = withDefaults(defineProps<Props>(), { type: 'info' })

const styles = {
  info: {
    wrapper: 'border-blue-500 bg-blue-50 dark:bg-blue-950/40',
    icon: 'text-blue-500',
    text: 'text-blue-900 dark:text-blue-100',
  },
  warning: {
    wrapper: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40',
    icon: 'text-amber-500',
    text: 'text-amber-900 dark:text-amber-100',
  },
  tip: {
    wrapper: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40',
    icon: 'text-emerald-500',
    text: 'text-emerald-900 dark:text-emerald-100',
  },
  danger: {
    wrapper: 'border-red-500 bg-red-50 dark:bg-red-950/40',
    icon: 'text-red-500',
    text: 'text-red-900 dark:text-red-100',
  },
} as const
</script>

<template>
  <div
    :class="[
      'not-prose my-4 flex items-start gap-3 rounded-r-lg border-l-4 px-4 py-3',
      styles[props.type].wrapper,
    ]"
    role="note"
  >
    <!-- Info -->
    <svg
      v-if="props.type === 'info'"
      :class="['mt-0.5 size-5 shrink-0', styles[props.type].icon]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clip-rule="evenodd"
      />
    </svg>
    <!-- Warning -->
    <svg
      v-else-if="props.type === 'warning'"
      :class="['mt-0.5 size-5 shrink-0', styles[props.type].icon]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clip-rule="evenodd"
      />
    </svg>
    <!-- Tip -->
    <svg
      v-else-if="props.type === 'tip'"
      :class="['mt-0.5 size-5 shrink-0', styles[props.type].icon]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.75 6.75 0 01-.937-.171.75.75 0 11.374-1.453 5.261 5.261 0 002.626 0 .75.75 0 11.374 1.452 6.76 6.76 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
      <path
        fill-rule="evenodd"
        d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z"
        clip-rule="evenodd"
      />
    </svg>
    <!-- Danger -->
    <svg
      v-else-if="props.type === 'danger'"
      :class="['mt-0.5 size-5 shrink-0', styles[props.type].icon]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
        clip-rule="evenodd"
      />
    </svg>

    <div :class="['text-sm leading-relaxed', styles[props.type].text]">
      <slot />
    </div>
  </div>
</template>
