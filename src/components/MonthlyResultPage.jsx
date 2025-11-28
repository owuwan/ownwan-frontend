import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MonthlyResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [monthlyData, setMonthlyData] = useState(null);
  const [parsedFortune, setParsedFortune] = useState(null);

  useEffect(() => {
    const data = location.state?.monthlyData;
    
    if (!data) {
      alert('월간 운세 데이터가 없습니다.');
      navigate('/');
      return;
    }

    setMonthlyData(data);
    
    // GPT 운세 파싱
    if (data.gpt_fortune?.success) {
      const parsed = parseMonthlyFortune(data.gpt_fortune.fortune);
      setParsedFortune(parsed);
    }
  }, [location, navigate]);

  // 월간 운세 파싱 함수
  const parseMonthlyFortune = (fortuneText) => {
    if (!fortuneText) return null;

    const sections = {
      totalFortune: "",
      loveLife: "",
      business: "",
      money: "",
      health: "",
      relationships: "",
      family: "",
      study: "",
      travel: "",
      realEstate: "",
      luckyDays: "",
      luckyColor: "",
      cautionPeriod: "",
      monthlyAdvice: ""
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

  if (!monthlyData || !parsedFortune) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4 relative overflow-hidden">
      {/* 별똥별 애니메이션 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🗓️ {monthlyData.target_year}년 {monthlyData.target_month}월 운세
          </h1>
          <p className="text-purple-200 text-lg">
            {monthlyData.name}님의 한 달 운세입니다
          </p>
        </div>

        {/* 사주 정보 */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">📅 사주 정보</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-purple-200 text-sm">년주</p>
              <p className="text-white text-xl font-bold">{monthlyData.saju?.year}</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm">월주</p>
              <p className="text-white text-xl font-bold">{monthlyData.saju?.month}</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm">일주</p>
              <p className="text-white text-xl font-bold">{monthlyData.saju?.day}</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm">시주</p>
              <p className="text-white text-xl font-bold">{monthlyData.saju?.hour}</p>
            </div>
          </div>
        </div>

        {/* 월간 운세 카드들 */}
        <div className="space-y-4 mb-8">
          {/* 이번 달 총운 */}
          <FortuneCard 
            icon="🌟" 
            title="이번 달 총운" 
            content={parsedFortune.totalFortune}
            bgColor="from-yellow-500/20 to-orange-500/20"
          />

          {/* 애정운 */}
          <FortuneCard 
            icon="💕" 
            title="애정운" 
            content={parsedFortune.loveLife}
            bgColor="from-pink-500/20 to-rose-500/20"
          />

          {/* 사업운 */}
          <FortuneCard 
            icon="💼" 
            title="사업운" 
            content={parsedFortune.business}
            bgColor="from-blue-500/20 to-cyan-500/20"
          />

          {/* 금전운 */}
          <FortuneCard 
            icon="💰" 
            title="금전운" 
            content={parsedFortune.money}
            bgColor="from-green-500/20 to-emerald-500/20"
          />

          {/* 건강운 */}
          <FortuneCard 
            icon="🏥" 
            title="건강운" 
            content={parsedFortune.health}
            bgColor="from-red-500/20 to-pink-500/20"
          />

          {/* 대인관계운 */}
          <FortuneCard 
            icon="👥" 
            title="대인관계운" 
            content={parsedFortune.relationships}
            bgColor="from-purple-500/20 to-indigo-500/20"
          />

          {/* 가족운 */}
          <FortuneCard 
            icon="👨‍👩‍👧‍👦" 
            title="가족운" 
            content={parsedFortune.family}
            bgColor="from-orange-500/20 to-yellow-500/20"
          />

          {/* 학업운 */}
          <FortuneCard 
            icon="📚" 
            title="학업운" 
            content={parsedFortune.study}
            bgColor="from-indigo-500/20 to-purple-500/20"
          />

          {/* 여행운 */}
          <FortuneCard 
            icon="✈️" 
            title="여행운" 
            content={parsedFortune.travel}
            bgColor="from-sky-500/20 to-blue-500/20"
          />

          {/* 부동산운 */}
          <FortuneCard 
            icon="🏡" 
            title="부동산운" 
            content={parsedFortune.realEstate}
            bgColor="from-amber-500/20 to-orange-500/20"
          />

          {/* 행운의 날 */}
          <FortuneCard 
            icon="📅" 
            title="행운의 날" 
            content={parsedFortune.luckyDays}
            bgColor="from-yellow-500/20 to-amber-500/20"
          />

          {/* 행운의 색상 */}
          <FortuneCard 
            icon="🎨" 
            title="행운의 색상" 
            content={parsedFortune.luckyColor}
            bgColor="from-pink-500/20 to-purple-500/20"
          />

          {/* 주의할 시기 */}
          <FortuneCard 
            icon="⚠️" 
            title="주의할 시기" 
            content={parsedFortune.cautionPeriod}
            bgColor="from-red-500/20 to-orange-500/20"
          />

          {/* 이번 달 조언 */}
          <FortuneCard 
            icon="💡" 
            title="이번 달 조언" 
            content={parsedFortune.monthlyAdvice}
            bgColor="from-cyan-500/20 to-blue-500/20"
          />
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-4 pb-8">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-white/20 backdrop-blur-md text-white py-4 rounded-2xl font-bold hover:bg-white/30 transition-all border border-white/30"
          >
            🏠 홈으로
          </button>
        </div>
      </div>
    </div>
  );
}

// 운세 카드 컴포넌트
function FortuneCard({ icon, title, content, bgColor }) {
  return (
    <div className={`bg-gradient-to-r ${bgColor} backdrop-blur-md rounded-2xl p-6 border border-white/20`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-white/90 leading-relaxed">
        {content || '운세 정보를 불러오는 중...'}
      </p>
    </div>
  );
}