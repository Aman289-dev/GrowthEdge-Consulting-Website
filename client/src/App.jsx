import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppointmentModal from './components/shared/AppointmentModal';
import LiveChatWidget from './components/shared/LiveChatWidget';

import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AppInner() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      <Navbar onBookConsultation={() => setModalOpen(true)} />

      <Routes>
        <Route path="/" element={<Home onBookConsultation={() => setModalOpen(true)} />} />
        <Route path="/about" element={<About onBookConsultation={() => setModalOpen(true)} />} />
        <Route path="/services" element={<ServicesPage onBookConsultation={() => setModalOpen(true)} />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <LiveChatWidget />

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1E293B',
            color: '#F1F5F9',
            borderRadius: '12px',
            border: '1px solid #334155',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#22C55E', secondary: '#F1F5F9' },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: '#F1F5F9' },
          },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </ThemeProvider>
  );
}
