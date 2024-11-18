import Image from 'next/image';
import type { FC } from 'react';

import NotFoundImage from '@/assets/images/not_found.png';

interface Props {
  title: string;
  description: string;
}

const NotFound: FC<Props> = ({ title, description }) => {
  return (
    <div className='flex h-[100%] flex-col items-center justify-center rounded-lg bg-white p-10'>
      <Image src={NotFoundImage} className='h-auto w-[200px] object-cover' alt='' />
      <p className='mt-4 text-xl font-bold'>{title}</p>
      <p className=' text-gray mt-2'>{description}</p>
    </div>
  );
};

export default NotFound;
