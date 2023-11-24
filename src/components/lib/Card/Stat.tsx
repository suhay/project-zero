export function Stat({
  description,
  stat,
}: {
  description: string;
  stat: string;
}) {
  return (
    <div className="mx-auto flex max-w-xs flex-col gap-y-4 p-5">
      <dt className="text-center text-base leading-7 text-gray-600">
        {description}
      </dt>
      <dd className="text-center order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        {stat}
      </dd>
    </div>
  );
}