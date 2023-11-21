import Image from "next/image";
import { Button } from "@/src/components/lib/Button";
import { Layout } from "@/src/components/lib/Layout";

function HeroWrapper(props: { children: React.ReactNode }) {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 h-screen max-h-[846px] bg-primary-500">
      {props.children}
    </div>
  );
}

const Home = () => {
  return (
    <div>
      <HeroWrapper>
        <Image
          src="/assets/image.png"
          alt=""
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          layout="fill"
          className="absolute inset-x-0  -z-10 transform-gpu overflow-hidden sm:-top-80"
        />
        <Layout.Grid className="h-1/2 items-center">
          <div className="text-left">
            <h1 className="display">Start your zero-waste journey with us!</h1>
            <p>The hardest part is knowing where to begin, but we can help.</p>
            <div className="mt-2 flex items-center justify-start gap-x-6">
              <Button.GetStarted />
              <Button.LearnMore />
            </div>
          </div>
          <Layout.Spacer />
        </Layout.Grid>
      </HeroWrapper>
      <div className="">
        <div className="flex">
          <div className="basis-1/2">
            <h2>Reduce Waste</h2>
            <p>
              Our ultimate goal is to reduce the amount of waste in landfills.
              The less piling up, the less potential threat from chemicals
              leaching into the soil and the water supplies our children and
              pets drink from as garbage decays. But how can you be sure you’re
              making a good decision? How can you be confident that your
              products work and prevent unnecessary waste?
            </p>
            <p>
              That’s where we come in! Through our rigorous vetting and
              research, we find companies and products that aren’t greenwashing
              their customers while encouraging fellow enthusiasts to provide
              ratings on whether or not the product works. From there, we leave
              the decision-making to you, knowing that you’re making the right
              one for your family.
            </p>
          </div>
          <div className="basis-1/2">IMAGE</div>
        </div>
        <div className="flex">
          <div className="basis-1/2">IMAGE</div>
          <div className="basis-1/2">
            <h2>Raise Awareness</h2>
            <p>
              Figuring out where to begin is one of the hardest parts of
              starting a zero-waste journey. We’ve all been there here at
              ZeroIn, and that’s why we’re here today! By providing education
              and tips to everyone, we make it easier to manage your next steps
              while not losing sight of what you’re currently doing or where you
              want to go.
            </p>
            <p>
              Think you have something to teach? Then join us and spread what
              you’ve learned!
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="basis-1/2">
            <h2>Foster Community</h2>
            <p>
              Even the smallest change can cause a massive impact, but you
              shouldn’t have to go at it alone. Through shared resources and
              stories, we want to bring everyone together. We want to promote
              the little corner shops and local makers. Provide a space where
              people can ask questions and provide guidance to others.
            </p>
            <p>
              We are nurturing a platform where our local communities can
              thrive.
            </p>
          </div>
          <div className="basis-1/2">IMAGE</div>
        </div>
        <div>
          We don’t need a handful of people doing zero waste perfectly. We need
          millions of people doing it imperfectly. ~ Anne-Marie Bonneau
        </div>
      </div>
    </div>
  );
};

export default Home;
