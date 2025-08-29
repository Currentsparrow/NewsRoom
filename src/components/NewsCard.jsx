export function NewsCard({ news, onClick }) {
  const defaultImage = 'https://picsum.photos/600';
  const imageUrl = news.urlToImage || defaultImage;
  const publishedDate = new Date(news.publishedAt).toLocaleDateString();

  return (
    <div className="card fade-in">
      <div
        className="card-image-container"
        tabIndex={0}
        role="button"
        aria-label={`Open details for ${news.title}`}
        onClick={onClick}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && onClick()}
        style={{ cursor: "pointer" }}
      >
        <img src={imageUrl} loading="lazy" alt={news.title} />
      </div>
      <div className="card-content">
        <div
          className="card-title"
          tabIndex={0}
          role="button"
          aria-label={`Open details for ${news.title}`}
          onClick={onClick}
          onKeyDown={e => (e.key === "Enter" || e.key === " ") && onClick()}
          style={{ cursor: "pointer", fontWeight: 600, fontSize: "1.1rem", marginBottom: 4 }}
        >
          {news.title}
        </div>
        <div className="card-date" style={{ color: "#888", fontSize: "0.85rem", marginBottom: 8 }}>
          {publishedDate}
        </div>
        <div
          className="card-description"
          style={{
            marginBottom: 12,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            minHeight: 48
          }}
        >
          {news.description || ''}
        </div>
      </div>
    </div>
  );
}