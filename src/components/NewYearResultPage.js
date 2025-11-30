import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NewYearResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);
  const [parsedFortune, setParsedFortune] = useState(null);

  useEffect(() => {
    const data = location.state?.resultData;
    
    if (!data) {
      alert('신년운세 데이터가 없습니다.');
      navigate('/');
      return;
    }

    setResultData(data);
    
    // GPT 운세 파싱
    if (data.gpt_fortune?.success) {
      const parsed = parseNewYearFortune(data.gpt_fortune.fortune);
      setParsedFortune(parsed);
    }
  }, [location, navigate]);

  // 신년운세 파싱 함수
  const parseNewYearFortune = (fortuneText) => {
    if (!fortuneText) return null;

    const sections = {
      totalFortune: "",
      monthlyFortune: "",
      love: "",
      money: "",
      career: "",
      health: "",
      luckyDirection: "",
      luckyNumbers: "",
      luckyColors: "",
      bestMonths: "",
      cautionMonths: "",
      yearlyAdvice: ""
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

  // 스타일
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '20px',
      fontFamily: "'Noto Sans KR', sans-serif"
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      paddingTop: '20px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#ffd700',
      marginBottom: '10px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    subtitle: {
      fontSize: '16px',
      color: '#aaa'
    },
    infoCard: {
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '20px',
      backdropFilter: 'blur(10px)'
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
      color: '#fff'
    },
    sajuBox: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '10px',
      marginTop: '15px'
    },
    sajuItem: {
      background: 'rgba(255,215,0,0.2)',
      borderRadius: '10px',
      padding: '15px 10px',
      textAlign: 'center'
    },
    sajuLabel: {
      fontSize: '12px',
      color: '#ffd700',
      marginBottom: '5px'
    },
    sajuValue: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#fff'
    },
    section: {
      background: 'rgba(255,255,255,0.08)',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '15px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#ffd700',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    sectionContent: {
      fontSize: '15px',
      color: '#ddd',
      lineHeight: '1.8'
    },
    monthlyList: {
      fontSize: '14px',
      color: '#ddd',
      lineHeight: '2'
    },
    luckyBox: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '15px',
      marginBottom: '20px'
    },
    luckyItem: {
      background: 'rgba(255,215,0,0.15)',
      borderRadius: '12px',
      padding: '15px',
      textAlign: 'center'
    },
    luckyLabel: {
      fontSize: '12px',
      color: '#ffd700',
      marginBottom: '8px'
    },
    luckyValue: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#fff'
    },
    specialBox: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '15px',
      marginBottom: '20px'
    },
    bestMonth: {
      background: 'rgba(0,255,100,0.15)',
      borderRadius: '12px',
      padding: '15px'
    },
    cautionMonth: {
      background: 'rgba(255,100,100,0.15)',
      borderRadius: '12px',
      padding: '15px'
    },
    specialLabel: {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    specialContent: {
      fontSize: '14px',
      color: '#ddd',
      lineHeight: '1.6'
    },
    homeButton: {
      display: 'block',
      width: '100%',
      maxWidth: '300px',
      margin: '30px auto',
      padding: '15px',
      background: 'linear-gradient(135deg, #ffd700, #ffaa00)',
      border: 'none',
      borderRadius: '25px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#1a1a2e',
      cursor: 'pointer'
    }
  };

  if (!resultData || !parsedFortune) {
    return (
      <div style={styles.container}>
        <div style={{ textAlign: 'center', paddingTop: '100px', color: '#fff' }}>
          로딩 중...
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* 헤더 */}
      <div style={styles.header}>
        <div style={styles.title}>🐍 2025 을사년 신년운세</div>
        <div style={styles.subtitle}>{resultData.name}님의 한 해 운세</div>
      </div>

      {/* 기본 정보 */}
      <div style={styles.infoCard}>
        <div style={styles.infoRow}>
          <span>생년월일</span>
          <span>{resultData.birth_date}</span>
        </div>
        <div style={styles.infoRow}>
          <span>성별</span>
          <span>{resultData.gender}</span>
        </div>
        
        {/* 사주 팔자 */}
        <div style={styles.sajuBox}>
          <div style={styles.sajuItem}>
            <div style={styles.sajuLabel}>년주</div>
            <div style={styles.sajuValue}>{resultData.saju?.year}</div>
          </div>
          <div style={styles.sajuItem}>
            <div style={styles.sajuLabel}>월주</div>
            <div style={styles.sajuValue}>{resultData.saju?.month}</div>
          </div>
          <div style={styles.sajuItem}>
            <div style={styles.sajuLabel}>일주</div>
            <div style={styles.sajuValue}>{resultData.saju?.day}</div>
          </div>
          <div style={styles.sajuItem}>
            <div style={styles.sajuLabel}>시주</div>
            <div style={styles.sajuValue}>{resultData.saju?.hour}</div>
          </div>
        </div>
      </div>

      {/* 2025년 총운 */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>🎯 2025년 총운</div>
        <div style={styles.sectionContent}>{parsedFortune.totalFortune}</div>
      </div>

      {/* 월별 운세 */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>📅 월별 운세</div>
        <div style={styles.monthlyList}>
          {parsedFortune.monthlyFortune.split('\n').map((line, idx) => (
            line.trim() && <div key={idx} style={{ marginBottom: '8px' }}>{line}</div>
          ))}
        </div>
      </div>

      {/* 애정운 */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>💕 애정운</div>
        <div style={styles.sectionContent}>{parsedFortune.love}</div>
      </div>

      {/* 재물운 */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>💰 재물운</div>
        <div style={styles.sectionContent}>{parsedFortune.money}</div>
      </div>

      {/* 직장/사업운 */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>💼 직장/사업운</div>
        <div style={styles.sectionContent}>{parsedFortune.career}</div>
      </div>

      {/* 건강운 */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>🏥 건강운</div>
        <div style={styles.sectionContent}>{parsedFortune.health}</div>
      </div>

      {/* 행운 정보 */}
      <div style={styles.luckyBox}>
        <div style={styles.luckyItem}>
          <div style={styles.luckyLabel}>🧭 행운의 방향</div>
          <div style={styles.luckyValue}>{parsedFortune.luckyDirection}</div>
        </div>
        <div style={styles.luckyItem}>
          <div style={styles.luckyLabel}>🔢 행운의 숫자</div>
          <div style={styles.luckyValue}>{parsedFortune.luckyNumbers}</div>
        </div>
        <div style={styles.luckyItem}>
          <div style={styles.luckyLabel}>🎨 행운의 컬러</div>
          <div style={styles.luckyValue}>{parsedFortune.luckyColors}</div>
        </div>
      </div>

      {/* 대길월 & 주의월 */}
      <div style={styles.specialBox}>
        <div style={styles.bestMonth}>
          <div style={{...styles.specialLabel, color: '#00ff64'}}>✨ 대길월</div>
          <div style={styles.specialContent}>{parsedFortune.bestMonths}</div>
        </div>
        <div style={styles.cautionMonth}>
          <div style={{...styles.specialLabel, color: '#ff6464'}}>⚠️ 주의월</div>
          <div style={styles.specialContent}>{parsedFortune.cautionMonths}</div>
        </div>
      </div>

      {/* 종합 조언 */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>📝 2025년 종합 조언</div>
        <div style={styles.sectionContent}>{parsedFortune.yearlyAdvice}</div>
      </div>

      {/* 홈으로 버튼 */}
      <button style={styles.homeButton} onClick={() => navigate('/')}>
        홈으로 돌아가기
      </button>
    </div>
  );
}