# Affordmed URL Shortener (React Frontend)

This project is a client-side React application built for the Affordmed Campus Hiring Assessment. It allows users to shorten URLs, optionally provide custom shortcodes and expiration times, and view analytics for each shortened URL. All functionalities are handled entirely on the frontend.

---

## Features

- Custom logging middleware (replaces console.log)
- Shortens up to 5 URLs at a time
- Supports custom shortcodes and validity in minutes
- Defaults to 30 minutes if no validity is provided
- Prevents shortcode collisions
- Handles redirection from short URL to original
- Tracks click analytics: time, source, and mock location
- Uses localStorage for persistence
- Built using React and Material UI
- Client-side routing and error handling

---
```
## Folder Structure

src/
├── components/
│ ├── URLForm.jsx
│ └── URLStats.jsx
├── context/
│ └── LoggerContext.js
├── pages/
│ ├── HomePage.jsx
│ ├── StatsPage.jsx
│ └── RedirectPage.jsx
├── App.jsx
├── index.js

```



---

## Technologies Used

- React 18
- Material UI
- React Router DOM
- nanoid (for generating random shortcodes)
- @faker-js/faker (for mocking location and user agent)

---

## Setup Instructions

1. Clone the repository:

```


npm install
Start the development server

npm start
Open the app in your browser at:


http://localhost:3000
How to Use the App
On the homepage, enter up to 5 long URLs.

```

Optionally provide a custom shortcode and validity period (in minutes).

Submit the form to generate shortened links.

Click any short link to test redirection.

Visit /stats to view full analytics including:

Total click count

Time of each click

User agent and mock location

Assessment Requirements Coverage
Custom logging (via LoggerContext)

URL shortening with shortcode uniqueness

Default validity when unspecified

Input validation on URL, shortcode, validity

Redirection using React Router

Click analytics captured in localStorage

Fully responsive UI built with Material UI

No authentication or backend usage as specified

Notes
All data is stored in the browser's localStorage and will persist between sessions unless cleared.

The geo-location and source are generated using mock data for demonstration purposes.

No API requests are made; the app is entirely frontend-based.

Author
Krishan Mohan
GitHub: github.com/krishanmohan1