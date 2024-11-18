// eslint-disable-next-line unused-imports/no-unused-imports
import NextAuth from 'next-auth/next';
import type { GetUserResponse, Merchant, Tenant } from '@/interfaces/user.interfaces';
import { ZaloOA } from '@/interfaces/oa.interfaces';
import { FacebookPage } from '@/interfaces/facebook-page.interfaces';

declare module 'next-auth' {
  interface Session {
    user: GetUserResponse & {
      accessToken: string;
      // currentMerchant: Merchant;
      // merchants: Merchant[];
      // currentTenant: Tenant;
      currentFacebookPage?: FacebookPage;
      listFacebookPage?: FacebookPage[];
      // currentOa?: ZaloOA;
      // listOa?: ZaloOA[];
    };
  }
}
