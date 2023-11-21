export function Grid({
  children,
  className,
}: {
  children: React.ReactNode[];
  className?: string;
}) {
  const numberOf = children.length;
  const basis = `basis-1/${numberOf}`;

  return (
    <div className={`flex ${className}`}>
      {children.map((col, i) => (
        <div key={i} className={`flex-1 ${basis}`}>
          {col}
        </div>
      ))}
    </div>
  );
}
