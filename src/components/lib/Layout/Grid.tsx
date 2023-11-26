export function Grid({
  children,
  className,
  basis,
}: {
  children: React.ReactNode[];
  className?: string;
  basis?: string[];
}) {
  const numberOf = children.length;
  const b = `basis-1/${numberOf}`;

  return (
    <div className={`flex ${className}`}>
      {children.map((col, i) => (
        <div
          key={i}
          className={`flex-1 ${basis?.length === numberOf ? basis[i] : b}`}
        >
          {col}
        </div>
      ))}
    </div>
  );
}
