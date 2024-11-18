'use client';

import { ROUTES_FE } from '@/routers';
import { Breadcrumb, Typography } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillHome } from 'react-icons/ai';

const XBreadcrumb = () => {
  const pathName = usePathname();
  const renderListBreadcrumb = (pathname: string) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    return pathSegments.map((item, index) => {
      let title = item.replaceAll('-', ' ');
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`;

      if (title) {
        return {
          title,
          href,
        };
      }
      return {};
    });
  };
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: (
              <Link href={ROUTES_FE.ROOT}>
                <AiFillHome />
              </Link>
            ),
          },
          ...renderListBreadcrumb(pathName).map(({ title, href }, index, records) => ({
            title: href ? (
              index < records.length - 1 ? (
                <Link
                  href={href}
                  className='!text-[12px] capitalize hover:underline hover:!bg-none'
                >
                  {title}
                </Link>
              ) : (
                <Typography.Text className='!text-primary !text-[12px] capitalize font-medium'>
                  {title}
                </Typography.Text>
              )
            ) : (
              title
            ),
          })),
        ]}
      />
      <Typography.Title level={2} className='capitalize !mb-0'>
        {/* {renderListBreadcrumb(pathName).pop()?.title} */}
      </Typography.Title>
    </div>
  );
};
export default XBreadcrumb;
