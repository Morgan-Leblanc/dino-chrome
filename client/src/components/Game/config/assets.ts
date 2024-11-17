// Backgrounds
import ForestBackground from '../../../assets/backgrounds/Forest.png';

// Obstacles
import cloudObstacle from '../../../assets/obstacles/cloud.png';
import hearthObstacle from '../../../assets/obstacles/hearth.png';
import timeObstacle from '../../../assets/obstacles/time.png';

// Items
import scrollItem from '../../../assets/others/scroll.png';

// Characters
import boyCharacter from '../../../assets/characters/boy.gif';
import girlCharacter from '../../../assets/characters/girl.gif';

// Music
import gameMusic from '../../../assets/music/longtrainrunning.mp3';

export const ASSETS = {
  obstacles: {
    cloud: cloudObstacle,
    hearth: hearthObstacle,
    time: timeObstacle,
  },
  items: {
    scroll: scrollItem,
  },
  characters: {
    boy: boyCharacter,
    girl: girlCharacter,
  },
  background: ForestBackground,
} as const;

export const GAME_MUSIC = gameMusic;