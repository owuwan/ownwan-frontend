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
      title: '오늘의 운세'
    },
    monthly: {
      phases: [
        { main: '사주 팔자 분석 중', sub: '천간과 지지를 계산하고 있어요', progress: 30 },
        { main: '월간 운세 생성 중', sub: '이번 달 운세를 꼼꼼히 분석하고 있어요 📅', progress: 70 },
        { main: '최종 점검 중', sub: '곧 만나실 수 있어요! 🎉', progress: 95 }
      ],
      title: '월간 운세'
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
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
    }}>
      {/* 육각형 패턴 배경 */}
      <svg width="100" height="87" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="hexagons-loading" width="100" height="87" patternUnits="userSpaceOnUse">
            <path d="M50 0 L93.3 25 L93.3 62 L50 87 L6.7 62 L6.7 25 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons-loading)" className="text-yellow-500"/>
      </svg>

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center px-6 max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-yellow-500/30">
            
            {/* 타이틀 */}
            <div className="mb-6">
              <h3 className="text-sm text-yellow-400 mb-2 tracking-wider">{config.title}</h3>
              <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
            </div>

            {/* 중앙 이모지 */}
            <div className="relative mb-8 flex items-center justify-center" style={{ height: '130px' }}>
              <div className="relative">
                {/* 궤도 원 - 뒤에 배치 */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-[110px] h-[110px] border-2 border-yellow-500/30 border-dashed rounded-full" style={{
                    animation: 'spin 10s linear infinite'
                  }}></div>
                </div>
                {/* 중앙 이모지 원 */}
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center shadow-xl relative z-10" style={{
                  animation: 'pulse 2s ease-in-out infinite'
                }}>
                  <div className="text-4xl">{emojis[currentEmoji]}</div>
                </div>
              </div>
            </div>

            {/* 단계 표시 */}
            <div className="flex justify-center gap-3 mb-4">
              {[0, 1, 2].map((step) => (
                <div 
                  key={step}
                  className="w-3 h-3 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: step <= currentPhase ? '#fbbf24' : '#374151',
                    transform: step <= currentPhase ? 'scale(1.3)' : 'scale(1)',
                    boxShadow: step <= currentPhase ? '0 0 10px #fbbf24' : 'none'
                  }}
                ></div>
              ))}
            </div>

            {/* 텍스트 */}
            <h2 className="text-xl font-bold text-white mb-2">{phase.main}</h2>
            <p className="text-sm text-gray-300 mb-6">{phase.sub}</p>

            {/* 프로그레스 바 */}
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000"
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
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}