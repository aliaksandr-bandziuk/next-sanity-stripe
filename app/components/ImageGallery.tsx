'use client';
import Image from "next/image"
import { urlFor } from "../sanity"
import { useState } from "react"

interface iAppProps {
  images: any
}

const ImageGallery = ({ images }: iAppProps) => {
  
  const [bigImage, setBigImage] = useState(images[0]);

  const handleSmallImageClick = (image: any) => {
    setBigImage(image);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image: any, idx: any) => (
          <div
            key={idx}
            className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(image).url()}
              alt="photo of product"
              width={200}
              height={200}
              className="w-full h-full object-center object-cover cursor-pointer"
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>
      <div className="lg:col-span-4">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
          <Image
            src={urlFor(bigImage).url()}
            alt="big photo of product"
            width={500}
            height={500}
            className="w-full h-full object-center object-cover"
          />
          <span className="absolute top-0 left-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">sale</span>
        </div>
      </div>
    </div>
  )

}

export default ImageGallery