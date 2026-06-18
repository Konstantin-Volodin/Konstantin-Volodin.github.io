import { useState, ReactNode } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

/** Fades + slides children up the first time they scroll into view. */
export default function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <VisibilitySensor partialVisibility delayedCall onChange={(v: boolean) => v && setVisible(true)}>
      <div className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>
    </VisibilitySensor>
  );
}
