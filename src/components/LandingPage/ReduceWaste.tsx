import Image from "next/image";

import { Layout } from "@/src/components/lib/Layout";
import { Link } from "../lib/Button/Link";

export function ReduceWaste() {
  return (
    <Layout.Grid className="items-center snap-start h-[512px] my-8">
      <div>
        <h2>Reduce Waste</h2>
        <p>
          Our ultimate goal is to reduce the amount of waste in landfills. The
          less piling up, the less potential threat from chemicals leaching into
          the soil and the water supplies our children and pets drink from as
          garbage decays. But how can you be sure you’re making a good decision?
          How can you be confident that your products work and prevent
          unnecessary waste?
        </p>
        <p>
          That’s where we come in! Through our rigorous vetting and research, we
          find companies and products that aren’t greenwashing their customers
          while encouraging fellow enthusiasts to provide ratings on whether or
          not the product works. From there, we leave the decision-making to
          you, knowing that you’re making the right one for your family.
        </p>
        <Link variant="primary" href="/signup" label="Get Started" />
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
