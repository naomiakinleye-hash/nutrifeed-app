import { useEffect, useState } from 'react';
import './SplashScreen.css';

function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('show');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('morph'), 2200);
    const t2 = setTimeout(() => onDone(), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`splash ${phase === 'morph' ? 'splash--morph' : ''}`}>
      <div className="splash-inner">
        <div className="splash-disc-wrap">
          <div className="splash-disc" />
        </div>
        <p className="splash-brand">BSF NutriFeed</p>
      </div>
    </div>
  );
}

export default SplashScreen;