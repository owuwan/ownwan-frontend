import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 하드코딩된 관리자 계정
  const ADMIN_USERNAME = 'choihongcheol';
  const ADMIN_PASSWORD = 'yourpassword123';

  const handleLogin = (e) => {
    e.preventDefault();
    
    // ID/PW 체크
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // 로그인 성공!
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/secret-admin-choi920318/dashboard');
    } else {
      // 로그인 실패!
      setError('아이디 또는 비밀번호가 틀렸습니다.');
      setPassword(''); // 비밀번호 초기화
    }
  };

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #E5E7EB 0%, #F9FAFB 50%, #FFFFFF 100%)'
      }}
    >
      {/* 육각형 패턴 배경 */}
      <svg 
        width="100" 
        height="87" 
        xmlns="http://www.w3.org/2000/svg" 
        className="absolute inset-0 w-full h-full opacity-10"
      >
        <defs>
          <pattern 
            id="hexagons-admin-login" 
            width="100" 
            height="87" 
            patternUnits="userSpaceOnUse"
          >
            <path 
              d="M50 0 L93.3 25 L93.3 62 L50 87 L6.7 62 L6.7 25 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect 
          width="100%" 
          height="100%" 
          fill="url(#hexagons-admin-login)" 
          className="text-gray-900"
        />
      </svg>

      <div className="max-w-md w-full relative z-10">
        {/* 로고/타이틀 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-full mb-4 shadow-2xl">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">관리자 로그인</h1>
          <p className="text-gray-600">EVERY DAY 사주리포트</p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-900">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* 에러 메시지 */}
            {error && (
              <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* 아이디 입력 */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                아이디
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(''); // 에러 메시지 지우기
                  }}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all bg-gray-50"
                  placeholder="아이디를 입력하세요"
                  required
                />
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(''); // 에러 메시지 지우기
                  }}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all bg-gray-50"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white py-3 rounded-2xl font-bold hover:from-gray-700 hover:via-gray-800 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl"
            >
              로그인
            </button>
          </form>

          {/* 하단 안내 */}
          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <p className="text-center text-sm text-gray-600 font-medium">
              관리자 전용 페이지입니다
            </p>
          </div>
        </div>

        {/* 푸터 */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            © 2025 EVERY DAY 사주리포트
          </p>
        </div>
      </div>
    </div>
  );
}