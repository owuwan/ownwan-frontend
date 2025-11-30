import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const navigate = useNavigate();
  const [isTestLoginLoading, setIsTestLoginLoading] = useState(false);

  // 이미 로그인되어 있으면 메인페이지로 이동
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('✅ 이미 로그인됨 - 메인페이지로 이동');
      navigate('/');
    }
  }, [navigate]);

  const handleKakaoLogin = () => {
    // 카카오 OAuth URL로 이동
    const KAKAO_REST_API_KEY = 'a7ee610ed33ef0f48bcdd57547922bdf';
    const REDIRECT_URI = `${window.location.origin}/auth/kakao/callback`;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    
    window.location.href = kakaoAuthUrl;
  };

  const handleNaverLogin = () => {
    // 네이버 OAuth URL로 이동
    const NAVER_CLIENT_ID = 'e4Wn2U1EEdWVgrTTmSEL';
    const REDIRECT_URI = `${window.location.origin}/auth/naver/callback`;
    const STATE = Math.random().toString(36).substring(7);
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;
    
    window.location.href = naverAuthUrl;
  };

  return (
  <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f5f7fa] via-[#e8eaf0] to-[#f0f2f8]" style={{ fontFamily: 'Nanum Gothic, sans-serif' }}>
      
      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.7; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>
      
      {/* 육각형 패턴 배경 */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* 빛 효과 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        
        {/* ===== 새로운 오운완 헤더 ===== */}
        <div className="text-center mb-12">
          {/* 오운완 로고 */}
          <div className="flex items-center justify-center mb-5">
            <div className="relative" style={{animation: 'wiggle 2s ease-in-out infinite'}}>
              <div className="absolute -inset-3 bg-amber-200 rounded-2xl" style={{animation: 'pulseRing 2s ease-in-out infinite'}}></div>
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl px-6 py-3 shadow-xl" style={{border: '3px solid #111827'}}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📬</span>
                  <div className="text-gray-900 text-3xl tracking-tight" style={{fontWeight: 900}}>오운완</div>
                  <span className="text-xl" style={{animation: 'sparkle 1.5s ease-in-out infinite'}}>✨</span>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0" style={{borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '12px solid #111827'}}></div>
            </div>
          </div>
          
          {/* 슬로건 */}
          <p className="text-gray-700 text-lg font-bold mb-1">매일 아침 8시</p>
          <p className="text-gray-500 text-sm">나의 실제 오늘 운세를 받아보세요</p>
        </div>

        {/* 로그인 박스 */}
        <div className="w-full max-w-md">
          <div className="bg-white border-4 border-gray-900 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8" style={{ fontFamily: 'Nanum Gothic, sans-serif' }}>
              시작하기
            </h2>

            {/* 카카오 로그인 버튼 */}
            <button
              onClick={handleKakaoLogin}
              className="w-full mb-4 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3"
              style={{
                backgroundColor: '#FEE500',
                color: '#000000'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C6.48 3 2 6.93 2 11.75C2 14.92 4.21 17.72 7.5 19.25L6.5 22.5L10.25 20C10.83 20.08 11.41 20.13 12 20.13C17.52 20.13 22 16.2 22 11.38C22 6.56 17.52 3 12 3Z" fill="currentColor"/>
              </svg>
              카카오로<br/>1초만에 시작!
            </button>

            {/* 네이버 로그인 버튼 */}
            <button
              onClick={handleNaverLogin}
              className="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3"
              style={{
                backgroundColor: '#03C75A',
                color: '#FFFFFF'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" fill="currentColor"/>
              </svg>
              네이버로<br/>1초만에 시작!
            </button>
            {/* 테스트 로그인 버튼 (토스페이먼츠 심사용) */}
            <button
              onClick={async () => {
                try {
                  setIsTestLoginLoading(true);
                  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://ownwan-backend.onrender.com';
                  const response = await fetch(`${backendUrl}/api/auth/test-login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                  });
                  const data = await response.json();
                  if (data.success) {
                    localStorage.setItem('access_token', data.token);
                    window.location.href = '/';
                  } else {
                    setIsTestLoginLoading(false);
                    alert('테스트 로그인 실패: ' + data.message);
                  }
                } catch (error) {
                  setIsTestLoginLoading(false);
                  alert('테스트 로그인 오류: ' + error.message);
                }
              }}
              disabled={isTestLoginLoading}
              className="w-full mt-4 py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              style={{
                backgroundColor: '#EF4444',
                color: '#FFFFFF'
              }}
            >
              {isTestLoginLoading ? '🔄 로그인 중...' : (
                <>
                  🧪 테스트 계정 로그인
                  <span className="text-xs opacity-80">(토스페이먼츠 심사용)</span>
                </>
              )}
            </button>

            {/* 안내 문구 */}
            <p className="text-sm text-gray-500 text-center mt-6">
              로그인시 <span className="font-semibold">이용약관</span> 및 <span className="font-semibold">개인정보처리방침</span>에<br />
              동의하는 것으로 간주됩니다.
            </p>
          </div>
        </div>

        {/* 하단 설명 */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            ✨ 회원가입 없이 소셜 로그인으로<br/>간편하게 시작하세요
          </p>
        </div>
      </div>
    </div>
  );
}