// FAQ Data for Home Page
export interface FAQ {
  question: string
  answer: string
  features: string[]
}

// Function to get translated FAQs
export const getHomeFAQs = (t: (key: string) => string | string[]): FAQ[] => {
  return [
    {
      question: t('faq.homeFaq.delivery.question') as string,
      answer: t('faq.homeFaq.delivery.answer') as string,
      features: t('faq.homeFaq.delivery.features') as string[]
    },
    {
      question: t('faq.homeFaq.maintenance.question') as string,
      answer: t('faq.homeFaq.maintenance.answer') as string,
      features: t('faq.homeFaq.maintenance.features') as string[]
    },
    {
      question: t('faq.homeFaq.companies.question') as string,
      answer: t('faq.homeFaq.companies.answer') as string,
      features: t('faq.homeFaq.companies.features') as string[]
    }
  ]
}
