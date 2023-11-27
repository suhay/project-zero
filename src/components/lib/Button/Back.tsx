import { useRouter } from "next/navigation";
import { CornerUpLeft } from "react-feather";

export function Back() {
  const router = useRouter();
  if (!router) {
    return null;
  }

  const goBack = () => {
    router.back();
  };

  return (
    <button
      className="text-10xl py-4 my-auto hover:text-green-400"
      onClick={goBack}
    >
      <CornerUpLeft />
    </button>
  );
}
