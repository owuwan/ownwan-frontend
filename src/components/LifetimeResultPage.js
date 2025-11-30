import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Star, Heart, Briefcase, DollarSign, Activity, Users, Calendar, Award, TrendingUp, Sparkles } from 'lucide-react';
import KakaoPreviewModal from './KakaoPreviewModal';

export default function LifetimeResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [lifetimeData, setLifetimeData] = useState(null);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [isSajuExpanded, setIsSajuExpanded] = useState(false);
  const [elementCount, setElementCount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openItems, setOpenItems] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showKakaoPreview, setShowKakaoPreview] = useState(false);

  const checkLogin = () => {
    const token = localStorage.getItem('access_token');
    return !!token;
  };

  const handleSubscriptionClick = () => {
    if (!checkLogin()) { setShowLoginModal(true); return; }
    navigate('/payment');
  };
  const handleMonthlyClick = () => {
    if (!checkLogin()) { setShowLoginModal(true); return; }
    navigate('/monthly-payment');
  };
  const handleNewYearClick = () => {
    if (!checkLogin()) { setShowLoginModal(true); return; }
    navigate('/newyear');
  };

  const toggleItem = (itemKey) => {
    setOpenItems(prev => ({ ...prev, [itemKey]: !prev[itemKey] }));
  };

  useEffect(() => {
    const data = location.state?.lifetimeData || location.state?.sajuData;
    if (!data) {
      alert('평생사주 데이터가 없습니다.');
      navigate('/');
      return;
    }
    setLifetimeData(data);
    
    if (data.element_count) {
      setElementCount(data.element_count);
    }
  }, [location, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSubscribe(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const getElementColor = (char) => {
    const elements = {
      '갑': '목', '을': '목', '병': '화', '정': '화', '무': '토', '기': '토',
      '경': '금', '신': '금', '임': '수', '계': '수', '인': '목', '묘': '목',
      '사': '화', '오': '화', '진': '토', '술': '토', '축': '토', '미': '토',
      '신': '금', '유': '금', '자': '수', '해': '수'
    };
    return elements[char] || '토';
  };

  const elementColors = {
    '목': 'text-green-400', '화': 'text-red-400', '토': 'text-yellow-400',
    '금': 'text-gray-700', '수': 'text-blue-400'
  };

  // 더미 데이터 (API 연동 전까지 사용)
  const dummyAnalysis = {
    personality: "타고난 리더십과 추진력이 강한 성격입니다. 목표를 향해 끊임없이 노력하며, 주변 사람들에게 긍정적인 영향을 주는 카리스마가 있습니다.",
    wealth: "재물운이 매우 좋습니다. 특히 30대 후반부터 재운이 크게 상승하며, 투자나 사업에서 좋은 성과를 거둘 수 있습니다.",
    career: "전문직이나 관리직에 적합한 사주입니다. 특히 금융, 경영, IT 분야에서 두각을 나타낼 수 있습니다.",
    relationship: "배우자운이 좋으며, 가정생활이 원만합니다. 일과 가정의 균형을 맞추는 것이 중요합니다.",
    health: "전반적으로 건강한 편이나, 소화기와 심장 건강에 주의가 필요합니다."
  };

  const majorCycles = [
    { age: "8-17세", pillar: "갑인", description: "학업운이 좋은 시기" },
    { age: "18-27세", pillar: "을묘", description: "사회 진출과 인맥 형성" },
    { age: "28-37세", pillar: "병진", description: "재물운 상승, 사업 기회" },
    { age: "38-47세", pillar: "정사", description: "안정과 발전의 시기" },
    { age: "48-57세", pillar: "무오", description: "명예와 지위 상승" },
    { age: "58-67세", pillar: "기미", description: "여유와 성숙의 시기" }
  ];

  const yearlyFortune = [
    { year: "2025년", fortune: "전반적으로 좋은 운세. 새로운 기회 도래", stars: 4 },
    { year: "2026년", fortune: "재물운 상승. 투자 적기", stars: 5 },
    { year: "2027년", fortune: "안정적인 한 해. 내실 다지기", stars: 3 },
    { year: "2028년", fortune: "변화의 시기. 새로운 도전", stars: 4 },
    { year: "2029년", fortune: "발전과 성장의 해", stars: 5 }
  ];

  const advice = [
    "인내심을 갖고 꾸준히 노력하면 큰 성공을 거둘 수 있습니다.",
    "대인관계에서 겸손함을 잃지 마세요.",
    "재물운이 좋지만 과욕은 금물입니다.",
    "건강 관리를 소홀히 하지 마세요.",
    "가족과의 시간을 소중히 여기세요."
  ];

  if (!lifetimeData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf0 50%, #f0f2f8 100%)'
      }}>
        <div className="text-gray-600 text-lg">로딩 중...</div>
      </div>
    );
  }

  const saju = lifetimeData.saju || {};
  const userName = lifetimeData.name || "홍길동";

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ 
      fontFamily: "'Nanum Gothic', 'Malgun Gothic', sans-serif",
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf0 50%, #f0f2f8 100%)'
    }}>
      {/* 육각형 패턴 */}
      <div className="absolute inset-0 opacity-[0.21]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='173.2' viewBox='0 0 200 173.2' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000000' stroke-width='2'%3E%3Cpath d='M 50 0 L 100 0 L 125 43.3 L 100 86.6 L 50 86.6 L 25 43.3 Z' opacity='0.4'/%3E%3Cpath d='M 150 0 L 200 0 L 225 43.3 L 200 86.6 L 150 86.6 L 125 43.3 Z' opacity='0.3'/%3E%3Cpath d='M 0 86.6 L 50 86.6 L 75 130 L 50 173.2 L 0 173.2 L -25 130 Z' opacity='0.35'/%3E%3Cpath d='M 100 86.6 L 150 86.6 L 175 130 L 150 173.2 L 100 173.2 L 75 130 Z' opacity='0.4'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '200px 173.2px'
      }}></div>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');
        * { font-family: 'Nanum Gothic', 'Malgun Gothic', sans-serif !important; }
        @keyframes wiggle { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
        @keyframes pulseRing { 0% { transform: scale(0.95); opacity: 0.7; } 50% { transform: scale(1.05); opacity: 0.3; } 100% { transform: scale(0.95); opacity: 0.7; } }
        @keyframes sparkle { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.3); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; animation-fill-mode: both; }
        .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        
        {/* 헤더 */}
        <div className="text-center mb-8 animate-fadeIn bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-100 to-transparent rounded-bl-full opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-transparent rounded-tr-full opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="relative" style={{animation: 'wiggle 2s ease-in-out infinite'}}>
                <div className="absolute -inset-2 bg-violet-200 rounded-2xl" style={{animation: 'pulseRing 2s ease-in-out infinite'}}></div>
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl px-6 py-3 shadow-lg" style={{border: '3px solid #111827'}}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">♾️</span>
                    <div className="text-gray-900 text-2xl tracking-tight" style={{fontWeight: 900}}>평생사주</div>
                    <span className="text-lg" style={{animation: 'sparkle 1.5s ease-in-out infinite'}}>✨</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0" style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid #111827' }}></div>
              </div>
            </div>
            
            <p className="text-gray-500 text-xs mb-4 tracking-wider">평생 운세 분석 완료!</p>
            
            <div className="bg-gray-50 rounded-2xl p-4 mb-3 border border-gray-200">
              <p className="text-gray-800 text-lg font-bold">{userName}님의 평생 운세</p>
              <p className="text-gray-500 text-sm">{lifetimeData.birth_date || "생년월일"} | {lifetimeData.gender || "성별"}</p>
            </div>
            
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full border-2 border-green-400">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-700 text-xs font-bold">🤖 실제 만세력을 통한 운세입니다.</span>
            </div>
          </div>
        </div>

        {/* 사주 팔자 - 펼쳐보기 */}
        <div className="bg-white rounded-3xl border-2 border-gray-900 shadow-2xl animate-slideUp overflow-hidden mb-6">
          <button onClick={() => setIsSajuExpanded(!isSajuExpanded)} className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-all">
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
          
          <div className={`transition-all duration-500 ease-in-out ${isSajuExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`} style={{ overflow: 'hidden' }}>
            <div className="px-6 pb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: '년주 (年柱)', value: saju.year, desc: '뿌리와 조상' },
                  { label: '월주 (月柱)', value: saju.month, desc: '청년과 부모' },
                  { label: '일주 (日柱)', value: saju.day, desc: '나 자신' },
                  { label: '시주 (時柱)', value: saju.hour, desc: '노년과 자손' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-300 hover:bg-gray-100 transition-all">
                    <div className="text-gray-600 text-sm mb-2 text-center font-bold">{item.label}</div>
                    <div className="text-3xl font-bold text-center">
                      {item.value ? (
                        <>
                          <span className={elementColors[getElementColor(item.value[0])]}>{item.value[0]}</span>
                          <span className={elementColors[getElementColor(item.value[1])]}>{item.value[1]}</span>
                        </>
                      ) : <span className="text-gray-400">--</span>}
                    </div>
                    <div className="text-gray-500 text-xs mt-2 text-center">{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {[
                  { color: 'bg-green-400', text: 'text-green-400', name: '목(木)' },
                  { color: 'bg-red-400', text: 'text-red-400', name: '화(火)' },
                  { color: 'bg-yellow-400', text: 'text-yellow-400', name: '토(土)' },
                  { color: 'bg-gray-900', text: 'text-gray-900', name: '금(金)' },
                  { color: 'bg-blue-400', text: 'text-blue-400', name: '수(水)' }
                ].map((el, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <div className={`w-3 h-3 ${el.color} rounded-full`}></div>
                    <span className={`${el.text} text-sm font-bold`}>{el.name}</span>
                  </div>
                ))}
              </div>

              {elementCount && (
                <div className="bg-gray-50 rounded-xl p-4 mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base">🎨</span>
                    <h4 className="text-sm font-bold text-gray-900">오행 분석</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: '목(木) 나무', color: 'bg-green-500', key: '목' },
                      { name: '화(火) 불', color: 'bg-red-500', key: '화' },
                      { name: '토(土) 흙', color: 'bg-yellow-500', key: '토' },
                      { name: '금(金) 쇠', color: 'bg-gray-900', key: '금' },
                      { name: '수(水) 물', color: 'bg-blue-500', key: '수' }
                    ].map((el, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${el.color}`}></span>
                            <span className="text-sm font-bold text-gray-900">{el.name}</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{elementCount[el.key] || 0}개</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`${el.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${((elementCount[el.key] || 0) / 8) * 100}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <button onClick={() => setShowModal(true)} className="w-full text-left text-sm text-gray-600 hover:text-gray-900 transition-all flex items-center gap-2 bg-gray-100 p-3 rounded-lg hover:bg-gray-200">
                      <span>💬</span>
                      <span>철학관, 사이트마다 사주가 다른 이유는?</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 대운 (10년 단위) */}
        <div className="bg-white rounded-3xl p-6 mb-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-gray-900" />
            대운 (大運) - 10년 단위 운세
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {majorCycles.map((cycle, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:bg-gray-100 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-violet-600 font-bold">{cycle.age}</span>
                  <span className="text-gray-900 text-xl font-bold">{cycle.pillar}</span>
                </div>
                <p className="text-gray-600 text-sm">{cycle.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 평생 종합 분석 */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.15s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              성격 및 기질
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{dummyAnalysis.personality}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              재물운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{dummyAnalysis.wealth}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.25s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-500" />
              직업 및 사업운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{dummyAnalysis.career}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              애정 및 가정운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{dummyAnalysis.relationship}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp md:col-span-2" style={{ animationDelay: '0.35s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-500" />
              건강운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{dummyAnalysis.health}</p>
          </div>
        </div>

        {/* 연도별 운세 */}
        <div className="bg-white rounded-3xl p-6 mb-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-gray-900" />
            연도별 운세 (2025-2029)
          </h2>
          <div className="space-y-3">
            {yearlyFortune.map((year, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex justify-between items-center hover:bg-gray-100 transition-all">
                <div>
                  <div className="text-violet-600 font-bold mb-1">{year.year}</div>
                  <div className="text-gray-600 text-sm">{year.fortune}</div>
                </div>
                <div className="text-yellow-500 text-xl">{'★'.repeat(year.stars)}{'☆'.repeat(5 - year.stars)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 인생 조언 */}
        <div className="bg-white rounded-3xl p-6 mb-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.45s' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            인생 조언
          </h2>
          <ul className="space-y-3">
            {advice.map((item, idx) => (
              <li key={idx} className="text-gray-700 flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
                <span className="text-yellow-500 mt-0.5">✨</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 알림톡 미리보기 섹션 */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 rounded-2xl p-6 mb-6 animate-slideUp" style={{ animationDelay: '0.5s' }}>
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
              className="bg-gradient-to-r from-violet-400 to-purple-400 text-white font-bold py-3 px-6 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg cursor-pointer"
            >
              📱 알림톡 미리보기
            </button>
          </div>
        </div>

        {/* 다른 운세 상품 프로모션 */}
        {showSubscribe && (
          <div className="bg-white rounded-3xl p-8 mb-6 border-2 border-gray-900 shadow-2xl animate-scaleIn">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-relaxed">
                다른 운세도 확인해보세요!
              </h2>
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                일일/월간/신년 사주로<br/>더 자세한 운세를 확인하세요!
              </p>
              <div className="space-y-4">
                {/* 일일사주 */}
                <button onClick={handleSubscriptionClick} className="w-full bg-white border-3 border-gray-900 rounded-3xl p-5 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-amber-50 to-yellow-50 opacity-60"></div>
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 text-xs px-2 py-0.5 rounded-full font-bold z-20">⭐ 인기</div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-br from-gray-400 via-gray-500 to-amber-400 p-2.5 rounded-2xl shadow-lg"><span className="text-xl">💌</span></div>
                      <div className="text-left flex-1">
                        <div className="text-base sm:text-lg font-bold text-gray-900">일일사주 자동발송</div>
                        <div className="text-xs sm:text-sm text-gray-600">매일 아침 8시 카톡 발송</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 px-3 rounded-2xl mb-2 flex items-center justify-between">
                      <div><div className="text-xs text-gray-300">월 구독료</div><div className="text-xl font-bold">9,900원</div></div>
                      <div className="text-xs text-yellow-300 bg-yellow-900/30 px-2.5 py-1 rounded-lg">1개월</div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-amber-700 text-white py-3 px-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg border-2 border-gray-900">💳 지금 구독하기</div>
                  </div>
                </button>

                {/* 월간사주 */}
                <button onClick={handleMonthlyClick} className="w-full bg-white border-3 border-gray-900 rounded-3xl p-5 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-sky-50 to-blue-50 opacity-60"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-br from-gray-500 via-gray-600 to-sky-500 p-2.5 rounded-2xl shadow-lg"><span className="text-xl">🗓️</span></div>
                      <div className="text-left flex-1">
                        <div className="text-base sm:text-lg font-bold text-gray-900">월간 종합사주</div>
                        <div className="text-xs sm:text-sm text-gray-600">한 달 14가지 운세 종합</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 px-3 rounded-2xl mb-2 flex items-center justify-between">
                      <div><div className="text-xs text-gray-300">1회 구매</div><div className="text-xl font-bold">11,000원</div></div>
                      <div className="text-xs text-blue-300 bg-blue-900/30 px-2.5 py-1 rounded-lg">즉시 확인</div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-700 via-gray-700 to-sky-700 text-white py-3 px-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg border-2 border-gray-900">📅 지금 구매하기</div>
                  </div>
                </button>

                {/* 신년운세 */}
                <button onClick={handleNewYearClick} className="w-full bg-white border-3 border-gray-900 rounded-3xl p-5 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-amber-50 to-orange-50 opacity-60"></div>
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold z-20">🐍 2025</div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-2.5 rounded-2xl shadow-lg"><span className="text-xl">🐍</span></div>
                      <div className="text-left flex-1">
                        <div className="text-base sm:text-lg font-bold text-gray-900">2025 신년운세</div>
                        <div className="text-xs sm:text-sm text-gray-600">을사년 한 해 운세 총정리</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 px-3 rounded-2xl mb-2 flex items-center justify-between">
                      <div><div className="text-xs text-gray-300">1회 구매</div><div className="text-xl font-bold">19,900원</div></div>
                      <div className="text-xs text-orange-300 bg-orange-900/30 px-2.5 py-1 rounded-lg">즉시 확인</div>
                    </div>
                    <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-3 px-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg border-2 border-gray-900">🐍 지금 구매하기</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate('/')} className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-full font-semibold transition-all border-2 border-gray-900 shadow-lg">
            처음으로
          </button>
        </div>
      </div>

      {/* 사주 계산 안내 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[85vh] flex flex-col border-4 border-gray-900" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg mb-4">💡 사주 계산 방식 안내</h3>
            <div className="space-y-4 text-sm text-gray-700 overflow-y-auto flex-1 pr-2">
              <p>본 서비스는 <strong>전통 만세력 기준</strong>으로 사주를 계산합니다.</p>
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <p className="font-medium text-blue-900 mb-3">왜 철학관, 사이트마다 다를까요?</p>
                <div className="space-y-2">
                  {[
                    { key: 'item1', title: '절입시간 적용 여부', desc: '사주의 "월"은 양력 1일이 아니라 24절기를 기준으로 바뀝니다.' },
                    { key: 'item2', title: '진태양시 보정 여부', desc: '한국 표준시는 동경 135도 기준이지만, 서울은 동경 127도에 위치해 약 32분 차이가 납니다.' },
                    { key: 'item3', title: '양력/음력 변환 방식', desc: '음력을 양력으로 변환하는 계산 방식이 사이트마다 다를 수 있습니다.' },
                    { key: 'item4', title: '시간 경계 처리', desc: '자시는 밤 11시부터 새벽 1시까지인데, 해석이 다릅니다.' },
                    { key: 'item5', title: '출생 시간 불명확', desc: '정확한 출생 시간을 모르는 경우 기본값 처리 방식이 다릅니다.' }
                  ].map((item) => (
                    <div key={item.key} className="border-b border-blue-200 last:border-0">
                      <button onClick={() => toggleItem(item.key)} className="w-full text-left py-2 flex items-center justify-between text-xs font-semibold text-blue-900 hover:text-blue-700">
                        <span>• {item.title}</span>
                        <span className="text-blue-600">{openItems[item.key] ? '▲' : '▼'}</span>
                      </button>
                      {openItems[item.key] && <p className="text-xs text-blue-700 ml-3 pb-2">{item.desc}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => setShowModal(false)} className="mt-4 w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 flex-shrink-0 font-bold">확인</button>
          </div>
        </div>
      )}

      {/* 로그인 필요 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowLoginModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border-4 border-gray-900 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">로그인이 필요합니다</h3>
            <p className="text-sm text-gray-600 mb-6">결제를 진행하려면 먼저 로그인해주세요.</p>
            <div className="space-y-3">
              <button onClick={() => navigate('/login')} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-all">로그인하러 가기</button>
              <button onClick={() => setShowLoginModal(false)} className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">닫기</button>
            </div>
          </div>
        </div>
      )}

      <KakaoPreviewModal isOpen={showKakaoPreview} onClose={() => setShowKakaoPreview(false)} />
    </div>
  );
}