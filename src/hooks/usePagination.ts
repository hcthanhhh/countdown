import { PAGE_SIZE } from '@/common/constants';
import { useState } from 'react';

const usePagination = <T>() => {
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalEvents, setTotalEvents] = useState<number>();
  const [apiData, setApiData] = useState<T[]>([]);

  return {
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    totalEvents,
    setTotalEvents,
    apiData,
    setApiData,
  };
};
export { usePagination };
