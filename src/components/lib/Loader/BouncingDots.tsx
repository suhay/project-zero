export function BouncingDots({ color = "bg-black-900" }: { color?: string }) {
  return (
    <div className="flex space-x-1 items-center">
      <span className="sr-only">Loading...</span>
      <div
        className={`h-3 w-3 ${color} rounded-full animate-bounce [animation-delay:-0.3s]`}
      ></div>
      <div
        className={`h-3 w-3 ${color} rounded-full animate-bounce [animation-delay:-0.15s]`}
      ></div>
      <div className={`h-3 w-3 ${color} rounded-full animate-bounce`}></div>
    </div>
  );
}
