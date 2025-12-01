import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ type = 'daily' }) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(0);

  // 타입별 로딩 문구
  const loadingTexts = {
    daily: {
      phases: [
        { main: '사주 팔자 분석 중', sub: '천간과 지지를 계산하고 있어요', progress: 30 },
        { main: '14가지 운세 생성 중', sub: '꼼꼼히 당신만의 운세를 작성하고 있어요 ✍️', progress: 70 },
        { main: '최종 점검 중', sub: '곧 만나실 수 있어요! 🎉', progress: 95 }
      ],
      title: `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 ${new Date().getDate()}일 오늘의 운세`
    },
    monthly: {
      phases: [
        { main: '사주 팔자 분석 중', sub: '천간과 지지를 계산하고 있어요', progress: 30 },
        { main: '월간 운세 생성 중', sub: '이번 달 운세를 꼼꼼히 분석하고 있어요 📅', progress: 70 },
        { main: '최종 점검 중', sub: '곧 만나실 수 있어요! 🎉', progress: 95 }
      ],
      title: `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 이달의 운세`
    },
    lifetime: {
      phases: [
        { main: '사주 팔자 분석 중', sub: '천간과 지지를 계산하고 있어요', progress: 30 },
        { main: '평생 대운 분석 중', sub: '10년 단위 운세를 분석하고 있어요 🔮', progress: 70 },
        { main: '최종 점검 중', sub: '곧 만나실 수 있어요! 🎉', progress: 95 }
      ],
      title: '평생 사주'
    },
    newyear: {
      phases: [
        { main: '사주 팔자 분석 중', sub: '천간과 지지를 계산하고 있어요', progress: 30 },
        { main: '2025년 신년운세 생성 중', sub: '을사년 한 해 운세를 분석하고 있어요 🐍', progress: 70 },
        { main: '최종 점검 중', sub: '곧 만나실 수 있어요! 🎉', progress: 95 }
      ],
      title: '2025 신년운세'
    }
  };

  const emojis = ['🔮', '✨', '🌙', '⭐', '🎯', '💫'];

  const config = loadingTexts[type] || loadingTexts.daily;
  const phase = config.phases[currentPhase];

  // 이모지 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji(prev => (prev + 1) % emojis.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // 단계 변경
  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentPhase(1), 3000);
    const timer2 = setTimeout(() => setCurrentPhase(2), 6000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf0 50%, #f0f2f8 100%)'
    }}>
      {/* 육각형 패턴 배경 */}
      <div className="absolute inset-0 opacity-[0.15]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='173.2' viewBox='0 0 200 173.2' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000000' stroke-width='2'%3E%3Cpath d='M 50 0 L 100 0 L 125 43.3 L 100 86.6 L 50 86.6 L 25 43.3 Z' opacity='0.4'/%3E%3Cpath d='M 150 0 L 200 0 L 225 43.3 L 200 86.6 L 150 86.6 L 125 43.3 Z' opacity='0.3'/%3E%3Cpath d='M 0 86.6 L 50 86.6 L 75 130 L 50 173.2 L 0 173.2 L -25 130 Z' opacity='0.35'/%3E%3Cpath d='M 100 86.6 L 150 86.6 L 175 130 L 150 173.2 L 100 173.2 L 75 130 Z' opacity='0.4'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '200px 173.2px'
      }}></div>

      {/* 부드러운 빛 효과 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center px-6 max-w-md w-full">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-900">
            
            {/* 오운완 말풍선 로고 */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative" style={{animation: 'wiggle 2s ease-in-out infinite'}}>
                <div className="absolute -inset-2 bg-amber-200 rounded-2xl" style={{animation: 'pulseRing 2s ease-in-out infinite'}}></div>
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl px-5 py-2 shadow-lg" style={{border: '3px solid #111827'}}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📬</span>
                    <div className="text-gray-900 text-lg tracking-tight" style={{fontWeight: 900}}>
                      오운완
                    </div>
                    <span className="text-sm" style={{animation: 'sparkle 1.5s ease-in-out infinite'}}>✨</span>
                  </div>
                </div>
                <div 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '8px solid #111827'
                  }}
                ></div>
              </div>
            </div>

            {/* 타이틀 */}
            <div className="mb-6">
              <h3 className="text-sm text-gray-500 mb-2 tracking-wider">{config.title}</h3>
              <div className="w-16 h-1 bg-gray-800 mx-auto rounded-full"></div>
            </div>

            {/* 중앙 이모지 + 궤도 원 */}
            <div className="relative mb-8 flex items-center justify-center" style={{ height: '120px' }}>
              <div className="absolute border-2 border-dashed rounded-full" style={{
                width: '100px',
                height: '100px',
                borderColor: 'rgba(107, 114, 128, 0.3)',
                animation: 'spin 10s linear infinite'
              }}></div>
              
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 w-16 h-16 rounded-full flex items-center justify-center shadow-xl z-10" style={{
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                <div className="text-3xl">{emojis[currentEmoji]}</div>
              </div>
            </div>

            {/* 단계 표시 */}
            <div className="flex justify-center gap-3 mb-4">
              {[0, 1, 2].map((step) => (
                <div 
                  key={step}
                  className="w-3 h-3 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: step <= currentPhase ? '#374151' : '#d1d5db',
                    transform: step <= currentPhase ? 'scale(1.3)' : 'scale(1)',
                    boxShadow: step <= currentPhase ? '0 0 10px rgba(55, 65, 81, 0.5)' : 'none'
                  }}
                ></div>
              ))}
            </div>

            {/* 텍스트 */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">{phase.main}</h2>
            <p className="text-sm text-gray-500 mb-6">{phase.sub}</p>

            {/* 프로그레스 바 */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-full transition-all duration-1000"
                style={{ width: `${phase.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">{phase.progress}%</p>
          </div>
        </div>
      </div>

      {/* 애니메이션 */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
      `}</style>
    </div>
  );
}