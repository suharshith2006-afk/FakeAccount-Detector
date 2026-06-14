# Fake Account Detection Platform — Security Analytics Dashboard 🛡️📊

A modern, client-side fraud detection interface built to identify suspicious social media profiles through behavioral scoring, risk classification, and visual analytics. This standalone web app is designed as a polished security dashboard for desktop or local network deployment inside offline review environments.

---

## 🚀 Live Demo

🌐 Explore the fake account detector : https://https://fakeaccount-detector.netlify.app//

---

## 📋 Project Overview

This project presents a complete user-facing security analytics dashboard for detecting fake and suspicious accounts. The interface is built as a single-page application with a fixed sidebar navigation system, trend monitoring cards, report tables, and a CSV batch upload workflow. It is engineered to run locally in a browser, with all main functionality handled through client-side JavaScript.

---

## 💡 Key Features

* **Interactive Dashboard Navigation:** Persistent left sidebar and top navigation buttons drive single-page view switching across Dashboard, Analyze Account, Trends, and Reports.
* **Account Intelligence Engine:** Local account lookup and scoring based on age, follower/following ratios, posting behavior, and anomaly heuristics.
* **CSV Batch Analysis:** Drag-and-drop CSV upload with automatic parsing and bulk suspicion score generation for multiple accounts.
* **Risk Classification System:** Visual categorization into Genuine, Suspicious, and Fake classes with risk-level badges and progress indicators.
* **Trend Monitoring UI:** High-impact content trends and alert-style status cards for monitoring possible coordinated fraud signals.
* **Responsive Visual Design:** Clean CSS layout with cards, tables, and interactive button states tuned for modern analytics dashboards.

---

## 🛠️ Technology Stack & Tools Used

* **Core Application Structure:** HTML5 (semantic markup, dashboard sections)
* **Design Systems & Interaction Physics:** CSS3 (flexbox layout, responsive grid, status badges)
* **Client Logic Engine:** JavaScript (ES6 DOM APIs, event handlers, CSV parsing, scoring model)
* **Local Deployment Environment:** Browser-hosted static site for offline or local network review

---

## 📂 Project Directory Structure

```text
fake-account-detector/
│
├── index.html          # Main dashboard and account analysis interface
├── css/
│   └── styles.css      # Application theme, layout, and responsive styling 
├── js/
│   └── app.js          # Core behavior, account scoring, CSV parser, and view switching
├── data.csv            # Sample dataset format for bulk analysis
└── README.md           # Project documentation and usage guide
```

---

## ⚙️ Local Deployment & Execution

To run the project locally on your machine:

1. Clone the Repository: git clone https://github.com/suharshith2006-afk/FakeAccount-Detector.git
2. 2. Copy the repository folder into your local web server root (for example, `C:\xampp\htdocs\fake-account-detector`).
3. Start your local web server stack (XAMPP Apache, WAMP, or similar).
4. Open your browser and navigate to: `http://localhost/fake-account-detector/`
5. Use the Analyze Account panel to search sample accounts or upload a CSV file for bulk scoring.

---

## 📌 Notes

* The application is built for browser-based local analysis and does not require any backend to render the UI or perform client-side scoring.
* `app.js` includes a placeholder `DETECTION_API_BASE_URL` constant for optional backend integration if a server-side validation endpoint is added later.

---

### ⚖️ Legal & Academic Disclosure

Developed as a software portfolio and academic project asset focused on security analysis and fraud detection workflows. This software is provided for educational and demonstrative use only, without implied warranties of merchantability or fitness for any particular purpose.

All rights reserved © 2026.
