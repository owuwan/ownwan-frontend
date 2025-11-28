import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Star, Check, ChevronRight, ArrowLeft, CreditCard, Smartphone, Infinity, Zap, Wallet } from 'lucide-react';
import Footer from './Footer';

export default function AlldayLifetimePaymentPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [agreed, setAgreed] = useState(false);

  const handlePayment = () => {
    if (!agreed) {
      alert('서비스 이용약관에 동의해주세요!');
      return;
    }
    // 임시: 평생사주 결과 페이지로 이동
    navigate('/lifetime-result', { 
      state: { 
        sajuData: {
          name: "홍길동",
          saju: { year: "경오", month: "정묘", day: "병자", hour: "무신" }
        }
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const paymentMethods = [
    { id: 'card', icon: CreditCard, label: '신용/체크카드', description: '모든 카드사 가능' },
    { id: 'kakao', icon: Smartphone, label: '카카오페이', description: '간편 결제' },
    { id: 'naver', icon: Wallet, label: '네이버페이', description: '간편 결제' },
    { id: 'toss', icon: Zap, label: '토스페이', description: '간편 결제' },
    { id: 'phone', icon: Smartphone, label: '휴대폰 소액결제', description: '통신사 결제' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #E5E7EB 0%, #F9FAFB 50%, #FFFFFF 100%)'
    }}>
      {/* 육각형 패턴 배경 (주역 괘 느낌) */}
      <svg width="100" height="87" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="hexagons-lifetime" width="100" height="87" patternUnits="userSpaceOnUse">
            <path d="M50 0 L93.3 25 L93.3 62 L50 87 L6.7 62 L6.7 25 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons-lifetime)" className="text-gray-900"/>
      </svg>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-md">
        {/* ===== 평생사주 헤더 (애니메이션) ===== */}
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl p-5 shadow-xl border-2 border-gray-900 mb-6 relative overflow-hidden">
          {/* 육각형 패턴 배경 */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="hex-lifetime" width="30" height="26" patternUnits="userSpaceOnUse">
                  <polygon points="15,0 30,7.5 30,22.5 15,30 0,22.5 0,7.5" fill="none" stroke="#000" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hex-lifetime)"/>
            </svg>
          </div>
          
          <div className="relative z-10 text-center">
            {/* 오운완 로고 */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative" style={{animation: 'wiggle 2s ease-in-out infinite'}}>
                <div className="absolute -inset-2 bg-violet-200 rounded-2xl" style={{animation: 'pulseRing 2s ease-in-out infinite'}}></div>
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl px-5 py-2 shadow-lg" style={{border: '3px solid #111827'}}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">♾️</span>
                    <div className="text-gray-900 text-xl tracking-tight" style={{fontWeight: 900}}>오운완</div>
                    <span className="text-base" style={{animation: 'sparkle 1.5s ease-in-out infinite'}}>✨</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0" style={{borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid #111827'}}></div>
              </div>
            </div>
            
            {/* 배지 + 타이틀 */}
            <div style={{animation: 'float 3s ease-in-out infinite'}}>
              <span className="inline-block bg-gradient-to-r from-violet-400 to-purple-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-2 shadow-md">
                ✨ 프리미엄 · 1회 구매
              </span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-1">평생사주</h1>
            <p className="text-gray-600 text-sm">한 번 구매로 평생 소장하세요</p>
          </div>
        </div>

        {/* 상품 정보 카드 */}
        <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl mb-6 animate-slideUp">
          <div className="text-center mb-6">
            <Infinity className="w-14 h-14 text-gray-900 mx-auto mb-3" />
            <h2 className="text-gray-900 text-2xl font-bold mb-2">평생사주 상세패키지</h2>
            <div className="flex items-end justify-center gap-2 mb-3">
              <span className="text-gray-900 text-5xl font-bold">29,900</span>
              <span className="text-gray-700 text-xl mb-2">원</span>
            </div>
            <p className="text-gray-600 text-sm">단 한 번의 결제로 평생 보관</p>
          </div>

          {/* 혜택 리스트 */}
          <div className="space-y-3 mb-6">
            {[
              '천간·지지·명운 운세 분석',
              '생애운 & 직업운 운별 해설',
              '재운 & 재물운 가이드',
              '연애운 & 결혼운 추정리',
              '건강운 & 주의사항 알림',
              '평생 연별 & 궁합 분석',
              '인생 전체 흐름 파악',
              '평생 소장 가능한 PDF'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-300">
                <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-900 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* PDF 리포트 강조 박스 */}
          <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-900 mb-4">
            <div className="flex items-start gap-3">
              <Zap className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-900 font-bold text-sm mb-1">📄 100페이지 PDF 리포트</p>
                <p className="text-gray-700 text-xs leading-relaxed">
                  결제 완료 즉시 이메일/카톡으로 전송됩니다. 평생 소장 가능하며 인쇄도 가능합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-900">
            <p className="text-gray-700 text-xs text-center leading-relaxed">
              ✨ 단 한 번의 결제로 평생 보관 가능<br />
              이메일과 카카오톡으로 PDF 파일을 즉시 전송해드립니다
            </p>
          </div>
        </div>

        {/* 결제 수단 선택 카드 */}
        <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl mb-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-gray-900 text-lg font-bold mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-gray-900" />
            결제 수단 선택
          </h3>

          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    selectedMethod === method.id
                      ? 'bg-gray-100 border-gray-900 shadow-lg'
                      : 'bg-white border-gray-300 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedMethod === method.id ? 'bg-gray-900' : 'bg-gray-200'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          selectedMethod === method.id ? 'text-white' : 'text-gray-700'
                        }`} />
                      </div>
                      <div className="text-left">
                        <div className="text-gray-900 font-medium">{method.label}</div>
                        <div className="text-gray-600 text-xs">{method.description}</div>
                      </div>
                    </div>
                    {selectedMethod === method.id && (
                      <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 bg-gray-100 rounded-lg p-3 border-2 border-gray-900">
            <p className="text-gray-700 text-xs text-center">
              💳 안전한 일회성 결제 (PG사: 토스페이먼츠)
            </p>
          </div>
        </div>

        {/* 약관 동의 */}
        <div className="bg-white rounded-2xl p-5 border-2 border-gray-900 shadow-2xl mb-6 animate-slideUp" style={{ animationDelay: '0.2s' }}>
          <button
  onClick={() => setAgreed(!agreed)}
  className="w-full flex items-center gap-3"
>
  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
    agreed 
      ? 'bg-gray-900 border-gray-900' 
      : 'bg-white border-gray-400'
  }`}>
    {agreed && <Check className="w-4 h-4 text-white" />}
  </div>
  <span className="text-gray-900 text-sm font-medium leading-tight text-center flex-1">
    서비스 이용약관 및 개인정보<br />
    처리방침에 동의합니다
  </span>
</button>
        </div>

        {/* 결제 버튼 */}
        <button
          onClick={handlePayment}
          className={`w-full py-6 px-6 rounded-2xl font-bold text-lg shadow-2xl transform transition-all duration-300 flex items-center justify-center border-2 animate-slideUp ${
            agreed
              ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white hover:scale-105 border-gray-900'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400'
          }`}
          style={{ animationDelay: '0.3s' }}
          disabled={!agreed}
        >
          <Infinity className="w-6 h-6 mr-2" />
          <span>29,900원 결제하기</span>
          <ChevronRight className="w-6 h-6 ml-2" />
        </button>

        {/* 하단 안내 */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-xs leading-relaxed">
            ✅ 결제 후 즉시 평생운세 PDF를 받아보실 수 있습니다<br />
            📜 한 번 구매하시면 평생 소장 가능합니다<br />
            💰 1회 구매 상품으로 자동 결제되지 않습니다
          </p>
        </div>

        {/* 푸터 */}
        <div className="mt-8 text-center text-gray-500 text-xs">
          <p>© 2025 오운완 | 오늘의 운세 완료! All rights reserved.</p>
        </div>
      </div>

      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }

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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
      <Footer />
    </div>
  );
}