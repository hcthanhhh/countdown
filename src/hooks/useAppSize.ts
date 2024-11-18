'use client';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

// Giá trị layout cố định
const layoutSize = {
  LAYOUT_HEADER_HEIGHT: 0,
  LAYOUT_FOOTER_HEIGHT: 0,
  PAGE_HEADER_HEIGHT: 64,
};

function useAppSize() {
  const { LAYOUT_FOOTER_HEIGHT, LAYOUT_HEADER_HEIGHT, PAGE_HEADER_HEIGHT } = layoutSize;

  const [dimensions, setDimensions] = useState({
    height: 1200,
    width: 1200,
  });

  // Sử dụng `useLayoutEffect` để đảm bảo mã chỉ chạy trên client
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
  }, []);

  // Lắng nghe thay đổi kích thước cửa sổ
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Hàm xử lý thay đổi kích thước với debounce
    const resizeListener = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  // Sử dụng `useMemo` để tính toán giá trị layout
  const heightWithFooterHeader = useMemo(
    () => dimensions.height - LAYOUT_FOOTER_HEIGHT - LAYOUT_HEADER_HEIGHT,
    [dimensions.height, LAYOUT_FOOTER_HEIGHT, LAYOUT_HEADER_HEIGHT],
  );
  const heightWithHeader = useMemo(
    () => dimensions.height - LAYOUT_HEADER_HEIGHT,
    [dimensions.height, LAYOUT_HEADER_HEIGHT],
  );
  const heightWithFooter = useMemo(
    () => dimensions.height - LAYOUT_FOOTER_HEIGHT,
    [dimensions.height, LAYOUT_FOOTER_HEIGHT],
  );
  const innerAppHeight = useMemo(
    () => heightWithFooterHeader - PAGE_HEADER_HEIGHT,
    [heightWithFooterHeader, PAGE_HEADER_HEIGHT],
  );
  const innerAppWidth = useMemo(() => dimensions.width - 1, [dimensions.width]);

  return {
    heightWithFooterHeader,
    heightWithFooter,
    heightWithHeader,
    innerAppHeight,
    innerAppWidth,
  };
}

export default useAppSize;
