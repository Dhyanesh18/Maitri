import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RiveHero from "./components/RiveHero";
import Home from "./pages/Home";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Sessions from "./pages/Sessions";
import Progress from "./pages/Progress";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RiveHero />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="progress" element={<Progress />} />
          <Route path="resources" element={<Resources />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
