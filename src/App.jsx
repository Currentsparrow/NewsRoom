import { useState, useEffect } from 'react';
import { useNewsApi } from './hooks/useNewsApi';  
import { NewsCard } from './components/NewsCard';
import { SidebarCard } from './components/SidebarCard';
import { SkeletonCard } from './components/SkeletonCard';
import { IntroMessage } from './components/IntroMessage';
import { ArticleModal } from './components/ArticleModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import './App.css';

const CATEGORIES = ['general', 'health', 'politics', 'business', 'technology', 'sports', 'entertainment'];

function App() {

  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalArticle, setModalArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => JSON.parse(localStorage.getItem('bookmarks') || '[]'));
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  
  const { data, loading, error, getNews, getSearchNews } = useNewsApi();
  const sidebarNews = useNewsApi();

 
  useEffect(() => {
    setPage(1); 
    if (searchQuery.length > 2) {
      getSearchNews(searchQuery, undefined, 1);
    } else {
      getNews(category, undefined, 1);
    }
  }, [category, searchQuery]);

 
  useEffect(() => {
    sidebarNews.getNews('general', undefined, 5);
  }, []);


  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (searchQuery.length > 2) {
      getSearchNews(searchQuery, undefined, nextPage, true);
    } else {
      getNews(category, undefined, nextPage, true);
    }
  };


  const handleBookmark = (article) => {
    const exists = bookmarks.some(b => b.url === article.url);
    let updated;
    if (exists) {
      updated = bookmarks.filter(b => b.url !== article.url);
    } else {
      updated = [...bookmarks, article];
    }
    setBookmarks(updated);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  
  const handleArticleClick = (article) => {
    setModalArticle(article);
    setShowModal(true);
  };

  
  const renderMainContent = () => {
    if (loading) {
      const skeletonCount = category === 'general' ? 2 : 6;
      return (
        <div className="news-grid">
          {Array(skeletonCount).fill(null).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      );
    }
    if (error) {
      return <div className="error-message" role="alert">{error}</div>;
    }
    if (data.articles.length === 0) {
      return <div className="no-results-message">No news articles found.</div>;
    }
    const articlesToDisplay = category === 'general' ? data.articles.slice(0, 2) : data.articles;
    return (
      <div className="news-grid fade-in">
        {articlesToDisplay.map((news, index) => (
          <NewsCard
            key={index}
            news={news}
            onClick={() => handleArticleClick(news)}
            isBookmarked={bookmarks.some(b => b.url === news.url)}
            onBookmark={() => handleBookmark(news)}
          />
        ))}
      </div>
    );
  };

 
  const renderBookmarks = () => (
    <div>
      <h3>Bookmarked Articles</h3>
      {bookmarks.length === 0 ? (
        <div>No bookmarks yet.</div>
      ) : (
        bookmarks.map((news, idx) => (
          <SidebarCard key={idx} news={news} />
        ))
      )}
    </div>
  );

  return (
    <ErrorBoundary>
      <div className="app">
        <header className="header" role="banner">
          <div className="header-wrap">
            <h1 tabIndex={0}>Newsroom</h1>
            <div className="nav-container">
              <ul className="nav-menu" role="navigation" aria-label="Categories">
                {CATEGORIES.map((cat) => (
                  <li className="nav-item" key={cat}>
                    <a
                      href="#"
                      className={`nav-link${category === cat ? ' active' : ''}`}
                      data-category={cat}
                      onClick={() => handleCategoryClick(cat)}
                      aria-current={category === cat ? 'page' : undefined}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <input
              type="search"
              className="search"
              placeholder="Search news..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search news"
            />
          </div>
        </header>

        <main className="grid-container" id="main-content-area">
          <div className="main-content">
            {category === 'general' && !searchQuery && <IntroMessage />}
            {renderMainContent()}
           
            {data.articles.length > 0 && (
              <button
                className="load-more-btn"
                onClick={handleLoadMore}
                aria-label="Load more news"
                style={{ margin: '2rem auto', display: 'block' }}
              >
                Load More
              </button>
            )}
          </div>

          <button
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(open => !open)}
            aria-expanded={sidebarOpen}
            aria-controls="sidebar-news-area"
          >
            {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </button>

          <aside
            className={`sidebar${sidebarOpen ? " open" : ""}`}
            id="sidebar-news-area"
            aria-label="Trending and Bookmarks"
          >
            <h3>Trending News</h3>
            {sidebarNews.loading ? (
              <div className="error-message">Loading...</div>
            ) : sidebarNews.error ? (
              <div className="error-message">Failed to load trending news.</div>
            ) : (
              sidebarNews.data.articles.map((news, index) => (
                <SidebarCard key={index} news={news} onClick={() => handleArticleClick(news)} />
              ))
            )}
            <hr />
            {renderBookmarks()}
          </aside>
        </main>

        <footer className="footer" role="contentinfo">
          <div className="footer-content">
            <span>&copy; 2025 Newsroom. All rights reserved.</span>
          </div>
        </footer>

        
        {showModal && modalArticle && (
          <ArticleModal
            article={modalArticle}
            onClose={() => setShowModal(false)}
            onBookmark={() => handleBookmark(modalArticle)}
            isBookmarked={bookmarks.some(b => b.url === modalArticle.url)}
          />
        )}
      </div>
    </ErrorBoundary>
  );

 
  function handleCategoryClick(newCategory) {
    setCategory(newCategory);
    setSearchQuery('');
  }
}

export default App;