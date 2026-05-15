export default function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-sm text-gray-500">
      ★ {rating.toFixed(1)}
    </span>
  );
}
