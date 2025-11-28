import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import ResultPage from './components/ResultPage';
import PaymentPage from './components/PaymentPage';
import LifetimePage from './components/LifetimePage';
import LifetimeResultPage from './components/LifetimeResultPage';
import KakaoAlimtalkTemplate from './components/KakaoAlimtalkTemplate';
import MonthlyTestPage from './components/MonthlyTestPage';
import MonthlyResultPage from './components/MonthlyResultPage';
import MonthlyPaymentPage from './components/MonthlyPaymentPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';
import KakaoCallback from './components/KakaoCallback';
import NaverCallback from './components/NaverCallback';
import MyPage from './components/MyPage';
import BottomNav from './components/BottomNav';
import SignupPage from './components/SignupPage';

function App() {
  return (
    <Router>
      <div className="App" style={{ paddingBottom: '60px' }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/lifetime" element={<LifetimePage />} />
          <Route path="/lifetime-result" element={<LifetimeResultPage />} />
          <Route path="/kakao-template" element={<KakaoAlimtalkTemplate />} />
          <Route path="/monthly-test" element={<MonthlyTestPage />} />
          <Route path="/monthly-result" element={<MonthlyResultPage />} />
          <Route path="/monthly-payment" element={<MonthlyPaymentPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
          <Route path="/auth/naver/callback" element={<NaverCallback />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;