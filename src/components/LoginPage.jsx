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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden relative">
      {/* 커스텀 애니메이션 */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes goldGlow {
          0%, 100% { box-shadow: 0 0 5px #fbbf24, 0 0 10px #fbbf24, 0 0 15px #f59e0b; }
          50% { box-shadow: 0 0 10px #fbbf24, 0 0 20px #fbbf24, 0 0 30px #f59e0b; }
        }
      `}</style>

      {/* 육각형 패턴 배경 */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hex-login" width="50" height="43.4" patternUnits="userSpaceOnUse">
              <polygon points="25,0 50,12.5 50,37.5 25,50 0,37.5 0,12.5" fill="none" stroke="#000" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-login)"/>
        </svg>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        
        {/* ===== 상단 로고 ===== */}
        <div className="text-center mb-8">
          <div 
            className="inline-block relative"
            style={{ animation: 'wiggle 2s ease-in-out infinite' }}
          >
            <div 
              className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-2xl"
              style={{ animation: 'goldGlow 2s ease-in-out infinite' }}
            ></div>
            <div className="relative bg-gradient-to-b from-gray-50 to-white rounded-2xl px-6 py-3 border-2 border-gray-900">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📬</span>
                <span className="text-gray-900 text-2xl font-black tracking-tight">오운완</span>
                <span className="text-lg">✨</span>
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
          
          <div className="mt-5">
            <p className="text-gray-900 text-base font-bold mb-1">매일 아침 8시</p>
            <p className="text-gray-500 text-xs">나의 실제 오늘 운세를 받아보세요</p>
          </div>
        </div>

        {/* ===== 로그인 카드 ===== */}
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-900 shadow-2xl">
            
            {/* 카드 헤더 */}
            <div className="bg-gray-900 px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-base">☯️</span>
                <span className="text-white font-black text-lg">시작하기</span>
                <span className="text-base">☯️</span>
              </div>
              <p className="text-gray-400 text-xs mt-0.5">LOGIN</p>
            </div>

            {/* 로그인 버튼들 */}
            <div className="p-5 space-y-3">
              
              {/* 카카오 로그인 버튼 */}
              <button
                onClick={handleKakaoLogin}
                className="relative w-full py-4 rounded-xl font-bold text-base overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                style={{ backgroundColor: '#FEE500', color: '#000000' }}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3C6.48 3 2 6.93 2 11.75C2 14.92 4.21 17.72 7.5 19.25L6.5 22.5L10.25 20C10.83 20.08 11.41 20.13 12 20.13C17.52 20.13 22 16.2 22 11.38C22 6.56 17.52 3 12 3Z" fill="currentColor"/>
                  </svg>
                  <span>카카오로 1초만에 시작!</span>
                </div>
              </button>

              {/* 네이버 로그인 버튼 */}
              <button
                onClick={handleNaverLogin}
                className="relative w-full py-4 rounded-xl font-bold text-base overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                style={{ backgroundColor: '#03C75A', color: '#FFFFFF' }}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" fill="currentColor"/>
                  </svg>
                  <span>네이버로 1초만에 시작!</span>
                </div>
              </button>

              {/* 구분선 */}
              <div className="flex items-center justify-center gap-3 py-1">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300"></div>
                <span className="text-gray-400 text-xs">또는</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300"></div>
              </div>

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
                className="w-full py-3 bg-red-500 text-white rounded-xl font-bold text-sm border-2 border-red-700 hover:bg-red-600 transition-all disabled:opacity-50"
              >
                {isTestLoginLoading ? '🔄 로그인 중...' : '🧪 테스트 계정 로그인 (토스페이먼츠 심사용)'}
              </button>

              {/* 안내 문구 */}
              <p className="text-xs text-gray-500 text-center pt-2 leading-relaxed">
                로그인시 <span className="font-bold text-gray-700">이용약관</span> 및 <span className="font-bold text-gray-700">개인정보처리방침</span>에<br />
                동의하는 것으로 간주됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* ===== 로그인하면 좋은 점 카드 ===== */}
        <div className="w-full max-w-sm mt-4">
          <div className="bg-white rounded-2xl p-4 border-2 border-gray-200 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300"></div>
              <span className="text-gray-900 text-xs font-black">✨ 로그인하면</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300"></div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <span className="text-sm">📝</span>
                </div>
                <div>
                  <p className="text-gray-900 text-xs font-bold">생년월일 저장</p>
                  <p className="text-gray-500 text-xs">매번 입력할 필요 없어요</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-sm">📋</span>
                </div>
                <div>
                  <p className="text-gray-900 text-xs font-bold">구매 내역 관리</p>
                  <p className="text-gray-500 text-xs">지난 운세 결과도 다시 보기</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
                  <span className="text-sm">🔔</span>
                </div>
                <div>
                  <p className="text-gray-900 text-xs font-bold">알림 설정</p>
                  <p className="text-gray-500 text-xs">운세 도착 알림 받기</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 푸터 ===== */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xs">☯️</span>
            <span className="text-gray-600 font-bold text-xs">오운완</span>
            <span className="text-xs">☯️</span>
          </div>
          <p className="text-gray-400 text-xs">© 2025 OWNWAN. All Rights Reserved.</p>
        </div>

      </div>
    </div>
  );
}
