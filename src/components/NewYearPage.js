import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Star, Check, ChevronRight, CreditCard, Smartphone, Wallet, Zap } from 'lucide-react';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';

export default function NewYearPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    
    // 사용자 생년월일 정보 가져오기
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://ownwan-backend.onrender.com';
      
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
      
      // TODO: 실제 결제 연동 (토스페이먼츠)
      // 지금은 테스트용으로 바로 API 호출
      
      const birth = profileData.birth;
      const requestData = {
        name: profileData.name || '사용자',
        birthYear: birth.year,
        birthMonth: birth.month,
        birthDay: birth.day,
        birthHour: birth.hour || 12,
        gender: profileData.gender || '남자',
        isLunar: birth.is_lunar || false
      };
      
      setIsLoading(true);
      // 신년운세 API 호출
      const fortuneRes = await fetch(`${backendUrl}/api/newyear-fortune`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });
      
      const fortuneData = await fortuneRes.json();
      
      if (fortuneData.success) {
        // 결과 페이지로 이동
        navigate('/newyear-result', { state: { resultData: fortuneData } });
      } else {
        alert('운세 생성에 실패했습니다: ' + (fortuneData.error || '알 수 없는 오류'));
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다: ' + error.message);
      setIsLoading(false);
    }
  };

  const paymentMethods = [
    { id: 'card', icon: CreditCard, label: '신용/체크카드', description: '모든 카드사 가능' },
    { id: 'kakao', icon: Smartphone, label: '카카오페이', description: '간편 결제' },
    { id: 'naver', icon: Wallet, label: '네이버페이', description: '간편 결제' },
    { id: 'toss', icon: Zap, label: '토스페이', description: '간편 결제' },
    { id: 'phone', icon: Smartphone, label: '휴대폰 소액결제', description: '통신사 결제' }
  ];

  // 현재 연도 + 1 (신년운세니까)
  const currentYear = new Date().getFullYear();
  const targetYear = currentYear + (new Date().getMonth() >= 10 ? 1 : 0); // 11월부터는 다음해

  // 로딩 중이면 로딩 화면 표시
  if (isLoading) {
    return <LoadingScreen type="newyear" />;
  }
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #FEF2F2 0%, #FFF7ED 50%, #FFFBEB 100%)'
    }}>
      {/* 육각형 패턴 배경 */}
      <svg width="100" height="87" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="hexagons-newyear" width="100" height="87" patternUnits="userSpaceOnUse">
            <path d="M50 0 L93.3 25 L93.3 62 L50 87 L6.7 62 L6.7 25 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons-newyear)" className="text-red-900"/>
      </svg>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-md">
        {/* ===== 신년운세 헤더 ===== */}
        <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 rounded-2xl p-5 shadow-xl border-2 border-red-600 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="hex-newyear" width="30" height="26" patternUnits="userSpaceOnUse">
                  <polygon points="15,0 30,7.5 30,22.5 15,30 0,22.5 0,7.5" fill="none" stroke="#DC2626" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hex-newyear)"/>
            </svg>
          </div>
          
          <div className="relative z-10 text-center">
            {/* 신년운세 로고 */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative" style={{animation: 'wiggle 2s ease-in-out infinite'}}>
                <div className="absolute -inset-2 bg-red-200 rounded-2xl" style={{animation: 'pulseRing 2s ease-in-out infinite'}}></div>
                <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-2xl px-5 py-2 shadow-lg" style={{border: '3px solid #991B1B'}}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎊</span>
                    <div className="text-white text-xl tracking-tight" style={{fontWeight: 900}}>{targetYear} 신년운세</div>
                    <span className="text-base" style={{animation: 'sparkle 1.5s ease-in-out infinite'}}>✨</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0" style={{borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid #991B1B'}}></div>
              </div>
            </div>
            
            {/* 배지 + 타이틀 */}
            <div style={{animation: 'float 3s ease-in-out infinite'}}>
              <span className="inline-block bg-gradient-to-r from-red-400 to-orange-400 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-2 shadow-md">
                🐍 {targetYear}년 을사년 대운 분석
              </span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-1">{targetYear}년 신년운세</h1>
            <p className="text-gray-600 text-sm">새해 운세로 한 해를 미리 준비하세요</p>
          </div>
        </div>

        {/* 상품 정보 카드 */}
        <div className="bg-white rounded-3xl p-6 border-2 border-red-600 shadow-2xl mb-6 animate-slideUp">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <span className="text-3xl">🎊</span>
            </div>
            <h2 className="text-gray-900 text-2xl font-bold mb-2">{targetYear}년 신년운세</h2>
            <div className="flex items-end justify-center gap-2 mb-3">
              <span className="text-red-600 text-5xl font-bold">19,900</span>
              <span className="text-gray-700 text-xl mb-2">원</span>
            </div>
            <p className="text-gray-600 text-sm">나의 사주로 보는 {targetYear}년 한 해 운세</p>
            <div className="mt-3 inline-block bg-red-50 px-4 py-2 rounded-full border-2 border-red-600">
              <p className="text-red-700 text-xs font-bold">🎁 1회 결제 • 평생 조회 가능</p>
            </div>
          </div>

          {/* 혜택 리스트 */}
          <div className="space-y-3 mb-6">
            {[
              { icon: '📜', text: `${targetYear}년 한 해 종합 사주풀이` },
              { icon: '📅', text: '월별 운세 (1월~12월 상세 분석)' },
              { icon: '💕', text: '연애운 & 결혼운' },
              { icon: '💰', text: '재물운 & 사업운' },
              { icon: '💼', text: '취업운 & 직장운' },
              { icon: '💪', text: '건강운 & 주의사항' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-red-50 rounded-lg p-3 border border-red-200">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">{item.icon}</span>
                </div>
                <span className="text-gray-900 text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          {/* 안내 문구 */}
          <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-4 border-2 border-red-300">
            <p className="text-gray-700 text-xs text-center leading-relaxed">
              ✨ 결제 후 바로 {targetYear}년 신년운세를 확인하실 수 있습니다<br />
              📱 마이페이지에서 언제든지 다시 조회 가능합니다
            </p>
          </div>
        </div>

        {/* 결제 수단 선택 카드 */}
        <div className="bg-white rounded-3xl p-6 border-2 border-red-600 shadow-2xl mb-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-gray-900 text-lg font-bold mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-red-600" />
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
                      ? 'bg-red-50 border-red-600 shadow-lg'
                      : 'bg-white border-gray-300 hover:border-red-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedMethod === method.id ? 'bg-red-600' : 'bg-gray-200'
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
                      <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 bg-red-50 rounded-lg p-3 border-2 border-red-300">
            <p className="text-red-700 text-xs text-center">
              💳 안전한 결제 (PG사: 토스페이먼츠)
            </p>
          </div>
        </div>

        {/* 약관 동의 */}
        <div className="bg-white rounded-2xl p-5 border-2 border-red-600 shadow-2xl mb-6 animate-slideUp" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={() => setAgreed(!agreed)}
            className="w-full flex items-center gap-3"
          >
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
              agreed 
                ? 'bg-red-600 border-red-600' 
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
              ? 'bg-gradient-to-r from-red-500 via-red-600 to-orange-500 text-white hover:scale-105 border-red-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400'
          }`}
          style={{ animationDelay: '0.3s' }}
          disabled={!agreed}
        >
          <span className="text-xl mr-2">🎊</span>
          <span>{targetYear}년 신년운세 결제하기</span>
          <ChevronRight className="w-6 h-6 ml-2" />
        </button>

        {/* 하단 안내 */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-xs leading-relaxed">
            ✅ 결제 후 바로 신년운세 확인 가능<br />
            📱 마이페이지에서 언제든지 다시 조회 가능<br />
            🎁 1회 결제로 {targetYear}년 내내 조회 가능
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