import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function KakaoCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('로그인 중...');
  const hasAttemptedLogin = useRef(false);

  useEffect(() => {
    // 이미 로그인 시도했으면 중단
    if (hasAttemptedLogin.current) return;
    hasAttemptedLogin.current = true;

    // URL에서 code 파라미터 추출
    const code = new URLSearchParams(window.location.search).get('code');
    
    if (!code) {
      setStatus('인증 코드가 없습니다. 다시 시도해주세요.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    // 백엔드 API 호출
    handleKakaoLogin(code);
  }, [navigate]);

  const handleKakaoLogin = async (code) => {
    try {
      console.log('🔐 카카오 로그인 시작');
      console.log('📍 현재 hostname:', window.location.hostname);

      setStatus('카카오 로그인<br />처리 중...');

      // 백엔드 URL 자동 감지
      const backendUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : 'http://10.226.90.18:5000';

      console.log('🌐 백엔드 URL:', backendUrl);
      
      const response = await fetch(`${backendUrl}/api/auth/kakao/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          code,
          redirect_uri: `${window.location.origin}/auth/kakao/callback`
        }),
      });

      const data = await response.json();
      console.log('📦 서버 응답:', data);
      console.log('✅ 응답 성공?', response.ok);
      console.log('🎫 토큰:', data.token);

      if (response.ok && data.success) {
        // JWT 토큰 저장
        localStorage.setItem('token', data.token);
        console.log('💾 토큰 저장 완료');
        console.log('📂 저장된 토큰:', localStorage.getItem('token'));
        
        setStatus('로그인 성공!<br />이동합니다...');
        setTimeout(() => {
          console.log('🏠 메인페이지로 이동');
          window.location.href = '/';
        }, 1000);
      } else {
        console.log('❌ 로그인 실패:', data.message);
        setStatus(data.message || '카카오<br />로그인에 실패했습니다.');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      console.error('💥 카카오<br />로그인 오류:', error);
      setStatus('서버 연결에 실패했습니다.<br />다시 시도해주세요.');
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] via-[#e8eaf0] to-[#f0f2f8]" style={{ fontFamily: 'Nanum Gothic, sans-serif' }}>
      <div className="bg-white border-4 border-gray-900 rounded-2xl p-8 shadow-2xl text-center max-w-md w-full mx-4">
        <div className="mb-6">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {status.split('<br />').map((line, i) => (
    <div key={i}>{line}</div>
  ))}
        </h2>
        <p className="text-gray-600">
          잠시만 기다려주세요...
        </p>
      </div>
    </div>
  );
}