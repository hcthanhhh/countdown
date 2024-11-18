'use client';

import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';

const ThemeNext = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // (function (w, d, s, o, f, js, fjs) {
    //   w.botsonic_widget = o;
    //   w[o] =
    //     w[o] ||
    //     function () {
    //       (w[o].q = w[o].q || []).push(arguments);
    //     };
    //   (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]);
    //   js.id = o;
    //   js.src = f;
    //   js.async = 1;
    //   fjs.parentNode.insertBefore(js, fjs);
    // })(window, document, 'script', 'Botsonic', 'https://widget.writesonic.com/CDN/botsonic.min.js');
    // Botsonic('init', {
    //   serviceBaseUrl: 'https://api.botsonic.ai',
    //   token: 'fdab5d15-a1d9-44f5-bccb-ffbb7ccd9b35',
    // });
  }, []);
  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      {children}
    </ThemeProvider>
  );
};

export default ThemeNext;
