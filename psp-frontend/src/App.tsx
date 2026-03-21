import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Index from "@/pages/Index";
import Analisar from "@/pages/Analisar";



const App = () => (
  <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/analisar" element={<Analisar />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
