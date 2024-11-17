export const ANIMATIONS = {
    collectPulse: `
      @keyframes collectPulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.5; }
        100% { transform: scale(2); opacity: 0; }
      }
    `,
    collision: `
      @keyframes collision {
        0% { transform: translateX(0) rotate(0deg); }
        25% { transform: translateX(-10px) rotate(-5deg); }
        50% { transform: translateX(10px) rotate(5deg); }
        75% { transform: translateX(-10px) rotate(-5deg); }
        100% { transform: translateX(0) rotate(0deg); }
      }
    `
  };