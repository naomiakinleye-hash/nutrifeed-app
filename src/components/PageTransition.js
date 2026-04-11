import { useEffect, useState } from 'react';
import './PageTransition.css';

function PageTransition({ children, duration = 900 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), duration);
    return () => clearTimeout(t);
  }, [duration]);

  if (!visible) {
    return (
      <div className="pt-overlay">
        <div className="pt-disc-wrap">
          <div className="pt-disc" />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-content pt-content--visible">
      {children}
    </div>
  );
}

export default PageTransition;