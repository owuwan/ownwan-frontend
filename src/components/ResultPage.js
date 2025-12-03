import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Star, Heart, Briefcase, DollarSign, Activity, MapPin, Hash, Palette, Users, AlertTriangle, Sparkles, Home as HomeIcon, Book, Plane, Building } from 'lucide-react';
import KakaoPreviewModal from './KakaoPreviewModal';

export default function AlldayResultPage() {
  const navigate = useNavigate();
  const [showKakaoPreview, setShowKakaoPreview] = useState(false);

  // ⭐ 추가: 로그인 체크 함수 (localStorage 사용)
  const checkLogin = () => {
    const token = localStorage.getItem('access_token');
    return !!token;
  };

  // 유료 상품 클릭 핸들러 (⭐ 로그인 체크 추가)
  const handleSubscriptionClick = () => {
    if (!checkLogin()) {
      setShowLoginModal(true);
      return;
    }
    navigate('/payment');
  };

  const handleMonthlyClick = () => {
    if (!checkLogin()) {
      setShowLoginModal(true);
      return;
    }
    navigate('/monthly-payment');
  };

  const handleLifetimeClick = () => {
    if (!checkLogin()) {
      setShowLoginModal(true);
      return;
    }
    navigate('/lifetime');
  };
  
  const location = useLocation();
  const { sajuData } = location.state || {};
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [isSajuExpanded, setIsSajuExpanded] = useState(false);
  const [elementCount, setElementCount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openItems, setOpenItems] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedFortune, setSelectedFortune] = useState(null); // ⭐ V6: 운세 상세 모달

  // 모달 아코디언 토글 함수
  const toggleItem = (itemKey) => {
    setOpenItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };
  
  // 실제 사주 데이터 사용
  const actualSaju = sajuData?.saju || {};
  const userName = sajuData?.name || "홍길동";
  const userGender = sajuData?.gender || "남성";
  
  // GPT 운세 데이터 가져오기
  const gptFortune = sajuData?.gpt_fortune || null;

  // 오행 데이터 추출
  useEffect(() => {
    if (sajuData?.element_count) {
      setElementCount(sajuData.element_count);
      console.log('🎨 오행 개수:', sajuData.element_count);
    }
  }, [sajuData]);
  
  // 오늘 날짜
  const today = new Date();
  const dateString = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

  // GPT 운세 파싱 함수 - 개선된 버전
  const parseGPTFortune = (fortuneText) => {
    if (!fortuneText) return null;
    
    console.log("📝 GPT 원본 텍스트:", fortuneText);
    
    const sections = {
      totalFortune: "",
      loveLife: "",
      business: "",
      money: "",
      health: "",
      relationship: "",
      family: "",
      study: "",
      travel: "",
      realEstate: "",
      luckyPlace: "",
      luckyNumber: "",
      luckyColor: "",
      risk: "",
      dangerousItem: ""
    };
    
    // 각 항목을 정규식으로 추출
    const patterns = {
      totalFortune: /1\.\s*종합운[:\s]+(.*?)(?=\n2\.|$)/s,
      loveLife: /2\.\s*애정운[:\s]+(.*?)(?=\n3\.|$)/s,
      business: /3\.\s*사업운[:\s]+(.*?)(?=\n4\.|$)/s,
      money: /4\.\s*금전운[:\s]+(.*?)(?=\n5\.|$)/s,
      health: /5\.\s*건강운[:\s]+(.*?)(?=\n6\.|$)/s,
      relationship: /6\.\s*대인관계운[:\s]+(.*?)(?=\n7\.|$)/s,
      family: /7\.\s*가족운[:\s]+(.*?)(?=\n8\.|$)/s,
      study: /8\.\s*학업운[:\s]+(.*?)(?=\n9\.|$)/s,
      travel: /9\.\s*여행운[:\s]+(.*?)(?=\n10\.|$)/s,
      realEstate: /10\.\s*부동산운[:\s]+(.*?)(?=\n11\.|$)/s,
      luckyPlace: /11\.\s*행운의\s*장소[:\s]+(.*?)(?=\n12\.|$)/s,
      luckyNumber: /12\.\s*행운의\s*숫자[:\s]+(.*?)(?=\n13\.|$)/s,
      luckyColor: /13\.\s*행운의\s*컬러[:\s]+(.*?)(?=\n14\.|$)/s,
      risk: /14\.\s*리스크[:\s]+(.*?)(?=\n15\.|$)/s,
      dangerousItem: /15\.\s*오늘\s*조심할\s*물건[:\s]+(.*?)$/s
    };
    
    // 각 패턴으로 추출
    for (const [key, pattern] of Object.entries(patterns)) {
      const match = fortuneText.match(pattern);
      if (match && match[1]) {
        sections[key] = match[1].trim().replace(/\n/g, ' ');
        console.log(`✅ ${key}: ${sections[key]}`);
      } else {
        console.log(`❌ ${key}: 추출 실패`);
      }
    }
    
    return sections;
  };

  // GPT 운세 사용 또는 기본 메시지
  let fortuneData = {
    totalFortune: "AI가 운세를 분석하고 있습니다...",
    loveLife: "AI가 운세를 분석하고 있습니다...",
    business: "AI가 운세를 분석하고 있습니다...",
    money: "AI가 운세를 분석하고 있습니다...",
    health: "AI가 운세를 분석하고 있습니다...",
    relationship: "AI가 운세를 분석하고 있습니다...",
    family: "AI가 운세를 분석하고 있습니다...",
    study: "AI가 운세를 분석하고 있습니다...",
    travel: "AI가 운세를 분석하고 있습니다...",
    realEstate: "AI가 운세를 분석하고 있습니다...",
    luckyPlace: "분석 중...",
    luckyNumber: "분석 중...",
    luckyColor: "분석 중...",
    risk: "AI가 운세를 분석하고 있습니다...",
    dangerousItem: "분석 중..."
  };

  // GPT 운세가 있으면 파싱해서 사용
  if (gptFortune?.success && gptFortune?.fortune) {
    console.log("🤖 GPT 운세 사용!");
    const parsed = parseGPTFortune(gptFortune.fortune);
    if (parsed) {
      fortuneData = { ...fortuneData, ...parsed };
    }
  } else {
    console.log("📝 기본 메시지 표시");
  }

  // 리포트 데이터 - 실제 사주 정보 포함
  const reportData = {
    name: userName,
    gender: userGender,
    date: dateString,
    saju: actualSaju,
    ...fortuneData
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubscribe(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 천간지지 오행 매핑 (한자 → 오행)
  const getElementColor = (char) => {
    const elements = {
      '갑': '목', '을': '목',
      '병': '화', '정': '화',
      '무': '토', '기': '토',
      '경': '금', '신': '금',
      '임': '수', '계': '수',
      '인': '목', '묘': '목',
      '사': '화', '오': '화',
      '진': '토', '술': '토', '축': '토', '미': '토',
      '신': '금', '유': '금',
      '자': '수', '해': '수'
    };
    return elements[char] || '토';
  };

  // 오행별 색상
  const elementColors = {
    '목': 'text-green-500',
    '화': 'text-red-500',
    '토': 'text-yellow-500',
    '금': 'text-gray-600',
    '수': 'text-blue-500'
  };

  // 오행 데이터 배열
  const elementData = [
    { name: '목(木)', sub: '나무', key: '목', color: 'bg-green-500', textColor: 'text-green-600' },
    { name: '화(火)', sub: '불', key: '화', color: 'bg-red-500', textColor: 'text-red-600' },
    { name: '토(土)', sub: '흙', key: '토', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    { name: '금(金)', sub: '쇠', key: '금', color: 'bg-gray-600', textColor: 'text-gray-600' },
    { name: '수(水)', sub: '물', key: '수', color: 'bg-blue-500', textColor: 'text-blue-600' }
  ];

  // 운세 항목 배열 (V6: 클릭 모달용)
  const fortuneItems = [
    { icon: '💕', title: '애정운', content: reportData.loveLife },
    { icon: '💼', title: '사업운', content: reportData.business },
    { icon: '💰', title: '금전운', content: reportData.money },
    { icon: '💪', title: '건강운', content: reportData.health },
    { icon: '🤝', title: '대인관계', content: reportData.relationship },
    { icon: '🏠', title: '가족운', content: reportData.family },
    { icon: '📚', title: '학업운', content: reportData.study },
    { icon: '✈️', title: '여행운', content: reportData.travel },
    { icon: '🏢', title: '부동산', content: reportData.realEstate },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ 
      fontFamily: "'Nanum Gothic', 'Malgun Gothic', sans-serif",
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf0 50%, #f0f2f8 100%)'
    }}>
      {/* 육각형 패턴 - 거의 안보이게 */}
      <div className="absolute inset-0 opacity-[0.01]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='173.2' viewBox='0 0 200 173.2' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000000' stroke-width='1'%3E%3Cpath d='M 50 0 L 100 0 L 125 43.3 L 100 86.6 L 50 86.6 L 25 43.3 Z' opacity='0.3'/%3E%3Cpath d='M 150 0 L 200 0 L 225 43.3 L 200 86.6 L 150 86.6 L 125 43.3 Z' opacity='0.2'/%3E%3Cpath d='M 0 86.6 L 50 86.6 L 75 130 L 50 173.2 L 0 173.2 L -25 130 Z' opacity='0.25'/%3E%3Cpath d='M 100 86.6 L 150 86.6 L 175 130 L 150 173.2 L 100 173.2 L 75 130 Z' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '200px 173.2px'
      }}></div>

      {/* 부드러운 빛 효과 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-indigo-200 rounded-full filter blur-3xl opacity-15"></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');
        
        * {
          font-family: 'Nanum Gothic', 'Malgun Gothic', sans-serif !important;
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        
        @keyframes goldGlow {
          0%, 100% { box-shadow: 0 0 10px #fbbf24, 0 0 20px #fbbf2480; }
          50% { box-shadow: 0 0 20px #fbbf24, 0 0 40px #fbbf2480; }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }

        .card-game {
          background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
          border: 2px solid #1a1a2e;
          box-shadow: 0 4px 0 #1a1a2e, 0 8px 20px rgba(0,0,0,0.15);
        }

        .card-game:active {
          transform: translateY(2px);
          box-shadow: 0 2px 0 #1a1a2e, 0 4px 10px rgba(0,0,0,0.1);
        }

        .badge-game {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          box-shadow: 0 2px 0 #b45309;
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-md">
        
        {/* ========== V6 게임 스타일 헤더 ========== */}
        <div className="text-center mb-6 card-game rounded-3xl p-5 relative overflow-hidden animate-fadeIn">
          
          {/* 코너 장식 */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-400 rounded-tl-lg"></div>
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-400 rounded-tr-lg"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-400 rounded-bl-lg"></div>
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-400 rounded-br-lg"></div>
          
          {/* 오운완 로고 - 골드글로우 */}
          <div className="flex justify-center mb-4">
            <div className="relative" style={{ animation: 'wiggle 3s ease-in-out infinite' }}>
              <div 
                className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl opacity-75"
                style={{ animation: 'goldGlow 2s ease-in-out infinite' }}
              ></div>
              <div className="relative bg-gray-900 rounded-2xl px-5 py-2.5 border-2 border-amber-400">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📬</span>
                  <span className="text-white text-xl font-black tracking-wide">오운완</span>
                  <span style={{ animation: 'sparkle 1.5s infinite' }}>✨</span>
                </div>
              </div>
            </div>
          </div>

          {/* 퀘스트 완료 배지 */}
          <div className="inline-flex items-center gap-2 badge-game text-gray-900 px-4 py-1.5 rounded-full text-xs font-black mb-3">
            🎮 QUEST COMPLETE!
          </div>
          
          <p className="text-gray-500 text-xs mb-3">오늘의 운명이 해금되었습니다</p>
          
          {/* 사용자 정보 카드 */}
          <div className="bg-gray-900 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center text-2xl border-2 border-white">
                👤
              </div>
              <div className="text-left">
                <p className="text-lg font-black">{reportData.name}</p>
                <p className="text-gray-400 text-xs">{reportData.date} 운세</p>
              </div>
            </div>
            {/* 만세력 배지 */}
            {gptFortune?.success && (
              <div className="mt-3 flex justify-center">
                <div className="inline-flex items-center gap-1.5 bg-green-500/20 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-green-400 text-xs font-bold">🤖 만세력 기반 AI 분석</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========== 사주팔자 카드 ========== */}
        <div className="card-game rounded-3xl overflow-hidden mb-5 animate-slideUp">
          {/* 클릭 가능한 헤더 */}
          <button
            onClick={() => setIsSajuExpanded(!isSajuExpanded)}
            className="w-full bg-gray-900 px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl" style={{ animation: 'float 2s ease-in-out infinite' }}>⭐</span>
              <span className="text-white font-black">사주팔자</span>
              <span className="badge-game text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-full ml-2">
                YOUR DESTINY
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">펼쳐보기</span>
              <div className={`transform transition-transform duration-300 ${isSajuExpanded ? 'rotate-180' : ''}`}>
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </button>
          
          {/* 사주 내용 */}
          <div 
            className={`transition-all duration-500 ease-in-out ${
              isSajuExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}
            style={{ overflow: 'hidden' }}
          >
            <div className="p-4">
              {/* 4주 그리드 */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {/* 년주 */}
                <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl p-3 border-2 border-gray-200 text-center hover:border-amber-400 transition-all">
                  <div className="text-gray-900 text-xs font-black mb-0.5">년주</div>
                  <div className="text-gray-400 text-[10px] mb-2">年柱</div>
                  <div className="text-2xl font-black mb-1">
                    {reportData.saju.year ? (
                      <>
                        <span className={elementColors[getElementColor(reportData.saju.year[0])]}>{reportData.saju.year[0]}</span>
                        <span className={elementColors[getElementColor(reportData.saju.year[1])]}>{reportData.saju.year[1]}</span>
                      </>
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </div>
                  <div className="text-gray-500 text-[10px]">뿌리와 조상</div>
                </div>

                {/* 월주 */}
                <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl p-3 border-2 border-gray-200 text-center hover:border-amber-400 transition-all">
                  <div className="text-gray-900 text-xs font-black mb-0.5">월주</div>
                  <div className="text-gray-400 text-[10px] mb-2">月柱</div>
                  <div className="text-2xl font-black mb-1">
                    {reportData.saju.month ? (
                      <>
                        <span className={elementColors[getElementColor(reportData.saju.month[0])]}>{reportData.saju.month[0]}</span>
                        <span className={elementColors[getElementColor(reportData.saju.month[1])]}>{reportData.saju.month[1]}</span>
                      </>
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </div>
                  <div className="text-gray-500 text-[10px]">청년과 부모</div>
                </div>

                {/* 일주 */}
                <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl p-3 border-2 border-gray-200 text-center hover:border-amber-400 transition-all">
                  <div className="text-gray-900 text-xs font-black mb-0.5">일주</div>
                  <div className="text-gray-400 text-[10px] mb-2">日柱</div>
                  <div className="text-2xl font-black mb-1">
                    {reportData.saju.day ? (
                      <>
                        <span className={elementColors[getElementColor(reportData.saju.day[0])]}>{reportData.saju.day[0]}</span>
                        <span className={elementColors[getElementColor(reportData.saju.day[1])]}>{reportData.saju.day[1]}</span>
                      </>
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </div>
                  <div className="text-gray-500 text-[10px]">나 자신</div>
                </div>

                {/* 시주 */}
                <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl p-3 border-2 border-gray-200 text-center hover:border-amber-400 transition-all">
                  <div className="text-gray-900 text-xs font-black mb-0.5">시주</div>
                  <div className="text-gray-400 text-[10px] mb-2">時柱</div>
                  <div className="text-2xl font-black mb-1">
                    {reportData.saju.hour ? (
                      <>
                        <span className={elementColors[getElementColor(reportData.saju.hour[0])]}>{reportData.saju.hour[0]}</span>
                        <span className={elementColors[getElementColor(reportData.saju.hour[1])]}>{reportData.saju.hour[1]}</span>
                      </>
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </div>
                  <div className="text-gray-500 text-[10px]">노년과 자손</div>
                </div>
              </div>

              {/* 오행 범례 */}
              <div className="flex flex-wrap justify-center gap-2 mb-4 bg-gray-100 rounded-xl p-2">
                {elementData.map((el, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <div className={`w-2.5 h-2.5 rounded-full ${el.color}`}></div>
                    <span className={`text-xs font-bold ${el.textColor}`}>{el.name.split('(')[0]}</span>
                  </div>
                ))}
              </div>

              {/* 오행 분석 */}
              {elementCount && (
                <div className="bg-gray-900 rounded-2xl p-4 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🎨</span>
                    <span className="font-black text-sm">오행 밸런스</span>
                    <span className="badge-game text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-full ml-auto">
                      ELEMENT
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {elementData.map((el, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-16 text-xs font-bold text-gray-300">{el.name}</div>
                        <div className="flex-1 bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-full ${el.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${((elementCount[el.key] || 0) / 8) * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-8 text-xs font-black text-amber-400">{elementCount[el.key] || 0}개</div>
                      </div>
                    ))}
                  </div>

                  {/* 사주 계산 안내 버튼 */}
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all border border-gray-600"
                  >
                    <span>💬</span>
                    <span>철학관, 사이트마다 사주가 다른 이유는?</span>
                    <span className="text-amber-400">→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========== 종합 운세 ========== */}
        <div className="card-game rounded-3xl p-5 mb-5 animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl" style={{ animation: 'pulse 2s ease-in-out infinite' }}>🔮</span>
            <h2 className="text-gray-900 font-black text-lg">오늘의 종합 운세</h2>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-xl p-4 border-l-4 border-amber-400">
            {reportData.totalFortune}
          </p>
        </div>

        {/* ========== 세부 운세 그리드 (2열) ========== */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {fortuneItems.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => setSelectedFortune(item)}
              className="card-game rounded-2xl p-4 text-left transition-all animate-slideUp"
              style={{ animationDelay: `${0.2 + idx * 0.05}s` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl" style={{ animation: `float 2s ease-in-out infinite`, animationDelay: `${idx * 0.1}s` }}>
                  {item.icon}
                </span>
                <span className="text-gray-900 text-sm font-black">{item.title}</span>
                <span className="ml-auto text-gray-400 text-xs">→</span>
              </div>
              <div className="text-gray-600 text-xs leading-relaxed line-clamp-2">{item.content}</div>
            </button>
          ))}
        </div>

        {/* ========== 행운 정보 ========== */}
        <div className="card-game rounded-3xl p-4 mb-5 animate-slideUp" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🍀</span>
            <span className="text-gray-900 font-black">오늘의 행운 포인트</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-900 rounded-xl p-3 text-center text-white">
              <div className="text-lg mb-1">📍</div>
              <div className="text-[10px] text-gray-400 mb-1">행운의 장소</div>
              <div className="text-xs font-black text-amber-400">{reportData.luckyPlace}</div>
            </div>
            <div className="bg-gray-900 rounded-xl p-3 text-center text-white">
              <div className="text-lg mb-1">#️⃣</div>
              <div className="text-[10px] text-gray-400 mb-1">행운의 숫자</div>
              <div className="text-xs font-black text-amber-400">{reportData.luckyNumber}</div>
            </div>
            <div className="bg-gray-900 rounded-xl p-3 text-center text-white">
              <div className="text-lg mb-1">🎨</div>
              <div className="text-[10px] text-gray-400 mb-1">행운의 컬러</div>
              <div className="text-xs font-black text-amber-400">{reportData.luckyColor}</div>
            </div>
          </div>
        </div>

        {/* ========== 주의사항 ========== */}
        <div className="card-game rounded-3xl p-5 mb-5 animate-slideUp" style={{ animationDelay: '0.7s' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-gray-900 font-black">오늘의 주의사항</h2>
            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full ml-auto">
              CAUTION
            </span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
            {reportData.risk}
          </p>
        </div>

        {/* ========== 조심할 물건 ========== */}
        <div className="card-game rounded-3xl p-5 mb-5 animate-slideUp" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🚫</span>
            <h2 className="text-gray-900 font-black">오늘 조심할 물건</h2>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border-l-4 border-orange-400 text-center">
            <span className="text-2xl font-black text-gray-900">{reportData.dangerousItem}</span>
          </div>
        </div>

        {/* ========== 카카오톡 알림톡 미리보기 섹션 ========== */}
        <div className="card-game rounded-3xl p-5 mb-5 animate-slideUp relative overflow-hidden" style={{ animationDelay: '0.9s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50 opacity-70"></div>
          <div className="relative z-10 text-center">
            <div className="text-3xl mb-2">💌</div>
            <h3 className="text-gray-900 font-black text-base mb-1">매일 아침, 카톡으로 받아보세요!</h3>
            <p className="text-gray-600 text-xs mb-4">
              일일사주 구독하면 매일 아침 8시<br/>오늘의 운세가 카카오톡으로 도착해요
            </p>
            <button 
              onClick={() => setShowKakaoPreview(true)}
              className="badge-game text-gray-900 font-black py-2.5 px-5 rounded-xl text-sm cursor-pointer"
            >
              📱 알림톡 미리보기
            </button>
          </div>
        </div>

        {/* ========== 구독 프로모션 - 3가지 상품 ========== */}
        {showSubscribe && (
          <div className="card-game rounded-3xl p-5 mb-5 animate-scaleIn">
            <div className="text-center mb-5">
              <h2 className="text-gray-900 font-black text-lg mb-1">매일 아침 8시,<br/>새로운 운세를 받아보세요!</h2>
              <p className="text-gray-600 text-xs">오운완을 구독하여 매일 아침 오늘의 운세 리포트를 받아보세요!</p>
            </div>
            
            {/* 상품 3개 */}
            <div className="space-y-3">
              
              {/* 1. 일일사주 */}
              <button 
                onClick={handleSubscriptionClick}
                className="w-full bg-white border-2 border-gray-900 rounded-2xl p-4 text-left relative overflow-hidden transition-all hover:shadow-lg"
                style={{ boxShadow: '0 3px 0 #1a1a2e' }}
              >
                <div className="absolute top-2 right-2 badge-game text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                  ⭐ 인기
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center text-2xl border-2 border-gray-900">
                    💌
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-black">일일사주 자동발송</div>
                    <div className="text-gray-500 text-xs">매일 아침 8시 카톡 발송</div>
                  </div>
                </div>
                <div className="mt-3 bg-gray-900 text-white rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-400">월 구독료</div>
                    <div className="text-lg font-black">9,900원</div>
                  </div>
                  <div className="badge-game text-gray-900 text-xs font-black px-3 py-1.5 rounded-lg">
                    💳 구독하기
                  </div>
                </div>
              </button>

              {/* 2. 월간사주 */}
              <button 
                onClick={handleMonthlyClick}
                className="w-full bg-white border-2 border-gray-900 rounded-2xl p-4 text-left relative overflow-hidden transition-all hover:shadow-lg"
                style={{ boxShadow: '0 3px 0 #1a1a2e' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center text-2xl border-2 border-gray-900">
                    🗓️
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-black">월간 종합사주</div>
                    <div className="text-gray-500 text-xs">한 달 14가지 운세 종합</div>
                  </div>
                </div>
                <div className="mt-3 bg-gray-900 text-white rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-400">1회 구매</div>
                    <div className="text-lg font-black">11,000원</div>
                  </div>
                  <div className="bg-sky-400 text-gray-900 text-xs font-black px-3 py-1.5 rounded-lg" style={{ boxShadow: '0 2px 0 #0369a1' }}>
                    📅 구매하기
                  </div>
                </div>
              </button>

              {/* 3. 평생사주 */}
              <button 
                onClick={handleLifetimeClick}
                className="w-full bg-white border-2 border-gray-900 rounded-2xl p-4 text-left relative overflow-hidden transition-all hover:shadow-lg"
                style={{ boxShadow: '0 3px 0 #1a1a2e' }}
              >
                <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  ✨ 프리미엄
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center text-2xl border-2 border-gray-900">
                    ♾️
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-black">평생 종합사주</div>
                    <div className="text-gray-500 text-xs">만세력 기반 실제 사주</div>
                  </div>
                </div>
                <div className="mt-3 bg-gray-900 text-white rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-400">평생 소장</div>
                    <div className="text-lg font-black">29,900원</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-400 to-violet-500 text-white text-xs font-black px-3 py-1.5 rounded-lg" style={{ boxShadow: '0 2px 0 #6b21a8' }}>
                    ♾️ 구매하기
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="flex justify-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="card-game px-8 py-3 rounded-full font-black text-gray-900 text-sm transition-all"
          >
            🏠 처음으로
          </button>
        </div>
      </div>

      {/* ========== 사주 계산 안내 모달 ========== */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              border: '3px solid #1a1a2e',
              boxShadow: '0 6px 0 #1a1a2e, 0 10px 40px rgba(0,0,0,0.5)'
            }}
          >
            {/* 모달 헤더 */}
            <div className="bg-gray-900 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">💡</span>
                <span className="text-white font-black">사주 계산 방식 안내</span>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white font-bold transition-all"
              >
                ✕
              </button>
            </div>
            
            {/* 모달 내용 */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-amber-400">
                <p className="text-gray-700 text-sm">
                  본 서비스는 <strong className="text-gray-900">전통 만세력 기준</strong>으로 사주를 계산합니다.
                </p>
                <p className="text-gray-600 text-xs mt-2">
                  24절기의 절입시간을 적용하여, 한국에서 가장 보편적으로 사용되는 방식입니다.
                </p>
              </div>
              
              {/* 아코디언 FAQ */}
              <div className="bg-blue-50 rounded-xl border-2 border-blue-200 overflow-hidden">
                <div className="bg-blue-100 px-4 py-2">
                  <p className="font-black text-blue-900 text-sm">🤔 왜 철학관, 사이트마다 다를까요?</p>
                </div>
                
                <div className="divide-y divide-blue-200">
                  {[
                    { key: 'item1', title: '절입시간 적용 여부', content: '사주의 "월"은 양력 1일이 아니라 24절기를 기준으로 바뀝니다. 예를 들어 3월 5일 경칩 이전 출생자는 "2월생"으로 계산됩니다. 하지만 일부 사이트는 이를 적용하지 않아 양력 3월생으로 표시하기도 합니다.' },
                    { key: 'item2', title: '진태양시 보정 여부', content: '한국 표준시는 동경 135도 기준이지만, 서울은 동경 127도에 위치해 실제 태양 위치와 약 32분 차이가 납니다. 진태양시를 적용하면 오후 5시 5분 출생자가 오후 4시 33분으로 보정되어 시주가 바뀔 수 있습니다.' },
                    { key: 'item3', title: '양력/음력 변환 방식', content: '음력을 양력으로 변환하는 계산 방식이 사이트마다 다를 수 있습니다. 특히 윤달이나 작은달/큰달 처리 방식에 따라 하루 정도 차이가 날 수 있으며, 이는 일주에 영향을 줍니다.' },
                    { key: 'item4', title: '시간 경계 처리', content: '자시는 밤 11시부터 새벽 1시까지인데, 밤 11시~12시를 "전날"로 볼지 "당일"로 볼지에 대한 해석이 다릅니다. 일부는 밤 11시 30분 출생을 전날로 보고, 다른 곳은 당일로 봅니다.' },
                    { key: 'item5', title: '출생 시간 불명확', content: '정확한 출생 시간을 모르는 경우, 전통적으로는 낮 12시를 기본값으로 사용하지만, 일부 사이트는 오후 2시를 사용하거나 사용자가 선택하도록 합니다. 시주는 운명의 30%를 차지하므로 이 차이는 매우 큽니다.' }
                  ].map((item) => (
                    <div key={item.key}>
                      <button
                        onClick={() => toggleItem(item.key)}
                        className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-blue-100/50 transition-all"
                      >
                        <span className="text-blue-900 text-xs font-bold">• {item.title}</span>
                        <span className="text-blue-600 font-bold">{openItems[item.key] ? '▲' : '▼'}</span>
                      </button>
                      {openItems[item.key] && (
                        <div className="px-4 pb-3">
                          <p className="text-blue-700 text-xs leading-relaxed bg-white rounded-lg p-3">
                            {item.content}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 핵심 메시지 */}
              <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-400">
                <p className="font-black text-purple-900 text-sm mb-2">🎯 가장 중요한 것은</p>
                <p className="text-purple-800 text-xs leading-relaxed">
                  정확한 사주 계산보다 더 중요한 것은 <strong>오늘 당신 사주에 맞는 조언과 실천 가능한 방향</strong>입니다. 
                  본 서비스는 매일 달라지는 상황에 맞춰 구체적이고 실질적인 운세 해석을 제공하는 것이 핵심입니다.
                </p>
              </div>
              
              <p className="text-gray-500 text-xs text-center">
                같은 사주를 가진 사람도 삶의 방향은 다르게 펼쳐집니다.<br/>
                매일의 선택과 노력이 운명을 만들어갑니다. ✨
              </p>
            </div>
            
            {/* 모달 푸터 */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 rounded-2xl text-white font-black transition-all"
                style={{ 
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                  boxShadow: '0 3px 0 #0f0f23'
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== 운세 상세보기 모달 ========== */}
      {selectedFortune && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedFortune(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full max-h-[80vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              border: '3px solid #1a1a2e',
              boxShadow: '0 6px 0 #1a1a2e, 0 10px 40px rgba(0,0,0,0.5)'
            }}
          >
            {/* 모달 헤더 */}
            <div className="bg-gray-900 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedFortune.icon}</span>
                <span className="text-white font-black text-lg">{selectedFortune.title}</span>
              </div>
              <button 
                onClick={() => setSelectedFortune(null)}
                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white font-bold transition-all"
              >
                ✕
              </button>
            </div>
            
            {/* 모달 내용 */}
            <div className="flex-1 overflow-y-auto p-5">
              <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-amber-400">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {selectedFortune.content}
                </p>
              </div>
            </div>
            
            {/* 모달 푸터 */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => setSelectedFortune(null)}
                className="w-full py-3 rounded-2xl font-black transition-all"
                style={{ 
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  boxShadow: '0 3px 0 #b45309'
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== 로그인 필요 알림창 ========== */}
      {showLoginModal && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowLoginModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-sm w-full text-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              border: '3px solid #1a1a2e',
              boxShadow: '0 6px 0 #1a1a2e, 0 10px 40px rgba(0,0,0,0.5)'
            }}
          >
            <div className="p-6">
              <div className="text-5xl mb-4">🔐</div>
              <h3 className="font-black text-xl text-gray-900 mb-2">로그인이 필요합니다</h3>
              <p className="text-sm text-gray-600 mb-6">
                결제를 진행하려면 먼저 로그인해주세요.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-3 rounded-2xl font-black transition-all text-white"
                  style={{ 
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    boxShadow: '0 3px 0 #0f0f23'
                  }}
                >
                  로그인하러 가기
                </button>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-2xl font-black hover:bg-gray-200 transition-all"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 알림톡 미리보기 모달 */}
      <KakaoPreviewModal 
        isOpen={showKakaoPreview} 
        onClose={() => setShowKakaoPreview(false)} 
      />
    </div>
  );
}
