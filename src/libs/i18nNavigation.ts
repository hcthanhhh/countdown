import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { AppConfig } from './i18n.config';

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
});
