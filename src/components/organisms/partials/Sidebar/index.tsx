'use client';

import { Layout, theme } from 'antd';
import { FC } from 'react';
const { Sider } = Layout;

interface ISiderProps {
  children?: React.ReactElement;
}

const XSider: FC<ISiderProps> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      className='!fixed top-[1rem] bottom-[1rem] left-[1rem] z-20 lg:z-99 md:z-99 xl:z-0 xl:block overflow-auto min-h-auto rounded-xl !w-full !max-w-[285px]'
      style={{ background: colorBgContainer }}
    >
      {children}
    </Sider>
  );
};

export default XSider;
