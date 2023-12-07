import React, { ReactNode } from "react";
import Image from "next/image";
import { Card } from ".";

const Product = ({
  tag,
  img,
  provider,
  title,
  environment,
  quality,
  modal,
}: {
  tag: string | ReactNode;
  img: {
    src: string;
    alt: string;
  };
  provider: string | undefined | ReactNode;
  title?: string | undefined | ReactNode;
  environment?: string | number;
  quality?: string | number;
  modal?: ReactNode;
}) => {
  return (
    <div className="border rounded-lg relative p-4 mb-5 mt-3">
      <p className="absolute right-0 top-1">{tag}</p>
      <Image
        src={img.src}
        alt={img.alt}
        width={300}
        height={300}
        className="rounded-lg"
      />
      <div className="py-2 w-[280px]">
        <div className="mx-3">
          <p>{provider}</p>
          <p>{title}</p>
          <Card.Bar description="Environment" stat={environment || "N/A"} />
          <Card.Bar description="Quality" stat={quality || "N/A"} />
        </div>
        <div className="my-3">{modal}</div>
      </div>
    </div>
  );
};

export default Product;
