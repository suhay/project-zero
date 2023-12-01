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
  tag: ReactNode;
  img: {
    src: string;
    alt: string;
  };
  provider: string | undefined;
  title?: string | undefined;
  environment?: string | number;
  quality?: string | number;
  modal?: ReactNode;
}) => {
  return (
    <div className="border rounded-md relative my-4">
      <p className="absolute right-0 top-1">{tag}</p>
      <Image src={img.src} alt={img.alt} width={400} height={600} />
      <div className="m-6">
        <p>{provider}</p>
        <p>{title}</p>
      </div>
      <div className="m-6">
        <div>
          <Card.Bar description="Environment" stat={environment || "N/A"} />
        </div>
        <div className="my-2">
          <Card.Bar description="Quality" stat={quality || "N/A"} />
        </div>
        {modal}
      </div>
    </div>
  );
};

export default Product;
