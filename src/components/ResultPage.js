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
  const [isSajuExpanded, setIsSajuExpanded] = useState(false); // 사주 팔자 접기/펼치기
  const [elementCount, setElementCount] = useState(null); // 오행 개수
  const [showModal, setShowModal] = useState(false); // 사주 계산 안내 모달
  const [openItems, setOpenItems] = useState({}); // 모달 아코디언
  const [showLoginModal, setShowLoginModal] = useState(false); // ⭐ 추가: 로그인 필요 알림창

  // ⭐ 추가: 모달 아코디언 토글 함수
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
    '목': 'text-green-400',
    '화': 'text-red-400',
    '토': 'text-yellow-400',
    '금': 'text-gray-700',
    '수': 'text-blue-400'
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ 
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
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');
        
        * {
          font-family: 'Nanum Gothic', 'Malgun Gothic', sans-serif !important;
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
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* 헤더 - 오운완 말풍선 로고 */}
        <div className="text-center mb-8 animate-fadeIn bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900 relative overflow-hidden">
          
          {/* 배경 블러 장식 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100 to-transparent rounded-tr-full opacity-50"></div>
          
          {/* 육각형 패턴 배경 */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="hex-result" width="30" height="26" patternUnits="userSpaceOnUse">
                  <polygon points="15,0 30,7.5 30,22.5 15,30 0,22.5 0,7.5" fill="none" stroke="#000" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hex-result)"/>
            </svg>
          </div>
          
          <div className="relative z-10">
            
            {/* 오운완 말풍선 로고 */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative" style={{animation: 'wiggle 2s ease-in-out infinite'}}>
                {/* 펄스 링 */}
                <div className="absolute -inset-2 bg-amber-200 rounded-2xl" style={{animation: 'pulseRing 2s ease-in-out infinite'}}></div>
                
                {/* 메인 말풍선 */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl px-6 py-3 shadow-lg" style={{border: '3px solid #111827'}}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📬</span>
                    <div className="text-gray-900 text-2xl tracking-tight" style={{fontWeight: 900}}>
                      오운완
                    </div>
                    <span className="text-lg" style={{animation: 'sparkle 1.5s ease-in-out infinite'}}>✨</span>
                  </div>
                </div>
                
                {/* 말풍선 꼬리 */}
                <div 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: '10px solid #111827'
                  }}
                ></div>
              </div>
            </div>
            
            {/* 서브 타이틀 */}
            <p className="text-gray-500 text-xs mb-4 tracking-wider">오늘의 운세 완료!</p>
            
            {/* 사용자 정보 박스 */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-3 border border-gray-200">
              <p className="text-gray-800 text-lg font-bold">{reportData.name}님의 오늘 운세</p>
              <p className="text-gray-500 text-sm">{reportData.date}</p>
            </div>
            
            {/* 만세력 배지 */}
            {gptFortune?.success && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full border-2 border-green-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-700 text-xs font-bold">🤖 실제 만세력을 통한 운세입니다.</span>
              </div>
            )}
            
          </div>
        </div>

        {/* 사주 4주 카드 - 접기/펼치기 가능 */}
        <div className="bg-white rounded-3xl border-2 border-gray-900 shadow-2xl animate-slideUp overflow-hidden mb-6">
          {/* 헤더 - 클릭 가능 */}
          <button
  onClick={() => setIsSajuExpanded(!isSajuExpanded)}
  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-all"
