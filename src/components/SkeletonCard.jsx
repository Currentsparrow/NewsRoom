export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="card-content">
        <div className="skeleton-text long"></div>
        <div className="skeleton-text medium"></div>
        <div className="skeleton-text short"></div>
        <div className="skeleton-text date"></div>
      </div>
    </div>
  );
}