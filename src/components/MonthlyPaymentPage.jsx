import React, { useState } from 'react';

// V6 월간사주 결제페이지 미리보기
export default function MonthlyPaymentPageV6Preview() {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [agreed, setAgreed] = useState(false);

  const paymentMethods = [
    { id: 'card', label: '신용/체크카드', icon: '💳' },
    { id: 'kakao', label: '카카오페이', icon: '🟡' },
    { id: 'naver', label: '네이버페이', icon: '🟢' },
    { id: 'toss', label: '토스페이', icon: '🔵' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)'
    }}>
      {/* 육각형 패턴 배경 (원본과 동일 opacity-5) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hex-monthly" width="50" height="43.4" patternUnits="userSpaceOnUse">
              <polygon points="25,0 50,12.5 50,37.5 25,50 0,37.5 0,12.5" fill="none" stroke="#000" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-monthly)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 py-6">
        
        {/* ===== 흔들흔들 로고 + 금빛 글로우 ===== */}
        <div className="flex justify-center mb-4">
          <div style={{animation: 'wiggle 2s ease-in-out infinite'}}>
            <div 
              className="bg-white rounded-2xl px-6 py-3 border-2 border-gray-900 relative"
              style={{
                animation: 'goldGlow 2s ease-in-out infinite',
                boxShadow: '0 0 15px rgba(251,191,36,0.4)'
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌙</span>
                <span className="text-xl font-black text-gray-900">오운완</span>
                <span className="text-lg" style={{animation: 'sparkle 1.5s infinite'}}>✨</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 해금 배너 ===== */}
        <div 
          className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 rounded-xl p-3 mb-4 border-2 border-gray-900 text-center"
          style={{animation: 'float 3s ease-in-out infinite'}}
        >
          <p className="text-gray-900 font-black text-sm">
            지금 해금하면 🔮 수련생 뱃지 획득!
          </p>
        </div>

        {/* ===== 메인 카드 ===== */}
        <div className="bg-white rounded-3xl border-2 border-gray-900 shadow-2xl overflow-hidden mb-4">
          
          {/* 카드 헤더 */}
          <div className="bg-gray-900 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌙</span>
                <span className="text-white font-black">월간사주</span>
              </div>
              <span className="bg-amber-400 text-gray-900 text-xs font-black px-3 py-1.5 rounded-lg">
                1회 구매
              </span>
            </div>
          </div>

          {/* 카드 바디 */}
          <div className="p-5">
            
            {/* 가격 섹션 (먼저!) */}
            <div className="text-center mb-5 relative">
              <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-4 py-1.5 rounded-full mb-3">
                📅 이번 달 운세 종합 분석
              </div>
              
              {/* 할인 뱃지 */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="bg-red-500 text-white text-xs font-black px-2 py-1 rounded-lg animate-pulse">
                  ⚡ 50% OFF
                </span>
                <span className="text-gray-400 text-sm line-through">22,000원</span>
              </div>
              
              <div className="flex items-end justify-center gap-1">
                <span className="text-gray-900 text-5xl font-black">11,000</span>
                <span className="text-gray-600 text-lg mb-1">원</span>
              </div>
              
              <div className="mt-2 text-gray-500 text-xs">
                📅 1회 구매 • 마이페이지에서 언제든 다시 보기
              </div>
            </div>

            {/* ☯️ 해금되는 나의 운세 ☯️ (아래!) */}
            <div className="mb-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-lg">☯️</span>
                <span className="text-gray-900 font-black text-sm">해금되는 나의 운세</span>
                <span className="text-lg">☯️</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: '📜', text: '종합' },
                  { icon: '💕', text: '애정' },
                  { icon: '💰', text: '금전' },
                  { icon: '💼', text: '직장' },
                  { icon: '💪', text: '건강' },
                  { icon: '🧳', text: '여행' },
                  { icon: '📅', text: '행운일' },
                  { icon: '🎨', text: '컬러' },
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col items-center gap-1 bg-gray-50 border-2 border-gray-200 rounded-xl p-2 hover:border-amber-400 hover:bg-amber-50 transition-all cursor-pointer"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-gray-700 text-xs font-bold">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 경험치 바 스타일 (원본과 동일) */}
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
                <span className="text-amber-600 font-black text-sm">✨ 14개 항목 풀 분석 ✨</span>
              </div>
            </div>

          </div>
        </div>

        {/* ===== 결제수단 카드 ===== */}
        <div className="bg-white rounded-3xl border-2 border-gray-900 shadow-2xl overflow-hidden mb-4">
          <div className="bg-gray-900 px-4 py-3">
            <span className="text-white font-black text-sm">💳 결제수단 선택</span>
          </div>
          
          <div className="p-4 space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between ${
                  selectedMethod === method.id
                    ? 'bg-gray-100 border-gray-900'
                    : 'bg-white border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{method.icon}</span>
                  <span className="text-gray-900 font-bold text-sm">{method.label}</span>
                </div>
                {selectedMethod === method.id && (
                  <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ===== 약관 동의 ===== */}
        <div className="bg-white rounded-2xl border-2 border-gray-900 p-4 mb-4">
          <button
            onClick={() => setAgreed(!agreed)}
            className="w-full flex items-center gap-3"
          >
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
              agreed ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-400'
            }`}>
              {agreed && <span className="text-white text-xs">✓</span>}
            </div>
            <span className="text-gray-700 text-sm font-medium text-left">
              서비스 이용약관 및 개인정보 처리방침에 동의합니다
            </span>
          </button>
        </div>

        {/* ===== 결제 버튼 (buttonGlow + shine + bounce) ===== */}
        <button
          className={`relative w-full py-5 rounded-2xl font-black text-xl overflow-hidden border-2 ${
            agreed
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
          }`}
          style={agreed ? {animation: 'buttonGlow 2s ease-in-out infinite'} : {}}
        >
          {agreed && (
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
              style={{animation: 'shine 2s infinite'}}
            />
          )}
          <div className="relative flex items-center justify-center gap-3">
            <span 
              className="text-2xl" 
              style={agreed ? {animation: 'bounce 1s ease-in-out infinite'} : {}}
            >🚀</span>
            <span>운세 해금하기</span>
            <span className="text-2xl">→</span>
          </div>
        </button>

        {/* ===== 해금 보상 ===== */}
        <div className="mt-4 bg-white rounded-2xl border-2 border-gray-900 p-4">
          <p className="text-center text-gray-900 font-black text-sm mb-3">🎁 해금 보상</p>
          <div className="flex justify-center gap-3">
            {[
              { icon: '🔮', label: '뱃지' },
              { icon: '🌙', label: '월간리포트' },
              { icon: '📅', label: '한달운세' },
              { icon: '📊', label: '14분석' },
            ].map((reward, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-gray-300 mb-1">
                  <span className="text-xl">{reward.icon}</span>
                </div>
                <span className="text-gray-600 text-xs font-bold">{reward.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 하단 안내 ===== */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-xs leading-relaxed">
            💳 안전한 결제 • 토스페이먼츠<br/>
            📅 구매 후 마이페이지에서 언제든 다시 보기
          </p>
        </div>

        {/* 푸터 */}
        <div className="mt-6 text-center text-gray-400 text-xs">
          <p>© 2025 오운완 | 오늘의 운세 완료!</p>
        </div>
      </div>

      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        
        @keyframes goldGlow {
          0%, 100% { box-shadow: 0 0 5px #fbbf24, 0 0 10px #fbbf24, 0 0 15px #f59e0b; }
          50% { box-shadow: 0 0 10px #fbbf24, 0 0 20px #fbbf24, 0 0 30px #f59e0b; }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes buttonGlow {
          0%, 100% { box-shadow: 0 4px 15px rgba(0,0,0,0.3), 0 0 5px rgba(251,191,36,0.3); }
          50% { box-shadow: 0 4px 20px rgba(0,0,0,0.4), 0 0 15px rgba(251,191,36,0.5); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes coinPop {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
