'use client';

import LoadingComponent from '@/components/atoms/LoadingComponent';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const ClientInitData = ({ children }: { children: React.ReactNode }) => {
  // const session = useSession();
  // const user = session?.data?.user;
  const t = useTranslations();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // return isAuthenticated ? <>{children}</> : <LoadingComponent />;
  return <>{children}</>;
};

export default ClientInitData;
