import Image from "next/image";

import { Layout } from "@/src/components/lib/Layout";
import { GetStarted } from "@/src/components/lib/Button/GetStarted";
import { Variant } from "@/src/components/lib/types";

export function FosterCommunity() {
  return (
    <Layout.Grid className="items-center snap-start h-[512px] my-8">
      <div>
        <h2>Foster Community</h2>
        <p>
          Even the smallest change can cause a massive impact, but you shouldn’t
          have to go at it alone. Through shared resources and stories, we want
          to bring everyone together. We want to promote the little corner shops
          and local makers. Provide a space where people can ask questions and
          provide guidance to others.
        </p>
        <p>
          We are nurturing a platform where our local communities can thrive.
        </p>
        <GetStarted variant={Variant.primary} />
      </div>
      <div className="flex justify-center">
        <Image
          src="/assets/home-section-1.png"
          alt={""}
          width={512}
          height={512}
        />
      </div>
    </Layout.Grid>
  );
}
