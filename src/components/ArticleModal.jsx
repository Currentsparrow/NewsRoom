import React from "react";
export function ArticleModal({ article, onClose, onBookmark, isBookmarked }) {
  if (!article) return null;
  return (
    <div className="modal-backdrop" tabIndex={-1} aria-modal="true" role="dialog" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
        <img src={article.urlToImage} alt={article.title} style={{ width: "100%", borderRadius: 8 }} />
        <h2>{article.title}</h2>
        <p style={{ color: "#888", fontSize: "0.9rem" }}>{article.author} | {new Date(article.publishedAt).toLocaleString()}</p>
        <p>{article.description}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">Read full article</a>
        <button
          className="bookmark-btn"
          onClick={onBookmark}
          aria-label={isBookmarked ? "Remove bookmark" : "Add to bookmarks"}
          style={{ marginTop: 16 }}
        >
          {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
        </button>
      </div>
    </div>
  );
}