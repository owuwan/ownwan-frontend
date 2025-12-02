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
  // 테스트 로그인 로딩 state
  const [isTestLoginLoading, setIsTestLoginLoading] = useState(false);

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
    }, 2000);
    return () => clearInterval(sloganInterval);
  }, []);

  // 🆕 Phase 1F: 로그인 & 생년월일 체크
  useEffect(() => {
    async function checkBirthInfo() {
      try {
        console.log('🔍 [Step 1] 생년월일 체크 시작');

        const backendUrl = window.location.hostname === 'localhost' 
         ? 'https://ownwan-backend.onrender.com' 
         : `https://ownwan-backend.onrender.com`;
        
        const token = localStorage.getItem('access_token');
        
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
        
        if (response.status === 401) {
          console.log('❌ 로그인 안 됨 (401) - 알림 안 띄움');
          return;
        }
        
        if (!response.ok) {
          console.log('❌ API 호출 실패:', response.status);
          return;
        }
        
        const data = await response.json();
        console.log('🔍 [Step 3] 받은 데이터:', data);
        console.log('🔍 [Step 3-1] data.birth:', data.birth);
        console.log('🔍 [Step 3-2] data.birth?.year:', data.birth?.year);
        
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
        console.log('❌ 로그인 안 됨 (에러) - 알림 안 띄움');
      }
    }
    
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
    
    setIsLoading(true);
    
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

  // ✅ v20 수정: 3일 제한 추가
  const handleFreeTrial = async (e) => {
    if (e) e.preventDefault();
    
    if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
      alert('생년월일을 입력해주세요!');
      return;
    }
    
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
      const backendUrl = window.location.hostname === 'localhost' 
        ? 'https://ownwan-backend.onrender.com' 
        : `https://ownwan-backend.onrender.com`;
      
      const response = await fetch(`${backendUrl}/api/saju`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: '체험자',
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
      const backendUrl = window.location.hostname === 'localhost' 
        ? 'https://ownwan-backend.onrender.com' 
        : `https://ownwan-backend.onrender.com`;
      
      const response = await fetch(`${backendUrl}/api/saju`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: '체험자',
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

  // 무료 체험 남은 횟수 계산
  const freeTrialMax = 3;
  const freeTrialUsed = trialDays.length;

  // ✅ 로딩 화면 (새 디자인 적용)
  if (isLoading) {
    const currentPhase = loadingPhases[loadingPhase];
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 relative overflow-hidden">
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

        {/* 육각형 패턴 배경 */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="hex-loading" width="50" height="43.4" patternUnits="userSpaceOnUse">
                <polygon points="25,0 50,12.5 50,37.5 25,50 0,37.5 0,12.5" fill="none" stroke="#000" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex-loading)"/>
          </svg>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center px-6 max-w-md w-full">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-900" style={{
              animation: 'float 3s ease-in-out infinite'
            }}>
              
              {/* 타이틀 */}
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
      </div>
    );
  }

  // ===== 메인 화면 (새 디자인 적용) =====
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 pb-24 overflow-hidden">
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
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>

      {/* 육각형 패턴 배경 */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hex" width="50" height="43.4" patternUnits="userSpaceOnUse">
              <polygon points="25,0 50,12.5 50,37.5 25,50 0,37.5 0,12.5" fill="none" stroke="#000" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)"/>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto p-4 space-y-4">
        
        {/* ===== 상단 로고 (흔들흔들 + 금빛 테두리) ===== */}
        <div className="relative text-center py-4">
          <div 
            className="inline-block relative"
            style={{ animation: 'wiggle 2s ease-in-out infinite' }}
          >
            {/* 금빛 글로우 테두리 */}
            <div 
              className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-2xl"
              style={{ animation: 'goldGlow 2s ease-in-out infinite' }}
            ></div>
            <div className="relative bg-gradient-to-b from-gray-50 to-white rounded-2xl px-8 py-4 border-2 border-gray-900">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📬</span>
                <span className="text-gray-900 text-3xl font-black tracking-tight">오운완</span>
                <span className="text-xl">✨</span>
              </div>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
          
          {/* 슬로건 박스 (스와이프 가능) */}
          <div 
            className="mt-6 bg-white rounded-2xl p-4 border-2 border-gray-200 shadow-lg"
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
            <div className="inline-block bg-gray-900 text-white text-xs font-black px-3 py-1 rounded-full mb-2">
              🎯 오늘 운세 완료!
            </div>
            <p className="text-gray-700 text-sm font-bold leading-relaxed">
              {[
                "행운을 찾기보다, 불운을 피하는 게 진짜 운세",
                "운 좋은 날을 기다리지 말고, 운 나쁜 날을 피하세요",
                "복을 부르는 것보다, 화를 피하는 게 진짜 사주"
              ][sloganIndex]}
            </p>
            <div className="flex justify-center gap-1.5 mt-3">
              {[0, 1, 2].map((idx) => (
                <button 
                  key={idx}
                  onClick={() => setSloganIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === sloganIndex ? 'bg-gray-900 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ===== 일일사주 입력 카드 ===== */}
        <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-900 shadow-2xl">
          
          {/* 카드 헤더 (검정 배경) */}
          <div className="bg-gray-900 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <span className="text-xl">📬</span>
                </div>
                <div>
                  <div className="text-white font-black text-lg">일일사주</div>
                  <div className="text-gray-400 text-xs">DAILY FORTUNE</div>
                </div>
              </div>
              <div className="bg-amber-400 text-gray-900 text-xs font-black px-3 py-1.5 rounded-lg">
                🏆 BEST
              </div>
            </div>
            
            {/* HP바 스타일 무료 체험 */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-400">무료 체험</span>
                <span className="text-white font-bold">{freeTrialMax - freeTrialUsed} / {freeTrialMax}</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-gray-300 to-white rounded-full"
                  style={{ width: `${((freeTrialMax - freeTrialUsed) / freeTrialMax) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* 입력 폼 */}
          <div className="p-5 space-y-4">
            
            {/* 생년월일 */}
            <div>
              <label className="text-gray-900 font-bold text-sm flex items-center gap-2">
                <span className="w-1 h-4 bg-gray-900 rounded"></span>생년월일
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <select 
                  name="birthYear"
                  value={formData.birthYear} 
                  onChange={handleInputChange} 
                  className="p-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 text-sm"
                >
                  <option value="">년</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select 
                  name="birthMonth"
                  value={formData.birthMonth} 
                  onChange={handleInputChange} 
                  className="p-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 text-sm"
                >
                  <option value="">월</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <select 
                  name="birthDay"
                  value={formData.birthDay} 
                  onChange={handleInputChange} 
                  className="p-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 text-sm"
                >
                  <option value="">일</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 태어난 시간 */}
            <div>
              <label className="text-gray-900 font-bold text-sm flex items-center gap-2">
                <span className="w-1 h-4 bg-gray-900 rounded"></span>태어난 시간
              </label>
              <select 
                name="birthHour"
                value={formData.birthHour} 
                onChange={handleInputChange} 
                className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 text-sm mt-2"
              >
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

            {/* 성별 & 양력/음력 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-900 font-bold text-sm flex items-center gap-2">
                  <span className="w-1 h-4 bg-gray-900 rounded"></span>성별
                </label>
                <div className="grid grid-cols-2 gap-1 mt-2">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, gender: '남성'})} 
                    className={`p-3 rounded-xl font-bold text-sm ${formData.gender === '남성' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400 border-2 border-gray-200'}`}
                  >
                    남
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, gender: '여성'})} 
                    className={`p-3 rounded-xl font-bold text-sm ${formData.gender === '여성' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400 border-2 border-gray-200'}`}
                  >
                    여
                  </button>
                </div>
              </div>
              <div>
                <label className="text-gray-900 font-bold text-sm flex items-center gap-2">
                  <span className="w-1 h-4 bg-gray-900 rounded"></span>양/음력
                </label>
                <div className="grid grid-cols-2 gap-1 mt-2">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, isLunar: false})} 
                    className={`p-3 rounded-xl font-bold text-sm ${!formData.isLunar ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400 border-2 border-gray-200'}`}
                  >
                    양력
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, isLunar: true})} 
                    className={`p-3 rounded-xl font-bold text-sm ${formData.isLunar ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400 border-2 border-gray-200'}`}
                  >
                    음력
                  </button>
                </div>
              </div>
            </div>

            {/* 휴대폰 번호 */}
            <div>
              <label className="text-gray-900 font-bold text-sm flex items-center gap-2">
                <span className="w-1 h-4 bg-gray-900 rounded"></span>휴대폰 번호 (카카오톡 전송용)
              </label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone} 
                onChange={handleInputChange} 
                placeholder="010-1234-5678" 
                className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 text-sm mt-2"
              />
            </div>

            {/* 무료 체험 버튼 (골드빛 애니메이션) */}
            <button 
              onClick={handleFreeTrial}
              className="relative w-full bg-gray-900 text-white py-4 rounded-xl font-black text-lg overflow-hidden"
              style={{ animation: 'buttonGlow 2s ease-in-out infinite' }}
            >
              {/* 빛나는 효과 */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"
                style={{ animation: 'shine 3s infinite' }}
              ></div>
              <div className="relative flex items-center justify-center gap-2">
                <span className="text-xl">⭐</span>
                <span>무료 체험하기</span>
              </div>
            </button>

            {/* ✅ Test 버튼 (관리자용) */}
            <button 
              onClick={handleTestMode}
              className="w-full bg-red-600 text-white py-2 rounded-xl font-bold text-xs border-2 border-red-800 hover:bg-red-700 transition-all"
            >
              🔧 Test (무제한)
            </button>

            {/* 🧪 테스트 로그인 버튼 (토스페이먼츠 심사용) */}
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
                    window.location.reload();
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
              className="w-full bg-red-500 text-white py-2 rounded-xl font-bold text-xs border-2 border-red-700 hover:bg-red-600 transition-all disabled:opacity-50"
            >
              {isTestLoginLoading ? '🔄 로그인 중...' : '🧪 테스트 계정 로그인 (토스페이먼츠 심사용)'}
            </button>

            <p className="text-center text-gray-500 text-xs">⭐ 15개 항목 실제사주 심층분석 ⭐</p>
          </div>
        </div>

        {/* ===== 프리미엄 상점 ===== */}
        <div className="bg-white rounded-3xl p-4 border-2 border-gray-200 shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300"></div>
            <div className="flex items-center gap-2">
              <span className="text-lg">☯️</span>
              <span className="text-gray-900 text-sm font-black">PREMIUM</span>
              <span className="text-lg">☯️</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* 일일사주 - BEST */}
            <div 
              onClick={() => navigate('/payment')}
              className="relative bg-gray-100 rounded-2xl p-3 border-2 border-gray-900 cursor-pointer"
            >
              <div className="absolute top-0 right-0 bg-amber-400 text-gray-900 text-xs font-black px-2 py-0.5 rounded-bl-xl rounded-tr-xl">🏆BEST</div>
              <div className="text-2xl mb-1">📬</div>
              <div className="text-gray-900 font-bold text-sm">일일사주</div>
              <div className="text-gray-400 text-xs mb-2">15개 분석</div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <span key={i} className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>)}
              </div>
            </div>

            {/* 월간사주 */}
            <div 
              onClick={() => navigate('/monthly-payment')}
              className="relative bg-gray-50 rounded-2xl p-3 border-2 border-gray-200 hover:border-gray-900 cursor-pointer"
            >
              <div className="text-2xl mb-1">📅</div>
              <div className="text-gray-900 font-bold text-sm">월간사주</div>
              <div className="text-gray-400 text-xs mb-2">14개 분석</div>
              <div className="flex gap-0.5">
                {[1,2,3,4].map(i => <span key={i} className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>)}
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              </div>
            </div>

            {/* 신년운세 */}
            <div 
              onClick={() => navigate('/newyear')}
              className="relative bg-gray-50 rounded-2xl p-3 border-2 border-gray-200 hover:border-gray-900 cursor-pointer"
            >
              <div className="absolute top-0 right-0 bg-gray-900 text-white text-xs font-black px-2 py-0.5 rounded-bl-xl rounded-tr-xl">HOT</div>
              <div className="text-2xl mb-1">🎊</div>
              <div className="text-gray-900 font-bold text-sm">신년운세</div>
              <div className="text-gray-400 text-xs mb-2">13개 분석</div>
              <div className="flex gap-0.5">
                {[1,2,3].map(i => <span key={i} className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>)}
                {[4,5].map(i => <span key={i} className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>)}
              </div>
            </div>

            {/* 평생사주 */}
            <div 
              onClick={() => navigate('/lifetime')}
              className="relative bg-gray-50 rounded-2xl p-3 border-2 border-gray-200 hover:border-gray-900 cursor-pointer"
            >
              <div className="text-2xl mb-1">♾️</div>
              <div className="text-gray-900 font-bold text-sm">평생사주</div>
              <div className="text-gray-400 text-xs mb-2">14개 분석</div>
              <div className="flex gap-0.5">
                {[1,2,3,4].map(i => <span key={i} className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>)}
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              </div>
            </div>
          </div>

          {/* 가격 안내 */}
          <div className="mt-4 text-center bg-gray-50 rounded-xl p-3 border border-gray-200">
            <p className="text-gray-700 text-xs font-medium space-y-0.5">
              🎁 3일간 무료 체험 가능<br/>
              💌 일일사주: 9,900원/월<br/>
              🗓️ 월간사주: 11,000원<br/>
              ♾️ 평생사주: 29,900원
            </p>
          </div>
        </div>

        {/* ===== 베스트 상품 상세 (일일사주) ===== */}
        <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-900 shadow-xl">
          <div className="bg-gray-900 px-4 py-3 text-center">
            <div className="inline-block bg-amber-400 text-gray-900 text-xs font-black px-3 py-1 rounded-full mb-2">
              🏆 BEST 상품
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg">☯️</span>
              <span className="text-white font-black text-lg">일일사주</span>
              <span className="text-lg">☯️</span>
            </div>
            <div className="text-gray-400 text-xs mt-1">매일 오전 8시 카톡 리포트 전송</div>
            <div className="text-white text-sm font-bold mt-1">14가지 나의 실제운세</div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-2">
              {fortunes.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-gray-700 text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== 푸터 ===== */}
        <div className="bg-gray-900 rounded-3xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg">☯️</span>
            <span className="text-white font-black text-lg">오운완</span>
            <span className="text-lg">☯️</span>
          </div>
          <p className="text-gray-400 text-xs mb-4">오늘의 운세 완료!</p>
          <p className="text-gray-500 text-xs italic mb-4">Your Daily Fortune, Delivered Every Morning</p>
          
          <div className="border-t border-gray-700 pt-4 space-y-1">
            <p className="text-gray-500 text-xs">상호: 오운완 | 대표: 최하나 | 사업자등록번호: 476-624-00353</p>
            <p className="text-gray-500 text-xs">고객센터: +82 2364-4656</p>
          </div>

          <div className="flex items-center justify-center gap-3 mt-4 text-xs">
            <span className="text-gray-400 cursor-pointer">Terms</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400 cursor-pointer">Privacy</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400 cursor-pointer">Contact</span>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-gray-600 text-xs">© 2025 OWNWAN. All Rights Reserved.</p>
          </div>
        </div>

      </div>

      {/* ===== 하단 네비게이션 ===== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50 overflow-hidden">
        <div className="max-w-md mx-auto flex items-center justify-around py-2">
          <button 
            onClick={() => navigate('/payment')}
            className="flex flex-col items-center gap-1 p-2 text-gray-400"
          >
            <span className="text-xl">💌</span>
            <span className="text-xs font-bold">일일사주</span>
          </button>
          <button 
            onClick={() => navigate('/monthly-payment')}
            className="flex flex-col items-center gap-1 p-2 text-gray-400"
          >
            <span className="text-xl">📅</span>
            <span className="text-xs font-bold">월간사주</span>
          </button>
          <button 
            onClick={() => navigate('/newyear')}
            className="flex flex-col items-center gap-1 px-5 py-2 bg-red-500 text-white rounded-2xl shadow-lg"
          >
            <span className="text-xl">🎊</span>
            <span className="text-xs font-bold">신년운세</span>
          </button>
          <button 
            onClick={() => navigate('/lifetime')}
            className="flex flex-col items-center gap-1 p-2 text-gray-400"
          >
            <span className="text-xl">♾️</span>
            <span className="text-xs font-bold">평생사주</span>
          </button>
          <button 
            onClick={() => navigate('/mypage')}
            className="flex flex-col items-center gap-1 p-2 text-gray-400"
          >
            <span className="text-xl">👤</span>
            <span className="text-xs font-bold">MY</span>
          </button>
        </div>
      </div>

      {/* ===== 모달들 (기능 100% 유지) ===== */}
      
      {/* 🆕 Phase 1F: 생년월일 입력 알림 모달 */}
      {showBirthInfoModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-2 border-gray-900 shadow-2xl relative overflow-hidden">
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
              <div className="text-5xl mb-4">📋</div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                마이페이지에서<br/>사주 정보를 입력해주세요!
              </h3>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                정확한 운세를 받아보실 수 있어요
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setShowBirthInfoModal(false);
                    navigate('/mypage');
                  }}
                  className="relative w-full bg-gray-900 text-white py-3 rounded-xl font-black text-sm overflow-hidden"
                  style={{ animation: 'buttonGlow 2s ease-in-out infinite' }}
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"
                    style={{ animation: 'shine 3s infinite' }}
                  ></div>
                  <span className="relative">👉 바로가기</span>
                </button>
                
                <button
                  onClick={() => setShowBirthInfoModal(false)}
                  className="w-full bg-gray-50 text-gray-600 py-2 rounded-xl font-bold text-xs border-2 border-gray-200 hover:bg-gray-100 transition-all"
                >
                  다음에 할게요
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ v20 추가: 무료 체험 종료 모달 */}
      {showTrialEndModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-2 border-gray-900 shadow-2xl">
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
                  className="relative w-full bg-gray-900 text-white py-3 rounded-xl font-black text-sm overflow-hidden"
                  style={{ animation: 'buttonGlow 2s ease-in-out infinite' }}
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"
                    style={{ animation: 'shine 3s infinite' }}
                  ></div>
                  <span className="relative">💌 구독하러 가기</span>
                </button>
                <button
                  onClick={() => setShowTrialEndModal(false)}
                  className="w-full bg-gray-50 text-gray-600 py-2 rounded-xl font-bold text-xs border-2 border-gray-200 hover:bg-gray-100 transition-all"
                >
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
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          <div 
            className="relative bg-white rounded-3xl border-2 border-gray-900 shadow-2xl max-w-sm w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 육각형 패턴 배경 */}
            <div 
              className="absolute inset-0 opacity-5 rounded-3xl"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            />

            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-3xl">⏰</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                오늘은 이미 사용했어요
              </h3>
              <p className="text-gray-700 text-center mb-6 leading-relaxed">
                무료 체험은 하루에 1회만 가능해요.<br/>
                내일 다시 이용해주세요! 😊
              </p>

              <button
                onClick={() => setShowTodayUsedModal(false)}
                className="relative w-full py-3 bg-gray-900 text-white font-bold rounded-xl overflow-hidden"
                style={{ animation: 'buttonGlow 2s ease-in-out infinite' }}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"
                  style={{ animation: 'shine 3s infinite' }}
                ></div>
                <span className="relative">확인</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
