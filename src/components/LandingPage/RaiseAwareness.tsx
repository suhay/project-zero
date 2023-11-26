import Image from "next/image";

import { Layout } from "@/src/components/lib/Layout";
import { GetStarted } from "../lib/Button/GetStarted";
import { Variant } from "../lib/types";

export function RaiseAwareness() {
  return (
    <Layout.Grid className="items-center h-[512px] snap-start my-8">
      <div className="flex justify-center">
        <Image
          src="/assets/home-section-2.png"
          alt={""}
          width={512}
          height={512}
        />
      </div>
      <div>
        <h2>Raise Awareness</h2>
        <p>
          Figuring out where to begin is one of the hardest parts of starting a
          zero-waste journey. We’ve all been there here at ZeroIn, and that’s
          why we’re here today! By providing education and tips to everyone, we
          make it easier to manage your next steps while not losing sight of
          what you’re currently doing or where you want to go.
        </p>
        <p>
          Think you have something to teach? Then join us and spread what you’ve
          learned!
        </p>
        <GetStarted variant={Variant.primary} />
      </div>
    </Layout.Grid>
  );
}
