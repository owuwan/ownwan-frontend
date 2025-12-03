import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import KakaoPreviewModal from './KakaoPreviewModal';

export default function MonthlyResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [monthlyData, setMonthlyData] = useState(null);
  const [parsedFortune, setParsedFortune] = useState(null);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [isSajuExpanded, setIsSajuExpanded] = useState(false);
  const [elementCount, setElementCount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openItems, setOpenItems] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showKakaoPreview, setShowKakaoPreview] = useState(false);
  const [selectedFortune, setSelectedFortune] = useState(null);

  const checkLogin = () => {
    const token = localStorage.getItem('access_token');
    return !!token;
  };

  const handleSubscriptionClick = () => {
    if (!checkLogin()) { setShowLoginModal(true); return; }
    navigate('/payment');
  };
  const handleLifetimeClick = () => {
    if (!checkLogin()) { setShowLoginModal(true); return; }
    navigate('/lifetime');
  };
  const handleNewYearClick = () => {
    if (!checkLogin()) { setShowLoginModal(true); return; }
    navigate('/newyear');
  };

  const toggleItem = (itemKey) => {
    setOpenItems(prev => ({ ...prev, [itemKey]: !prev[itemKey] }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const data = location.state?.monthlyData;
    if (!data) {
      alert('월간 운세 데이터가 없습니다.');
      navigate('/');
      return;
    }
    setMonthlyData(data);
    
    if (data.gpt_fortune?.success) {
      const parsed = parseMonthlyFortune(data.gpt_fortune.fortune);
      setParsedFortune(parsed);
    }
    
    if (data.element_count) {
      setElementCount(data.element_count);
    }
  }, [location, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSubscribe(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const parseMonthlyFortune = (fortuneText) => {
    if (!fortuneText) return null;
    const sections = {
      totalFortune: "", loveLife: "", business: "", money: "",
      health: "", relationships: "", family: "", study: "",
      travel: "", realEstate: "", luckyDays: "", luckyColor: "",
      cautionPeriod: "", monthlyAdvice: ""
    };
    const lines = fortuneText.split('\n');
    let currentSection = '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.match(/^1\.|이번 달 총운:/i)) {
        currentSection = 'totalFortune';
        sections.totalFortune += trimmed.replace(/^1\.|이번 달 총운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^2\.|애정운:/i)) {
        currentSection = 'loveLife';
        sections.loveLife += trimmed.replace(/^2\.|애정운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^3\.|사업운:/i)) {
        currentSection = 'business';
        sections.business += trimmed.replace(/^3\.|사업운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^4\.|금전운:/i)) {
        currentSection = 'money';
        sections.money += trimmed.replace(/^4\.|금전운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^5\.|건강운:/i)) {
        currentSection = 'health';
        sections.health += trimmed.replace(/^5\.|건강운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^6\.|대인관계운:/i)) {
        currentSection = 'relationships';
        sections.relationships += trimmed.replace(/^6\.|대인관계운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^7\.|가족운:/i)) {
        currentSection = 'family';
        sections.family += trimmed.replace(/^7\.|가족운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^8\.|학업운:/i)) {
        currentSection = 'study';
        sections.study += trimmed.replace(/^8\.|학업운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^9\.|여행운:/i)) {
        currentSection = 'travel';
        sections.travel += trimmed.replace(/^9\.|여행운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^10\.|부동산운:/i)) {
        currentSection = 'realEstate';
        sections.realEstate += trimmed.replace(/^10\.|부동산운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^11\.|행운의 날:/i)) {
        currentSection = 'luckyDays';
        sections.luckyDays += trimmed.replace(/^11\.|행운의 날:/i, '').trim() + ' ';
      } else if (trimmed.match(/^12\.|행운의 색상:/i)) {
        currentSection = 'luckyColor';
        sections.luckyColor += trimmed.replace(/^12\.|행운의 색상:/i, '').trim() + ' ';
      } else if (trimmed.match(/^13\.|주의할 시기:/i)) {
        currentSection = 'cautionPeriod';
        sections.cautionPeriod += trimmed.replace(/^13\.|주의할 시기:/i, '').trim() + ' ';
      } else if (trimmed.match(/^14\.|이번 달 조언:/i)) {
        currentSection = 'monthlyAdvice';
        sections.monthlyAdvice += trimmed.replace(/^14\.|이번 달 조언:/i, '').trim() + ' ';
      } else if (currentSection) {
        sections[currentSection] += trimmed + ' ';
      }
    }
    return sections;
  };

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
    '목': 'text-green-500', '화': 'text-red-500', '토': 'text-yellow-500',
    '금': 'text-gray-600', '수': 'text-blue-500'
  };

  const elementData = [
    { name: '목(木)', key: '목', color: 'bg-green-500', textColor: 'text-green-600' },
    { name: '화(火)', key: '화', color: 'bg-red-500', textColor: 'text-red-600' },
    { name: '토(土)', key: '토', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    { name: '금(金)', key: '금', color: 'bg-gray-600', textColor: 'text-gray-600' },
    { name: '수(水)', key: '수', color: 'bg-blue-500', textColor: 'text-blue-600' }
  ];

  if (!monthlyData || !parsedFortune) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf0 50%, #f0f2f8 100%)'
      }}>
        <div className="text-gray-600 text-lg">로딩 중...</div>
      </div>
    );
  }

  const saju = monthlyData.saju || {};

  const fortuneItems = [
    { icon: '💕', title: '애정운', content: parsedFortune.loveLife },
    { icon: '💼', title: '사업운', content: parsedFortune.business },
    { icon: '💰', title: '금전운', content: parsedFortune.money },
    { icon: '💪', title: '건강운', content: parsedFortune.health },
    { icon: '🤝', title: '대인관계', content: parsedFortune.relationships },
    { icon: '🏠', title: '가족운', content: parsedFortune.family },
    { icon: '📚', title: '학업운', content: parsedFortune.study },
    { icon: '✈️', title: '여행운', content: parsedFortune.travel },
    { icon: '🏢', title: '부동산', content: parsedFortune.realEstate },
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
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-indigo-200 rounded-full filter blur-3xl opacity-15"></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');
        * { font-family: 'Nanum Gothic', 'Malgun Gothic', sans-serif !important; }
        @keyframes wiggle { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
        @keyframes goldGlow {
          0%, 100% { box-shadow: 0 0 10px #38bdf8, 0 0 20px #38bdf880; }
          50% { box-shadow: 0 0 20px #38bdf8, 0 0 40px #38bdf880; }
        }
        @keyframes sparkle { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; animation-fill-mode: both; }
        .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
        .card-game {
          background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
          border: 2px solid #1a1a2e;
          box-shadow: 0 4px 0 #1a1a2e, 0 8px 20px rgba(0,0,0,0.15);
        }
        .card-game:active { transform: translateY(2px); box-shadow: 0 2px 0 #1a1a2e, 0 4px 10px rgba(0,0,0,0.1); }
        .badge-game {
          background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%);
          box-shadow: 0 2px 0 #0369a1;
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-md">
        
        {/* ========== V6 헤더 ========== */}
        <div className="text-center mb-6 card-game rounded-3xl p-5 relative overflow-hidden animate-fadeIn">
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-sky-400 rounded-tl-lg"></div>
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-sky-400 rounded-tr-lg"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-sky-400 rounded-bl-lg"></div>
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-sky-400 rounded-br-lg"></div>
          
          <div className="flex justify-center mb-4">
            <div className="relative" style={{ animation: 'wiggle 3s ease-in-out infinite' }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl opacity-75" style={{ animation: 'goldGlow 2s ease-in-out infinite' }}></div>
              <div className="relative bg-gray-900 rounded-2xl px-5 py-2.5 border-2 border-sky-400">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🗓️</span>
                  <span className="text-white text-xl font-black tracking-wide">월간사주</span>
                  <span style={{ animation: 'sparkle 1.5s infinite' }}>✨</span>
                </div>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 badge-game text-white px-4 py-1.5 rounded-full text-xs font-black mb-3">
            📅 MONTHLY COMPLETE!
          </div>
          
          <p className="text-gray-500 text-xs mb-3">{monthlyData.target_year}년 {monthlyData.target_month}월 운세 분석 완료!</p>
          
          <div className="bg-gray-900 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-2xl border-2 border-white">👤</div>
              <div className="text-left">
                <p className="text-lg font-black">{monthlyData.name}님의 {monthlyData.target_month}월 운세</p>
                <p className="text-gray-400 text-xs">{monthlyData.birth_date || `${monthlyData.birthYear}.${monthlyData.birthMonth}.${monthlyData.birthDay}`} | {monthlyData.gender}</p>
              </div>
            </div>
            <div className="mt-3 flex justify-center">
              <div className="inline-flex items-center gap-1.5 bg-green-500/20 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-green-400 text-xs font-bold">🤖 만세력 기반 AI 분석</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========== 사주팔자 ========== */}
        <div className="card-game rounded-3xl overflow-hidden mb-5 animate-slideUp">
          <button onClick={() => setIsSajuExpanded(!isSajuExpanded)} className="w-full bg-gray-900 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl" style={{ animation: 'float 2s ease-in-out infinite' }}>⭐</span>
              <span className="text-white font-black">사주팔자</span>
              <span className="badge-game text-white text-[10px] font-black px-2 py-0.5 rounded-full ml-2">YOUR DESTINY</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">펼쳐보기</span>
              <div className={`transform transition-transform duration-300 ${isSajuExpanded ? 'rotate-180' : ''}`}>
                <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </button>
          
          <div className={`transition-all duration-500 ease-in-out ${isSajuExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`} style={{ overflow: 'hidden' }}>
            <div className="p-4">
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { label: '년주', sub: '年柱', desc: '뿌리와 조상', value: saju.year },
                  { label: '월주', sub: '月柱', desc: '청년과 부모', value: saju.month },
                  { label: '일주', sub: '日柱', desc: '나 자신', value: saju.day },
                  { label: '시주', sub: '時柱', desc: '노년과 자손', value: saju.hour }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl p-3 border-2 border-gray-200 text-center hover:border-sky-400 transition-all">
                    <div className="text-gray-900 text-xs font-black mb-0.5">{item.label}</div>
                    <div className="text-gray-400 text-[10px] mb-2">{item.sub}</div>
                    <div className="text-2xl font-black mb-1">
                      {item.value ? (
                        <>
                          <span className={elementColors[getElementColor(item.value[0])]}>{item.value[0]}</span>
                          <span className={elementColors[getElementColor(item.value[1])]}>{item.value[1]}</span>
                        </>
                      ) : <span className="text-gray-400">--</span>}
                    </div>
                    <div className="text-gray-500 text-[10px]">{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-4 bg-gray-100 rounded-xl p-2">
                {elementData.map((el, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <div className={`w-2.5 h-2.5 rounded-full ${el.color}`}></div>
                    <span className={`text-xs font-bold ${el.textColor}`}>{el.name.split('(')[0]}</span>
                  </div>
                ))}
              </div>

              {elementCount && (
                <div className="bg-gray-900 rounded-2xl p-4 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🎨</span>
                    <span className="font-black text-sm">오행 밸런스</span>
                    <span className="badge-game text-white text-[10px] font-black px-2 py-0.5 rounded-full ml-auto">ELEMENT</span>
                  </div>
                  
                  <div className="space-y-2">
                    {elementData.map((el, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-16 text-xs font-bold text-gray-300">{el.name}</div>
                        <div className="flex-1 bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div className={`h-full ${el.color} rounded-full transition-all duration-1000`} style={{ width: `${((elementCount[el.key] || 0) / 8) * 100}%` }}></div>
                        </div>
                        <div className="w-8 text-xs font-black text-sky-400">{elementCount[el.key] || 0}개</div>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => setShowModal(true)} className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all border border-gray-600">
                    <span>💬</span>
                    <span>철학관, 사이트마다 사주가 다른 이유는?</span>
                    <span className="text-sky-400">→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========== 이번 달 총운 ========== */}
        <div className="card-game rounded-3xl p-5 mb-5 animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl" style={{ animation: 'pulse 2s ease-in-out infinite' }}>🔮</span>
            <h2 className="text-gray-900 font-black text-lg">이번 달 총운</h2>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-xl p-4 border-l-4 border-sky-400">
            {parsedFortune.totalFortune}
          </p>
        </div>

        {/* ========== 세부 운세 그리드 (2열) ========== */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {fortuneItems.map((item, idx) => (
            <button key={idx} onClick={() => setSelectedFortune(item)} className="card-game rounded-2xl p-4 text-left transition-all animate-slideUp" style={{ animationDelay: `${0.2 + idx * 0.05}s` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl" style={{ animation: `float 2s ease-in-out infinite`, animationDelay: `${idx * 0.1}s` }}>{item.icon}</span>
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
            <span className="text-gray-900 font-black">이번 달 행운 포인트</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-900 rounded-xl p-3 text-center text-white">
              <div className="text-lg mb-1">📅</div>
              <div className="text-[10px] text-gray-400 mb-1">행운의 날</div>
              <div className="text-xs font-black text-sky-400">{parsedFortune.luckyDays}</div>
            </div>
            <div className="bg-gray-900 rounded-xl p-3 text-center text-white">
              <div className="text-lg mb-1">🎨</div>
              <div className="text-[10px] text-gray-400 mb-1">행운의 색상</div>
              <div className="text-xs font-black text-sky-400">{parsedFortune.luckyColor}</div>
            </div>
          </div>
        </div>

        {/* ========== 주의할 시기 ========== */}
        <div className="card-game rounded-3xl p-5 mb-5 animate-slideUp" style={{ animationDelay: '0.7s' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-gray-900 font-black">주의할 시기</h2>
            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full ml-auto">CAUTION</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
            {parsedFortune.cautionPeriod}
          </p>
        </div>

        {/* ========== 이번 달 조언 ========== */}
        <div className="card-game rounded-3xl p-5 mb-5 animate-slideUp" style={{ animationDelay: '0.75s' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💡</span>
            <h2 className="text-gray-900 font-black">이번 달 조언</h2>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed bg-yellow-50 rounded-xl p-4 border-l-4 border-yellow-400">
            {parsedFortune.monthlyAdvice}
          </p>
        </div>

        {/* ========== 카카오톡 알림톡 미리보기 ========== */}
        <div className="card-game rounded-3xl p-5 mb-5 animate-slideUp relative overflow-hidden" style={{ animationDelay: '0.8s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50 opacity-70"></div>
          <div className="relative z-10 text-center">
            <div className="text-3xl mb-2">💌</div>
            <h3 className="text-gray-900 font-black text-base mb-1">매일 아침, 카톡으로 받아보세요!</h3>
            <p className="text-gray-600 text-xs mb-4">일일사주 구독하면 매일 아침 8시<br/>오늘의 운세가 카카오톡으로 도착해요</p>
            <button onClick={() => setShowKakaoPreview(true)} className="badge-game text-white font-black py-2.5 px-5 rounded-xl text-sm">📱 알림톡 미리보기</button>
          </div>
        </div>

        {/* ========== 구독 프로모션 ========== */}
        {showSubscribe && (
          <div className="card-game rounded-3xl p-5 mb-5 animate-scaleIn">
            <div className="text-center mb-5">
              <h2 className="text-gray-900 font-black text-lg mb-1">다른 운세도 확인해보세요!</h2>
              <p className="text-gray-600 text-xs">일일/신년/평생 사주로 더 자세한 운세를 확인하세요!</p>
            </div>
            
            <div className="space-y-3">
              {/* 일일사주 */}
              <button onClick={handleSubscriptionClick} className="w-full bg-white border-2 border-gray-900 rounded-2xl p-4 text-left relative overflow-hidden transition-all hover:shadow-lg" style={{ boxShadow: '0 3px 0 #1a1a2e' }}>
                <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-full" style={{ boxShadow: '0 2px 0 #b45309' }}>⭐ 인기</div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center text-2xl border-2 border-gray-900">💌</div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-black">일일사주 자동발송</div>
                    <div className="text-gray-500 text-xs">매일 아침 8시 카톡 발송</div>
                  </div>
                </div>
                <div className="mt-3 bg-gray-900 text-white rounded-xl p-2.5 flex items-center justify-between">
                  <div><div className="text-[10px] text-gray-400">월 구독료</div><div className="text-lg font-black">9,900원</div></div>
                  <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 text-xs font-black px-3 py-1.5 rounded-lg" style={{ boxShadow: '0 2px 0 #b45309' }}>💳 구독하기</div>
                </div>
              </button>

              {/* 신년운세 */}
              <button onClick={handleNewYearClick} className="w-full bg-white border-2 border-gray-900 rounded-2xl p-4 text-left relative overflow-hidden transition-all hover:shadow-lg" style={{ boxShadow: '0 3px 0 #1a1a2e' }}>
                <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">🐍 2025</div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-2xl border-2 border-gray-900">🐍</div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-black">2025 신년운세</div>
                    <div className="text-gray-500 text-xs">을사년 한 해 운세 총정리</div>
                  </div>
                </div>
                <div className="mt-3 bg-gray-900 text-white rounded-xl p-2.5 flex items-center justify-between">
                  <div><div className="text-[10px] text-gray-400">1회 구매</div><div className="text-lg font-black">19,900원</div></div>
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-black px-3 py-1.5 rounded-lg" style={{ boxShadow: '0 2px 0 #c2410c' }}>🐍 구매하기</div>
                </div>
              </button>

              {/* 평생사주 */}
              <button onClick={handleLifetimeClick} className="w-full bg-white border-2 border-gray-900 rounded-2xl p-4 text-left relative overflow-hidden transition-all hover:shadow-lg" style={{ boxShadow: '0 3px 0 #1a1a2e' }}>
                <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">✨ 프리미엄</div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center text-2xl border-2 border-gray-900">♾️</div>
                  <div className="flex-1">
                    <div className="text-gray-900 font-black">평생 종합사주</div>
                    <div className="text-gray-500 text-xs">만세력 기반 실제 사주</div>
                  </div>
                </div>
                <div className="mt-3 bg-gray-900 text-white rounded-xl p-2.5 flex items-center justify-between">
                  <div><div className="text-[10px] text-gray-400">평생 소장</div><div className="text-lg font-black">29,900원</div></div>
                  <div className="bg-gradient-to-r from-purple-400 to-violet-500 text-white text-xs font-black px-3 py-1.5 rounded-lg" style={{ boxShadow: '0 2px 0 #6b21a8' }}>♾️ 구매하기</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="flex justify-center mb-8">
          <button onClick={() => navigate('/')} className="card-game px-8 py-3 rounded-full font-black text-gray-900 text-sm transition-all">🏠 처음으로</button>
        </div>
      </div>

      {/* ========== 사주 계산 안내 모달 ========== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()} style={{ border: '3px solid #1a1a2e', boxShadow: '0 6px 0 #1a1a2e, 0 10px 40px rgba(0,0,0,0.5)' }}>
            <div className="bg-gray-900 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2"><span className="text-xl">💡</span><span className="text-white font-black">사주 계산 방식 안내</span></div>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-sky-400">
                <p className="text-gray-700 text-sm">본 서비스는 <strong className="text-gray-900">전통 만세력 기준</strong>으로 사주를 계산합니다.</p>
                <p className="text-gray-600 text-xs mt-2">24절기의 절입시간을 적용하여, 한국에서 가장 보편적으로 사용되는 방식입니다.</p>
              </div>
              
              <div className="bg-blue-50 rounded-xl border-2 border-blue-200 overflow-hidden">
                <div className="bg-blue-100 px-4 py-2"><p className="font-black text-blue-900 text-sm">🤔 왜 철학관, 사이트마다 다를까요?</p></div>
                <div className="divide-y divide-blue-200">
                  {[
                    { key: 'item1', title: '절입시간 적용 여부', content: '사주의 "월"은 양력 1일이 아니라 24절기를 기준으로 바뀝니다.' },
                    { key: 'item2', title: '진태양시 보정 여부', content: '한국 표준시는 동경 135도 기준이지만, 서울은 동경 127도에 위치해 실제 태양 위치와 약 32분 차이가 납니다.' },
                    { key: 'item3', title: '양력/음력 변환 방식', content: '음력을 양력으로 변환하는 계산 방식이 사이트마다 다를 수 있습니다.' },
                    { key: 'item4', title: '시간 경계 처리', content: '자시는 밤 11시부터 새벽 1시까지인데, 해석이 다를 수 있습니다.' },
                    { key: 'item5', title: '출생 시간 불명확', content: '정확한 출생 시간을 모르는 경우 기본값 처리 방식이 다릅니다.' }
                  ].map((item) => (
                    <div key={item.key}>
                      <button onClick={() => toggleItem(item.key)} className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-blue-100/50">
                        <span className="text-blue-900 text-xs font-bold">• {item.title}</span>
                        <span className="text-blue-600 font-bold">{openItems[item.key] ? '▲' : '▼'}</span>
                      </button>
                      {openItems[item.key] && <div className="px-4 pb-3"><p className="text-blue-700 text-xs leading-relaxed bg-white rounded-lg p-3">{item.content}</p></div>}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-400">
                <p className="font-black text-purple-900 text-sm mb-2">🎯 가장 중요한 것은</p>
                <p className="text-purple-800 text-xs leading-relaxed">정확한 사주 계산보다 더 중요한 것은 <strong>오늘 당신 사주에 맞는 조언과 실천 가능한 방향</strong>입니다.</p>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <button onClick={() => setShowModal(false)} className="w-full py-3 rounded-2xl text-white font-black" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', boxShadow: '0 3px 0 #0f0f23' }}>확인</button>
            </div>
          </div>
        </div>
      )}

      {/* ========== 로그인 필요 모달 ========== */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowLoginModal(false)}>
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden" onClick={(e) => e.stopPropagation()} style={{ border: '3px solid #1a1a2e', boxShadow: '0 6px 0 #1a1a2e' }}>
            <div className="p-6 text-center">
              <div className="text-5xl mb-4">🔐</div>
              <h3 className="font-black text-xl text-gray-900 mb-2">로그인이 필요합니다</h3>
              <p className="text-sm text-gray-600 mb-6">결제를 진행하려면 먼저 로그인해주세요.</p>
              <div className="space-y-3">
                <button onClick={() => navigate('/login')} className="w-full py-3 rounded-xl font-black text-white" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', boxShadow: '0 3px 0 #0f0f23' }}>로그인하러 가기</button>
                <button onClick={() => setShowLoginModal(false)} className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200">닫기</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== 운세 상세보기 모달 ========== */}
      {selectedFortune && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedFortune(null)}>
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[80vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()} style={{ border: '3px solid #1a1a2e', boxShadow: '0 6px 0 #1a1a2e, 0 10px 40px rgba(0,0,0,0.5)' }}>
            <div className="bg-gray-900 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3"><span className="text-2xl">{selectedFortune.icon}</span><span className="text-white font-black text-lg">{selectedFortune.title}</span></div>
              <button onClick={() => setSelectedFortune(null)} className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-sky-400"><p className="text-gray-700 text-sm leading-relaxed">{selectedFortune.content}</p></div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <button onClick={() => setSelectedFortune(null)} className="w-full py-3 rounded-2xl font-black text-white" style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)', boxShadow: '0 3px 0 #0369a1' }}>확인</button>
            </div>
          </div>
        </div>
      )}

      <KakaoPreviewModal isOpen={showKakaoPreview} onClose={() => setShowKakaoPreview(false)} />
    </div>
  );
}
