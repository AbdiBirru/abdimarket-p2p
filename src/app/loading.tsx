export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6 space-y-2">
        <div className="h-8 w-2/3 animate-pulse motion-reduce:animate-none rounded-lg bg-line" />
        <div className="h-4 w-1/2 animate-pulse motion-reduce:animate-none rounded-lg bg-line" />
      </div>
      <div className="h-11 animate-pulse motion-reduce:animate-none rounded-full bg-line" />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] animate-pulse motion-reduce:animate-none rounded-2xl bg-line"
          />
        ))}
      </div>
    </div>
  );
}
