export default function ProductDetailLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-100 animate-pulse" />
        <div className="flex flex-col gap-3">
          <div className="h-3 bg-gray-100 w-1/4 animate-pulse" />
          <div className="h-5 bg-gray-100 w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-100 w-full animate-pulse" />
          <div className="h-4 bg-gray-100 w-5/6 animate-pulse" />
          <div className="h-8 bg-gray-100 w-24 mt-4 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
