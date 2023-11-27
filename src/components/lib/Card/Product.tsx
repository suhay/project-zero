import React from "react";
import Image from "next/image";

const Product = ({
  tag,
  img,
  provider,
  title,
  environment,
  quality,
}: {
  tag: string | undefined;
  img: {
    src: string;
    alt: string;
  };
  provider: string | undefined;
  title: string | undefined;
  environment: string | undefined;
  quality: string | undefined;
}) => {
  return (
    <div className="">
      <p>{tag}</p>
      <Image
        src={img.src}
        alt={img.alt}
        width={400}
        height={400}
        className="border-red-600"
      />
      <p>{provider}</p>
      <p>{title}</p>
      <p>{environment}</p>
      <p>{quality}</p>
    </div>
  );
};

export default Product;
