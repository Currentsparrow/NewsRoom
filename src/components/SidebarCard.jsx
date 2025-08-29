export function SidebarCard({ news }) {
  const defaultImage = 'https://picsum.photos/60';
  const imageUrl = news.urlToImage || defaultImage;
  const publishedDate = new Date(news.publishedAt).toLocaleDateString();

  return (
    <div className="sidebar-card">
      <img src={imageUrl} alt={news.title} loading="lazy" />
      <div className="sidebar-card-content">
        <div className="sidebar-card-title">
          <a href={news.url} target="_blank" rel="noopener noreferrer">
            {news.title}
          </a>
        </div>
        <div className="sidebar-card-date">{publishedDate}</div>
      </div>
    </div>
  );
}