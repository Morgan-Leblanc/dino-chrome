import { Card, Text, Image } from '@mantine/core';

interface Character {
  id: string;
  image: string;
  name: string;
}

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onSelect: (id: 'boy' | 'girl') => void;
}

const CharacterCard = ({ character, isSelected, onSelect }: CharacterCardProps) => {
  return (
    <Card
      key={character.id}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={() => onSelect(character.id as 'boy'| 'girl')}
      style={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      bg={isSelected ? 'blue.1' : 'transparent'}
    >
      <Card.Section>
        <Image
          src={character.image}
          h={100}
          alt={character.name}
          fit="contain"
        />
      </Card.Section>
        <Text  ta="center" fw={500} size="lg">
          {character.name}
        </Text>
    </Card>
  );
};

export default CharacterCard;