<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { currentLocale, switchLocale } = useI18n()

const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
]
</script>

<template>
    <div class="language-switcher">
        <div class="language-switcher-buttons">
            <button v-for="lang in languages" :key="lang.code" @click="switchLocale(lang.code)" :class="[
                'language-btn',
                { 'active': currentLocale === lang.code }
            ]" :title="lang.name">
                <span class="flag">{{ lang.flag }}</span>
                <span class="lang-code">{{ lang.code.toUpperCase() }}</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
@import './styles/LanguageSwitcher.css';
</style>
