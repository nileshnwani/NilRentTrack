'use client';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

const PropertyImages = ({ image }) => {
  // Ensure image is a string, fallback to a default image if empty
  const validImage = image ? `/uploads/${image}` : "/default_image.png";

  return (
    <Gallery>
      <section className='bg-blue-50 p-4'>
        <div className='container mx-auto text-center'>
          <Item original={validImage} thumbnail={validImage} width='1000' height='600'>
            {({ ref, open }) => (
              <Image
                ref={ref}
                onClick={open}
                src={validImage}
                alt='Property image'
                className='object-cover h-[400px] mx-auto rounded-xl cursor-pointer'
                width={800}
                height={400}
                priority={true}
              />
            )}
          </Item>
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