>
  <div className="flex items-center gap-2">
    <Star className="w-6 h-6 text-gray-900" />
    <h2 className="text-2xl font-bold text-gray-900">사주팔자</h2>
  </div>
  <div className="flex items-center gap-2">
    <span className="text-sm text-gray-600">펼쳐보기</span>
    <div className={`transform transition-transform duration-300 ${isSajuExpanded ? 'rotate-180' : ''}`}>
      <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</button>
          
          {/* 내용 - 슬라이드 애니메이션 */}
          <div 
            className={`transition-all duration-500 ease-in-out ${
              isSajuExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* 년주 */}
                <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-300 hover:bg-gray-100 transition-all">
                  <div className="text-gray-600 text-sm mb-2 text-center font-bold">년주 (年柱)</div>
                  <div className="text-3xl font-bold text-center">
                    {reportData.saju.year ? (
                      <>
                        <span className={elementColors[getElementColor(reportData.saju.year[0])]}>{reportData.saju.year[0]}</span>
                        <span className={elementColors[getElementColor(reportData.saju.year[1])]}>{reportData.saju.year[1]}</span>
                      </>
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </div>
                  <div className="text-gray-500 text-xs mt-2 text-center">뿌리와 조상</div>
                </div>

                {/* 월주 */}
                <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-300 hover:bg-gray-100 transition-all">
                  <div className="text-gray-600 text-sm mb-2 text-center font-bold">월주 (月柱)</div>
                  <div className="text-3xl font-bold text-center">
                    {reportData.saju.month ? (
                      <>
                        <span className={elementColors[getElementColor(reportData.saju.month[0])]}>{reportData.saju.month[0]}</span>
                        <span className={elementColors[getElementColor(reportData.saju.month[1])]}>{reportData.saju.month[1]}</span>
                      </>
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </div>
                  <div className="text-gray-500 text-xs mt-2 text-center">청년과 부모</div>
                </div>

                {/* 일주 */}
                <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-300 hover:bg-gray-100 transition-all">
                  <div className="text-gray-600 text-sm mb-2 text-center font-bold">일주 (日柱)</div>
                  <div className="text-3xl font-bold text-center">
                    {reportData.saju.day ? (
                      <>
                        <span className={elementColors[getElementColor(reportData.saju.day[0])]}>{reportData.saju.day[0]}</span>
                        <span className={elementColors[getElementColor(reportData.saju.day[1])]}>{reportData.saju.day[1]}</span>
                      </>
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </div>
                  <div className="text-gray-500 text-xs mt-2 text-center">나 자신</div>
                </div>

                {/* 시주 */}
                <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-300 hover:bg-gray-100 transition-all">
                  <div className="text-gray-600 text-sm mb-2 text-center font-bold">시주 (時柱)</div>
                  <div className="text-3xl font-bold text-center">
                    {reportData.saju.hour ? (
                      <>
                        <span className={elementColors[getElementColor(reportData.saju.hour[0])]}>{reportData.saju.hour[0]}</span>
                        <span className={elementColors[getElementColor(reportData.saju.hour[1])]}>{reportData.saju.hour[1]}</span>
                      </>
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </div>
                  <div className="text-gray-500 text-xs mt-2 text-center">노년과 자손</div>
                </div>
              </div>

              {/* 오행 설명 */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm font-bold">목(木)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-red-400 text-sm font-bold">화(火)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-400 text-sm font-bold">토(土)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                  <span className="text-gray-900 text-sm font-bold">금(金)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-400 text-sm font-bold">수(水)</span>
                </div>
              </div>

              {/* 오행 분석 섹션 */}
              {elementCount && (
                <div className="bg-gray-50 rounded-xl p-4 mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base">🎨</span>
                    <h4 className="text-sm font-bold text-gray-900">오행 분석</h4>
                  </div>
                  
                  <div className="space-y-3">
                    {/* 목(木) */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-green-500"></span>
                          <span className="text-sm font-bold text-gray-900">목(木) 나무</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          {elementCount.목 || 0}개
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${((elementCount.목 || 0) / 8) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* 화(火) */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-500"></span>
                          <span className="text-sm font-bold text-gray-900">화(火) 불</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          {elementCount.화 || 0}개
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${((elementCount.화 || 0) / 8) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* 토(土) */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                          <span className="text-sm font-bold text-gray-900">토(土) 흙</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          {elementCount.토 || 0}개
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${((elementCount.토 || 0) / 8) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* 금(金) */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-gray-900"></span>
                          <span className="text-sm font-bold text-gray-900">금(金) 쇠</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          {elementCount.금 || 0}개
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gray-900 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${((elementCount.금 || 0) / 8) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* 수(水) */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                          <span className="text-sm font-bold text-gray-900">수(水) 물</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          {elementCount.수 || 0}개
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${((elementCount.수 || 0) / 8) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* 사주 계산 안내 버튼 */}
                  <div className="mt-4">
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full text-left text-sm text-gray-600 hover:text-gray-900 transition-all flex items-center gap-2 bg-gray-100 p-3 rounded-lg hover:bg-gray-200"
                    >
                      <span>💬</span>
                      <span>철학관, 사이트마다 사주가 다른 이유는?</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 종합 운세 */}
        <div className="bg-white rounded-3xl p-6 mb-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-gray-900" />
            오늘의 종합 운세
          </h2>
          <p className="text-gray-700 leading-relaxed">{reportData.totalFortune}</p>
        </div>

        {/* 세부 운세 그리드 */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* 애정운 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              애정운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{reportData.loveLife}</p>
          </div>

          {/* 사업운 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-500" />
              사업운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{reportData.business}</p>
          </div>

          {/* 금전운 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              금전운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{reportData.money}</p>
          </div>

          {/* 건강운 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-500" />
              건강운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{reportData.health}</p>
          </div>

          {/* 대인관계운 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              대인관계운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{reportData.relationship}</p>
          </div>

          {/* 가족운 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.7s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <HomeIcon className="w-5 h-5 text-orange-500" />
              가족운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{reportData.family}</p>
          </div>

          {/* 학업운 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.8s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Book className="w-5 h-5 text-cyan-500" />
              학업운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{reportData.study}</p>
          </div>

          {/* 여행운 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.9s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Plane className="w-5 h-5 text-sky-500" />
              여행운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{reportData.travel}</p>
          </div>

          {/* 부동산운 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '1s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-500" />
              부동산운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{reportData.realEstate}</p>
          </div>
        </div>

        {/* 행운 정보 */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* 행운의 장소 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '1.1s' }}>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-900" />
              행운의 장소
            </h3>
            <p className="text-gray-700 text-center text-lg font-semibold">{reportData.luckyPlace}</p>
          </div>

          {/* 행운의 숫자 - 로또 번호 스타일 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '1.2s' }}>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Hash className="w-5 h-5 text-gray-900" />
              행운의 숫자
            </h3>
            <div className="grid grid-cols-3 gap-2">
  {reportData.luckyNumber && reportData.luckyNumber.split(',').map((num, idx) => (
    <div key={idx} className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white font-bold shadow-lg mx-auto">
      {num.trim()}
    </div>
  ))}
</div>
          </div>

          {/* 행운의 컬러 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '1.3s' }}>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Palette className="w-5 h-5 text-gray-900" />
              행운의 컬러
            </h3>
            <p className="text-gray-700 text-center text-2xl font-bold py-2">{reportData.luckyColor}</p>
          </div>
        </div>

        {/* 주의사항 */}
        <div className="bg-white rounded-3xl p-6 mb-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '1.4s' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-gray-900" />
            오늘의 주의사항
          </h2>
          <p className="text-gray-700 leading-relaxed">{reportData.risk}</p>
        </div>

        {/* 오늘 조심할 물건 */}
        <div className="bg-white rounded-3xl p-6 mb-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '1.5s' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            오늘 조심할 물건
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">{reportData.dangerousItem}</p>
        </div>

        {/* 🔥 알림톡 미리보기 섹션 - 오늘 조심할 물건 다음에 배치 */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 mb-6 animate-slideUp" style={{ animationDelay: '1.55s' }}>
          <div className="text-center">
            <p className="text-2xl mb-2">💌</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              매일 아침, 카톡으로 받아보세요!
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              일일사주 구독하면 매일 아침 8시<br/>
              오늘의 운세가 카카오톡으로 도착해요
            </p>
            <button
              onClick={() => setShowKakaoPreview(true)}
              className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 font-bold py-3 px-6 rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all shadow-lg cursor-pointer relative z-50"
            >
              📱 알림톡 미리보기
            </button>
          </div>
        </div>

        {/* 구독 프로모션 (애니메이션) - v5 은은한 그라데이션 버튼 */}
        {showSubscribe && (
          <div className="bg-white rounded-3xl p-8 mb-6 border-2 border-gray-900 shadow-2xl animate-scaleIn">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-relaxed whitespace-nowrap">
                매일 아침 8시,<br/>새로운 운세를 받아보세요!
              </h2>
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                오운완을<br/>
                구독하여 매일 아침 오늘의 운세<br/>
                리포트를 받아보세요!
              </p>
              <div className="flex flex-col gap-4 justify-center">
                {/* 유료 상품 3개 - v5 스타일 */}
                <div className="space-y-4">
                  {/* 1. 일일사주 버튼 */}
                  <button
                    onClick={handleSubscriptionClick}
                    className="w-full bg-white border-3 border-gray-900 rounded-3xl p-5 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                    style={{
                      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.25), 0 0 0 3px #FCD34D';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                    }}
                  >
                    {/* 배경 그라데이션 효과 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-amber-50 to-yellow-50 opacity-60"></div>
                    
                    {/* 인기 배지 */}
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-lg z-20">
                      ⭐ 인기
                    </div>

                    <div className="relative z-10">
                      {/* 상단: 아이콘 + 제목 */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-gradient-to-br from-gray-400 via-gray-500 to-amber-400 p-2.5 rounded-2xl shadow-lg flex-shrink-0">
                          <span className="text-xl">💌</span>
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <div className="text-base sm:text-lg font-bold text-gray-900 whitespace-nowrap">일일사주 자동발송</div>
                          <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">매일 아침 8시 카톡 발송</div>
                        </div>
                      </div>

                      {/* 중간: 가격 */}
                      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 px-3 rounded-2xl mb-2 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-300">월 구독료</div>
                          <div className="text-xl font-bold">9,900원</div>
                        </div>
                        <div className="text-xs text-yellow-300 bg-yellow-900/30 px-2.5 py-1 rounded-lg whitespace-nowrap">
                          1개월
                        </div>
                      </div>

                      {/* 하단: CTA 버튼 */}
                      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-amber-700 text-white py-3 px-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg group-hover:shadow-xl transition-all border-2 border-gray-900 group-hover:border-amber-500 whitespace-nowrap">
                        💳 지금 구독하기
                      </div>
                    </div>
                  </button>

                  {/* 2. 월간사주 버튼 */}
                  <button
                    onClick={handleMonthlyClick}
                    className="w-full bg-white border-3 border-gray-900 rounded-3xl p-5 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                    style={{
                      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.25), 0 0 0 3px #FCD34D';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                    }}
                  >
                    {/* 배경 그라데이션 효과 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-sky-50 to-blue-50 opacity-60"></div>

                    <div className="relative z-10">
                      {/* 상단: 아이콘 + 제목 */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-gradient-to-br from-gray-500 via-gray-600 to-sky-500 p-2.5 rounded-2xl shadow-lg flex-shrink-0">
                          <span className="text-xl">🗓️</span>
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <div className="text-base sm:text-lg font-bold text-gray-900 whitespace-nowrap">월간 종합사주</div>
                          <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">한 달 14가지 운세 종합</div>
                        </div>
                      </div>

                      {/* 중간: 가격 */}
                      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 px-3 rounded-2xl mb-2 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-300">1회 구매</div>
                          <div className="text-xl font-bold">11,000원</div>
                        </div>
                        <div className="text-xs text-blue-300 bg-blue-900/30 px-2.5 py-1 rounded-lg whitespace-nowrap">
                          즉시 확인
                        </div>
                      </div>

                      {/* 하단: CTA 버튼 */}
                      <div className="bg-gradient-to-r from-gray-700 via-gray-700 to-sky-700 text-white py-3 px-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg group-hover:shadow-xl transition-all border-2 border-gray-900 group-hover:border-sky-500 whitespace-nowrap">
                        📅 지금 구매하기
                      </div>
                    </div>
                  </button>

                  {/* 3. 평생사주 버튼 */}
                  <button
                    onClick={handleLifetimeClick}
                    className="w-full bg-white border-3 border-gray-900 rounded-3xl p-5 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                    style={{
                      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.25), 0 0 0 3px #FCD34D';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                    }}
                  >
                    {/* 배경 그라데이션 효과 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-violet-50 to-purple-50 opacity-60"></div>
                    
                    {/* 프리미엄 배지 */}
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-lg z-20">
                      ✨ 프리미엄
                    </div>

                    <div className="relative z-10">
                      {/* 상단: 아이콘 + 제목 */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-gradient-to-br from-gray-600 via-gray-700 to-violet-600 p-2.5 rounded-2xl shadow-lg flex-shrink-0">
                          <span className="text-xl">♾️</span>
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <div className="text-base sm:text-lg font-bold text-gray-900 whitespace-nowrap">평생 종합사주</div>
                          <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">만세력 기반 실제 사주</div>
                        </div>
                      </div>

                      {/* 중간: 가격 */}
                      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 px-3 rounded-2xl mb-2 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-300">평생 소장</div>
                          <div className="text-xl font-bold">29,900원</div>
                        </div>
                        <div className="text-xs text-purple-300 bg-purple-900/30 px-2.5 py-1 rounded-lg whitespace-nowrap">
                          최고 가치
                        </div>
                      </div>

                      {/* 하단: CTA 버튼 */}
                      <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-violet-700 text-white py-3 px-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg group-hover:shadow-xl transition-all border-2 border-gray-900 group-hover:border-violet-500 whitespace-nowrap">
                        ♾️ 지금 구매하기
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-full font-semibold transition-all border-2 border-gray-900 shadow-lg"
          >
            처음으로
          </button>
        </div>
      </div>

      {/* ⭐ 추가: 사주 계산 안내 모달 */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[85vh] flex flex-col border-4 border-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg mb-4">💡 사주 계산 방식 안내</h3>
            
            <div className="space-y-4 text-sm text-gray-700 overflow-y-auto flex-1 pr-2">
              <p>본 서비스는 <strong>전통 만세력 기준</strong>으로<br />사주를 계산합니다.</p>
              <p>24절기의 절입시간을 적용하여,<br />한국에서 가장 보편적으로 사용되는<br />방식입니다.</p>
              
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <p className="font-medium text-blue-900 mb-3">왜 철학관, 사이트마다 다를까요?</p>
                <div className="space-y-2">
                  
                  {/* 항목 1 */}
                  <div className="border-b border-blue-200 last:border-0">
                    <button
                      onClick={() => toggleItem('item1')}
                      className="w-full text-left py-2 flex items-center justify-between text-xs font-semibold text-blue-900 hover:text-blue-700"
                    >
                      <span>• 절입시간 적용 여부</span>
                      <span className="text-blue-600">{openItems.item1 ? '▲' : '▼'}</span>
                    </button>
                    {openItems.item1 && (
                      <p className="text-xs text-blue-700 ml-3 pb-2">
                        사주의 "월"은 양력 1일이 아니라 24절기를 기준으로 바뀝니다. 예를 들어 3월 5일 경칩 이전 출생자는 "2월생"으로 계산됩니다. 하지만 일부 사이트는 이를 적용하지 않아 양력 3월생으로 표시하기도 합니다.
                      </p>
                    )}
                  </div>

                  {/* 항목 2 */}
                  <div className="border-b border-blue-200 last:border-0">
                    <button
                      onClick={() => toggleItem('item2')}
                      className="w-full text-left py-2 flex items-center justify-between text-xs font-semibold text-blue-900 hover:text-blue-700"
                    >
                      <span>• 진태양시 보정 여부</span>
                      <span className="text-blue-600">{openItems.item2 ? '▲' : '▼'}</span>
                    </button>
                    {openItems.item2 && (
                      <p className="text-xs text-blue-700 ml-3 pb-2">
                        한국 표준시는 동경 135도 기준이지만, 서울은 동경 127도에 위치해 실제 태양 위치와 약 32분 차이가 납니다. 진태양시를 적용하면 오후 5시 5분 출생자가 오후 4시 33분으로 보정되어 시주가 바뀔 수 있습니다.
                      </p>
                    )}
                  </div>

                  {/* 항목 3 */}
                  <div className="border-b border-blue-200 last:border-0">
                    <button
                      onClick={() => toggleItem('item3')}
                      className="w-full text-left py-2 flex items-center justify-between text-xs font-semibold text-blue-900 hover:text-blue-700"
                    >
                      <span>• 양력/음력 변환 방식</span>
                      <span className="text-blue-600">{openItems.item3 ? '▲' : '▼'}</span>
                    </button>
                    {openItems.item3 && (
                      <p className="text-xs text-blue-700 ml-3 pb-2">
                        음력을 양력으로 변환하는 계산 방식이 사이트마다 다를 수 있습니다. 특히 윤달이나 작은달/큰달 처리 방식에 따라 하루 정도 차이가 날 수 있으며, 이는 일주에 영향을 줍니다.
                      </p>
                    )}
                  </div>

                  {/* 항목 4 */}
                  <div className="border-b border-blue-200 last:border-0">
                    <button
                      onClick={() => toggleItem('item4')}
                      className="w-full text-left py-2 flex items-center justify-between text-xs font-semibold text-blue-900 hover:text-blue-700"
                    >
                      <span>• 시간 경계 처리</span>
                      <span className="text-blue-600">{openItems.item4 ? '▲' : '▼'}</span>
                    </button>
                    {openItems.item4 && (
                      <p className="text-xs text-blue-700 ml-3 pb-2">
                        자시는 밤 11시부터 새벽 1시까지인데, 밤 11시~12시를 "전날"로 볼지 "당일"로 볼지에 대한 해석이 다릅니다. 일부는 밤 11시 30분 출생을 전날로 보고, 다른 곳은 당일로 봅니다.
                      </p>
                    )}
                  </div>

                  {/* 항목 5 */}
                  <div className="border-b border-blue-200 last:border-0">
                    <button
                      onClick={() => toggleItem('item5')}
                      className="w-full text-left py-2 flex items-center justify-between text-xs font-semibold text-blue-900 hover:text-blue-700"
                    >
                      <span>• 출생 시간 불명확</span>
                      <span className="text-blue-600">{openItems.item5 ? '▲' : '▼'}</span>
                    </button>
                    {openItems.item5 && (
                      <p className="text-xs text-blue-700 ml-3 pb-2">
                        정확한 출생 시간을 모르는 경우, 전통적으로는 낮 12시를 기본값으로 사용하지만, 일부 사이트는 오후 2시를 사용하거나 사용자가 선택하도록 합니다. 시주는 운명의 30%를 차지하므로 이 차이는 매우 큽니다.
                      </p>
                    )}
                  </div>

                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <p className="font-medium text-purple-900 mb-2">🎯 가장 중요한 것은</p>
                <p className="text-xs text-purple-800">정확한 사주 계산보다 더 중요한 것은 <strong>오늘 당신 사주에 맞는 조언과 실천 가능한 방향</strong>입니다. 본 서비스는 매일 달라지는 상황에 맞춰 구체적이고 실질적인 운세 해석을 제공하는 것이 핵심입니다.</p>
              </div>
              
              <p className="text-gray-500 text-xs pt-2">같은 사주를 가진 사람도<br />삶의 방향은 다르게 펼쳐집니다.<br />매일의 선택과 노력이 운명을 만들어갑니다.</p>
            </div>
            
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 flex-shrink-0 font-bold"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* ⭐ 추가: 로그인 필요 알림창 */}
      {showLoginModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowLoginModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full border-4 border-gray-900 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">로그인이 필요합니다</h3>
            <p className="text-sm text-gray-600 mb-6">
              결제를 진행하려면 먼저 로그인해주세요.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-all"
              >
                로그인하러 가기
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                닫기
              </button>
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