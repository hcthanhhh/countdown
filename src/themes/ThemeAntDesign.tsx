'use client';

import { ConfigProvider } from 'antd';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

import { COLORS } from '../common/colors';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title,
  Filler,
);

const ThemeAntDesign = (props: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Plus Jakarta Sans', 'Helvetica', 'Arial', sans-serif",
          colorPrimary: COLORS.primary,
          colorLink: COLORS.primary,
          // colorBgContainerDisabled: COLORS.colorBgContainerDisabled,
          // colorTextDisabled: COLORS.white,
        },
        // components: {
        //   Input: {
        //     controlHeight: 54,
        //     borderRadius: 100, // Ví dụ về việc thay đổi bo tròn
        //     padding: 5, // Thay đổi padding
        //     fontSize: 16, // Kích thước chữ
        //     colorText: "#333333", // Màu chữ
        //     colorBorder: "#e0e0e0", // Màu viền
        //   },
        // },
      }}
    >
      {props.children}
    </ConfigProvider>
  );
};

export default ThemeAntDesign;
