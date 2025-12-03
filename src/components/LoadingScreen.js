import React, { useState, useEffect } from 'react';

// ============================================
// 🎮 LoadingScreen V6 - 전체 코드
// 기능 100% + 디자인 100%
// ============================================

export default function LoadingScreen({ type = 'daily', birthInfo = null }) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [showTip, setShowTip] = useState(0);
  const [dots, setDots] = useState('');
  const [currentFortune, setCurrentFortune] = useState(0);

  // 타입별 설정
  const gameConfig = {
    daily: {
      questName: '오늘의 운명 해금',
      stages: [
        { boss: '📜 사주팔자', action: '분석 중', progress: 25 },
        { boss: '🔮 14가지 운세', action: '생성 중', progress: 60 },
        { boss: '✨ 최종 봉인', action: '해제 중', progress: 90 }
      ],
      icon: '📬',
      badge: '🏆 DAILY',
      reward: ['📬', '🔮', '📊'],
      fortunes: ['💕 애정운', '💰 금전운', '💼 직장운', '💪 건강운', '🧳 여행운', '🎯 행운포인트', '⚠️ 주의사항', '📜 종합운'],
      title: `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 ${new Date().getDate()}일 오늘의 운세`
    },
    monthly: {
      questName: '월간 운명 해금',
      stages: [
        { boss: '📜 사주팔자', action: '분석 중', progress: 25 },
        { boss: '📅 월간 대운', action: '계산 중', progress: 60 },
        { boss: '✨ 최종 봉인', action: '해제 중', progress: 90 }
      ],
      icon: '🌙',
      badge: '📅 MONTHLY',
      reward: ['🌙', '🔮', '📊'],
      fortunes: ['📅 1주차', '📅 2주차', '📅 3주차', '📅 4주차', '💕 애정운', '💰 재물운', '💼 직장운', '💪 건강운'],
      title: `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 이달의 운세`
    },
    lifetime: {
      questName: '평생 운명 해금',
      stages: [
        { boss: '📜 사주팔자', action: '분석 중', progress: 20 },
        { boss: '🔮 대운 흐름', action: '계산 중', progress: 50 },
        { boss: '⭐ 14항목', action: '생성 중', progress: 80 },
        { boss: '👑 최종 봉인', action: '해제 중', progress: 95 }
      ],
      icon: '⭐',
      badge: '👑 PREMIUM',
      reward: ['⭐', '🔮', '👑'],
      fortunes: ['🌟 성격분석', '👒 초년운', '🧑 중년운', '👴 말년운', '📈 10년대운', '💕 애정운', '💰 재물운', '💼 직업운', '💪 건강운', '👶 자녀운'],
      title: birthInfo ? `${birthInfo.year}년 ${birthInfo.month}월 ${birthInfo.day}일` : '평생 사주'
    },
    newyear: {
      questName: '2025 신년 운명 해금',
      stages: [
        { boss: '📜 사주팔자', action: '분석 중', progress: 25 },
        { boss: '🐍 을사년 기운', action: '분석 중', progress: 60 },
        { boss: '✨ 최종 봉인', action: '해제 중', progress: 90 }
      ],
      icon: '🎊',
      badge: '🎆 NEW YEAR',
      reward: ['🎊', '🔮', '🎆'],
      fortunes: ['📜 종합운', '📅 월별운세', '💕 연애운', '💰 재물운', '💼 직장운', '💪 건강운', '🤝 대인관계'],
      title: '2025 신년운세'
    }
  };

  const tips = [
    '💡 운세는 참고용! 운명은 내가 만드는 것',
    '💡 좋은 운세도 노력 없이는 무의미해요',
    '💡 나쁜 운세는 조심하라는 신호예요',
    '💡 매일 확인하면 더 정확해져요',
    '💡 사주는 가능성, 선택은 나의 것'
  ];

  const emojis = ['🔮', '✨', '🌙', '⭐', '🎯', '💫', '☯️', '🏆'];

  const config = gameConfig[type] || gameConfig.daily;
  const stage = config.stages[currentPhase];
  const totalPhases = config.stages.length;
  const totalFortunes = config.fortunes.length;
  const remainingFortunes = Math.max(0, totalFortunes - Math.floor((displayProgress / 100) * totalFortunes));

  // 점 애니메이션 (...)
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 팁 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setShowTip(prev => (prev + 1) % tips.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 이모지 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji(prev => (prev + 1) % emojis.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 운세 항목 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFortune(prev => (prev + 1) % config.fortunes.length);
    }, 800);
    return () => clearInterval(interval);
  }, [config.fortunes.length]);

  // 단계 변경 (시간 늘림)
  useEffect(() => {
    if (type === 'lifetime') {
      // 평생사주: 더 오래 걸림 (총 약 50초)
      const timer1 = setTimeout(() => setCurrentPhase(1), 10000);  // 10초
      const timer2 = setTimeout(() => setCurrentPhase(2), 25000);  // 25초
      const timer3 = setTimeout(() => setCurrentPhase(3), 45000);  // 45초
      return () => { 
        clearTimeout(timer1); 
        clearTimeout(timer2); 
        clearTimeout(timer3); 
      };
    } else {
      // 일반: 총 약 25초
      const timer1 = setTimeout(() => setCurrentPhase(1), 8000);   // 8초
      const timer2 = setTimeout(() => setCurrentPhase(2), 20000);  // 20초
      return () => { 
        clearTimeout(timer1); 
        clearTimeout(timer2); 
      };
    }
  }, [type]);

  // 프로그레스 바 부드럽게 증가
  useEffect(() => {
    const targetProgress = stage.progress;
    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        if (prev < targetProgress) return prev + 1;
        return prev;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [stage.progress]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 relative overflow-hidden flex items-center justify-center pb-24">
      {/* 애니메이션 */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes goldGlow {
          0%, 100% { box-shadow: 0 0 5px #fbbf24, 0 0 10px #fbbf24, 0 0 15px #f59e0b; }
          50% { box-shadow: 0 0 10px #fbbf24, 0 0 20px #fbbf24, 0 0 30px #f59e0b; }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.5; }
        }
        @keyframes goldCardShine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        @keyframes cardPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          }
          50% {
            transform: scale(1.015);
            box-shadow: 0 15px 50px rgba(251, 191, 36, 0.25);
          }
        }
      `}</style>

      {/* 육각형 패턴 배경 */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hex-loading" width="50" height="43.4" patternUnits="userSpaceOnUse">
              <polygon points="25,0 50,12.5 50,37.5 25,50 0,37.5 0,12.5" fill="none" stroke="#000" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-loading)"/>
        </svg>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 p-4">
        <div className="w-full max-w-sm">

          {/* 메인 카드 - 황금빛과 함께 움직임 */}
          <div 
            className="bg-white rounded-3xl border-2 border-gray-900 overflow-hidden relative"
            style={{ animation: 'cardPulse 3s ease-in-out infinite' }}
          >
            
            {/* ✨ 황금카드 빛나는 효과 ✨ */}
            <div 
              className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
              style={{ borderRadius: '1.5rem' }}
            >
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '200%',
                  height: '200%',
                  background: 'linear-gradient(45deg, transparent 30%, rgba(251, 191, 36, 0.15) 40%, rgba(254, 243, 199, 0.35) 50%, rgba(251, 191, 36, 0.15) 60%, transparent 70%)',
                  animation: 'goldCardShine 3s ease-in-out infinite'
                }}
              ></div>
            </div>
            
            {/* 퀘스트 헤더 */}
            <div className="bg-gray-900 px-4 py-3 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{ animation: 'shine 3s infinite' }}
              ></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-xs font-bold" style={{ animation: 'blink 2s infinite' }}>▶ QUEST</span>
                  <span className="text-white font-black text-sm">{config.questName}</span>
                </div>
                <div className="bg-amber-400 text-gray-900 text-xs font-black px-2 py-1 rounded-lg">
                  {config.badge}
                </div>
              </div>
            </div>

            <div className="p-5 relative z-10">
              
              {/* 오운완 로고 */}
              <div className="flex justify-center mb-5">
                <div 
                  className="relative"
                  style={{ animation: 'wiggle 2s ease-in-out infinite' }}
                >
                  <div 
                    className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-2xl"
                    style={{ animation: 'goldGlow 2s ease-in-out infinite' }}
                  ></div>
                  <div className="relative bg-white rounded-2xl px-4 py-2 border-2 border-gray-900">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{config.icon}</span>
                      <span className="text-gray-900 font-black">오운완</span>
                      <span style={{ animation: 'sparkle 1.5s infinite' }}>✨</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 생년월일 표시 */}
              {birthInfo && (
                <div className="text-center mb-3">
                  <span className="text-gray-500 text-sm">
                    {birthInfo.year}년 {birthInfo.month}월 {birthInfo.day}일
                  </span>
                </div>
              )}

              {/* 스테이지 진행 표시 */}
              <div className="flex justify-center gap-1 mb-5">
                {config.stages.map((_, idx) => (
                  <div key={idx} className="flex items-center">
                    <div 
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                        idx < currentPhase 
                          ? 'bg-amber-400 text-gray-900' 
                          : idx === currentPhase 
                            ? 'bg-gray-900 text-white' 
                            : 'bg-gray-200 text-gray-400'
                      }`}
                      style={idx === currentPhase ? { animation: 'shake 0.5s ease-in-out infinite' } : {}}
                    >
                      {idx < currentPhase ? '✓' : idx + 1}
                    </div>
                    {idx < config.stages.length - 1 && (
                      <div className={`w-3 h-0.5 ${idx < currentPhase ? 'bg-amber-400' : 'bg-gray-300'}`}></div>
                    )}
                  </div>
                ))}
              </div>

              {/* 현재 스테이지 정보 */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-4 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-2xl"
                      style={{ animation: 'pulse 1s ease-in-out infinite' }}
                    >
                      {emojis[currentEmoji]}
                    </span>
                    <div>
                      <div className="text-gray-900 font-black text-sm">{stage.boss}</div>
                      <div className="text-gray-500 text-xs">{stage.action}{dots}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">STAGE</div>
                    <div className="text-amber-600 font-black">{currentPhase + 1}/{totalPhases}</div>
                  </div>
                </div>

                {/* 🔮 남은 운세 바 */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500 font-bold">🔮 남은 운세</span>
                    <span className="text-amber-600 font-black">{remainingFortunes}개 남음</span>
                  </div>
                  <div className="h-3 bg-gray-300 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${(remainingFortunes / totalFortunes) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* 현재 분석 중인 운세 항목 */}
                <div className="text-center mt-2 py-2 bg-white rounded-lg border border-gray-200">
                  <span className="text-gray-600 text-xs">분석 중: </span>
                  <span 
                    className="text-amber-600 font-bold text-sm"
                    style={{ animation: 'pulse 0.8s ease-in-out infinite' }}
                  >
                    {config.fortunes[currentFortune]}
                  </span>
                </div>
              </div>

              {/* 프로그레스 바 */}
              <div className="bg-gray-100 rounded-2xl p-4 border-2 border-gray-200 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-xs font-bold">⏳ 해금 진행률</span>
                  <span className="text-amber-600 text-xs font-black">{displayProgress}%</span>
                </div>
                <div className="h-4 bg-gray-300 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-300 relative overflow-hidden"
                    style={{ width: `${displayProgress}%` }}
                  >
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      style={{ animation: 'shine 1.5s infinite' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* 획득 예정 보상 */}
              <div className="bg-amber-50 rounded-xl p-3 border-2 border-amber-200">
                <div className="text-amber-700 text-xs font-bold mb-2 text-center">
                  🎁 획득 예정 보상
                </div>
                <div className="flex justify-center gap-3">
                  {config.reward.map((emoji, idx) => (
                    <div 
                      key={idx}
                      className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border-2 border-amber-300 text-xl shadow-sm"
                      style={{ animation: `float 2s ease-in-out infinite`, animationDelay: `${idx * 0.3}s` }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* 하단 팁 */}
          <div className="bg-white/80 rounded-2xl p-3 mt-3 border border-gray-200">
            <p className="text-gray-600 text-xs text-center transition-all duration-500">
              {tips[showTip]}
            </p>
          </div>

          {/* NOW LOADING */}
          <div className="text-center mt-3">
            <span 
              className="text-gray-400 text-xs font-bold tracking-widest"
              style={{ animation: 'blink 1.5s infinite' }}
            >
              NOW LOADING{dots}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}