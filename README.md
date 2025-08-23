Newsroom: A Dynamic News Website
Newsroom is a modern, responsive, and dynamic news aggregator built with Vanilla JavaScript, HTML, and CSS. It fetches real-time news articles from the NewsAPI, providing a clean and fast user experience.

Features ✨
Dynamic Content: News articles are fetched and rendered dynamically based on user navigation.

Multiple Categories: Browse news by categories like Home (General), Health, Politics, Business, Technology, Sports, and Entertainment.

Search Functionality: A search bar allows users to find news articles by keyword.

Responsive Design: The layout adapts gracefully to different screen sizes, from desktops to mobile phones.

Performance-Oriented UI: Implemented with skeleton loading states for a better user experience while data is being fetched.

Component-Based Architecture: The JavaScript is structured into modular components, making the code reusable and easy to maintain.

Tech Stack 💻
Frontend: HTML, CSS, JavaScript

API: NewsAPI for fetching news headlines and search results.

Getting Started 🚀
Follow these steps to get a local copy of the project up and running on your machine.

Prerequisites
You need a web browser and a code editor. No special servers or dependencies are required.

Installation
Clone the repository:

Bash

git clone https://github.com/Currentsparrow/NewsRoom.git
cd NEWSROOM
Get a NewsAPI Key:

Go to https://newsapi.org/register and sign up for a free API key.

The API key is required to fetch news data. The key is currently hardcoded in fetch.js, but for a production environment, it is best practice to use environment variables.

Run the Project:

Open the index.html file in your preferred web browser. You can do this by simply double-clicking the file or using a Live Server extension in your code editor (e.g., VS Code).

File Structure 📁
The project is organized into a clean and logical file structure:

newsroom/
├── index.html        # Main HTML file for the website
├── styles.css        # All styling, including responsive design and animations
├── script.js         # Core application logic, including state management and rendering
├── components.js     # Reusable UI components (news cards, skeletons, etc.)
└── fetch.js          # Dedicated file for all API calls and data handling
Future Enhancements 📈
Backend Integration: Integrate a backend to manage the API key securely.

Advanced State Management: Implement a more advanced state management pattern for larger applications.

User Authentication: Add user accounts to allow for personalized news feeds and saved articles.

Pagination: Implement pagination to load more articles as the user scrolls, improving performance.

Accessibility: Improve accessibility features for users with disabilities (e.g., ARIA roles, better keyboard navigation).

Credits 🤝
NewsAPI: For providing the API used to power this website.

Unsplash/Picsum: For placeholder images.