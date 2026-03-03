import React from 'react';
import { Group, UnstyledButton, Tooltip } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const PIXEL_SIZE = 4;
const FLAG_WIDTH = 6 * PIXEL_SIZE;
const FLAG_HEIGHT = 4 * PIXEL_SIZE;
const FLAG_RADIUS = 6;

const flagStyle = (selected: boolean) => ({
  imageRendering: 'pixelated' as const,
  border: selected ? '2px solid var(--mantine-color-cyan-6)' : '1px solid rgba(0,0,0,0.2)',
  borderRadius: FLAG_RADIUS,
  overflow: 'hidden' as const,
});

const FrenchFlag: React.FC<{ selected?: boolean }> = ({ selected }) => (
  <div style={flagStyle(!!selected)}>
    <svg
      width={FLAG_WIDTH}
      height={FLAG_HEIGHT}
      viewBox={`0 0 ${FLAG_WIDTH} ${FLAG_HEIGHT}`}
      style={{ display: 'block' }}
    >
      <rect x={0} y={0} width={FLAG_WIDTH / 3} height={FLAG_HEIGHT} fill="#002395" />
      <rect x={FLAG_WIDTH / 3} y={0} width={FLAG_WIDTH / 3} height={FLAG_HEIGHT} fill="#fff" />
      <rect x={(2 * FLAG_WIDTH) / 3} y={0} width={FLAG_WIDTH / 3} height={FLAG_HEIGHT} fill="#ED2939" />
    </svg>
  </div>
);

/* Union Jack style (UK) – navy, red cross, white fimbriation */
const EnglishFlag: React.FC<{ selected?: boolean }> = ({ selected }) => (
  <div style={flagStyle(!!selected)}>
    <svg
      width={FLAG_WIDTH}
      height={FLAG_HEIGHT}
      viewBox={`0 0 ${FLAG_WIDTH} ${FLAG_HEIGHT}`}
      style={{ display: 'block' }}
    >
      <rect x={0} y={0} width={FLAG_WIDTH} height={FLAG_HEIGHT} fill="#012169" />
      <rect x={FLAG_WIDTH / 2 - 2} y={0} width={4} height={FLAG_HEIGHT} fill="#fff" />
      <rect x={0} y={FLAG_HEIGHT / 2 - 2} width={FLAG_WIDTH} height={4} fill="#fff" />
      <rect x={FLAG_WIDTH / 2 - 1} y={0} width={2} height={FLAG_HEIGHT} fill="#C8102E" />
      <rect x={0} y={FLAG_HEIGHT / 2 - 1} width={FLAG_WIDTH} height={2} fill="#C8102E" />
    </svg>
  </div>
);

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  return (
    <Group gap={4} style={{ flexShrink: 0 }}>
      <Tooltip label="Français">
        <UnstyledButton
          onClick={() => i18n.changeLanguage('fr')}
          style={{ padding: 2, lineHeight: 0 }}
          aria-pressed={lang === 'fr'}
          aria-label="Français"
        >
          <FrenchFlag selected={lang === 'fr'} />
        </UnstyledButton>
      </Tooltip>
      <Tooltip label="English">
        <UnstyledButton
          onClick={() => i18n.changeLanguage('en')}
          style={{ padding: 2, lineHeight: 0 }}
          aria-pressed={lang === 'en'}
          aria-label="English"
        >
          <EnglishFlag selected={lang === 'en'} />
        </UnstyledButton>
      </Tooltip>
    </Group>
  );
};
