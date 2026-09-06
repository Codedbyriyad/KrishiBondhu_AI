import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";

import { DashboardLayout } from "./layout/DashboardLayout";

import { DashboardHome } from "./pages/dashboard/DashboardHome";
import { AIChat } from "./pages/dashboard/AIChat";
import { DiseaseDetection } from "./pages/dashboard/DiseaseDetection";
import { WeatherView } from "./pages/dashboard/WeatherView";
import { CropGuide } from "./pages/dashboard/CropGuide";
import { FertilizerRecommendation } from "./pages/dashboard/FertilizerRecommendation";
import { Profile } from "./pages/dashboard/Profile";
import { Settings } from "./pages/dashboard/Settings";
import { HistoryView } from "./pages/dashboard/HistoryView";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="chat" element={<AIChat />} />
            <Route path="disease" element={<DiseaseDetection />} />
            <Route path="weather" element={<WeatherView />} />
            <Route path="crop-guide" element={<CropGuide />} />
            <Route
              path="fertilizer"
              element={<FertilizerRecommendation />}
            />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="history" element={<HistoryView />} />
          </Route>

          {/* Unknown Route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;