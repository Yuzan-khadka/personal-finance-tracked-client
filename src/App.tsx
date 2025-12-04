import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordProvider } from "./contexts/financial-record-context";
import { SignedIn, UserButton } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app-container">
          <div className="navbar">
            <Link to="/">Dashboard</Link>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <FinancialRecordProvider>
                  <Dashboard />
                </FinancialRecordProvider>
              }
            />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
