import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';

// ============================================
// ⭐ 평생사주 V6 - 게임 스타일 UI
// 기능 100% + 디자인 100%
// ============================================

export default function LifetimePage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [birthInfo, setBirthInfo] = useState(null);

  // ===== 결제 처리 (원본 기능 100% 유지) =====
  const handlePayment = async () => {
    if (!agreed) {
      alert('서비스 이용약관에 동의해주세요!');
      return;
    }
    
    // 로그인 체크
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://ownwan-backend.onrender.com';
      
      // 프로필 정보 가져오기
      const profileRes = await fetch(`${backendUrl}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const profileData = await profileRes.json();
      
      if (!profileData.success || !profileData.birth) {
        alert('생년월일 정보가 필요합니다. 마이페이지에서 입력해주세요.');
        navigate('/mypage');
        return;
      }
      
      const birth = profileData.birth;
      setBirthInfo({
        year: birth.year,
        month: birth.month,
        day: birth.day
      });
      
      setIsLoading(true);
      
      // 평생사주 API 호출
      const requestData = {
        name: profileData.name || '사용자',
        birthYear: birth.year,
        birthMonth: birth.month,
        birthDay: birth.day,
        birthHour: birth.hour || 12,
        gender: profileData.gender || '남자',
        isLunar: birth.is_lunar || false
      };
      
      const fortuneRes = await fetch(`${backendUrl}/api/lifetime-fortune`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });
      
      const fortuneData = await fortuneRes.json();
      
      if (fortuneData.success && fortuneData.gpt_fortune) {
        navigate('/lifetime-result', { state: { sajuData: fortuneData } });
      } else {
        alert('평생사주 생성에 실패했습니다: ' + (fortuneData.error || '알 수 없는 오류'));
        setIsLoading(false);
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다: ' + error.message);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // 결제수단 (V6 스타일)
  const paymentMethods = [
    { id: 'card', icon: '💳', label: '카드', color: '#374151' },
    { id: 'kakao', icon: 'kakao', label: '카카오페이', color: '#FEE500' },
    { id: 'naver', icon: 'naver', label: '네이버페이', color: '#03C75A' },
    { id: 'toss', icon: 'toss', label: '토스', color: '#0064FF' },
  ];

  // 로딩 중이면 로딩 화면 표시
  if (isLoading) {
    return <LoadingScreen type="lifetime" birthInfo={birthInfo} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 pb-8 overflow-hidden relative">
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
        @keyframes buttonGlow {
          0%, 100% { box-shadow: 0 4px 15px rgba(0,0,0,0.3), 0 0 5px rgba(251,191,36,0.3); }
          50% { box-shadow: 0 4px 20px rgba(0,0,0,0.4), 0 0 15px rgba(251,191,36,0.5); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes levelUp {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>

      {/* 육각형 패턴 배경 */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hex-lifetime" width="50" height="43.4" patternUnits="userSpaceOnUse">
              <polygon points="25,0 50,12.5 50,37.5 25,50 0,37.5 0,12.5" fill="none" stroke="#000" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-lifetime)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-md mx-auto p-4 space-y-4">
        
        {/* ===== 상단 로고 (흔들흔들 + 금빛 글로우) ===== */}
        <div className="text-center pt-2">
          <div 
            className="inline-block relative"
            style={{ animation: 'wiggle 2s ease-in-out infinite' }}
          >
            <div 
              className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-2xl"
              style={{ animation: 'goldGlow 2s ease-in-out infinite' }}
            ></div>
            <div className="relative bg-gradient-to-b from-gray-50 to-white rounded-2xl px-5 py-2 border-2 border-gray-900">
              <div className="flex items-center gap-2">
                <span className="text-xl">⭐</span>
                <span className="text-gray-900 text-xl font-black">오운완</span>
                <span className="text-base" style={{ animation: 'sparkle 1.5s infinite' }}>✨</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 해금 배너 ===== */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 rounded-2xl p-3 border-2 border-amber-500 shadow-lg relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ animation: 'shine 2s infinite' }}
          ></div>
          <div className="relative flex items-center justify-center gap-3">
            <span className="text-2xl" style={{ animation: 'bounce 1s ease-in-out infinite' }}>🎁</span>
            <div className="text-center">
              <div className="text-gray-900 font-black text-sm">지금 해금하면</div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="text-gray-900 font-black text-lg">평생운명 뱃지 획득!</span>
              </div>
            </div>
            <span className="text-2xl" style={{ animation: 'bounce 1s ease-in-out infinite', animationDelay: '0.5s' }}>🎁</span>
          </div>
        </div>

        {/* ===== 메인 상품 카드 ===== */}
        <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-900 shadow-2xl">
          {/* 헤더 */}
          <div className="bg-gray-900 px-4 py-3 relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{ animation: 'shine 3s infinite' }}
            ></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 bg-white rounded-xl flex items-center justify-center"
                  style={{ animation: 'float 2s ease-in-out infinite' }}
                >
                  <span className="text-xl">⭐</span>
                </div>
                <div>
                  <div className="text-white font-black text-lg">평생사주</div>
                  <div className="text-gray-400 text-xs">LIFETIME FORTUNE</div>
                </div>
              </div>
              <div 
                className="bg-amber-400 text-gray-900 text-xs font-black px-3 py-1.5 rounded-lg"
                style={{ animation: 'levelUp 2s ease-in-out infinite' }}
              >
                👑 PREMIUM
              </div>
            </div>
          </div>

          <div className="p-5">
            {/* 가격 섹션 */}
            <div className="text-center mb-5 relative">
              <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-4 py-1.5 rounded-full mb-3">
                ♾️ 한 번 구매로 평생 소장
              </div>
              
              {/* 할인 뱃지 */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="bg-red-500 text-white text-xs font-black px-2 py-1 rounded-lg" style={{ animation: 'levelUp 1s ease-in-out infinite' }}>
                  ⚡ 50% OFF
                </span>
                <span className="text-gray-400 text-sm line-through">59,800원</span>
              </div>
              
              <div className="flex items-end justify-center gap-1">
                <span className="text-gray-900 text-5xl font-black">29,900</span>
                <span className="text-gray-600 text-lg mb-1">원</span>
              </div>
              
              <div className="mt-2 text-gray-500 text-xs">
                📄 1회 결제 • 평생 소장 가능
              </div>
            </div>

            {/* ☯️ 해금되는 나의 운세 ☯️ - 세로 리스트 버전 */}
            <div className="mb-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-lg">☯️</span>
                <span className="text-gray-900 font-black text-sm">해금되는 나의 운세</span>
                <span className="text-lg">☯️</span>
              </div>
              
              <div className="space-y-2">
                {[
                  { icon: '🌟', text: '타고난 성격 & 기질 분석' },
                  { icon: '📅', text: '초년운·중년운·말년운 해설' },
                  { icon: '📈', text: '10년 대운 흐름 분석' },
                  { icon: '💕', text: '평생 애정운 & 결혼운' },
                  { icon: '💰', text: '평생 재물운 & 금전 흐름' },
                  { icon: '💼', text: '직업 적성 & 성공 분야' },
                  { icon: '💪', text: '평생 건강운 & 주의사항' },
                  { icon: '👶', text: '자녀운 & 귀인운' },
                  { icon: '🎯', text: '행운 요소 (방향/숫자/컬러)' },
                  { icon: '🔮', text: '인생 전환점 & 종합 조언' }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 bg-gray-50 border-2 border-gray-200 rounded-xl p-3 hover:border-amber-400 hover:bg-amber-50 transition-all"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 경험치 바 스타일 */}
            <div className="bg-gray-100 rounded-2xl p-3 border-2 border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-xs font-bold">📊 분석 레벨</span>
                <span className="text-amber-600 text-xs font-black">LV.MAX</span>
              </div>
              <div className="h-3 bg-gray-300 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                  style={{ width: '100%', animation: 'shine 2s infinite' }}
                ></div>
              </div>
              <div className="text-center mt-2">
                <span className="text-amber-600 font-black text-sm">✨ 10개 항목 풀 분석 ✨</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 결제 수단 ===== */}
        <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-900 shadow-2xl mb-4">
          <div className="bg-gray-900 px-4 py-3 text-center">
            <span className="text-white font-black text-base">💳 결제 수단</span>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-4 gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 relative ${
                    selectedMethod === method.id
                      ? 'border-gray-900 bg-gray-50 scale-105'
                      : 'border-gray-200 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                    backgroundColor: method.icon === 'kakao' ? '#FEE500' : 
                                     method.icon === 'naver' ? '#03C75A' : 
                                     method.icon === 'toss' ? '#0064FF' : '#f3f4f6'
                  }}>
                    {method.icon === 'kakao' ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#3C1E1E">
                        <path d="M12 3C6.48 3 2 6.58 2 11c0 2.8 1.86 5.25 4.64 6.67-.15.56-.54 2.03-.62 2.35-.1.4.15.39.31.28.13-.08 2.04-1.38 2.87-1.94.59.09 1.2.14 1.8.14 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
                      </svg>
                    ) : method.icon === 'naver' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/>
                      </svg>
                    ) : method.icon === 'toss' ? (
                      <span className="text-white font-black text-sm">T</span>
                    ) : (
                      <span className="text-xl">{method.icon}</span>
                    )}
                  </div>
                  <span className={`text-xs font-bold ${
                    selectedMethod === method.id ? 'text-gray-900' : 'text-gray-500'
                  }`}>{method.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-3 text-center">
              <span className="text-gray-400 text-xs">🔒 토스페이먼츠 안전결제</span>
            </div>
          </div>
        </div>

        {/* ===== 약관 동의 ===== */}
        <button
          onClick={() => setAgreed(!agreed)}
          className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
            agreed ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-300'
          }`}
        >
          <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${
            agreed ? 'bg-amber-400 border-amber-400' : 'bg-white border-gray-300'
          }`}>
            {agreed && <Check className="w-4 h-4 text-gray-900" />}
          </div>
          <span className={`text-sm font-bold ${agreed ? 'text-white' : 'text-gray-700'}`}>
            서비스 이용약관 및 개인정보 처리방침 동의
          </span>
        </button>

        {/* ===== 결제 버튼 ===== */}
        <button
          onClick={handlePayment}
          disabled={!agreed}
          className={`relative w-full py-5 rounded-2xl font-black text-xl overflow-hidden border-2 ${
            agreed
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
          }`}
          style={agreed ? { animation: 'buttonGlow 2s ease-in-out infinite' } : {}}
        >
          {agreed && (
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
              style={{ animation: 'shine 2s infinite' }}
            ></div>
          )}
          <div className="relative flex items-center justify-center gap-3">
            <span className="text-2xl" style={agreed ? { animation: 'bounce 1s ease-in-out infinite' } : {}}>⭐</span>
            <span>29,900원 결제하고 해금하기</span>
            <span className="text-2xl">→</span>
          </div>
        </button>

        {/* ===== 해금 보상 ===== */}
        <div className="bg-white rounded-2xl p-4 border-2 border-gray-200 shadow-lg">
          <div className="text-center mb-3">
            <span className="text-gray-900 font-black text-sm">🎁 해금 보상</span>
          </div>
          <div className="flex justify-center gap-2">
            <div className="flex flex-col items-center gap-1 bg-amber-50 px-3 py-2 rounded-xl border border-amber-200">
              <span className="text-xl">🔮</span>
              <span className="text-amber-700 text-xs font-bold">뱃지</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-blue-50 px-3 py-2 rounded-xl border border-blue-200">
              <span className="text-xl">⭐</span>
              <span className="text-blue-700 text-xs font-bold">평생운명</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-green-50 px-3 py-2 rounded-xl border border-green-200">
              <span className="text-xl">👑</span>
              <span className="text-green-700 text-xs font-bold">프리미엄</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-purple-50 px-3 py-2 rounded-xl border border-purple-200">
              <span className="text-xl">📊</span>
              <span className="text-purple-700 text-xs font-bold">10분석</span>
            </div>
          </div>
        </div>

        {/* ===== 푸터 ===== */}
        <div className="text-center pt-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xs">☯️</span>
            <span className="text-gray-600 font-bold text-xs">오운완</span>
            <span className="text-xs">☯️</span>
          </div>
          <p className="text-gray-400 text-xs">© 2025 OWNWAN. All Rights Reserved.</p>
        </div>

      </div>
      <Footer />
    </div>
  );
}