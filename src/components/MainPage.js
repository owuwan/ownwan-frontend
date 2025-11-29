import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Calendar, Clock, Phone, ChevronRight, Star } from 'lucide-react';
import Footer from './Footer';

export default function MainPage() {
  console.log('🔥🔥🔥 TEST - MainPage 렌더링! 🔥🔥🔥');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    birthHour: '',
    gender: '남성',
    isLunar: false,
    phone: ''
  });

  // ✅ v20 추가: 무료 체험 제한 관리
  const [trialDays, setTrialDays] = useState([]);
  const [showTrialEndModal, setShowTrialEndModal] = useState(false);
  const [showTodayUsedModal, setShowTodayUsedModal] = useState(false);

  // 🆕 Phase 1F: 생년월일 입력 알림 모달
  const [showBirthInfoModal, setShowBirthInfoModal] = useState(false);

  // 로딩 애니메이션용 state
  const [currentFortuneIndex, setCurrentFortuneIndex] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [sloganIndex, setSloganIndex] = useState(0);

  // 14가지 운세 리스트
  const fortunes = [
    { emoji: '⭐', text: '총운' },
    { emoji: '💕', text: '애정운' },
    { emoji: '💼', text: '사업운' },
    { emoji: '💰', text: '금전운' },
    { emoji: '🍀', text: '건강운' },
    { emoji: '👥', text: '대인관계운' },
    { emoji: '👨‍👩‍👧‍👦', text: '가족운' },
    { emoji: '📚', text: '학업운' },
    { emoji: '✈️', text: '여행운' },
    { emoji: '🏠', text: '부동산운' },
    { emoji: '📍', text: '행운의 장소' },
    { emoji: '🔢', text: '행운의 숫자' },
    { emoji: '🎨', text: '행운의 컬러' },
    { emoji: '⚠️', text: '리스크' }
  ];

  // 로딩 단계별 정보
  const loadingPhases = [
    {
      main: '사주 팔자 분석 중',
      sub: '천간과 지지를 계산하고 있어요',
      progress: 30,
      step: 1
    },
    {
      main: '14가지 운세 생성 중',
      sub: '꼼꼼히 당신만의 운세를 작성하고 있어요 ✍️',
      progress: 70,
      step: 2
    },
    {
      main: '최종 점검 중',
      sub: (
  <>
    곧 만나실 수 있어요!<br />
    조금만 더 기다려주세요! 🎉
  </>
),
      progress: 95,
      step: 3
    }
  ];

  // 로딩 중일 때 이모티콘 순환
  useEffect(() => {
    if (isLoading) {
      const fortuneInterval = setInterval(() => {
        setCurrentFortuneIndex((prev) => (prev + 1) % fortunes.length);
      }, 1000);

      return () => clearInterval(fortuneInterval);
    }
  }, [isLoading]);

  // 로딩 중일 때 단계 변경
  useEffect(() => {
    if (isLoading) {
      const startTime = Date.now();
      
      const phaseInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        
        if (elapsed >= 6) {
          setLoadingPhase(2);
        } else if (elapsed >= 3) {
          setLoadingPhase(1);
        } else {
          setLoadingPhase(0);
        }
      }, 500);

      return () => clearInterval(phaseInterval);
    } else {
      setLoadingPhase(0);
    }
  }, [isLoading]);

  // ✅ v20 추가: 무료 체험 기록 확인
  useEffect(() => {
    const savedTrialDays = localStorage.getItem('everydaySajuTrialDays');
    if (savedTrialDays) {
      setTrialDays(JSON.parse(savedTrialDays));
    }
  }, []);

  // 🎯 슬로건 자동 슬라이드 (2초)
  useEffect(() => {
    const sloganInterval = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % 3);
    }, 2000);  // ← 여기!
    return () => clearInterval(sloganInterval);
  }, []);

  // 🆕 Phase 1F: 로그인 & 생년월일 체크
  useEffect(() => {
    async function checkBirthInfo() {
      try {
        console.log('🔍 [Step 1] 생년월일 체크 시작');

        // 🔥 동적 백엔드 URL!
        const backendUrl = window.location.hostname === 'localhost' 
         ? 'https://ownwan-backend.onrender.com' 
         : `https://ownwan-backend.onrender.com`;
        
        // API 호출 (쿠키 체크 없이 바로 시도)
        const token = localStorage.getItem('access_token');
        
        // 토큰 없으면 비로그인
        if (!token) {
          console.log('❌ 토큰 없음 - 알림 안 띄움');
          return;
        }
        
        const response = await fetch(`${backendUrl}/api/profile`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('🔍 [Step 2] API 응답:', response.status);
        
        // 401 = 로그인 안 됨
        if (response.status === 401) {
          console.log('❌ 로그인 안 됨 (401) - 알림 안 띄움');
          return;
        }
        
        // 다른 에러
        if (!response.ok) {
          console.log('❌ API 호출 실패:', response.status);
          return;
        }
        
        // 성공
        const data = await response.json();
console.log('🔍 [Step 3] 받은 데이터:', data);
console.log('🔍 [Step 3-1] data.birth:', data.birth);
console.log('🔍 [Step 3-2] data.birth?.year:', data.birth?.year);
        
        // 생년월일 체크
        const hasBirthInfo = data.birth && data.birth.year;
        console.log('🔍 [Step 4] 생년월일 있음?', hasBirthInfo);
        
        if (!hasBirthInfo && window.location.pathname !== '/mypage') {
          console.log('🔔 알림창 띄우기!');
          setShowBirthInfoModal(true);
        } else {
          console.log('✅ 생년월일 있음 - 알림 안 띄움');
        }
        
      } catch (error) {
        console.error('❌ 오류 발생:', error);
        // CORS 에러 등은 로그인 안 된 것으로 간주
        console.log('❌ 로그인 안 됨 (에러) - 알림 안 띄움');
      }
    }
    
    // 함수 실행
    checkBirthInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const sajuBackendUrl = window.location.hostname === 'localhost' ? 'https://ownwan-backend.onrender.com' : `https://ownwan-backend.onrender.com`;
const response = await fetch(`${sajuBackendUrl}/api/saju`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        navigate('/result', { state: { sajuData: data } });
      } else {
        alert('오류가 발생했습니다: ' + data.error);
      }
    } catch (error) {
      alert('서버 연결에 실패했습니다.');
      console.error('Error:', error);
    }
  };

  // ✅ v20 수정: 3일 제한 추가
  const handleFreeTrial = async (e) => {
  if (e) e.preventDefault();
  
  // ✅ 이름 체크 제거!
  if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
    alert('생년월일을 입력해주세요!');
    return;
  }
    
    // 3일 제한 체크
    const today = new Date().toISOString().split('T')[0];
    const savedTrialDays = localStorage.getItem('everydaySajuTrialDays');
    let usedDays = savedTrialDays ? JSON.parse(savedTrialDays) : [];
    
    if (usedDays.includes(today)) {
  setShowTodayUsedModal(true);
  return;
}
    
    if (usedDays.length >= 3) {
      setShowTrialEndModal(true);
      return;
    }
    
    setIsLoading(true);
    
    try {
  // 🔥 동적 백엔드 URL
  const backendUrl = window.location.hostname === 'localhost' 
    ? 'https://ownwan-backend.onrender.com' 
    : `https://ownwan-backend.onrender.com`;
  
  const response = await fetch(`${backendUrl}/api/saju`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
        body: JSON.stringify({
  name: '체험자',  // ✅ 기본값 설정!
  birthYear: formData.birthYear,
  birthMonth: formData.birthMonth,
  birthDay: formData.birthDay,
  birthHour: formData.birthHour || '14-16',
  gender: formData.gender,
  isLunar: formData.isLunar
})
      });
      
      const data = await response.json();
      
      if (response.ok) {
        usedDays.push(today);
        localStorage.setItem('everydaySajuTrialDays', JSON.stringify(usedDays));
        setTrialDays(usedDays);
        
        setIsLoading(false);
        navigate('/result', { state: { sajuData: data } });
      } else {
        setIsLoading(false);
        alert('오류가 발생했습니다: ' + data.error);
      }
    } catch (error) {
      setIsLoading(false);
      alert('서버 연결에 실패했습니다.');
      console.error('Error:', error);
    }
  };

  // ✅ v20 추가: Test 모드 (무제한, 관리자용)
  const handleTestMode = async (e) => {
    if (e) e.preventDefault();
    
    if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
  alert('생년월일을 입력해주세요!');
  return;
}
    
    setIsLoading(true);
    
    try {
  // 🔥 동적 백엔드 URL
  const backendUrl = window.location.hostname === 'localhost' 
    ? 'https://ownwan-backend.onrender.com' 
    : `https://ownwan-backend.onrender.com`;
  
  const response = await fetch(`${backendUrl}/api/saju`, {
    method: 'POST',
    headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
  name: '체험자',  // ✅ 기본값 설정!
  birthYear: formData.birthYear,
  birthMonth: formData.birthMonth,
  birthDay: formData.birthDay,
  birthHour: formData.birthHour || '14-16',
  gender: formData.gender,
  isLunar: formData.isLunar
})
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsLoading(false);
        navigate('/result', { state: { sajuData: data } });
      } else {
        setIsLoading(false);
        alert('오류가 발생했습니다: ' + data.error);
      }
    } catch (error) {
      setIsLoading(false);
      alert('서버 연결에 실패했습니다.');
      console.error('Error:', error);
    }
  };

  const handleSubscribe = () => {
    navigate('/payment');
  };

  const years = [];
  for (let i = 2025; i >= 1900; i--) {
    years.push(i);
  }

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // ✅ v18 로딩 화면 (버전 2 - 진행 단계 표시)
  if (isLoading) {
    const currentPhase = loadingPhases[loadingPhase];
    
    return (
      <div className="min-h-screen relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #E5E7EB 0%, #F9FAFB 50%, #FFFFFF 100%)'
      }}>
        {/* 육각형 패턴 배경 */}
        <svg width="100" height="87" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="hexagons-loading" width="100" height="87" patternUnits="userSpaceOnUse">
              <path d="M50 0 L93.3 25 L93.3 62 L50 87 L6.7 62 L6.7 25 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons-loading)" className="text-gray-900"/>
        </svg>

        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center px-6 max-w-md w-full">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-gray-900" style={{
              animation: 'float 3s ease-in-out infinite'
            }}>
              
              {/* 타이틀 - 오운완으로 변경 */}
              <div className="mb-6">
                <h3 className="text-sm text-gray-600 mb-2 tracking-wider">오운완</h3>
                <div className="w-16 h-1 bg-gray-900 mx-auto"></div>
              </div>

              {/* 궤도 시스템 */}
              <div className="relative mb-6" style={{ height: '150px' }}>
                {/* 중앙 코어 */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-br from-gray-700 to-gray-900 w-20 h-20 rounded-full flex items-center justify-center shadow-xl" style={{
                    animation: 'glowPulse 2s ease-in-out infinite'
                  }}>
                    <div className="text-4xl" style={{
                      animation: 'scaleIn 0.5s ease-out'
                    }}>
                      {fortunes[currentFortuneIndex].emoji}
                    </div>
                  </div>
                </div>

                {/* 궤도 원 */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-[150px] h-[150px] border-2 border-gray-300 border-dashed rounded-full"></div>
                </div>

                {/* 궤도를 도는 점들 */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute w-2.5 h-2.5 bg-gray-900 rounded-full" style={{
                    animation: 'orbit 3s linear infinite'
                  }}></div>
                  <div className="absolute w-2.5 h-2.5 bg-gray-700 rounded-full" style={{
                    animation: 'orbit 3s linear infinite',
                    animationDelay: '-1s'
                  }}></div>
                  <div className="absolute w-2.5 h-2.5 bg-gray-500 rounded-full" style={{
                    animation: 'orbit 3s linear infinite',
                    animationDelay: '-2s'
                  }}></div>
                </div>
              </div>

              {/* 텍스트 */}
              <div className="space-y-4">
                {/* 단계 표시 */}
                <div className="flex justify-center gap-2 mb-3">
                  {[1, 2, 3].map((step) => (
                    <div 
                      key={step}
                      className="w-3 h-3 rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: step <= currentPhase.step ? '#111827' : '#D1D5DB',
                        transform: step <= currentPhase.step ? 'scale(1.2)' : 'scale(1)'
                      }}
                    ></div>
                  ))}
                </div>

                <h2 className="text-xl font-bold text-gray-900" style={{
                  animation: 'fadeIn 0.5s ease-out'
                }}>
                  {currentPhase.main}
                </h2>
                
                <p className="text-sm text-gray-600 mb-4" style={{
                  animation: 'fadeIn 0.5s ease-out'
                }}>
                  {currentPhase.sub}
                </p>

                {/* 진행률 바 */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-gray-700 to-gray-900 rounded-full transition-all duration-1000"
                    style={{ width: `${currentPhase.progress}%` }}
                  ></div>
                </div>

                {/* 바 애니메이션 */}
                <div className="flex items-center justify-center gap-2 py-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <div 
                        key={i}
                        className="w-1 bg-gray-900 rounded-full transition-all duration-300"
                        style={{
                          height: `${8 + Math.sin(Date.now() / 200 + i) * 6}px`,
                          backgroundColor: i % 2 === 0 ? '#374151' : '#111827'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(35px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(35px) rotate(-360deg); }
          }
          @keyframes scaleIn {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); }
            50% { box-shadow: 0 0 25px rgba(0, 0, 0, 0.2); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  // 입력 화면 (컴팩트 버전)
  return (
    <div className="min-h-screen relative overflow-hidden pb-5" style={{ 
      fontFamily: "'Nanum Gothic', 'Malgun Gothic', sans-serif",
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf0 50%, #f0f2f8 100%)'
    }}>
      {/* 육각형 패턴 - 주역 괘 느낌 */}
      <div className="absolute inset-0 opacity-[0.21]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='173.2' viewBox='0 0 200 173.2' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000000' stroke-width='2'%3E%3Cpath d='M 50 0 L 100 0 L 125 43.3 L 100 86.6 L 50 86.6 L 25 43.3 Z' opacity='0.4'/%3E%3Cpath d='M 150 0 L 200 0 L 225 43.3 L 200 86.6 L 150 86.6 L 125 43.3 Z' opacity='0.3'/%3E%3Cpath d='M 0 86.6 L 50 86.6 L 75 130 L 50 173.2 L 0 173.2 L -25 130 Z' opacity='0.35'/%3E%3Cpath d='M 100 86.6 L 150 86.6 L 175 130 L 150 173.2 L 100 173.2 L 75 130 Z' opacity='0.4'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '200px 173.2px'
      }}></div>

      {/* 부드러운 빛 효과 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-indigo-200 rounded-full filter blur-3xl opacity-15"></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&family=Black+Han+Sans&family=Noto+Sans+KR:wght@900&display=swap');
        
        * {
          font-family: 'Nanum Gothic', 'Malgun Gothic', sans-serif !important;
        }
        
        @keyframes float {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(30px) translateY(-20px); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.7; }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>

      {/* 메인 컨텐츠 */}
      <div className="max-w-2xl mx-auto px-4 py-6 relative z-10">
        
        {/* ===== 오운완 로고 + 슬로건 (자동+스와이프) ===== */}
        <div className="bg-white rounded-2xl p-5 shadow-xl border-2 border-gray-900 mb-4 relative overflow-hidden">
          {/* 육각형 패턴 배경 */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="hex-logo" width="30" height="26" patternUnits="userSpaceOnUse">
                  <polygon points="15,0 30,7.5 30,22.5 15,30 0,22.5 0,7.5" fill="none" stroke="#000" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hex-logo)"/>
            </svg>
          </div>
          
          <div className="relative z-10 text-center">
            {/* 오운완 로고 */}
            <div className="flex items-center justify-center mb-5">
              <div className="relative" style={{animation: 'wiggle 2s ease-in-out infinite'}}>
                <div className="absolute -inset-2 bg-amber-200 rounded-2xl" style={{animation: 'pulseRing 2s ease-in-out infinite'}}></div>
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl px-6 py-3 shadow-lg" style={{border: '3px solid #111827'}}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📬</span>
                    <div className="text-gray-900 text-2xl tracking-tight" style={{fontWeight: 900}}>오운완</div>
                    <span className="text-lg" style={{animation: 'sparkle 1.5s ease-in-out infinite'}}>✨</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0" style={{borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid #111827'}}></div>
              </div>
            </div>
            
            {/* 슬로건 박스 (스와이프 가능) */}
            <div 
              className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-200 shadow-md"
              onTouchStart={(e) => {
                e.currentTarget.dataset.touchStart = e.touches[0].clientX;
              }}
              onTouchMove={(e) => {
                e.currentTarget.dataset.touchEnd = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                const start = parseFloat(e.currentTarget.dataset.touchStart || 0);
                const end = parseFloat(e.currentTarget.dataset.touchEnd || 0);
                if (start - end > 50) {
                  setSloganIndex((prev) => (prev + 1) % 3);
                }
                if (end - start > 50) {
                  setSloganIndex((prev) => (prev - 1 + 3) % 3);
                }
              }}
            >
              <div className="inline-block bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                🎯 오늘 운세 완료!
              </div>
              <p className="text-gray-800 text-sm font-bold leading-relaxed transition-opacity duration-300">
                {[
  <>"행운을 찾기보다,<br />불운을 피하는 게 진짜 운세"</>,
  <>"운 좋은 날을 기다리지 말고,<br />운 나쁜 날을 피하세요"</>,
  <>"복을 부르는 것보다,<br />화를 피하는 게 진짜 사주"</>
][sloganIndex]}
              </p>
              {/* 인디케이터 */}
              <div className="flex justify-center gap-1 mt-3">
                {[0, 1, 2].map((idx) => (
                  <span 
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === sloganIndex ? 'bg-gray-900 scale-125' : 'bg-gray-300'}`}
                    onClick={() => setSloganIndex(idx)}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 입력 폼 박스 - 작게 */}
        <div className="bg-white rounded-2xl p-5 shadow-xl border-2 border-gray-900">
          <div className="space-y-4">

            {/* 생년월일 */}
            <div>
              <label className="block text-gray-900 font-bold mb-2 text-xs border-l-4 border-gray-900 pl-2">생년월일</label>
              <div className="grid grid-cols-3 gap-2">
                <select 
  name="birthYear"
  value={formData.birthYear} 
  onChange={handleInputChange} 
  className="px-3 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent"
  style={{ 
    background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)',
    border: '2px solid #d1d5db',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(255,255,255,0.5)'
  }}>
  <option value="">년</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select 
  name="birthMonth"
  value={formData.birthMonth} 
  onChange={handleInputChange} 
  className="px-3 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent"
  style={{ 
    background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)',
    border: '2px solid #d1d5db',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(255,255,255,0.5)'
  }}>
  <option value="">월</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <select 
  name="birthDay"
  value={formData.birthDay} 
  onChange={handleInputChange} 
  className="px-3 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent"
  style={{ 
    background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)',
    border: '2px solid #d1d5db',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(255,255,255,0.5)'
  }}>
  <option value="">일</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 태어난 시간 */}
            <div>
              <label className="block text-gray-900 font-bold mb-2 text-xs border-l-4 border-gray-900 pl-2">태어난 시간</label>
              <select 
  name="birthHour"
  value={formData.birthHour} 
  onChange={handleInputChange} 
  className="w-full px-4 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent"
  style={{ 
    background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)',
    border: '2px solid #d1d5db',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(255,255,255,0.5)'
  }}>
  <option value="">모름</option>
                <option value="23-01">자시 (23:00~01:00)</option>
                <option value="01-03">축시 (01:00~03:00)</option>
                <option value="03-05">인시 (03:00~05:00)</option>
                <option value="05-07">묘시 (05:00~07:00)</option>
                <option value="07-09">진시 (07:00~09:00)</option>
                <option value="09-11">사시 (09:00~11:00)</option>
                <option value="11-13">오시 (11:00~13:00)</option>
                <option value="13-15">미시 (13:00~15:00)</option>
                <option value="15-17">신시 (15:00~17:00)</option>
                <option value="17-19">유시 (17:00~19:00)</option>
                <option value="19-21">술시 (19:00~21:00)</option>
                <option value="21-23">해시 (21:00~23:00)</option>
              </select>
            </div>

            {/* 성별 */}
            <div>
              <label className="block text-gray-900 font-bold mb-2 text-xs border-l-4 border-gray-900 pl-2">성별</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, gender: '남성'})} 
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all border ${formData.gender === '남성' ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-800 hover:bg-gray-50 border-gray-300'}`}>
                  남성
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, gender: '여성'})} 
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all border ${formData.gender === '여성' ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-800 hover:bg-gray-50 border-gray-300'}`}>
                  여성
                </button>
              </div>
            </div>

            {/* 양력/음력 */}
            <div>
              <label className="block text-gray-900 font-bold mb-2 text-xs border-l-4 border-gray-900 pl-2">양력/음력</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, isLunar: false})} 
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all border ${!formData.isLunar ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-800 hover:bg-gray-50 border-gray-300'}`}>
                  양력
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, isLunar: true})} 
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all border ${formData.isLunar ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-800 hover:bg-gray-50 border-gray-300'}`}>
                  음력
                </button>
              </div>
            </div>

            {/* 휴대폰 번호 */}
            <div>
              <label className="block text-gray-900 font-bold mb-2 text-xs border-l-4 border-gray-900 pl-2">휴대폰 번호 (카카오톡 전송용)</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone} 
                onChange={handleInputChange} 
                placeholder="010-1234-5678" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent"/>
            </div>

            {/* 무료 체험 버튼 */}
            <button 
              onClick={handleFreeTrial}
              className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 rounded-lg font-bold text-sm shadow-lg border-2 border-gray-900 hover:from-gray-900 hover:to-black transition-all">
              ✨ 무료 체험하기
            </button>

            {/* ✅ v20 추가: Test 버튼 (관리자용, 나중에 삭제) */}
            <button 
              onClick={handleTestMode}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2 rounded-lg font-bold text-xs shadow-lg border-2 border-red-800 hover:from-red-700 hover:to-red-800 transition-all">
              🔧 Test (무제한)
            </button>
            {/* 🧪 테스트 로그인 버튼 (토스페이먼츠 심사용) */}
            <button 
              onClick={async () => {
                try {
                  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://ownwan-backend.onrender.com';
                  const response = await fetch(`${backendUrl}/api/auth/test-login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                  });
                  const data = await response.json();
                  if (data.success) {
                    localStorage.setItem('access_token', data.token);
                    window.location.reload();
                  } else {
                    alert('테스트 로그인 실패: ' + data.message);
                  }
                } catch (error) {
                  alert('테스트 로그인 오류: ' + error.message);
                }
              }}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg font-bold text-xs shadow-lg border-2 border-red-700 hover:from-red-600 hover:to-red-700 transition-all">
              🧪 테스트 계정 로그인 (토스페이먼츠 심사용)
            </button>

            {/* 가격 안내 박스 */}
            <div className="text-center text-gray-900 text-xs font-medium space-y-0.5 bg-gray-50 rounded-lg p-3 border border-gray-300">
              <p>🎁 3일간 무료 체험 가능</p>
              <p>💌 일일사주: 9,900원/월</p>
              <p>🗓️ 월간사주: 11,000원</p>
              <p>♾️ 평생사주: 29,900원</p>
            </div>
          </div>
        </div>

        {/* 🆕 Phase 1F: 생년월일 입력 알림 모달 */}
        {showBirthInfoModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full border-2 border-gray-900 shadow-2xl relative overflow-hidden">
              {/* 육각형 패턴 배경 */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="hexagons-modal" x="0" y="0" width="50" height="43.4" patternUnits="userSpaceOnUse">
                      <polygon points="25,0 50,14.4 50,28.9 25,43.4 0,28.9 0,14.4" fill="none" stroke="#000" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hexagons-modal)" />
                </svg>
              </div>

              <div className="relative z-10 text-center">
                {/* 아이콘 */}
                <div className="text-5xl mb-4">📋</div>
                
                {/* 메시지 */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  마이페이지에서<br/>사주 정보를 입력해주세요!
                </h3>
                <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                  정확한 운세를 받아보실 수 있어요
                </p>

                {/* 버튼 2개 */}
                <div className="space-y-2">
                  {/* 바로가기 버튼 (강조) */}
                  <button
                    onClick={() => {
                      setShowBirthInfoModal(false);
                      navigate('/mypage');
                    }}
                    className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 rounded-lg font-bold text-sm shadow-lg border-2 border-gray-900 hover:from-gray-900 hover:to-black transition-all">
                    👉 바로가기
                  </button>
                  
                  {/* 다음에 할게요 버튼 (덜 강조) */}
                  <button
                    onClick={() => setShowBirthInfoModal(false)}
                    className="w-full bg-gray-100 text-gray-600 py-2 rounded-lg font-bold text-xs border border-gray-300 hover:bg-gray-200 transition-all">
                    다음에 할게요
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ✅ v20 추가: 무료 체험 종료 모달 */}
        {showTrialEndModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full border-2 border-gray-900 shadow-2xl">
              <div className="text-center">
                <div className="text-5xl mb-3">😢</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  무료체험 이용권이<br/>종료되었습니다
                </h3>
                <p className="text-gray-700 text-sm mb-5 leading-relaxed">
                  3일간의 무료 체험이 모두 소진되었습니다.<br/>
                  계속해서 매일 아침 운세를 받아보시려면<br/>
                  구독을 시작해주세요!
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setShowTrialEndModal(false);
                      navigate('/payment');
                    }}
                    className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 rounded-lg font-bold text-sm shadow-lg border-2 border-gray-900 hover:from-gray-900 hover:to-black transition-all">
                    💌 구독하러 가기
                  </button>
                  <button
                    onClick={() => setShowTrialEndModal(false)}
                    className="w-full bg-white text-gray-700 py-2 rounded-lg font-bold text-xs border border-gray-300 hover:bg-gray-50 transition-all">
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 🆕 오늘 이미 사용 모달 */}
{showTodayUsedModal && (
  <div 
    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    onClick={() => setShowTodayUsedModal(false)}
  >
    {/* 배경 오버레이 */}
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
    
    {/* 모달 박스 */}
    <div 
      className="relative bg-gradient-to-br from-[#f5f7fa] via-[#e8eaf0] to-[#f0f2f8] rounded-2xl border-4 border-gray-900 shadow-2xl max-w-sm w-full p-8"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 육각형 패턴 배경 */}
      <div 
        className="absolute inset-0 opacity-[0.03] rounded-2xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10">
        {/* 아이콘 */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
            <span className="text-3xl">⏰</span>
          </div>
        </div>

        {/* 메시지 */}
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          오늘은 이미 사용했어요
        </h3>
        <p className="text-gray-700 text-center mb-6 leading-relaxed">
          무료 체험은 하루에 1회만 가능해요.<br/>
          내일 다시 이용해주세요! 😊
        </p>

        {/* 확인 버튼 */}
        <button
          onClick={() => setShowTodayUsedModal(false)}
          className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all border-2 border-gray-900 shadow-lg"
        >
          확인
        </button>
      </div>
    </div>
  </div>
)}

        {/* 14가지 운세 박스 - 작게 */}
        <div className="bg-white rounded-2xl p-4 shadow-xl mt-4 border-2 border-gray-900">
          <h3 className="text-sm font-bold text-gray-900 mb-3 text-center border-b-2 border-gray-900 pb-2 leading-relaxed">
            📄 매일 오전 8시 카톡 리포트전송<br/>14가지 나의 실제운세
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-300"><span className="text-lg">⭐</span><span className="text-xs font-medium text-gray-900">총합운</span></div>
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-300"><span className="text-lg">💕</span><span className="text-xs font-medium text-gray-900">애정운</span></div>
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-300"><span className="text-lg">💼</span><span className="text-xs font-medium text-gray-900">사업운</span></div>
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-300"><span className="text-lg">💰</span><span className="text-xs font-medium text-gray-900">금전운</span></div>
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-300"><span className="text-lg">🥕</span><span className="text-xs font-medium text-gray-900">건강운</span></div>
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-300"><span className="text-lg">👥</span><span className="text-xs font-medium text-gray-900">대인관계운</span></div>
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-300"><span className="text-lg">👨‍👩‍👧‍👦</span><span className="text-xs font-medium text-gray-900">가족운</span></div>
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-300"><span className="text-lg">📚</span><span className="text-xs font-medium text-gray-900">학업운</span></div>
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-300"><span className="text-lg">✈️</span><span className="text-xs font-medium text-gray-900">여행운</span></div>
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-300"><span className="text-lg">🏠</span><span className="text-xs font-medium text-gray-900">부동산운</span></div>
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-300"><span className="text-lg">📍</span><span className="text-xs font-medium text-gray-900">행운의 장소</span></div>
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-300"><span className="text-lg">🎲</span><span className="text-xs font-medium text-gray-900">행운의 숫자</span></div>
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-300"><span className="text-lg">🎨</span><span className="text-xs font-medium text-gray-900">행운의 색상</span></div>
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-300"><span className="text-lg">⚠️</span><span className="text-xs font-medium text-gray-900">리스크</span></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}