import Image from "next/image";

import { Button } from "@/src/components/lib/Button";
import { Layout } from "@/src/components/lib/Layout";
import { ReduceWaste } from "@/src/components/LandingPage/ReduceWaste";
import { RaiseAwareness } from "@/src/components/LandingPage/RaiseAwareness";
import { FosterCommunity } from "@/src/components/LandingPage/FosterCommunity";
import { Goals } from "@/src/components/LandingPage/Goals";
import { Feed } from "@/src/components/Community/Feed";
import { AnneMarieBonneau } from "@/src/components/Quotes/AnneMarieBonneau";
import { AlphaTesterForm } from "@/src/components/SignupForms/AlphaTester";

function HeroWrapper(props: { children: React.ReactNode }) {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 h-screen max-h-[846px] bg-primary-500">
      {props.children}
    </div>
  );
}

const Home = () => {
  return (
    <div data-testid="home-page">
      <HeroWrapper>
        <Image
          src="/assets/home.png"
          alt=""
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          fill
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden sm:-top-80"
        />
        <Layout.Grid
          className="h-1/2 items-center container mx-auto"
          basis={["basis-2/3", "basis-1/3"]}
        >
          <div className="text-left">
            <h1 className="display">Start your zero-waste journey with us!</h1>
            <p>The hardest part is knowing where to begin, but we can help.</p>
            <div className="mt-2 flex items-center justify-start gap-x-6">
              <Button.Link label="Get Started" href="/signup" />
              <Button.LearnMore href="/" />
            </div>
          </div>
          <Layout.Spacer />
        </Layout.Grid>
      </HeroWrapper>
      <div className="container mx-auto">
        <ReduceWaste />
        <RaiseAwareness />
        <FosterCommunity />
      </div>
      <AnneMarieBonneau />
      <Goals />
      <AlphaTesterForm />
      <Feed />
    </div>
  );
};

export default Home;
