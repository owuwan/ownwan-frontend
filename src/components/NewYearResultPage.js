import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Star, Heart, Briefcase, DollarSign, Activity, MapPin, Hash, Palette, Calendar } from 'lucide-react';

export default function NewYearResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // state
  const [resultData, setResultData] = useState(null);
  const [parsedFortune, setParsedFortune] = useState(null);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [isSajuExpanded, setIsSajuExpanded] = useState(false);
  const [elementCount, setElementCount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openItems, setOpenItems] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 로그인 체크
  const checkLogin = () => {
    const token = localStorage.getItem('access_token');
    return !!token;
  };

  // 결제 핸들러
  const handleSubscriptionClick = () => {
    if (!checkLogin()) { setShowLoginModal(true); return; }
    navigate('/payment');
  };
  const handleMonthlyClick = () => {
    if (!checkLogin()) { setShowLoginModal(true); return; }
    navigate('/monthly-payment');
  };
  const handleLifetimeClick = () => {
    if (!checkLogin()) { setShowLoginModal(true); return; }
    navigate('/lifetime');
  };

  // 모달 아코디언 토글
  const toggleItem = (itemKey) => {
    setOpenItems(prev => ({ ...prev, [itemKey]: !prev[itemKey] }));
  };

  // 데이터 로드
  useEffect(() => {
    const data = location.state?.resultData;
    if (!data) {
      alert('신년운세 데이터가 없습니다.');
      navigate('/');
      return;
    }
    setResultData(data);
    
    if (data.gpt_fortune?.success) {
      const parsed = parseNewYearFortune(data.gpt_fortune.fortune);
      setParsedFortune(parsed);
    }
    
    if (data.element_count) {
      setElementCount(data.element_count);
    }
  }, [location, navigate]);

  // 구독 프로모션 타이머
  useEffect(() => {
    const timer = setTimeout(() => setShowSubscribe(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // 신년운세 파싱 함수
  const parseNewYearFortune = (fortuneText) => {
    if (!fortuneText) return null;
    const sections = {
      totalFortune: "", monthlyFortune: "", love: "", money: "",
      career: "", health: "", luckyDirection: "", luckyNumbers: "",
      luckyColors: "", bestMonths: "", cautionMonths: "", yearlyAdvice: ""
    };
    const lines = fortuneText.split('\n');
    let currentSection = '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.match(/^1\.|2025년 총운:/i)) {
        currentSection = 'totalFortune';
        sections.totalFortune += trimmed.replace(/^1\.|2025년 총운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^2\.|월별 운세/i)) {
        currentSection = 'monthlyFortune';
        sections.monthlyFortune += trimmed.replace(/^2\.|월별 운세.*:/i, '').trim() + '\n';
      } else if (trimmed.match(/^3\.|애정운:/i)) {
        currentSection = 'love';
        sections.love += trimmed.replace(/^3\.|애정운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^4\.|재물운:/i)) {
        currentSection = 'money';
        sections.money += trimmed.replace(/^4\.|재물운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^5\.|직장.*사업운:/i)) {
        currentSection = 'career';
        sections.career += trimmed.replace(/^5\.|직장.*사업운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^6\.|건강운:/i)) {
        currentSection = 'health';
        sections.health += trimmed.replace(/^6\.|건강운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^7\.|행운의 방향:/i)) {
        currentSection = 'luckyDirection';
        sections.luckyDirection += trimmed.replace(/^7\.|행운의 방향:/i, '').trim() + ' ';
      } else if (trimmed.match(/^8\.|행운의 숫자:/i)) {
        currentSection = 'luckyNumbers';
        sections.luckyNumbers += trimmed.replace(/^8\.|행운의 숫자:/i, '').trim() + ' ';
      } else if (trimmed.match(/^9\.|행운의 컬러:/i)) {
        currentSection = 'luckyColors';
        sections.luckyColors += trimmed.replace(/^9\.|행운의 컬러:/i, '').trim() + ' ';
      } else if (trimmed.match(/^10\.|대길월:/i)) {
        currentSection = 'bestMonths';
        sections.bestMonths += trimmed.replace(/^10\.|.*대길월.*:/i, '').trim() + ' ';
      } else if (trimmed.match(/^11\.|주의월:/i)) {
        currentSection = 'cautionMonths';
        sections.cautionMonths += trimmed.replace(/^11\.|.*주의월.*:/i, '').trim() + ' ';
      } else if (trimmed.match(/^12\.|종합 조언:/i)) {
        currentSection = 'yearlyAdvice';
        sections.yearlyAdvice += trimmed.replace(/^12\.|.*종합 조언.*:/i, '').trim() + ' ';
      } else if (currentSection === 'monthlyFortune' && trimmed.match(/^\d{1,2}월:/)) {
        sections.monthlyFortune += trimmed + '\n';
      } else if (currentSection) {
        sections[currentSection] += trimmed + ' ';
      }
    }
    return sections;
  };

  // 오행 매핑
  const getElementColor = (char) => {
    const elements = {
      '갑': '목', '을': '목', '병': '화', '정': '화', '무': '토', '기': '토',
      '경': '금', '신': '금', '임': '수', '계': '수', '인': '목', '묘': '목',
      '사': '화', '오': '화', '진': '토', '술': '토', '축': '토', '미': '토',
      '유': '금', '자': '수', '해': '수'
    };
    return elements[char] || '토';
  };

  const elementColors = {
    '목': 'text-green-400', '화': 'text-red-400', '토': 'text-yellow-400',
    '금': 'text-gray-700', '수': 'text-blue-400'
  };

  // 로딩
  if (!resultData || !parsedFortune) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf0 50%, #f0f2f8 100%)'
      }}>
        <div className="text-gray-600 text-lg">로딩 중...</div>
      </div>
    );
  }

  const saju = resultData.saju || {};

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

      {/* 빛 효과 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20"></div>

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
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100 to-transparent rounded-tr-full opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="relative" style={{animation: 'wiggle 2s ease-in-out infinite'}}>
                <div className="absolute -inset-2 bg-amber-200 rounded-2xl" style={{animation: 'pulseRing 2s ease-in-out infinite'}}></div>
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl px-6 py-3 shadow-lg" style={{border: '3px solid #111827'}}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🐍</span>
                    <div className="text-gray-900 text-2xl tracking-tight" style={{fontWeight: 900}}>2025 신년운세</div>
                    <span className="text-lg" style={{animation: 'sparkle 1.5s ease-in-out infinite'}}>✨</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0" style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid #111827' }}></div>
              </div>
            </div>
            
            <p className="text-gray-500 text-xs mb-4 tracking-wider">을사년 신년운세 완료!</p>
            
            <div className="bg-gray-50 rounded-2xl p-4 mb-3 border border-gray-200">
              <p className="text-gray-800 text-lg font-bold">{resultData.name}님의 2025년 운세</p>
              <p className="text-gray-500 text-sm">{resultData.birth_date} | {resultData.gender}</p>
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

              {/* 오행 범례 */}
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

              {/* 오행 분석 */}
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
        {/* 2025년 총운 */}
        <div className="bg-white rounded-3xl p-6 mb-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-gray-900" />
            2025년 총운
          </h2>
          <p className="text-gray-700 leading-relaxed">{parsedFortune.totalFortune}</p>
        </div>

        {/* 월별 운세 */}
        <div className="bg-white rounded-3xl p-6 mb-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-gray-900" />
            월별 운세
          </h2>
          <div className="space-y-2">
            {parsedFortune.monthlyFortune.split('\n').map((line, idx) => (
              line.trim() && <div key={idx} className="text-gray-700 text-sm py-2 border-b border-gray-100 last:border-0">{line}</div>
            ))}
          </div>
        </div>

        {/* 세부 운세 그리드 */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              애정운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{parsedFortune.love}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              재물운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{parsedFortune.money}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-500" />
              직장/사업운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{parsedFortune.career}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-500" />
              건강운
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{parsedFortune.health}</p>
          </div>
        </div>

        {/* 행운 정보 */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-900" />
              행운의 방향
            </h3>
            <p className="text-gray-700 text-center text-lg font-semibold">{parsedFortune.luckyDirection}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.7s' }}>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Hash className="w-5 h-5 text-gray-900" />
              행운의 숫자
            </h3>
            <p className="text-gray-700 text-center text-lg font-semibold">{parsedFortune.luckyNumbers}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '0.8s' }}>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Palette className="w-5 h-5 text-gray-900" />
              행운의 컬러
            </h3>
            <p className="text-gray-700 text-center text-lg font-semibold">{parsedFortune.luckyColors}</p>
          </div>
        </div>

        {/* 대길월 & 주의월 */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-green-500 shadow-2xl animate-slideUp" style={{ animationDelay: '0.9s' }}>
            <h3 className="text-xl font-bold text-green-600 mb-3 flex items-center gap-2">
              <span>✨</span> 대길월
            </h3>
            <p className="text-gray-700 leading-relaxed">{parsedFortune.bestMonths}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-red-400 shadow-2xl animate-slideUp" style={{ animationDelay: '1s' }}>
            <h3 className="text-xl font-bold text-red-500 mb-3 flex items-center gap-2">
              <span>⚠️</span> 주의월
            </h3>
            <p className="text-gray-700 leading-relaxed">{parsedFortune.cautionMonths}</p>
          </div>
        </div>

        {/* 종합 조언 */}
        <div className="bg-white rounded-3xl p-6 mb-6 border-2 border-gray-900 shadow-2xl animate-slideUp" style={{ animationDelay: '1.1s' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📝</span> 2025년 종합 조언
          </h2>
          <p className="text-gray-700 leading-relaxed">{parsedFortune.yearlyAdvice}</p>
        </div>

        {/* 알림톡 미리보기 섹션 */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 mb-6 animate-slideUp" style={{ animationDelay: '1.15s' }}>
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
              onClick={() => alert('알림톡 미리보기 - 추후 연동 예정')}
              className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 font-bold py-3 px-6 rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all shadow-lg cursor-pointer"
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
                일일/월간/평생 사주로<br/>더 자세한 운세를 확인하세요!
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

                {/* 평생사주 */}
                <button onClick={handleLifetimeClick} className="w-full bg-white border-3 border-gray-900 rounded-3xl p-5 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-violet-50 to-purple-50 opacity-60"></div>
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full font-bold z-20">✨ 프리미엄</div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-br from-gray-600 via-gray-700 to-violet-600 p-2.5 rounded-2xl shadow-lg"><span className="text-xl">♾️</span></div>
                      <div className="text-left flex-1">
                        <div className="text-base sm:text-lg font-bold text-gray-900">평생 종합사주</div>
                        <div className="text-xs sm:text-sm text-gray-600">만세력 기반 실제 사주</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 px-3 rounded-2xl mb-2 flex items-center justify-between">
                      <div><div className="text-xs text-gray-300">평생 소장</div><div className="text-xl font-bold">29,900원</div></div>
                      <div className="text-xs text-purple-300 bg-purple-900/30 px-2.5 py-1 rounded-lg">최고 가치</div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-violet-700 text-white py-3 px-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg border-2 border-gray-900">♾️ 지금 구매하기</div>
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
              <p>본 서비스는 <strong>전통 만세력 기준</strong>으로<br />사주를 계산합니다.</p>
              <p>24절기의 절입시간을 적용하여,<br />한국에서 가장 보편적으로 사용되는<br />방식입니다.</p>
              
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <p className="font-medium text-blue-900 mb-3">왜 철학관, 사이트마다 다를까요?</p>
                <div className="space-y-2">
                  
                  <div className="border-b border-blue-200 last:border-0">
                    <button onClick={() => toggleItem('item1')} className="w-full text-left py-2 flex items-center justify-between text-xs font-semibold text-blue-900 hover:text-blue-700">
                      <span>• 절입시간 적용 여부</span>
                      <span className="text-blue-600">{openItems.item1 ? '▲' : '▼'}</span>
                    </button>
                    {openItems.item1 && (
                      <p className="text-xs text-blue-700 ml-3 pb-2">사주의 "월"은 양력 1일이 아니라 24절기를 기준으로 바뀝니다. 예를 들어 3월 5일 경칩 이전 출생자는 "2월생"으로 계산됩니다.</p>
                    )}
                  </div>

                  <div className="border-b border-blue-200 last:border-0">
                    <button onClick={() => toggleItem('item2')} className="w-full text-left py-2 flex items-center justify-between text-xs font-semibold text-blue-900 hover:text-blue-700">
                      <span>• 진태양시 보정 여부</span>
                      <span className="text-blue-600">{openItems.item2 ? '▲' : '▼'}</span>
                    </button>
                    {openItems.item2 && (
                      <p className="text-xs text-blue-700 ml-3 pb-2">한국 표준시는 동경 135도 기준이지만, 서울은 동경 127도에 위치해 실제 태양 위치와 약 32분 차이가 납니다.</p>
                    )}
                  </div>

                  <div className="border-b border-blue-200 last:border-0">
                    <button onClick={() => toggleItem('item3')} className="w-full text-left py-2 flex items-center justify-between text-xs font-semibold text-blue-900 hover:text-blue-700">
                      <span>• 양력/음력 변환 방식</span>
                      <span className="text-blue-600">{openItems.item3 ? '▲' : '▼'}</span>
                    </button>
                    {openItems.item3 && (
                      <p className="text-xs text-blue-700 ml-3 pb-2">음력을 양력으로 변환하는 계산 방식이 사이트마다 다를 수 있습니다. 특히 윤달이나 작은달/큰달 처리 방식에 따라 차이가 날 수 있습니다.</p>
                    )}
                  </div>

                  <div className="border-b border-blue-200 last:border-0">
                    <button onClick={() => toggleItem('item4')} className="w-full text-left py-2 flex items-center justify-between text-xs font-semibold text-blue-900 hover:text-blue-700">
                      <span>• 시간 경계 처리</span>
                      <span className="text-blue-600">{openItems.item4 ? '▲' : '▼'}</span>
                    </button>
                    {openItems.item4 && (
                      <p className="text-xs text-blue-700 ml-3 pb-2">자시는 밤 11시부터 새벽 1시까지인데, 밤 11시~12시를 "전날"로 볼지 "당일"로 볼지에 대한 해석이 다릅니다.</p>
                    )}
                  </div>

                  <div className="border-b border-blue-200 last:border-0">
                    <button onClick={() => toggleItem('item5')} className="w-full text-left py-2 flex items-center justify-between text-xs font-semibold text-blue-900 hover:text-blue-700">
                      <span>• 출생 시간 불명확</span>
                      <span className="text-blue-600">{openItems.item5 ? '▲' : '▼'}</span>
                    </button>
                    {openItems.item5 && (
                      <p className="text-xs text-blue-700 ml-3 pb-2">정확한 출생 시간을 모르는 경우, 전통적으로는 낮 12시를 기본값으로 사용하지만, 일부 사이트는 오후 2시를 사용합니다.</p>
                    )}
                  </div>

                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <p className="font-medium text-purple-900 mb-2">🎯 가장 중요한 것은</p>
                <p className="text-xs text-purple-800">정확한 사주 계산보다 더 중요한 것은 <strong>오늘 당신 사주에 맞는 조언과 실천 가능한 방향</strong>입니다.</p>
              </div>
              
              <p className="text-gray-500 text-xs pt-2">같은 사주를 가진 사람도<br />삶의 방향은 다르게 펼쳐집니다.</p>
            </div>
            
            <button onClick={() => setShowModal(false)} className="mt-4 w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 flex-shrink-0 font-bold">
              확인
            </button>
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
              <button onClick={() => navigate('/login')} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-all">
                로그인하러 가기
              </button>
              <button onClick={() => setShowLoginModal(false)} className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}