
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/dashboard';
import { Auth } from './pages/auth';
import { FinancialRecordProvider } from './contexts/financial-record-context';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <FinancialRecordProvider>
          <Dashboard/>
          </FinancialRecordProvider>
          } />
        <Route path="/auth" element={<Auth/>} />
      </Routes>
    </BrowserRouter>
       
    </>
  )
}

export default App
