<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { currentLocale, switchLocale, isEnglish, isFrench } = useI18n()

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
.language-switcher {
    display: flex;
    align-items: center;
}

.language-switcher-buttons {
    display: flex;
    gap: var(--space-xs);
    background: var(--bg-secondary);
    border-radius: var(--border-radius-lg);
    padding: var(--space-xs);
    border: 1px solid var(--border-color);
}

.language-btn {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-xs) var(--space-sm);
    border: none;
    background: transparent;
    border-radius: var(--border-radius-md);
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
}

.language-btn:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
}

.language-btn.active {
    background: var(--color-primary);
    color: white;
    box-shadow: var(--shadow-sm);
}

.flag {
    font-size: 1rem;
    line-height: 1;
}

.lang-code {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
}

/* Mobile responsive */
@media (max-width: 640px) {
    .lang-code {
        display: none;
    }

    .language-btn {
        padding: var(--space-xs);
    }
}
</style>
