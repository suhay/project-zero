import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Img } from "../types";

export type TileProps = {
  title: string;
  name: string;
  subtitle?: string;
  description: string;
} & (
  | {
      href: string;
      onClick?: never;
    }
  | {
      onClick: () => void;
      href?: never;
    }
) &
  (
    | {
        img: Img;
        background?: never;
      }
    | {
        background: React.ReactNode;
        img?: never;
      }
  );

function Wrapper({
  href,
  onClick,
  children,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative block bg-black overflow-hidden border border-secondary-700 rounded-lg shadow-lg md:basis-1/2">
      {href != null && <Link href={href}>{children}</Link>}
      {onClick != null && (
        <div role="button" onClick={onClick}>
          {children}
        </div>
      )}
    </div>
  );
}

function Tile({
  title,
  subtitle,
  description,
  href,
  onClick,
  img,
  background,
}: TileProps) {
  return (
    <Wrapper href={href} onClick={onClick}>
      {img != null && (
        <Image
          src={img.src}
          alt={img.alt}
          className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
          layout="fill"
        />
      )}
      {background != null && (
        <div className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50">
          {background}
        </div>
      )}
      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-sm font-medium uppercase tracking-widest text-primary-500 mb-0">
          {subtitle}
        </p>
        <p className="text-xl font-bold text-primary sm:text-2xl">{title}</p>
        <div className="mt-5">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-primary">{description}</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

type TileGroupProps = {
  children: React.ReactElement<typeof Tile>[];
};

export function Tiles({ children }: TileGroupProps) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
      {children}
    </div>
  );
}

Tiles.Tile = Tile;
