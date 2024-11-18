// @ts-ignore
import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/shared/types';

const localePrefix: LocalePrefix = 'never';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'Marina Platform',
  defaultLocale: 'vi',
  locales: ['vi', 'en'],
  // locales: ['en'],
  localePrefix,
  flags: ['VN', 'US'],
  localeDetection: true,
};
