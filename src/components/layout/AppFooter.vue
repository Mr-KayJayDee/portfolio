<script setup lang="ts">
import { computed } from 'vue'
import { useAssets } from '@/composables/useAssets'
import { useI18n } from '@/composables/useI18n'
import { useSiteConfig } from '@/composables/useSiteConfig'

const { getImageUrl } = useAssets()
const { t } = useI18n()
const { siteConfig } = useSiteConfig()

const quickLinks = computed(() => [
  { name: t('nav.home'), path: '/' },
  { name: t('nav.projects'), path: '/projects' },
  { name: t('nav.about'), path: '/about' },
  { name: t('nav.contact'), path: '/contact' }
])

const services = computed(() => [
  t('footer.servicesList.webDev'),
  t('footer.servicesList.mobileApps'),
  t('footer.servicesList.apiBackend'),
  t('footer.servicesList.consulting')
])
</script>

<template>
  <footer class="footer">
    <div class="container">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-xl mb-2xl">
        <!-- Brand -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-md mb-lg">
            <img :src="getImageUrl('@/assets/images/logo.png')" alt="Killian" class="footer-logo">
            <span class="text-xl font-bold footer-brand">{{ siteConfig.name }}</span>
          </div>
          <p class="mb-lg max-w-md footer-description">
            {{ siteConfig.description }}
          </p>
          <!-- Social Links -->
          <div class="flex gap-md">
            <a v-for="social in siteConfig.social" :key="social.name" :href="social.url" target="_blank"
              rel="noopener noreferrer" class="social-link" :title="social.name">

              <!-- GitHub Icon -->
              <svg v-if="social.icon === 'github'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>

              <!-- LinkedIn Icon -->
              <svg v-else-if="social.icon === 'linkedin'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>

              <!-- Discord Icon -->
              <svg v-else-if="social.icon === 'discord'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z" />
              </svg>

              <!-- Email Icon -->
              <svg v-else-if="social.icon === 'email'" class="w-5 h-5" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>

            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-bold mb-lg footer-title">{{ t('footer.navigation') }}</h3>
          <ul class="space-y-sm">
            <li v-for="link in quickLinks" :key="link.name">
              <RouterLink :to="link.path" class="footer-link">
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-lg font-bold mb-lg footer-title">{{ t('footer.services') }}</h3>
          <ul class="space-y-sm">
            <li v-for="service in services" :key="service">
              <span class="footer-link cursor-default">{{ service }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <div class="flex flex-col md:flex-row justify-between items-center gap-md">
          <p class="text-sm footer-copyright">
            © {{ new Date().getFullYear() }} {{ siteConfig.author }}. {{ t('footer.copyright') }}
          </p>
          <div class="flex gap-lg text-sm">
            <a href="#" class="footer-link">{{ t('footer.legalNotices') }}</a>
            <a href="#" class="footer-link">{{ t('footer.privacyPolicy') }}</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Footer Base */
.footer {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  padding: var(--space-4xl) 0 var(--space-xl);
  border-top: var(--border-width) solid var(--border-color);
}

/* Footer logo */
.footer-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: var(--border-radius-md);
}

/* Footer Brand */
.footer-brand {
  color: var(--text-primary);
}

/* Footer Titles */
.footer-title {
  color: var(--text-primary);
}

/* Footer Description */
.footer-description {
  color: var(--text-secondary);
}

/* Footer Copyright */
.footer-copyright {
  color: var(--text-tertiary);
}

/* Footer Bottom */
.footer-bottom {
  border-top: var(--border-width) solid var(--border-color);
  padding-top: var(--space-lg);
}

/* Social Links */
.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--bg-secondary);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.social-link:hover {
  background: var(--color-primary);
  color: var(--text-inverse);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
  scale: 1.05;
}

/* Footer Links */
.footer-link {
  color: var(--text-secondary);
  transition: color var(--transition-fast);
  text-decoration: none;
}

.footer-link:hover {
  color: var(--color-primary);
}

/* Custom utilities */
.space-y-sm>*+* {
  margin-top: var(--space-sm);
}

.max-w-md {
  max-width: 28rem;
}

.cursor-default {
  cursor: default;
}

/* Responsive */
@media (min-width: 768px) {
  .md\:col-span-2 {
    grid-column: span 2;
  }

  .md\:flex-row {
    flex-direction: row;
  }
}
</style>
