import { Popover } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import { AppConfig } from '@/libs/i18n.config';
import { usePathname, useRouter } from '@/libs/i18nNavigation';
import ReactCountryFlag from 'react-country-flag';

const LocaleSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('HEADER');

  const getFlag = () => {
    const indexLocale = AppConfig.locales.findIndex((item) => item === locale);
    return AppConfig.flags[indexLocale] ?? 'VN';
  };

  const Content = () => {
    return (
      <div>
        {AppConfig.locales.map((item, index) => {
          return (
            <div
              key={index}
              className='flex cursor-pointer items-center gap-2 rounded-sm px-1 transition-all hover:bg-gray-200'
              onClick={() => {
                router.push(pathname, { locale: item });
                router.refresh();
              }}
            >
              <ReactCountryFlag
                key={index}
                countryCode={AppConfig.flags[index] ? AppConfig.flags[index] : 'VN'}
                svg
                style={{ width: '2em', height: '2em' }}
              />

              <div className={item === locale ? 'font-semibold text-primary' : ''}>
                {t(item as any)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Popover content={<Content />} trigger='click' placement='bottom'>
      <div className='cursor-pointer text-2xl inline-flex gap-4'>
        <ReactCountryFlag countryCode={getFlag()} svg style={{ width: '1em', height: '1em' }} />

        <div className='font-semibold'>{getFlag()}</div>
      </div>
    </Popover>
  );
};

export default LocaleSwitcher;
