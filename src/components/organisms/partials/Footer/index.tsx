import { Layout, Typography } from 'antd';
const { Footer } = Layout;
const XFooter = () => {
  return (
    <Footer className='text-center p-3 pt-0'>
      <Typography.Text type='secondary'>
        {new Date().getFullYear()} h0cataf | All rights reserved
      </Typography.Text>
    </Footer>
  );
};

export default XFooter;
