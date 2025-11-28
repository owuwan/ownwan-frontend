import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Star, Sparkles, TrendingUp, Heart, Briefcase, Users, Calendar, Award } from 'lucide-react';

export default function LifetimeResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sajuData } = location.state || {};

  // 실제 사주 데이터
  const actualSaju = sajuData?.saju || {};
  const userName = sajuData?.name || "홍길동";

  // 더미 데이터
  const lifetimeData = {
    name: userName,
    saju: actualSaju,
    
    // 기본 정보
    birthInfo: {
      year: "1992년 3월 18일",
      lunar: "음력",
      time: "오시 (11:00~13:00)"
    },

    // 12운성
    twelveStages: {
      year: "건록",
      month: "제왕",
      day: "태",
      hour: "양"
    },

    // 십성 (육친)
    tenGods: {
      year: "편재",
      month: "정관",
      day: "일간",
      hour: "식신"
    },

    // 대운 (10년 단위)
    majorCycles: [
      { age: "8-17세", pillar: "갑인", description: "학업운이 좋은 시기" },
      { age: "18-27세", pillar: "을묘", description: "사회 진출과 인맥 형성" },
      { age: "28-37세", pillar: "병진", description: "재물운 상승, 사업 기회" },
      { age: "38-47세", pillar: "정사", description: "안정과 발전의 시기" },
      { age: "48-57세", pillar: "무오", description: "명예와 지위 상승" },
      { age: "58-67세", pillar: "기미", description: "여유와 성숙의 시기" }
    ],

    // 평생 종합 분석
    lifeAnalysis: {
      personality: "타고난 리더십과 추진력이 강한 성격입니다. 목표를 향해 끊임없이 노력하며, 주변 사람들에게 긍정적인 영향을 주는 카리스마가 있습니다. 다만, 때로는 고집이 세고 독단적일 수 있으니 주의가 필요합니다.",
      
      wealth: "재물운이 매우 좋습니다. 특히 30대 후반부터 재운이 크게 상승하며, 투자나 사업에서 좋은 성과를 거둘 수 있습니다. 부동산 투자에도 길한 운이 있습니다.",
      
      career: "전문직이나 관리직에 적합한 사주입니다. 특히 금융, 경영, IT 분야에서 두각을 나타낼 수 있습니다. 40대에 큰 성공의 기회가 찾아올 것입니다.",
      
      relationship: "배우자운이 좋으며, 가정생활이 원만합니다. 다만, 일에 너무 몰두하면 가족과의 시간이 부족할 수 있으니 균형을 맞추는 것이 중요합니다.",
      
      health: "전반적으로 건강한 편이나, 소화기와 심장 건강에 주의가 필요합니다. 규칙적인 운동과 식습관 관리가 중요합니다."
    },

    // 연도별 운세 (올해 포함 5년)
    yearlyFortune: [
      { year: "2025년", fortune: "전반적으로 좋은 운세. 새로운 기회 도래", lucky: "★★★★☆" },
      { year: "2026년", fortune: "재물운 상승. 투자 적기", lucky: "★★★★★" },
      { year: "2027년", fortune: "안정적인 한 해. 내실 다지기", lucky: "★★★☆☆" },
      { year: "2028년", fortune: "변화의 시기. 새로운 도전", lucky: "★★★★☆" },
      { year: "2029년", fortune: "발전과 성장의 해", lucky: "★★★★★" }
    ],

    // 조언
    advice: [
      "인내심을 갖고 꾸준히 노력하면 큰 성공을 거둘 수 있습니다.",
      "대인관계에서 겸손함을 잃지 마세요.",
      "재물운이 좋지만 과욕은 금물입니다.",
      "건강 관리를 소홀히 하지 마세요.",
      "가족과의 시간을 소중히 여기세요."
    ]
  };

  // 오행별 색상
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

  const elementColors = {
    '목': 'text-green-400',
    '화': 'text-red-400',
    '토': 'text-yellow-400',
    '금': 'text-white',
    '수': 'text-blue-400'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 relative overflow-hidden">
      {/* 배경 별 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        {/* 헤더 */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-10 h-10 text-yellow-300" />
            <h1 className="text-4xl font-bold text-white">평생사주 상세 리포트</h1>
            <Award className="w-10 h-10 text-yellow-300" />
          </div>
          <p className="text-purple-200 text-xl">{lifetimeData.name}님의 평생운세</p>
          <p className="text-purple-300 mt-2">출생: {lifetimeData.birthInfo.year} ({lifetimeData.birthInfo.lunar})</p>
        </div>

        {/* 사주 4주 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-300" />
            사주 팔자 (四柱八字)
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-300/30">
              <div className="text-purple-200 text-sm mb-2 text-center">년주 (年柱)</div>
              <div className="text-3xl font-bold text-center">
                {lifetimeData.saju.year ? (
                  <>
                    <span className={elementColors[getElementColor(lifetimeData.saju.year[0])]}>{lifetimeData.saju.year[0]}</span>
                    <span className={elementColors[getElementColor(lifetimeData.saju.year[1])]}>{lifetimeData.saju.year[1]}</span>
                  </>
                ) : <span className="text-white/50">--</span>}
              </div>
              <div className="text-purple-300 text-xs mt-2 text-center">{lifetimeData.twelveStages.year}</div>
              <div className="text-pink-300 text-xs mt-1 text-center">{lifetimeData.tenGods.year}</div>
            </div>

            <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-300/30">
              <div className="text-purple-200 text-sm mb-2 text-center">월주 (月柱)</div>
              <div className="text-3xl font-bold text-center">
                {lifetimeData.saju.month ? (
                  <>
                    <span className={elementColors[getElementColor(lifetimeData.saju.month[0])]}>{lifetimeData.saju.month[0]}</span>
                    <span className={elementColors[getElementColor(lifetimeData.saju.month[1])]}>{lifetimeData.saju.month[1]}</span>
                  </>
                ) : <span className="text-white/50">--</span>}
              </div>
              <div className="text-purple-300 text-xs mt-2 text-center">{lifetimeData.twelveStages.month}</div>
              <div className="text-pink-300 text-xs mt-1 text-center">{lifetimeData.tenGods.month}</div>
            </div>

            <div className="bg-pink-500/20 rounded-xl p-4 border border-pink-300/30">
              <div className="text-pink-200 text-sm mb-2 text-center">일주 (日柱)</div>
              <div className="text-3xl font-bold text-center">
                {lifetimeData.saju.day ? (
                  <>
                    <span className={elementColors[getElementColor(lifetimeData.saju.day[0])]}>{lifetimeData.saju.day[0]}</span>
                    <span className={elementColors[getElementColor(lifetimeData.saju.day[1])]}>{lifetimeData.saju.day[1]}</span>
                  </>
                ) : <span className="text-white/50">--</span>}
              </div>
              <div className="text-pink-300 text-xs mt-2 text-center">{lifetimeData.twelveStages.day}</div>
              <div className="text-pink-300 text-xs mt-1 text-center font-bold">{lifetimeData.tenGods.day}</div>
            </div>

            <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-300/30">
              <div className="text-purple-200 text-sm mb-2 text-center">시주 (時柱)</div>
              <div className="text-3xl font-bold text-center">
                {lifetimeData.saju.hour ? (
                  <>
                    <span className={elementColors[getElementColor(lifetimeData.saju.hour[0])]}>{lifetimeData.saju.hour[0]}</span>
                    <span className={elementColors[getElementColor(lifetimeData.saju.hour[1])]}>{lifetimeData.saju.hour[1]}</span>
                  </>
                ) : <span className="text-white/50">--</span>}
              </div>
              <div className="text-purple-300 text-xs mt-2 text-center">{lifetimeData.twelveStages.hour}</div>
              <div className="text-pink-300 text-xs mt-1 text-center">{lifetimeData.tenGods.hour}</div>
            </div>
          </div>
        </div>

        {/* 대운 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-yellow-300" />
            대운 (大運) - 10년 단위 운세
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {lifetimeData.majorCycles.map((cycle, index) => (
              <div key={index} className="bg-purple-500/20 rounded-xl p-4 border border-purple-300/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-yellow-300 font-bold">{cycle.age}</span>
                  <span className="text-white text-xl font-bold">{cycle.pillar}</span>
                </div>
                <p className="text-purple-100 text-sm">{cycle.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 평생 종합 분석 */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* 성격 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-pink-400" />
              성격 및 기질
            </h3>
            <p className="text-purple-100 text-sm leading-relaxed">{lifetimeData.lifeAnalysis.personality}</p>
          </div>

          {/* 재물운 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              재물운
            </h3>
            <p className="text-purple-100 text-sm leading-relaxed">{lifetimeData.lifeAnalysis.wealth}</p>
          </div>

          {/* 직업운 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-400" />
              직업 및 사업운
            </h3>
            <p className="text-purple-100 text-sm leading-relaxed">{lifetimeData.lifeAnalysis.career}</p>
          </div>

          {/* 애정운 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              애정 및 가정운
            </h3>
            <p className="text-purple-100 text-sm leading-relaxed">{lifetimeData.lifeAnalysis.relationship}</p>
          </div>
        </div>

        {/* 연도별 운세 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-yellow-300" />
            연도별 운세 (2025-2029)
          </h2>
          
          <div className="space-y-3">
            {lifetimeData.yearlyFortune.map((year, index) => (
              <div key={index} className="bg-purple-500/20 rounded-xl p-4 border border-purple-300/30 flex justify-between items-center">
                <div>
                  <div className="text-yellow-300 font-bold mb-1">{year.year}</div>
                  <div className="text-purple-100 text-sm">{year.fortune}</div>
                </div>
                <div className="text-yellow-300 text-xl">{year.lucky}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 조언 */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            인생 조언
          </h2>
          <ul className="space-y-2">
            {lifetimeData.advice.map((item, index) => (
              <li key={index} className="text-purple-100 flex items-start gap-2">
                <span className="text-yellow-300 mt-1">✨</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition-all backdrop-blur-sm border border-white/20"
          >
            처음으로
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}