import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { SiteNav } from "@/components/SiteNav";
import HomePage from "@/pages/HomePage";
import ExperiencePage from "@/pages/ExperiencePage";
import ExperienceDetailPage from "@/pages/ExperienceDetailPage";
import WorkPage from "@/pages/WorkPage";
import WorkDetailPage from "@/pages/WorkDetailPage";
import PoonieLogsPage from "@/pages/PoonieLogsPage";
import { Component } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import "@/App.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-paper px-6 text-ink">
          <p>Something broke on the page. {String(this.state.error)}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function ScrollToTop() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if (!state?.scrollTo) {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
        <BrowserRouter>
          <ScrollToTop />
          <NoiseOverlay />
          <SiteNav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/experience/:slug" element={<ExperienceDetailPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<WorkDetailPage />} />
            <Route path="/poonie-logs" element={<PoonieLogsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ReactLenis>
    </ErrorBoundary>
  );
}

export default App;
