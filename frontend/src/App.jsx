import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/ReportPage";
import ReportsHistory from "./pages/ReportsHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/reports-history" element={<ReportsHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;