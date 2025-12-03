import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import KakaoPreviewModal from './KakaoPreviewModal';

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
  const [showKakaoPreview, setShowKakaoPreview] = useState(false);
  const [selectedFortune, setSelectedFortune] = useState(null);

  // 페이지 로드 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      career: "", health: "", relationship: "", luckyDirection: "", luckyNumbers: "",
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
      } else if (trimmed.match(/^7\.|대인관계운:/i)) {
        currentSection = 'relationship';
        sections.relationship += trimmed.replace(/^7\.|대인관계운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^8\.|행운의 방향:/i)) {
        currentSection = 'luckyDirection';
        sections.luckyDirection += trimmed.replace(/^8\.|행운의 방향:/i, '').trim() + ' ';
      } else if (trimmed.match(/^9\.|행운의 숫자:/i)) {
        currentSection = 'luckyNumbers';
        sections.luckyNumbers += trimmed.replace(/^9\.|행운의 숫자:/i, '').trim() + ' ';
      } else if (trimmed.match(/^10\.|행운의 컬러:/i)) {
        currentSection = 'luckyColors';
        sections.luckyColors += trimmed.replace(/^10\.|행운의 컬러:/i, '').trim() + ' ';
      } else if (trimmed.match(/^11\.|대길월:/i)) {
        currentSection = 'bestMonths';
        sections.bestMonths += trimmed.replace(/^11\.|.*대길월.*:/i, '').trim() + ' ';
      } else if (trimmed.match(/^12\.|주의월:/i)) {
        currentSection = 'cautionMonths';
        sections.cautionMonths += trimmed.replace(/^12\.|.*주의월.*:/i, '').trim() + ' ';
      } else if (trimmed.match(/^13\.|종합 조언:/i)) {
        currentSection = 'yearlyAdvice';
        sections.yearlyAdvice += trimmed.replace(/^13\.|.*종합 조언.*:/i, '').trim() + ' ';
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
    '목': 'text-green-500', '화': 'text-red-500', '토': 'text-yellow-600',
    '금': 'text-gray-700', '수': 'text-blue-500'
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

  // 세부 운세 - 2열 그리드 + 클릭 모달용
  const fortuneDetails = [
    { id: 'love', icon: '💕', title: '애정운', color: 'from-pink-500 to-rose-600', content: parsedFortune.love },
    { id: 'money', icon: '💰', title: '재물운', color: 'from-green-500 to-emerald-600', content: parsedFortune.money },
    { id: 'career', icon: '💼', title: '직장/사업운', color: 'from-blue-500 to-indigo-600', content: parsedFortune.career },
    { id: 'health', icon: '❤️‍🩹', title: '건강운', color: 'from-red-500 to-orange-600', content: parsedFortune.health },
    { id: 'relationship', icon: '👥', title: '대인관계운', color: 'from-purple-500 to-violet-600', content: parsedFortune.relationship },
  ];

  // 행운 정보
  const luckyInfo = [
    { icon: '🧭', title: '행운의 방향', value: parsedFortune.luckyDirection },
    { icon: '🔢', title: '행운의 숫자', value: parsedFortune.luckyNumbers },
    { icon: '🎨', title: '행운의 컬러', value: parsedFortune.luckyColors },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ 
      fontFamily: "'Nanum Gothic', 'Malgun Gothic', sans-serif",
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf0 50%, #f0f2f8 100%)'
    }}>
      {/* 육각형 패턴 - opacity 0.01 (거의 안보이게!) */}
      <div className="absolute inset-0 opacity-[0.01]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='173.2' viewBox='0 0 200 173.2' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000000' stroke-width='1'%3E%3Cpath d='M 50 0 L 100 0 L 125 43.3 L 100 86.6 L 50 86.6 L 25 43.3 Z' opacity='0.3'/%3E%3Cpath d='M 150 0 L 200 0 L 225 43.3 L 200 86.6 L 150 86.6 L 125 43.3 Z' opacity='0.2'/%3E%3Cpath d='M 0 86.6 L 50 86.6 L 75 130 L 50 173.2 L 0 173.2 L -25 130 Z' opacity='0.25'/%3E%3Cpath d='M 100 86.6 L 150 86.6 L 175 130 L 150 173.2 L 100 173.2 L 75 130 Z' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '200px 173.2px'
      }}></div>

      {/* 부드러운 빛 효과 - 신년 테마 (레드/오렌지/골드) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-red-200 rounded-full filter blur-3xl opacity-15"></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');
        * { font-family: 'Nanum Gothic', 'Malgun Gothic', sans-serif !important; }
        @keyframes wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        @keyframes goldGlow { 0%, 100% { box-shadow: 0 0 5px #f59e0b, 0 0 10px #f59e0b, 0 0 15px #ea580c; } 50% { box-shadow: 0 0 10px #f59e0b, 0 0 20px #f59e0b, 0 0 30px #ea580c; } }
        @keyframes shine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes sparkle { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; animation-fill-mode: both; }
        .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
        .card-game { background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%); border: 2px solid #1a1a2e; box-shadow: 0 4px 0 #1a1a2e, 0 8px 20px rgba(0,0,0,0.15); }
        .card-game:active { transform: translateY(2px); box-shadow: 0 2px 0 #1a1a2e, 0 4px 10px rgba(0,0,0,0.1); }
        .badge-game { background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); box-shadow: 0 2px 0 #c2410c; }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-lg">
        
        {/* 헤더 카드 */}
        <div className="card-game rounded-3xl overflow-hidden mb-6 animate-fadeIn">
          {/* 검정 헤더 */}
          <div className="bg-gray-900 px-4 py-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: 'shine 3s infinite' }}></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🐍</span>
                <span className="text-white font-black">2025 신년운세</span>
              </div>
              <div className="badge-game text-white text-xs font-black px-3 py-1 rounded-lg">
                🎊 을사년
              </div>
            </div>
          </div>

          {/* 헤더 내용 */}
          <div className="p-5 text-center">
            {/* 오운완 로고 */}
            <div className="flex justify-center mb-4">
              <div className="relative" style={{ animation: 'wiggle 2s ease-in-out infinite' }}>
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-300 to-red-400 rounded-2xl" style={{ animation: 'goldGlow 2s ease-in-out infinite' }}></div>
                <div className="relative bg-white rounded-2xl px-4 py-2 border-2 border-gray-900">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🐍</span>
                    <span className="text-gray-900 font-black">오운완</span>
                    <span style={{ animation: 'sparkle 1.5s infinite' }}>✨</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-xs mb-3 tracking-wider">을사년 신년운세 완료!</p>
            
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 mb-3 border border-amber-200">
              <p className="text-gray-900 text-lg font-black">{resultData.name}님의 2025년 운세</p>
              <p className="text-gray-500 text-sm">{resultData.birth_date} | {resultData.gender}</p>
            </div>
            
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full border-2 border-green-400">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-700 text-xs font-bold">🤖 실제 만세력을 통한 운세입니다</span>
            </div>
          </div>
        </div>

        {/* 사주팔자 - 펼쳐보기 */}
        <div className="card-game rounded-3xl overflow-hidden mb-6 animate-slideUp">
          <button 
            onClick={() => setIsSajuExpanded(!isSajuExpanded)} 
            className="w-full bg-gray-900 px-4 py-4 flex items-center justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: 'shine 3s infinite' }}></div>
            <div className="relative flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <span className="text-white font-black text-lg">사주팔자</span>
            </div>
            <div className="relative flex items-center gap-2">
              <span className="text-gray-300 text-sm">펼쳐보기</span>
              <span className={`text-white transition-transform duration-300 ${isSajuExpanded ? 'rotate-180' : ''}`}>▼</span>
            </div>
          </button>
          
          <div className={`transition-all duration-500 ease-in-out ${isSajuExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`} style={{ overflow: 'hidden' }}>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: '년주 (年柱)', value: saju.year, desc: '뿌리와 조상' },
                  { label: '월주 (月柱)', value: saju.month, desc: '청년과 부모' },
                  { label: '일주 (日柱)', value: saju.day, desc: '나 자신' },
                  { label: '시주 (時柱)', value: saju.hour, desc: '노년과 자손' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border-2 border-amber-200">
                    <div className="text-amber-600 text-xs mb-2 text-center font-bold">{item.label}</div>
                    <div className="text-3xl font-black text-center">
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
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {[
                  { color: 'bg-green-500', name: '목(木)' },
                  { color: 'bg-red-500', name: '화(火)' },
                  { color: 'bg-yellow-500', name: '토(土)' },
                  { color: 'bg-gray-700', name: '금(金)' },
                  { color: 'bg-blue-500', name: '수(水)' }
                ].map((el, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <div className={`w-3 h-3 ${el.color} rounded-full`}></div>
                    <span className="text-gray-600 text-xs font-bold">{el.name}</span>
                  </div>
                ))}
              </div>

              {/* 오행 분석 */}
              {elementCount && (
                <div className="bg-gray-50 rounded-xl p-4 mt-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base">🎨</span>
                    <h4 className="text-sm font-black text-gray-900">오행 분석</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: '목(木) 나무', color: 'bg-green-500', key: '목' },
                      { name: '화(火) 불', color: 'bg-red-500', key: '화' },
                      { name: '토(土) 흙', color: 'bg-yellow-500', key: '토' },
                      { name: '금(金) 쇠', color: 'bg-gray-700', key: '금' },
                      { name: '수(水) 물', color: 'bg-blue-500', key: '수' }
                    ].map((el, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${el.color}`}></span>
                            <span className="text-sm font-bold text-gray-900">{el.name}</span>
                          </div>
                          <span className="text-sm font-black text-gray-900">{elementCount[el.key] || 0}개</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`${el.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${((elementCount[el.key] || 0) / 8) * 100}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* 사주가 왜 다른가요? */}
                  <div className="mt-4">
                    <button 
                      onClick={() => setShowModal(true)} 
                      className="w-full text-left text-sm text-gray-600 hover:text-gray-900 transition-all flex items-center gap-2 bg-gray-100 p-3 rounded-lg hover:bg-gray-200 border border-gray-200"
                    >
                      <span>💬</span>
                      <span>철학관, 사이트마다 사주가 다른 이유는?</span>
                      <span className="ml-auto text-gray-400">→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2025년 총운 */}
        <div className="card-game rounded-3xl overflow-hidden mb-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <div className="bg-gray-900 px-4 py-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: 'shine 3s infinite' }}></div>
            <div className="relative flex items-center gap-2">
              <span className="text-xl">🐍</span>
              <span className="text-white font-black">2025년 총운</span>
            </div>
          </div>
          <div className="p-5">
            <p className="text-gray-700 text-sm leading-relaxed">{parsedFortune.totalFortune}</p>
          </div>
        </div>

        {/* 월별 운세 */}
        <div className="card-game rounded-3xl overflow-hidden mb-6 animate-slideUp" style={{ animationDelay: '0.15s' }}>
          <div className="bg-gray-900 px-4 py-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: 'shine 3s infinite' }}></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <span className="text-white font-black">월별 운세</span>
              </div>
              <div className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-lg">12개월</div>
            </div>
          </div>
          <div className="p-5 space-y-2">
            {parsedFortune.monthlyFortune.split('\n').map((line, idx) => (
              line.trim() && (
                <div key={idx} className="text-gray-700 text-sm py-2 px-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-l-4 border-amber-400">
                  {line}
                </div>
              )
            ))}
          </div>
        </div>

        {/* 세부 운세 - 2열 그리드 + 클릭 모달 */}
        <div className="card-game rounded-3xl overflow-hidden mb-6 animate-slideUp" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gray-900 px-4 py-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: 'shine 3s infinite' }}></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔮</span>
                <span className="text-white font-black">세부 운세</span>
              </div>
              <div className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-lg">5가지</div>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-3">
              {fortuneDetails.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFortune(item)}
                  className="bg-white rounded-2xl p-4 border-2 border-gray-200 hover:border-amber-400 hover:shadow-lg transition-all text-left group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`} style={{ animation: 'float 3s ease-in-out infinite', animationDelay: `${idx * 0.2}s` }}>
                    {item.icon}
                  </div>
                  <div className="text-gray-900 font-black text-sm mb-2">{item.title}</div>
                  <div className="text-gray-600 text-xs leading-relaxed">
                    {item.content ? item.content.slice(0, 25) + '...' : '내용을 불러오는 중...'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 행운 정보 */}
        <div className="card-game rounded-3xl overflow-hidden mb-6 animate-slideUp" style={{ animationDelay: '0.25s' }}>
          <div className="bg-gray-900 px-4 py-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: 'shine 3s infinite' }}></div>
            <div className="relative flex items-center gap-2">
              <span className="text-xl">🍀</span>
              <span className="text-white font-black">행운 정보</span>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-3 gap-3">
              {luckyInfo.map((info, idx) => (
                <div key={idx} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 text-center border border-amber-200">
                  <div className="text-2xl mb-2">{info.icon}</div>
                  <div className="text-gray-600 text-xs font-bold mb-1">{info.title}</div>
                  <div className="text-gray-900 font-black text-xs">{info.value || '-'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 대길월 & 주의월 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="card-game rounded-2xl overflow-hidden animate-slideUp" style={{ animationDelay: '0.3s', borderColor: '#22c55e' }}>
            <div className="bg-green-600 px-3 py-2 text-center">
              <span className="text-white font-black text-sm">✨ 대길월</span>
            </div>
            <div className="p-4">
              <p className="text-gray-700 text-xs leading-relaxed">{parsedFortune.bestMonths || '정보 없음'}</p>
            </div>
          </div>
          <div className="card-game rounded-2xl overflow-hidden animate-slideUp" style={{ animationDelay: '0.35s', borderColor: '#ef4444' }}>
            <div className="bg-red-500 px-3 py-2 text-center">
              <span className="text-white font-black text-sm">⚠️ 주의월</span>
            </div>
            <div className="p-4">
              <p className="text-gray-700 text-xs leading-relaxed">{parsedFortune.cautionMonths || '정보 없음'}</p>
            </div>
          </div>
        </div>

        {/* 종합 조언 */}
        <div className="card-game rounded-3xl overflow-hidden mb-6 animate-slideUp" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gray-900 px-4 py-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: 'shine 3s infinite' }}></div>
            <div className="relative flex items-center gap-2">
              <span className="text-xl">📝</span>
              <span className="text-white font-black">2025년 종합 조언</span>
            </div>
          </div>
          <div className="p-5">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border-l-4 border-amber-400">
              <p className="text-gray-700 text-sm leading-relaxed">{parsedFortune.yearlyAdvice}</p>
            </div>
          </div>
        </div>

        {/* 알림톡 미리보기 */}
        <div className="card-game rounded-3xl overflow-hidden mb-6 bg-gradient-to-r from-amber-50 to-orange-50 animate-slideUp" style={{ animationDelay: '0.45s' }}>
          <div className="p-6 text-center">
            <p className="text-3xl mb-3" style={{ animation: 'float 2s ease-in-out infinite' }}>💌</p>
            <h3 className="text-lg font-black text-gray-900 mb-2">매일 아침, 카톡으로 받아보세요!</h3>
            <p className="text-sm text-gray-600 mb-4">일일사주 구독하면 매일 아침 8시<br/>오늘의 운세가 카카오톡으로 도착해요</p>
            <button
              onClick={() => setShowKakaoPreview(true)}
              className="badge-game text-white font-black py-3 px-6 rounded-xl hover:opacity-90 transition-all"
            >
              📱 알림톡 미리보기
            </button>
          </div>
        </div>

        {/* 다른 운세 상품 프로모션 */}
        {showSubscribe && (
          <div className="card-game rounded-3xl overflow-hidden mb-6 animate-scaleIn">
            <div className="bg-gray-900 px-4 py-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: 'shine 3s infinite' }}></div>
              <div className="relative flex items-center gap-2">
                <span className="text-xl">🎁</span>
                <span className="text-white font-black">다른 운세도 확인해보세요!</span>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {/* 일일사주 */}
              <button onClick={handleSubscriptionClick} className="w-full bg-white border-2 border-gray-900 rounded-2xl p-4 text-left relative overflow-hidden hover:shadow-lg transition-all" style={{ boxShadow: '0 3px 0 #1a1a2e' }}>
                <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-full">⭐ 인기</div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center text-2xl border-2 border-gray-900">💌</div>
                  <div>
                    <div className="text-gray-900 font-black">일일사주 자동발송</div>
                    <div className="text-gray-500 text-xs">매일 아침 8시 카톡 발송</div>
                  </div>
                </div>
                <div className="mt-3 bg-gray-900 text-white rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-400">월 구독료</div>
                    <div className="text-lg font-black">9,900원</div>
                  </div>
                  <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 text-xs font-black px-3 py-1.5 rounded-lg">💳 구독하기</div>
                </div>
              </button>

              {/* 월간사주 */}
              <button onClick={handleMonthlyClick} className="w-full bg-white border-2 border-gray-900 rounded-2xl p-4 text-left relative overflow-hidden hover:shadow-lg transition-all" style={{ boxShadow: '0 3px 0 #1a1a2e' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center text-2xl border-2 border-gray-900">🗓️</div>
                  <div>
                    <div className="text-gray-900 font-black">월간 종합사주</div>
                    <div className="text-gray-500 text-xs">한 달 14가지 운세 종합</div>
                  </div>
                </div>
                <div className="mt-3 bg-gray-900 text-white rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-400">1회 구매</div>
                    <div className="text-lg font-black">11,000원</div>
                  </div>
                  <div className="bg-gradient-to-r from-sky-400 to-blue-500 text-white text-xs font-black px-3 py-1.5 rounded-lg">📅 구매하기</div>
                </div>
              </button>

              {/* 평생사주 */}
              <button onClick={handleLifetimeClick} className="w-full bg-white border-2 border-gray-900 rounded-2xl p-4 text-left relative overflow-hidden hover:shadow-lg transition-all" style={{ boxShadow: '0 3px 0 #1a1a2e' }}>
                <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">✨ 프리미엄</div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-2xl border-2 border-gray-900">♾️</div>
                  <div>
                    <div className="text-gray-900 font-black">평생 종합사주</div>
                    <div className="text-gray-500 text-xs">만세력 기반 실제 사주</div>
                  </div>
                </div>
                <div className="mt-3 bg-gray-900 text-white rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-400">평생 소장</div>
                    <div className="text-lg font-black">29,900원</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-violet-500 text-white text-xs font-black px-3 py-1.5 rounded-lg">♾️ 구매하기</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="flex justify-center">
          <button onClick={() => navigate('/')} className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-full font-black transition-all border-2 border-gray-900 shadow-lg" style={{ boxShadow: '0 3px 0 #1a1a2e' }}>
            🏠 처음으로
          </button>
        </div>
      </div>

      {/* 상세 모달 (세부 운세용) - 화면 중앙 */}
      {selectedFortune && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setSelectedFortune(null)}>
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[80vh] flex flex-col border-4 border-gray-900" onClick={(e) => e.stopPropagation()} style={{ animation: 'fadeIn 0.3s ease-out' }}>
            {/* 모달 헤더 */}
            <div className="bg-gray-900 px-4 py-4 rounded-t-[20px] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedFortune.icon}</span>
                <span className="text-white font-black text-lg">{selectedFortune.title}</span>
              </div>
              <button onClick={() => setSelectedFortune(null)} className="text-white text-xl hover:text-gray-300 transition-colors">✕</button>
            </div>
            
            {/* 모달 내용 */}
            <div className="flex-1 overflow-y-auto p-5">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border-l-4 border-amber-500">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{selectedFortune.content}</p>
              </div>
            </div>
            
            {/* 모달 푸터 */}
            <div className="p-4 border-t border-gray-200">
              <button onClick={() => setSelectedFortune(null)} className="badge-game w-full py-3 rounded-2xl font-black text-white">
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 사주 계산 안내 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[85vh] flex flex-col border-4 border-gray-900" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-black text-lg mb-4 flex items-center gap-2">
              <span>💡</span>
              <span>사주 계산 방식 안내</span>
            </h3>
            
            <div className="space-y-4 text-sm text-gray-700 overflow-y-auto flex-1 pr-2">
              <p>본 서비스는 <strong>전통 만세력 기준</strong>으로<br />사주를 계산합니다.</p>
              <p>24절기의 절입시간을 적용하여,<br />한국에서 가장 보편적으로 사용되는<br />방식입니다.</p>
              
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <p className="font-black text-blue-900 mb-3">왜 철학관, 사이트마다 다를까요?</p>
                <div className="space-y-2">
                  
                  <div className="border-b border-blue-200 last:border-0">
                    <button onClick={() => toggleItem('item1')} className="w-full text-left py-2 flex items-center justify-between text-xs font-bold text-blue-900 hover:text-blue-700">
                      <span>• 절입시간 적용 여부</span>
                      <span className="text-blue-600">{openItems.item1 ? '▲' : '▼'}</span>
                    </button>
                    {openItems.item1 && (
                      <p className="text-xs text-blue-700 ml-3 pb-2">사주의 "월"은 양력 1일이 아니라 24절기를 기준으로 바뀝니다. 예를 들어 3월 5일 경칩 이전 출생자는 "2월생"으로 계산됩니다.</p>
                    )}
                  </div>

                  <div className="border-b border-blue-200 last:border-0">
                    <button onClick={() => toggleItem('item2')} className="w-full text-left py-2 flex items-center justify-between text-xs font-bold text-blue-900 hover:text-blue-700">
                      <span>• 진태양시 보정 여부</span>
                      <span className="text-blue-600">{openItems.item2 ? '▲' : '▼'}</span>
                    </button>
                    {openItems.item2 && (
                      <p className="text-xs text-blue-700 ml-3 pb-2">한국 표준시는 동경 135도 기준이지만, 서울은 동경 127도에 위치해 실제 태양 위치와 약 32분 차이가 납니다.</p>
                    )}
                  </div>

                  <div className="border-b border-blue-200 last:border-0">
                    <button onClick={() => toggleItem('item3')} className="w-full text-left py-2 flex items-center justify-between text-xs font-bold text-blue-900 hover:text-blue-700">
                      <span>• 양력/음력 변환 방식</span>
                      <span className="text-blue-600">{openItems.item3 ? '▲' : '▼'}</span>
                    </button>
                    {openItems.item3 && (
                      <p className="text-xs text-blue-700 ml-3 pb-2">음력을 양력으로 변환하는 계산 방식이 사이트마다 다를 수 있습니다. 특히 윤달이나 작은달/큰달 처리 방식에 따라 차이가 날 수 있습니다.</p>
                    )}
                  </div>

                  <div className="border-b border-blue-200 last:border-0">
                    <button onClick={() => toggleItem('item4')} className="w-full text-left py-2 flex items-center justify-between text-xs font-bold text-blue-900 hover:text-blue-700">
                      <span>• 시간 경계 처리</span>
                      <span className="text-blue-600">{openItems.item4 ? '▲' : '▼'}</span>
                    </button>
                    {openItems.item4 && (
                      <p className="text-xs text-blue-700 ml-3 pb-2">자시는 밤 11시부터 새벽 1시까지인데, 밤 11시~12시를 "전날"로 볼지 "당일"로 볼지에 대한 해석이 다릅니다.</p>
                    )}
                  </div>

                  <div className="border-b border-blue-200 last:border-0">
                    <button onClick={() => toggleItem('item5')} className="w-full text-left py-2 flex items-center justify-between text-xs font-bold text-blue-900 hover:text-blue-700">
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
                <p className="font-black text-purple-900 mb-2">🎯 가장 중요한 것은</p>
                <p className="text-xs text-purple-800">정확한 사주 계산보다 더 중요한 것은 <strong>오늘 당신 사주에 맞는 조언과 실천 가능한 방향</strong>입니다.</p>
              </div>
              
              <p className="text-gray-500 text-xs pt-2">같은 사주를 가진 사람도<br />삶의 방향은 다르게 펼쳐집니다.</p>
            </div>
            
            <button onClick={() => setShowModal(false)} className="mt-4 w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 flex-shrink-0 font-black">
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
            <h3 className="font-black text-xl text-gray-900 mb-2">로그인이 필요합니다</h3>
            <p className="text-sm text-gray-600 mb-6">결제를 진행하려면 먼저 로그인해주세요.</p>
            <div className="space-y-3">
              <button onClick={() => navigate('/login')} className="w-full bg-gray-900 text-white py-3 rounded-xl font-black hover:bg-black transition-all">로그인하러 가기</button>
              <button onClick={() => setShowLoginModal(false)} className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-black hover:bg-gray-200 transition-all">닫기</button>
            </div>
          </div>
        </div>
      )}

      {/* 알림톡 미리보기 모달 */}
      <KakaoPreviewModal isOpen={showKakaoPreview} onClose={() => setShowKakaoPreview(false)} />
    </div>
  );
}