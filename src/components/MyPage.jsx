import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const navigate = useNavigate();

  // 입력 상태
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthHour, setBirthHour] = useState('');
  const [gender, setGender] = useState('');
  const [phone1, setPhone1] = useState('010');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');

  // 에러 상태
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 편집 모드 상태
  const [isEditing, setIsEditing] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // 🔥 성공 모달 상태
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // 🔥 고객센터 모달 상태
  const [activeModal, setActiveModal] = useState(null);

  // 🔥 결제 상태 (나의 사주 컬렉션)
  const [purchaseStatus, setPurchaseStatus] = useState({
    daily: false,
    monthly: false,
    newyear: false,
    lifetime: false
  });

  // 활성화된 구슬 개수 계산
  const activeCount = Object.values(purchaseStatus).filter(v => v).length;

  // 페이지 로드 시 기존 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 🔥 동적 백엔드 URL!
        const backendUrl = window.location.hostname === 'localhost'
          ? 'https://ownwan-backend.onrender.com'
          : `https://ownwan-backend.onrender.com`;

        const token = localStorage.getItem('access_token');
        const response = await fetch(`${backendUrl}/api/profile`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();

          if (data.birth) {
            setBirthYear(data.birth.year.toString());
            setBirthMonth(data.birth.month.toString());
            setBirthDay(data.birth.day.toString());
            setBirthHour(data.birth.hour.toString());
            setGender(data.gender || '');

            if (data.phone) {
              const phoneParts = data.phone.split('-');
              if (phoneParts.length === 3) {
                setPhone1(phoneParts[0]);
                setPhone2(phoneParts[1]);
                setPhone3(phoneParts[2]);
              }
            }

            setIsEditing(false);
            setIsSaved(true);
          }
        }
      } catch (error) {
        console.error('❌ 사용자 정보 불러오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

  // 🔥 결제 상태 불러오기 (TODO: 백엔드 API 연동 후 활성화)
  useEffect(() => {
    const fetchPurchaseStatus = async () => {
      try {
        const backendUrl = window.location.hostname === 'localhost'
          ? 'https://ownwan-backend.onrender.com'
          : `https://ownwan-backend.onrender.com`;

        const token = localStorage.getItem('access_token');
        const response = await fetch(`${backendUrl}/api/purchase-status`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPurchaseStatus(data);
        }
      } catch (error) {
        console.error('❌ 결제 상태 불러오기 실패:', error);
        // 실패해도 기본값 유지
      }
    };

    fetchPurchaseStatus();
  }, []);

  // 🚪 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      // 🔥 동적 백엔드 URL!
      const backendUrl = window.location.hostname === 'localhost'
        ? 'https://ownwan-backend.onrender.com'
        : `https://ownwan-backend.onrender.com`;

      // 🔥 백엔드 로그아웃 API 호출!
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${backendUrl}/api/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log('✅ 로그아웃 성공!');
        localStorage.removeItem('access_token');  // localStorage도 정리
        navigate('/login');
      } else {
        console.error('❌ 로그아웃 실패');
        // 실패해도 일단 로그인 페이지로
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.error('❌ 로그아웃 에러:', error);
      // 에러 나도 일단 로그인 페이지로
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  // 🔥 수정하기 버튼 핸들러 (수정!)
  const handleEdit = (e) => {
    e.preventDefault(); // 🔥 form submit 방지!
    setIsEditing(true);
    setError('');
  };

  // 🔥 구슬 클릭 핸들러
  const handleOrbClick = (type) => {
    if (purchaseStatus[type]) {
      // 결제 완료 → 결과 페이지로 이동
      const routes = {
        daily: '/daily-result',
        monthly: '/monthly-result',
        newyear: '/newyear-result',
        lifetime: '/lifetime-result'
      };
      navigate(routes[type]);
    } else {
      // 미결제 → 결제 페이지로 이동
      const routes = {
        daily: '/payment',
        monthly: '/monthly-payment',
        newyear: '/newyear',
        lifetime: '/lifetime'
      };
      navigate(routes[type]);
    }
  };

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 유효성 검사
    if (!birthYear || !birthMonth || !birthDay) {
      setError('생년월일을 모두 입력해주세요.');
      return;
    }

    if (!birthHour) {
      setError('출생 시간대를 선택해주세요.');
      return;
    }

    if (!gender) {
      setError('성별을 선택해주세요.');
      return;
    }

    if (!phone2 || !phone3) {
      setError('휴대폰번호를 모두 입력해주세요.');
      return;
    }

    const year = parseInt(birthYear);
    const month = parseInt(birthMonth);
    const day = parseInt(birthDay);
    const hour = parseInt(birthHour);
    const minute = 0;

    if (year < 1900 || year > 2024) {
      setError('올바른 출생 연도를 입력해주세요. (1900-2024)');
      return;
    }

    if (month < 1 || month > 12) {
      setError('올바른 월을 입력해주세요. (1-12)');
      return;
    }

    if (day < 1 || day > 31) {
      setError('올바른 일을 입력해주세요. (1-31)');
      return;
    }

    setIsSubmitting(true);

    try {

      const phoneNumber = `${phone1}-${phone2}-${phone3}`;

      const backendUrl = window.location.hostname === 'localhost'
        ? 'https://ownwan-backend.onrender.com'
        : `https://ownwan-backend.onrender.com`;

      const token = localStorage.getItem('access_token');
      const response = await fetch(`${backendUrl}/api/profile/update-birth-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          birth_year: year,
          birth_month: month,
          birth_day: day,
          birth_hour: hour,
          birth_minute: minute,
          gender: gender,
          phone: phoneNumber
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '정보 저장 실패');
      }

      console.log('✅ 생년월일 정보 저장 성공!');

      // 🔥 저장 성공 시
      setIsEditing(false);
      setIsSaved(true);
      setShowSuccessModal(true); // 🔥 커스텀 모달 표시

    } catch (error) {
      console.error('❌ 생년월일 정보 저장 에러:', error);
      setError(error.message || '정보 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔥 구슬 컴포넌트
  const Orb = ({ name, emoji, color, active, style, onClick, delay = 0 }) => (
    <div
      onClick={onClick}
      className="absolute cursor-pointer transition-all duration-300"
      style={{
        ...style,
        width: '75px',
        height: '75px',
        borderRadius: '50%',
        background: active 
          ? `linear-gradient(135deg, ${color}dd 0%, ${color} 50%, ${color}bb 100%)`
          : 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: active 
          ? `0 4px 20px ${color}60, 0 0 30px ${color}30, inset 0 2px 10px rgba(255,255,255,0.4)`
          : '0 4px 15px rgba(0,0,0,0.1), inset 0 2px 10px rgba(255,255,255,0.5)',
        border: active ? `3px solid ${color}` : '3px solid #d0d0d0',
        animation: active ? `float 3s ease-in-out infinite` : 'none',
        animationDelay: `${delay}s`
      }}
    >
      <div style={{ 
        fontSize: '26px', 
        marginBottom: '2px',
        filter: active ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'grayscale(100%) opacity(0.4)'
      }}>
        {emoji}
      </div>
      <div style={{ 
        fontSize: '10px', 
        color: active ? '#fff' : '#999',
        fontWeight: 'bold',
        textShadow: active ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
      }}>
        {name}
      </div>
      {active && (
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white">
          ✓
        </div>
      )}
    </div>
  );

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f5f7fa] via-[#e8eaf0] to-[#f0f2f8] pb-20"
      style={{ fontFamily: 'Nanum Gothic, sans-serif' }}
    >
      {/* 🔥 구슬 애니메이션 CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.03); }
        }
      `}</style>

      {/* 🔥 성공 모달 */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setShowSuccessModal(false)}
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
                  <span className="text-3xl">✅</span>
                </div>
              </div>

              {/* 메시지 */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                저장 완료!
              </h3>
              <p className="text-gray-700 text-center mb-6">
                정보가 성공적으로 저장되었습니다.
              </p>

              {/* 확인 버튼 */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all border-2 border-gray-900 shadow-lg"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

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

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-2xl">
        {/* 헤더 */}
        <div className="text-center mb-4 bg-white rounded-2xl p-4 shadow-xl border-2 border-gray-900">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xl">👤</span>
            <h1 className="text-lg font-bold text-gray-900">마이페이지</h1>
          </div>
          <p className="text-gray-600 text-xs">
            정확한 사주 분석을 위해<br></br>생년월일과 출생 시간을 입력해주세요
          </p>
        </div>

        {/* 🔥 나의 사주 컬렉션 - 구슬 UI */}
        <div className="bg-white rounded-2xl p-5 shadow-xl border-2 border-gray-900 mb-4">
          <div className="text-center mb-4">
            <h2 className="text-sm font-bold text-gray-900 flex items-center justify-center gap-1 mb-1">
              <span>🔮</span> 나의 사주 컬렉션
            </h2>
            <p className="text-gray-400 text-xs">구슬을 터치하여 운세를 확인하세요</p>
          </div>

          {/* 구슬 컨테이너 */}
          <div className="relative mx-auto" style={{ width: '280px', height: '340px' }}>
            
            {/* 연결선 SVG */}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            >
              <defs>
                <linearGradient id="activeLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="inactiveLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d1d5db" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#d1d5db" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              
              {/* 태극 → 일일 */}
              <line x1="140" y1="70" x2="60" y2="140" 
                stroke={purchaseStatus.daily ? "url(#activeLineGradient)" : "url(#inactiveLineGradient)"} 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              {/* 태극 → 평생 */}
              <line x1="140" y1="70" x2="220" y2="140" 
                stroke={purchaseStatus.lifetime ? "url(#activeLineGradient)" : "url(#inactiveLineGradient)"} 
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* 일일 → 월간 */}
              <line x1="60" y1="180" x2="85" y2="265" 
                stroke={purchaseStatus.monthly ? "url(#activeLineGradient)" : "url(#inactiveLineGradient)"} 
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* 평생 → 신년 */}
              <line x1="220" y1="180" x2="195" y2="265" 
                stroke={purchaseStatus.newyear ? "url(#activeLineGradient)" : "url(#inactiveLineGradient)"} 
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* 월간 ↔ 신년 */}
              <line x1="120" y1="290" x2="160" y2="290" 
                stroke={purchaseStatus.monthly && purchaseStatus.newyear ? "url(#activeLineGradient)" : "url(#inactiveLineGradient)"} 
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            {/* 태극 구슬 (상단 중앙) */}
            <div 
              className="absolute"
              style={{
                top: '0px',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: activeCount > 0 ? 'pulse 3s infinite' : 'none'
              }}
            >
              <div
                style={{
                  width: '85px',
                  height: '85px',
                  borderRadius: '50%',
                  background: `conic-gradient(
                    #8b5cf6 0deg ${activeCount * 90}deg,
                    #e5e7eb ${activeCount * 90}deg 360deg
                  )`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: activeCount > 0 
                    ? '0 4px 20px rgba(139, 92, 246, 0.4), inset 0 2px 10px rgba(255,255,255,0.3)'
                    : '0 4px 15px rgba(0,0,0,0.1), inset 0 2px 10px rgba(255,255,255,0.5)',
                  border: '3px solid #1f2937'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf0 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    border: '2px solid #d1d5db'
                  }}
                >
                  ☯️
                </div>
              </div>
              <div className="text-center mt-2 text-xs text-gray-500 font-bold">
                {activeCount}/4 완성
              </div>
            </div>

            {/* 일일사주 구슬 (왼쪽 위) */}
            <Orb
              name="일일사주"
              emoji="☀️"
              color="#3b82f6"
              active={purchaseStatus.daily}
              style={{ top: '115px', left: '15px' }}
              delay={0}
              onClick={() => handleOrbClick('daily')}
            />

            {/* 평생사주 구슬 (오른쪽 위) */}
            <Orb
              name="평생사주"
              emoji="⭐"
              color="#f59e0b"
              active={purchaseStatus.lifetime}
              style={{ top: '115px', right: '15px' }}
              delay={0.5}
              onClick={() => handleOrbClick('lifetime')}
            />

            {/* 월간사주 구슬 (왼쪽 아래) */}
            <Orb
              name="월간사주"
              emoji="🌙"
              color="#10b981"
              active={purchaseStatus.monthly}
              style={{ top: '245px', left: '40px' }}
              delay={1}
              onClick={() => handleOrbClick('monthly')}
            />

            {/* 신년운세 구슬 (오른쪽 아래) */}
            <Orb
              name="신년운세"
              emoji="🎆"
              color="#ef4444"
              active={purchaseStatus.newyear}
              style={{ top: '245px', right: '40px' }}
              delay={1.5}
              onClick={() => handleOrbClick('newyear')}
            />
          </div>

          {/* 범례 */}
          <div className="flex justify-center gap-5 mt-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-md" />
              <span className="text-gray-500">결제 완료</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-gray-300 border border-gray-400" />
              <span className="text-gray-400">미결제</span>
            </div>
          </div>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 shadow-xl border-2 border-gray-900 mb-4">

          {/* 생년월일 */}
          <div className="mb-5">
            <label className="block text-gray-900 text-sm font-bold mb-2 flex items-center gap-1">
              <span className="text-lg">🎂</span>
              생년월일
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-center text-sm font-bold focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all ${!isEditing ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'
                    }`}
                >
                  <option value="">년</option>
                  {Array.from({ length: 125 }, (_, i) => 2024 - i).map(year => (
                    <option key={year} value={year}>{year}년</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-center text-sm font-bold focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all ${!isEditing ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'
                    }`}
                >
                  <option value="">월</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <option key={month} value={month}>{month}월</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-center text-sm font-bold focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all ${!isEditing ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'
                    }`}
                >
                  <option value="">일</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>{day}일</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 출생 시간대 */}
          <div className="mb-5">
            <label className="block text-gray-900 text-sm font-bold mb-2 flex items-center gap-1">
              <span className="text-lg">⏰</span>
              출생 시간대
            </label>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <select
                  value={birthHour}
                  onChange={(e) => setBirthHour(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-center text-sm font-bold focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all ${!isEditing ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'
                    }`}
                >
                  <option value="">시간대를 선택하세요</option>
                  <option value="0">자시 子時 (23-01시)</option>
                  <option value="2">축시 丑時 (01-03시)</option>
                  <option value="4">인시 寅時 (03-05시)</option>
                  <option value="6">묘시 卯時 (05-07시)</option>
                  <option value="8">진시 辰時 (07-09시)</option>
                  <option value="10">사시 巳時 (09-11시)</option>
                  <option value="12">오시 午時 (11-13시)</option>
                  <option value="14">미시 未時 (13-15시)</option>
                  <option value="16">신시 申時 (15-17시)</option>
                  <option value="18">유시 酉時 (17-19시)</option>
                  <option value="20">술시 戌時 (19-21시)</option>
                  <option value="22">해시 亥時 (21-23시)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 성별 선택 */}
          <div className="mb-5">
            <label className="block text-gray-900 text-sm font-bold mb-2 flex items-center gap-1">
              <span className="text-lg">👤</span>
              성별
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => isEditing && setGender('남자')}
                disabled={!isEditing}
                className={`py-2 px-4 rounded-lg border font-bold text-sm transition-all ${gender === '남자'
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                  : !isEditing
                    ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
                    : 'bg-gray-50 text-gray-900 border-gray-300 hover:border-gray-900'
                  }`}
              >
                남자
              </button>
              <button
                type="button"
                onClick={() => isEditing && setGender('여자')}
                disabled={!isEditing}
                className={`py-2 px-4 rounded-lg border font-bold text-sm transition-all ${gender === '여자'
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                  : !isEditing
                    ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
                    : 'bg-gray-50 text-gray-900 border-gray-300 hover:border-gray-900'
                  }`}
              >
                여자
              </button>
            </div>
          </div>

          {/* 휴대폰번호 */}
          <div className="mb-5">
            <label className="block text-gray-900 text-sm font-bold mb-2 flex items-center gap-1">
              <span className="text-lg">📱</span>
              휴대폰번호
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <input
                  type="text"
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                  placeholder="010"
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-center text-sm font-bold focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all ${!isEditing ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'
                    }`}
                  maxLength="3"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  placeholder="1234"
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-center text-sm font-bold focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all ${!isEditing ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'
                    }`}
                  maxLength="4"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={phone3}
                  onChange={(e) => setPhone3(e.target.value)}
                  placeholder="5678"
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-center text-sm font-bold focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all ${!isEditing ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'
                    }`}
                  maxLength="4"
                />
              </div>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-500 rounded-lg p-3">
              <p className="text-red-700 text-center font-bold text-xs">{error}</p>
            </div>
          )}

          {/* 버튼 */}
          {isEditing ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2.5 rounded-lg font-bold text-sm text-white transition-all ${isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-gray-800 shadow-md hover:shadow-lg'
                }`}
            >
              {isSubmitting ? '저장 중...' : '정보 저장하기'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEdit}
              className="w-full py-2.5 rounded-lg font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all"
            >
              수정하기
            </button>
          )}

          {/* 안내 문구 */}
          <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-300">
            <p className="text-gray-600 text-xs text-center">
              💡 출생 시간을 정확히 모르시나요?<br></br>대략적인 시간대만 선택해도 괜찮아요!
            </p>
          </div>
        </form>

        {/* 고객센터 섹션 */}
        <div className="mt-6 bg-white rounded-xl p-5 shadow-md border border-gray-200">
          <h3 className="text-gray-900 font-bold text-sm mb-4 flex items-center gap-2">
            <span className="text-lg">📞</span>
            고객센터
          </h3>
          <div className="space-y-3">
            <button onClick={() => setActiveModal('contact')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all text-left">
              <div className="flex items-center gap-3">
                <span className="text-lg">✉️</span>
                <span className="text-gray-800 font-medium text-sm">문의하기</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button onClick={() => setActiveModal('refund')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all text-left">
              <div className="flex items-center gap-3">
                <span className="text-lg">📋</span>
                <span className="text-gray-800 font-medium text-sm">환불정책</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button onClick={() => setActiveModal('terms')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all text-left">
              <div className="flex items-center gap-3">
                <span className="text-lg">📄</span>
                <span className="text-gray-800 font-medium text-sm">이용약관</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button onClick={() => setActiveModal('privacy')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all text-left">
              <div className="flex items-center gap-3">
                <span className="text-lg">🔒</span>
                <span className="text-gray-800 font-medium text-sm">개인정보처리방침</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>

        {/* 로그아웃 버튼 */}
        <button
          onClick={handleLogout}
          className="w-full py-2.5 rounded-lg font-bold text-sm bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg transition-all mt-4"
        >
          로그아웃
        </button>
      </div>

      {/* 고객센터 모달들 */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setActiveModal(null)}>
          <div onClick={e => e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-md shadow-xl flex flex-col" style={{ maxHeight: '85vh' }}>
            
            {/* 문의하기 모달 */}
            {activeModal === 'contact' && (
              <>
                <div className="flex-shrink-0 border-b border-gray-200 p-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">✉️ 문의하기</h2>
                  <button onClick={() => setActiveModal(null)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full text-2xl">&times;</button>
                </div>
                <div className="flex-1 overflow-y-auto p-5">
                  <div className="space-y-4">
                    <p className="text-gray-700 text-sm">문의사항이 있으시면 아래 이메일로 연락해 주세요.</p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-500 text-xs mb-1">이메일</p>
                      <p className="text-gray-900 font-medium">chol5622729@naver.com</p>
                    </div>
                    <a href="mailto:chol5622729@naver.com?subject=[오운완 문의]" className="block w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg text-center hover:from-purple-700 hover:to-indigo-700 transition-all">
                      이메일 보내기
                    </a>
                    <p className="text-xs text-gray-500 text-center">답변은 영업일 기준 1~2일 이내에 드립니다.</p>
                  </div>
                </div>
              </>
            )}

            {/* 환불정책 모달 */}
            {activeModal === 'refund' && (
              <>
                <div className="flex-shrink-0 border-b border-gray-200 p-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">📋 환불정책</h2>
                  <button onClick={() => setActiveModal(null)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full text-2xl">&times;</button>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-4 text-gray-700 text-sm leading-relaxed">
                  <section>
                    <h3 className="font-bold text-gray-900 mb-2">제1조 (환불 원칙)</h3>
                    <p>오운완 서비스는 「전자상거래 등에서의 소비자보호에 관한 법률」에 따라 환불 정책을 운영합니다.</p>
                  </section>
                  <section>
                    <h3 className="font-bold text-gray-900 mb-2">제2조 (환불 가능 기간)</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>월간 구독권:</strong> 결제일로부터 7일 이내, 서비스 미이용 시 전액 환불</li>
                      <li><strong>단건 상품:</strong> 결제일로부터 7일 이내, 콘텐츠 미열람 시 전액 환불</li>
                      <li><strong>평생 이용권:</strong> 결제일로부터 7일 이내, 서비스 미이용 시 전액 환불</li>
                    </ul>
                  </section>
                  <section>
                    <h3 className="font-bold text-gray-900 mb-2">제3조 (환불 불가 사유)</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>콘텐츠를 이미 열람한 경우</li>
                      <li>구독 기간 중 일부를 사용한 경우</li>
                      <li>결제일로부터 7일이 경과한 경우</li>
                    </ul>
                  </section>
                  <section>
                    <h3 className="font-bold text-gray-900 mb-2">제4조 (환불 신청 방법)</h3>
                    <p>고객센터 문의하기를 통해 회원 이메일, 결제일자, 환불 사유를 알려주세요.</p>
                  </section>
                  <section>
                    <h3 className="font-bold text-gray-900 mb-2">제5조 (환불 처리 기간)</h3>
                    <p>영업일 기준 3~7일 이내에 처리됩니다.</p>
                  </section>
                  <div className="pt-4 border-t border-gray-200 text-xs text-gray-500">
                    <p>시행일: 2025년 1월 1일</p>
                    <p>문의: chol5622729@naver.com</p>
                  </div>
                </div>
              </>
            )}

            {/* 이용약관 모달 */}
            {activeModal === 'terms' && (
              <>
                <div className="flex-shrink-0 border-b border-gray-200 p-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">📄 이용약관</h2>
                  <button onClick={() => setActiveModal(null)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full text-2xl">&times;</button>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-4 text-gray-700 text-sm leading-relaxed">
                  <section>
                    <h3 className="font-bold text-gray-900 mb-2">제1조 (목적)</h3>
                    <p>본 약관은 오운완(이하 "서비스")이 제공하는 운세 정보 서비스의 이용 조건을 규정합니다.</p>
                  </section>
                  <section>
                    <h3 className="font-bold text-gray-900 mb-2">제2조 (서비스의 내용)</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>AI 기반 개인 맞춤형 운세 정보 제공</li>
                      <li>일간/월간 운세 리포트 서비스</li>
                      <li>사주 분석 및 해석 서비스</li>
                    </ul>
                  </section>
                  <section>
                    <h3 className="font-bold text-gray-900 mb-2">제3조 (회원가입 및 자격)</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>카카오톡 또는 네이버 소셜 로그인으로 가입</li>
                      <li>만 14세 미만은 서비스 이용 제한</li>
                      <li>허위 정보 입력 시 이용 제한</li>
                    </ul>
                  </section>
                  <section>
                    <h3 className="font-bold text-gray-900 mb-2">제4조 (면책조항)</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>본 서비스는 오락 및 참고 목적으로 제공됩니다.</li>
                      <li>중요한 결정에 대한 전문적 조언을 대체하지 않습니다.</li>
                    </ul>
                  </section>
                  <section>
                    <h3 className="font-bold text-gray-900 mb-2">제5조 (저작권)</h3>
                    <p>모든 콘텐츠의 저작권은 오운완에 있으며, 무단 복제를 금합니다.</p>
                  </section>
                  <div className="pt-4 border-t border-gray-200 text-xs text-gray-500">
                    <p>시행일: 2025년 1월 1일</p>
                    <p>문의: chol5622729@naver.com</p>
                  </div>
                </div>
              </>
            )}

            {/* 개인정보처리방침 모달 */}
            {activeModal === 'privacy' && (
              <>
                <div className="flex-shrink-0 border-b border-gray-200 p-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">🔒 개인정보처리방침</h2>
                  <button onClick={() => setActiveModal(null)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full text-2xl">&times;</button>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-4 text-gray-700 text-sm leading-relaxed">
                  <section>
                    <h3 className="font-bold text-gray-900 mb-2">제1조 (수집하는 개인정보)</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>필수:</strong> 이름(닉네임), 이메일, 생년월일, 성별</li>
                      <li><strong>자동 수집:</strong> 서비스 이용기록, 접속 로그</li>
                      <li><strong>결제 시:</strong> 결제 정보 (결제대행사 처리)</li>
                    </ul>
                  </section>
                  <section>
                    <h3 className="font-bold text-gray-900 mb-2">제2조 (수집 목적)</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>맞춤형 운세 서비스 제공</li>
                      <li>회원 관리 및 본인 확인</li>
                      <li>유료 서비스 결제 처리</li>
                    </ul>
                  </section>
                  <section>
                    <h3 className="font-bold text-gray-900 mb-2">제3조 (보유 기간)</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>회원 탈퇴 시 즉시 파기</li>
                      <li>전자상거래법에 따른 거래기록: 5년</li>
                    </ul>
                  </section>
                  <section>
                    <h3 className="font-bold text-gray-900 mb-2">제4조 (제3자 제공)</h3>
                    <p>원칙적으로 외부에 제공하지 않습니다. 단, 이용자 동의 또는 법령에 의한 경우 예외.</p>
                  </section>
                  <section>
                    <h3 className="font-bold text-gray-900 mb-2">제5조 (이용자의 권리)</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>개인정보 열람, 수정, 삭제 요청</li>
                      <li>회원 탈퇴 요청</li>
                    </ul>
                  </section>
                  <div className="pt-4 border-t border-gray-200 text-xs text-gray-500">
                    <p>시행일: 2025년 1월 1일</p>
                    <p>개인정보 보호책임자: chol5622729@naver.com</p>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
