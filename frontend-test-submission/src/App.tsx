import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShortenerPage from "./pages/ShortenerPage";
import StatsPage from "./pages/StatsPage";
import RedirectHandler from "./pages/RedirectHandler";
import './App.css';

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkdWFhdm5pMUBnbWFpbC5jb20iLCJleHAiOjE3NTI0NzUyMTYsImlhdCI6MTc1MjQ3NDMxNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImQ4MDc2OTgzLTUyNTYtNDA0OS05NjFlLWE2M2VlYzllMTkyZSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImF2bmkgZHVhIiwic3ViIjoiNWY4NzE1YjktMjBlZC00NjllLWI1NjMtOWUyODcxOGYxMDQ1In0sImVtYWlsIjoiZHVhYXZuaTFAZ21haWwuY29tIiwibmFtZSI6ImF2bmkgZHVhIiwicm9sbE5vIjoiMTIyMDg5MTkiLCJhY2Nlc3NDb2RlIjoiQ1p5cFFLIiwiY2xpZW50SUQiOiI1Zjg3MTViOS0yMGVkLTQ2OWUtYjU2My05ZTI4NzE4ZjEwNDUiLCJjbGllbnRTZWNyZXQiOiJBQkJhYmNLSERrQVJ0bXNDIn0.-yx4KK0mfWSsGRyewexpgDt1q0Hr-pxRCPku6PUULW4"; // Replace with a placeholder if needed

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/">Shorten</Link>
          <Link to="/stats">Stats</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<ShortenerPage authToken={authToken} />} />
            <Route path="/stats" element={<StatsPage authToken={authToken} />} />
            <Route path="/:shortCode" element={<RedirectHandler />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;