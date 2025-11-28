import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NaverCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('로그인 중...');
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) {
      console.log('⚠️ 이미 실행됨 - 중복 실행 방지');
      return;
    }
    hasRun.current = true;

    const code = new URLSearchParams(window.location.search).get('code');
    const state = new URLSearchParams(window.location.search).get('state');
    
    console.log('🔍 네이버 콜백 시작:', { code, state });
    
    if (!code || !state) {
      setStatus('인증 코드가 없습니다. 다시 시도해주세요.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    handleNaverLogin(code, state);
  }, [navigate]);

  const handleNaverLogin = async (code, state) => {
    try {
      setStatus('네이버 로그인<br />처리 중...');

      const backendUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000' 
        : `http://${window.location.hostname}:5000`;
      
      console.log('🔍 백엔드 URL:', backendUrl);
      console.log('🔍 보낼 데이터:', { code, state });
      
      const response = await fetch(`${backendUrl}/api/auth/naver/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ code, state }),
      });

      console.log('🔍 응답 상태:', response.status);
      
      const data = await response.json();
      console.log('🔍 응답 데이터:', data);

      if (!response.ok) {
        throw new Error(data.message || '로그인 실패');
      }

      // JWT 토큰 저장
      
      setStatus('로그인 성공!<br />이동 중...');

      // 🔥 일단 무조건 메인페이지로 이동
      setTimeout(() => {
        navigate('/');
      }, 500);

    } catch (error) {
      console.error('❌ 네이버 로그인 에러:', error);
      setStatus('로그인 실패.<br />다시 시도해주세요.');
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f5f7fa] via-[#e8eaf0] to-[#f0f2f8]" style={{ fontFamily: 'Nanum Gothic, sans-serif' }}>
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-white border-4 border-gray-900 rounded-2xl p-12 shadow-2xl text-center">
          <div className="mb-6">
            <div className="inline-block w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {status.split('<br />').map((line, i) => (
    <div key={i}>{line}</div>
  ))}
          </h2>
          <p className="text-gray-600">
            잠시만 기다려주세요...
          </p>
        </div>
      </div>
    </div>
  );
}