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
  `,
  screenShake: `
    @keyframes gameScreenShake {
      0%, 100% { transform: translate(0, 0); }
      10% { transform: translate(-4px, -2px); }
      20% { transform: translate(4px, 2px); }
      30% { transform: translate(-4px, 2px); }
      40% { transform: translate(4px, -2px); }
      50% { transform: translate(-3px, -1px); }
      60% { transform: translate(3px, 1px); }
      70% { transform: translate(-2px, 1px); }
      80% { transform: translate(2px, -1px); }
      90% { transform: translate(-1px, 0); }
    }
  `,
};