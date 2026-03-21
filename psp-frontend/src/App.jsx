import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/content/AuthContent";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import LearnPage from "./pages/LearnPage";
import Analyze from "./pages/Analyze";
import Contacts from "./pages/Contacts";
import HistoryPage from "./pages/HistoryPage";
import AssistentePage from "./pages/AssistentePage";
import PerfilPage from "./pages/PerfilPage";
import ApoioPage from "./pages/ApoioPage";
import { ChatbotWidget } from "./components/ChatbotWidget/ChatbotWidget";


const App = () => {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/aprender" element={<LearnPage />} />
              <Route path="/analisar" element={<Analyze />} />
              <Route path="/contactos" element={<Contacts />} />
              <Route path="/historico" element={<HistoryPage />} />
              <Route path="/assistente" element={<AssistentePage />} />
              <Route path="/perfil" element={<PerfilPage />} />
              <Route path="/apoio" element={<ApoioPage />} />
            </Routes>
          </div>
        </BrowserRouter>
        <ChatbotWidget />
      </AuthProvider>
    );
};

export default App;
