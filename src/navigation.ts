import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { AppConfig } from './libs/i18n.config';

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: AppConfig.locales,
});
