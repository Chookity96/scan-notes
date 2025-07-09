# 🧠 Scan Notes Manager

A simple prototype for a Scan Notes Manager — used by clinicians to view patient scans and record short structured notes.

This is a full-stack project with:

- ⚛️ React 18 + TypeScript + Tailwind CSS (Vite)
- 🌐 ASP.NET Core 6 Minimal API (C#)
- 🧠 In-memory storage (no DB required)

---

## 🔧 Features

- View list of mock patient scans
- Select a scan to view all associated notes
- Add a new note (title + content)
- Form validation and instant feedback
- Simple responsive UI

---

## 🧪 Tech Stack

### Frontend

- React 18+ (Vite)
- TypeScript
- Tailwind CSS
- Redux

### Backend

- .NET 6 Minimal API (C#)
- Swagger UI enabled
- In-memory singleton data storage
- CORS enabled for frontend (`http://localhost:5173`)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Chookity96/scan-notes.git
cd scan-notes
```

### 2. Start the Backend

```bash
cd scan-notes-api
dotnet run
```

Backend should be running on your current terminal.
Open up http://localhost:7075 on your browser to view Swagger UI (has been set up for testing api easily).

Note: if facing any cert issues, run:

```bash
dotnet dev-certs https --trust
```

### 3. Start the Frontend

Open up a new terminal and go to 'scan-notes-web'.

```bash
cd scan-notes-web
npm install
npm run dev
```

Open up http://localhost:5173/ (ensure it is this link) on your browser to view application.

Once done testing, you may close the terminals. (Ctrl + c)

### 4. Assumptions and Notes

No authentication or authorization — this is a prototype only.

Scans/Notes are stored in memory and will reset on server restart.

CORS allows localhost frontend only.

Hardcoded sample scan data for demo purposes.

### 5. Estimated Time Spent

~60–70 minutes total:

Backend API: ~20 mins

React components: ~30 mins

Styling, loading, error states: ~20 mins

README + testing: ~5 mins

Feel free to contact me at *jegathees35@gmail.com* if you faced any issues.😊
