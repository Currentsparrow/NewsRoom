export const createNewsCard = (news) => {
    const defaultImage = 'https://picsum.photos/600';
    const data = {
        urlImage: news.urlToImage ?? defaultImage,
        date: news.publishedAt,
        title: news.title,
        description: news.description ?? '',
        URL: news.url
    };

    return `
        <div class="card">
            <div class="card-image-container">
                <img src="${data.urlImage}" loading="lazy" alt="${data.title}">
            </div>
            <div class="card-content">
                <div class="card-date">${new Date(data.date).toLocaleDateString()}</div>
                <h2 class="card-title">
                    <a href="${data.URL}" target="_blank" rel="noopener noreferrer">${data.title}</a>
                </h2>
                <p class="card-description">${data.description}</p>
            </div>
        </div>
    `;
};

export const createSidebarCard = (news) => {
    const defaultImage = 'https://picsum.photos/60';
    return `
        <div class="sidebar-card">
            <img src="${news.urlToImage || defaultImage}" alt="${news.title}" loading="lazy">
            <div class="sidebar-card-content">
                <div class="sidebar-card-title">
                    <a href="${news.url}" target="_blank" rel="noopener noreferrer">${news.title}</a>
                </div>
                <div class="sidebar-card-date">${new Date(news.publishedAt).toLocaleDateString()}</div>
            </div>
        </div>
    `;
};

export const createSkeletonCard = () => {
    return `
        <div class="skeleton-card">
            <div class="skeleton-image"></div>
            <div class="card-content">
                <div class="skeleton-text long"></div>
                <div class="skeleton-text medium"></div>
                <div class="skeleton-text short"></div>
                <div class="skeleton-text date"></div>
            </div>
        </div>
    `;
};

export const createIntroMessage = () => {
    return `
        <div class="intro-message">
            <h2>Welcome to Newsroom</h2>
            <p>Your source for breaking news and in-depth stories from around the world. Below are a few featured headlines to get you started.</p>
        </div>
    `;
};