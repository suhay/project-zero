import { Layout } from "../lib/Layout";
import { Card } from "../lib/Card";

export function Goals() {
  return (
    <section className="w-screen bg-secondary-500 flex items-center justify-center py-20">
      <Layout.Grid className="container">
        <div className="pr-5">
          <h1>
            We’re a small team with a big dream and this is where we want to go
            in the next year.
          </h1>
        </div>
        <div className="gap-y-5">
          <Layout.Grid>
            <Card.Stat description="Community Goals Completed" stat="500+" />
            <Card.Stat
              description="Pounds of single use packaging prevented"
              stat="150,000+"
            />
          </Layout.Grid>
          <Layout.Grid>
            <Card.Stat description="Local Places Shared" stat="115+" />
            <Card.Stat
              description="Zero-waste product alternatives found"
              stat="3,400+"
            />
          </Layout.Grid>
        </div>
      </Layout.Grid>
    </section>
  );
}
