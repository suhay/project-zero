import ProgressBar from "@ramonak/react-progress-bar";

export function Bar({
  description,
  stat,
}: {
  description: string | undefined;
  stat: string | number;
}) {
  return (
    <div className="">
      <p className="">{description}</p>
      <ProgressBar completed={stat} maxCompleted={100} />
    </div>
  );
}
