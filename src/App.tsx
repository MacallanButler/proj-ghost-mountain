import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import HomePage from "@/pages/Home";
import StoryPage from "@/pages/Story";

import ConservationPage from "@/pages/Conservation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="story" element={<StoryPage />} />
          <Route path="conservation" element={<ConservationPage />} />
          <Route path="about" element={<div className="p-20 text-center">About (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
