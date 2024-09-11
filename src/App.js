import "./App.css";
import { Route, Routes } from "react-router-dom";
import InvoiceHome from "./pages/InvoiceHome";
import InvoiceView from "./pages/InvoiceView";
import InvoiceCreate from "./pages/invoiceCreate/InvoiceCreate";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<InvoiceHome />} />
        <Route path="/invoice-create" element={<InvoiceCreate />} />
        <Route path="/invoice-update/:id" element={<InvoiceCreate />} />
        <Route path="/invoice-view/:id" element={<InvoiceView />} />
      </Routes>
    </div>
  );
}

export default App;
