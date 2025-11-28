import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Star, Check, ChevronRight, ArrowLeft, CreditCard, Smartphone, Wallet, Zap } from 'lucide-react';
import Footer from './Footer';

export default function MonthlyPaymentPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [agreed, setAgreed] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePayment = () => {
    if (!agreed) {
      alert('서비스 이용약관에 동의해주세요!');
      return;
    }
    alert('✅ 결제가 완료되었습니다!\n\n이번 달 월간운세를 확인하실 수 있습니다.\n마이페이지에서 언제든 다시 볼 수 있습니다.\n\n💡 실제로는 토스페이먼츠로 결제됩니다.');
  };

  const paymentMethods = [
    { id: 'card', icon: CreditCard, label: '신용/체크카드', description: '모든 카드사 가능' },
    { id: 'kakao', icon: Smartphone, label: '카카오페이', description: '간편 결제' },
    { id: 'naver', icon: Wallet, label: '네이버페이', description: '간편 결제' },
    { id: 'toss', icon: Zap, label: '토스페이', description: '간편 결제' },
    { id: 'phone', icon: Smartphone, label: '휴대폰 소액결제', description: '통신사 자동결제' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #E5E7EB 0%, #F9FAFB 50%, #FFFFFF 100%)'
    }}>
      {/* 육각형 패턴 배경 (주역 괘 느낌) */}
      <svg width="100" height="87" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="hexagons-monthly" width="100" height="87" patternUnits="userSpaceOnUse">
            <path d="M50 0 L93.3 25 L93.3 62 L50 87 L6.7 62 L6.7 25 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons-monthly)" className="text-gray-900"/>
      </svg>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-md">
        {/* ===== 월간사주 헤더 (애니메이션) ===== */}
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl p-5 shadow-xl border-2 border-gray-900 mb-6 relative overflow-hidden">
          {/* 육각형 패턴 배경 */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="hex-monthly" width="30" height="26" patternUnits="userSpaceOnUse">
                  <polygon points="15,0 30,7.5 30,22.5 15,30 0,22.5 0,7.5" fill="none" stroke="#000" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hex-monthly)"/>
            </svg>
          </div>
          
          <div className="relative z-10 text-center">
            {/* 오운완 로고 */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative" style={{animation: 'wiggle 2s ease-in-out infinite'}}>
                <div className="absolute -inset-2 bg-sky-200 rounded-2xl" style={{animation: 'pulseRing 2s ease-in-out infinite'}}></div>
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl px-5 py-2 shadow-lg" style={{border: '3px solid #111827'}}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📅</span>
                    <div className="text-gray-900 text-xl tracking-tight" style={{fontWeight: 900}}>오운완</div>
                    <span className="text-base" style={{animation: 'sparkle 1.5s ease-in-out infinite'}}>✨</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0" style={{borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid #111827'}}></div>
              </div>
            </div>
            
            {/* 배지 + 타이틀 */}
            <div style={{animation: 'float 3s ease-in-out infinite'}}>
              <span className="inline-block bg-gradient-to-r from-sky-400 to-blue-400 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-2 shadow-md">
                🗓️ 한 달 운세 종합 분석
              </span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-1">월간사주</h1>
            <p className="text-gray-600 text-sm">이번 달 행운의 날을 미리 확인하세요</p>
          </div>
        </div>

        {/* 상품 정보 카드 */}
        <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl mb-6 animate-slideUp">
          <div className="text-center mb-6">
            <Star className="w-12 h-12 text-gray-900 mx-auto mb-3" />
            <h2 className="text-gray-900 text-2xl font-bold mb-2">월간 종합사주</h2>
            <div className="flex items-end justify-center gap-2 mb-3">
              <span className="text-gray-900 text-5xl font-bold">11,000</span>
              <span className="text-gray-700 text-xl mb-2">원</span>
            </div>
            <p className="text-gray-600 text-sm">이번 달 전체 운세를 한눈에</p>
            <div className="mt-3 inline-block bg-gray-100 px-4 py-2 rounded-full border-2 border-gray-900">
              <p className="text-gray-900 text-xs font-bold">📅 1회 구매 • 마이페이지에서 언제든 다시 보기</p>
            </div>
          </div>

          {/* 혜택 리스트 */}
          <div className="space-y-3 mb-6">
            {[
              '이번 달 종합운',
              '14가지 세부 운세 (애정, 사업, 금전 등)',
              '행운의 날 & 주의할 시기',
              '행운의 색상 & 월간 조언',
              '마이페이지에서 언제든 다시 보기'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-300">
                <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-900 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* 안내 문구 */}
          <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-900">
            <p className="text-gray-700 text-xs text-center leading-relaxed">
              ✨ 결제 후 즉시 월간운세를 확인하실 수 있습니다<br />
              구매한 월간운세는 마이페이지에 영구 보관되며 언제든 다시 볼 수 있습니다
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
              💳 안전한 결제 (PG사: 토스페이먼츠)
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
          <Star className="w-6 h-6 mr-2" />
          <span>11,000원 결제하기</span>
          <ChevronRight className="w-6 h-6 ml-2" />
        </button>

        {/* 하단 안내 */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-xs leading-relaxed">
            ✅ 결제 후 즉시 이번 달 월간운세를 확인하실 수 있습니다<br />
            📅 구매한 월간운세는 마이페이지에 영구 보관됩니다<br />
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