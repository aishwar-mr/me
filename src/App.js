import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { SiteNav } from "@/components/SiteNav";
import { ContactFooter } from "@/components/ContactFooter";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Home } from "@/pages/Home";
import { Story } from "@/pages/Story";
import { Experience } from "@/pages/Experience";
import { ExperienceDetail } from "@/pages/ExperienceDetail";
import { Work } from "@/pages/Work";
import { WorkDetail } from "@/pages/WorkDetail";
import { WorkItemDetail } from "@/pages/WorkItemDetail";
import { NotFound } from "@/pages/NotFound";
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

function App() {
  return (
    <ErrorBoundary>
      <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
        <ScrollToTop />
        <NoiseOverlay />
        <SiteNav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/experience/:slug" element={<ExperienceDetail />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<WorkDetail />} />
            <Route path="/work/:slug/:item" element={<WorkItemDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <ContactFooter />
      </ReactLenis>
    </ErrorBoundary>
  );
}

export default App;
