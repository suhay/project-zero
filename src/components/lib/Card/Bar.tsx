import ProgressBar from "@ramonak/react-progress-bar";

export function Bar({
  description,
  stat,
}: {
  description: string | undefined;
  stat: string | number;
}) {
  return (
    <div>
      <p className="my-2">{description}</p>
      <ProgressBar className="w-5/6 mx-3" completed={stat} maxCompleted={100} />
    </div>
  );
}
