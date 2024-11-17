import React from 'react';
import { SimpleGrid, Box } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState,  } from '../../redux/store';
import { setCharacter } from '../../redux/slices/userSlice';
import boyGif from '../../assets/characters/boy.gif';
import girlGif from '../../assets/characters/girl.gif';
import CharacterCard from './CharacterCard';

interface Character {
  id: 'boy' | 'girl';
  image: string;
  name: string;
}

const CharacterSelector: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCharacter = useSelector((state: RootState) => state.user.selectedCharacter);

  const characters: Character[] = [
    { id: 'boy', image: boyGif, name: 'Scott' },
    { id: 'girl', image: girlGif, name: 'Belinda' },
  ];

  const handleCharacterSelect = (id: Character['id']): void => {
    dispatch(setCharacter(id));
  };

  return (
    <Box my="xl">
      <SimpleGrid cols={2} spacing="xl">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isSelected={selectedCharacter === character.id}
            onSelect={handleCharacterSelect}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CharacterSelector;