import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [totalSeconds, setTotalSeconds] = useState(() => {
    const savedTime = localStorage.getItem('stopwatch_time');
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  const [isRunning, setIsRunning] = useState(true);

  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('stopwatch_theme');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  useEffect(() => {
    localStorage.setItem('stopwatch_time', totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    localStorage.setItem('stopwatch_theme', JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleStop = () => setIsRunning(false);
  const handleResume = () => setIsRunning(true);
  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    localStorage.removeItem('stopwatch_time');
  };

  return (
    <div style={{
      backgroundColor: isDark ? '#0f172a' : '#f8fafc',
      color: isDark ? '#f8fafc' : '#0f172a',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      transition: 'all 0.4s ease',
      position: 'relative',
      margin: 0,
      padding: 0
    }}>

      <button 
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 18px',
          borderRadius: '20px',
          border: 'none',
          backgroundColor: isDark ? '#334155' : '#e2e8f0',
          color: isDark ? '#fff' : '#000',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: '0.3s'
        }}
      >
        {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <div style={{
        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '40px 60px',
        borderRadius: '24px',
        boxShadow: isDark ? '0 20px 25px -5px rgba(0, 0, 0, 0.5)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
      }}>
        <h1 style={{
          fontSize: '8rem',
          letterSpacing: '2px',
          margin: '0 0 30px 0',
          fontVariantNumeric: 'tabular-nums'
        }}>
          {hours}:{minutes}:{seconds}
        </h1>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          {isRunning ? (
            <button onClick={handleStop} style={buttonStyle('#ef4444')}>إيقاف</button>
          ) : (
            <button onClick={handleResume} style={buttonStyle('#22c55e')}>تشغيل</button>
          )}
          <button onClick={handleReset} style={buttonStyle('#64748b')}>إعادة ضبط</button>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '12px',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transition: 'transform 0.1s ease, opacity 0.2s',
});

export default App;