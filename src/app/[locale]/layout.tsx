import '@/styles/globals.scss';
import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swagger-ui-react/swagger-ui.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ToastContainer } from 'react-toastify';

import { AppConfig } from '@/libs/i18n.config';
import ReactQueryProvider from '@/providers/QueryClientProvider';
import { ThemeAntDesign, ThemeNext } from '@/themes';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const roboto = Plus_Jakarta_Sans({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Countdown to Dalat 2024',
  description: 'Countdown to Dalat 2024',
};

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!AppConfig.locales.includes(props.params.locale)) notFound();
  const messages = useMessages();
  return (
    <html lang={props.params.locale} suppressHydrationWarning>
      <body className={roboto.className}>
        <AntdRegistry>
          <NextIntlClientProvider locale={props.params.locale} messages={messages}>
            <ThemeNext>
              <ThemeAntDesign>
                <ReactQueryProvider>
                  <ToastContainer />
                  <div className=' 2xl:m-auto 2xl:max-w-[1920px]'>{props.children}</div>
                </ReactQueryProvider>
              </ThemeAntDesign>
            </ThemeNext>
          </NextIntlClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
