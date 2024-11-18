import Image from 'next/image';

import image1 from '@/assets/images/IMG_1891.jpeg';
import image2 from '@/assets/images/1711D8D8-8A57-492C-8718-5128296A00AA.jpeg';
import image3 from '@/assets/images/279afae18da04694119df8ed76814ab4.jpeg';
import image4 from '@/assets/images/A0C0223A-F200-43FD-AAE8-C475CFA91D57.jpeg';
import image5 from '@/assets/images/CAF916C1-714C-4424-AD8E-6ACAD25C1802.jpeg';
import image6 from '@/assets/images/FBF9E805-C707-4402-AE90-48227AB8898E.jpeg';
import image7 from '@/assets/images/IMG_0418.jpeg';
import image8 from '@/assets/images/IMG_0629 2.jpeg';
import image9 from '@/assets/images/IMG_1059.jpeg';
import image10 from '@/assets/images/IMG_1464.jpeg';
import image11 from '@/assets/images/IMG_1745.jpeg';
import image12 from '@/assets/images/IMG_1843.jpeg';
import image15 from '@/assets/images/IMG_2151.jpeg';
import image16 from '@/assets/images/IMG_2210.jpeg';
import image17 from '@/assets/images/IMG_2460.jpeg';
import image18 from '@/assets/images/IMG_2473.jpeg';
import image19 from '@/assets/images/IMG_2608.jpeg';
import image20 from '@/assets/images/IMG_2739.jpg';
import image21 from '@/assets/images/IMG_2883.jpeg';
import image22 from '@/assets/images/IMG_3249.jpeg';
import image23 from '@/assets/images/IMG_3527.jpeg';
import image24 from '@/assets/images/IMG_3655.jpeg';
import image25 from '@/assets/images/IMG_3897.jpeg';
import image26 from '@/assets/images/IMG_4156.jpeg';
import image27 from '@/assets/images/IMG_4456.jpeg';
import image28 from '@/assets/images/IMG_4966.jpeg';
import image29 from '@/assets/images/IMG_4974.jpeg';
import image30 from '@/assets/images/IMG_5089.jpeg';
import image31 from '@/assets/images/IMG_5159.jpeg';
import image32 from '@/assets/images/IMG_5165.jpeg';
import image33 from '@/assets/images/IMG_5609.jpeg';
import image35 from '@/assets/images/IMG_5811.jpeg';
import image36 from '@/assets/images/IMG_5883.jpeg';
import image37 from '@/assets/images/IMG_5940.jpeg';
import image38 from '@/assets/images/IMG_5941.jpeg';
import image39 from '@/assets/images/IMG_5975.jpeg';
import image41 from '@/assets/images/IMG_6100.jpeg';
import image42 from '@/assets/images/IMG_6279.jpeg';
import image43 from '@/assets/images/IMG_6527.jpeg';
import image44 from '@/assets/images/IMG_6641.jpeg';
import image45 from '@/assets/images/IMG_6732.jpeg';
import image46 from '@/assets/images/IMG_8830.jpeg';
import image47 from '@/assets/images/IMG_9033.jpeg';

const Gallery = () => {
  const imageList = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image15,
    image16,
    image17,
    image18,
    image19,
    image20,
    image21,
    image22,
    image23,
    image24,
    image25,
    image26,
    image27,
    image28,
    image29,
    image30,
    image31,
    image32,
    image33,
    image35,
    image36,
    image37,
    image38,
    image39,
    image41,
    image42,
    image43,
    image44,
    image45,
    image46,
    image47,
  ];

  return (
    <div className='columns-2 md:columns-3 lg:columns-3 gap-4 px-4 py-8 mx-20'>
      {imageList.map((src, index) => (
        <div key={index} className='mb-4 break-inside-avoid'>
          <Image
            src={src}
            alt={`Gallery Image ${index + 1}`}
            width={500} // Adjust width based on image size
            height={Math.random() * 400 + 200} // Random height for variety
            layout='responsive'
            objectFit='cover'
            className='rounded-lg shadow-md'
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
