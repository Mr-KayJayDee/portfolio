<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { t } = useI18n()
const toast = useToast()
const loading = ref(false)

const schema = z.object({
  name: z.string().min(2, t('contact.form.validation.nameMin')),
  email: z.string().email(t('contact.form.validation.emailInvalid')),
  message: z.string().min(10, t('contact.form.validation.messageMin')),
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: '',
  email: '',
  message: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await $fetch('/api/contact', { method: 'POST', body: event.data })
    toast.add({
      title: t('contact.form.success'),
      color: 'success',
      icon: 'i-lucide-check',
    })
    state.name = ''
    state.email = ''
    state.message = ''
  } catch {
    toast.add({
      title: t('contact.form.error'),
      color: 'error',
      icon: 'i-lucide-alert-circle',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
    <UFormField :label="t('contact.form.name')" name="name">
      <UInput
        v-model="state.name"
        :placeholder="t('contact.form.name')"
        icon="i-lucide-user"
        size="lg"
        class="w-full"
      />
    </UFormField>

    <UFormField :label="t('contact.form.email')" name="email">
      <UInput
        v-model="state.email"
        type="email"
        :placeholder="t('contact.form.email')"
        icon="i-lucide-mail"
        size="lg"
        class="w-full"
      />
    </UFormField>

    <UFormField :label="t('contact.form.message')" name="message">
      <UTextarea
        v-model="state.message"
        :rows="6"
        :placeholder="t('contact.form.message')"
        size="lg"
        class="w-full"
      />
    </UFormField>

    <button
      type="submit"
      :disabled="loading"
      class="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40"
    >
      <UIcon v-if="loading" name="i-lucide-loader-2" class="w-4 h-4 animate-spin" />
      <template v-if="loading">{{ t('contact.form.sending') }}</template>
      <template v-else>
        {{ t('contact.form.submit') }}
        <UIcon name="i-lucide-send" class="w-4 h-4" />
      </template>
    </button>
  </UForm>
</template>
