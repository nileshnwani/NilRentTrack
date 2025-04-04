"use client";
import { useState } from "react";
import Image from "next/image";

const PropertyHeaderImage = ({ image }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const imageUrl = image || "/default.jpg";

  const fileName = imageUrl.split("/").pop();

  return (
    <section className="mb- p-2">
      <div className="container-xl m-auto">
        {/* Responsive & optimized image display */}
        <div className="relative w-full aspect-[5/2] bg-gray-100 rounded-xl overflow-hidden shadow-md">
          <Image
            src={imageUrl}
            alt={fileName}
            fill
            sizes="100vw"
            className="object-cover" // Changed from object-contain
            priority
            onLoadingComplete={(img) => {
              setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
            }}
            onError={(e) => {
              e.currentTarget.src = "/default.jpg"; // Handle broken images
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
