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

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  message: undefined,
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
    // Reset form
    state.name = undefined
    state.email = undefined
    state.message = undefined
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
  <UForm :schema="schema" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
    <UFormField :label="t('contact.form.name')" name="name">
      <UInput v-model="state.name" :placeholder="t('contact.form.name')" class="w-full" />
    </UFormField>

    <UFormField :label="t('contact.form.email')" name="email">
      <UInput v-model="state.email" type="email" :placeholder="t('contact.form.email')" class="w-full" />
    </UFormField>

    <UFormField :label="t('contact.form.message')" name="message">
      <UTextarea v-model="state.message" :rows="5" :placeholder="t('contact.form.message')" class="w-full" />
    </UFormField>

    <UButton type="submit" :loading="loading" size="lg" class="self-start">
      {{ t('contact.form.submit') }}
    </UButton>
  </UForm>
</template>
