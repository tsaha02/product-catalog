export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="h-5 bg-gray-100 w-32 mb-5 animate-pulse" />
      <div className="flex gap-2 mb-5 flex-wrap">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-7 w-20 bg-gray-100 animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="border bg-white">
            <div className="aspect-square bg-gray-100 animate-pulse" />
            <div className="p-3 flex flex-col gap-2">
              <div className="h-3 bg-gray-100 w-1/2 animate-pulse" />
              <div className="h-4 bg-gray-100 w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-100 w-1/4 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
