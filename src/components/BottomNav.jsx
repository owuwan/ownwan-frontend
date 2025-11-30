import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 🔥 로그인 상태 체크 - localStorage 토큰으로 확인!
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem('access_token');
        
        // 토큰이 없으면 비로그인
        if (!token) {
          setIsLoggedIn(false);
          return;
        }
        
        // 토큰이 있으면 API로 유효성 확인
        const backendUrl = 'https://ownwan-backend.onrender.com';
        
        const response = await fetch(`${backendUrl}/api/profile`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          // 토큰이 유효하지 않으면 삭제
          localStorage.removeItem('access_token');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('❌ 로그인 상태 체크 실패:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [location]);

  // 🔥 로그인 체크 함수 - API로 확인!
  const handleNavigation = async (path, requiresLogin = false) => {
    if (requiresLogin) {
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
        
        if (!response.ok) {
          setShowModal(true); // 커스텀 모달 표시
          return;
        }
      } catch (error) {
        setShowModal(true);
        return;
      }
    }
    
    navigate(path);
  };

  // 🔥 모달 닫기 후 로그인 페이지로 이동
  const handleModalClose = () => {
    setShowModal(false);
    navigate('/login');
  };

  // 현재 경로 확인
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* 🔥 커스텀 알림 모달 */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleModalClose}
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
                  <span className="text-3xl">🔒</span>
                </div>
              </div>

              {/* 메시지 */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                로그인이 필요합니다
              </h3>
              <p className="text-gray-700 text-center mb-6">
                로그인 후 이용해주세요.
              </p>

              {/* 확인 버튼 */}
              <button
                onClick={handleModalClose}
                className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all border-2 border-gray-900 shadow-lg"
              >
                로그인하러 가기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🆕 좌측 하단 플로팅 홈버튼 */}
      <button
        onClick={() => navigate('/')}
        className={`fixed left-3 bottom-20 z-[60] w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 transition-all ${
          isActive('/')
            ? 'bg-gray-900 border-gray-900 text-white'
            : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-100'
        }`}
        style={{ opacity: 0.95 }}
      >
        <span className="text-lg">🏠</span>
      </button>

      {/* 하단 네비게이션 (5개) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-900 shadow-lg z-50">
        <div className="max-w-4xl mx-auto px-2 py-1.5">
          <div className="grid grid-cols-5 gap-1">
            
            {/* 일일사주 버튼 - 로그인 필수! */}
            <button
              onClick={() => handleNavigation('/payment', true)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all ${
                isActive('/payment')
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span className="text-base mb-0.5">💌</span>
              <span className="text-[10px] font-bold whitespace-nowrap">일일사주</span>
            </button>

            {/* 월간사주 버튼 - 로그인 필수! */}
            <button
              onClick={() => handleNavigation('/monthly-payment', true)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all ${
                isActive('/monthly-payment')
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span className="text-base mb-0.5">📅</span>
              <span className="text-[10px] font-bold whitespace-nowrap">월간사주</span>
            </button>

            {/* 🆕 신년운세 버튼 - 로그인 필수! (새로 추가) */}
            <button
              onClick={() => handleNavigation('/newyear', true)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all ${
                isActive('/newyear')
                  ? 'bg-red-600 text-white'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              <span className="text-base mb-0.5">🎊</span>
              <span className="text-[10px] font-bold whitespace-nowrap">신년운세</span>
            </button>

            {/* 평생사주 버튼 - 로그인 필수! */}
            <button
              onClick={() => handleNavigation('/lifetime', true)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all ${
                isActive('/lifetime')
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span className="text-base mb-0.5">♾️</span>
              <span className="text-[10px] font-bold whitespace-nowrap">평생사주</span>
            </button>

            {/* 🔥 동적 5번째 버튼 - 로그인 여부에 따라 변경 */}
            {isLoggedIn ? (
              // 로그인 후: 마이페이지
              <button
                onClick={() => handleNavigation('/mypage', false)}
                className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all ${
                  isActive('/mypage')
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="text-base mb-0.5">👤</span>
                <span className="text-[10px] font-bold whitespace-nowrap">마이페이지</span>
              </button>
            ) : (
              // 로그인 전: 로그인/회원가입
              <button
                onClick={() => navigate('/login')}
                className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all ${
                  isActive('/login')
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="text-base mb-0.5">🔑</span>
                <span className="text-[9px] font-bold leading-tight text-center">
                  로그인<br />회원가입
                </span>
              </button>
            )}

          </div>
        </div>
      </div>
    </>
  );
}