'use client';

import useAppSize from '@/hooks/useAppSize';
import { Result } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

interface MobileDetectorProviderProps {
  children?: React.ReactNode;
}

const MobileDetectorProvider = ({ children }: MobileDetectorProviderProps) => {
  const { innerAppWidth } = useAppSize();
  const t = useTranslations('UNSUPPORTED');
  if (innerAppWidth <= 960) {
    return <Result status='500' title={t('TITLE')} subTitle={t('SUB_TITLE')} />;
  }
  return children;
};
export default MobileDetectorProvider;
