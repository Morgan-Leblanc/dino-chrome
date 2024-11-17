import { Quote } from '../types';

const MOTIVATIONAL_QUOTES: Quote[] = [
    {
      text: "Soyez le changement que vous voulez voir dans le monde.",
      author: "Gandhi"
    },
    {
      text: "Ce n'est pas parce que les choses sont difficiles que nous n'osons pas, c'est parce que nous n'osons pas qu'elles sont difficiles.",
      author: "Sénèque"
    },
    {
      text: "La vie est un mystère qu'il faut vivre, et non un problème à résoudre.",
      author: "Gandhi"
    },
    {
      text: "Le voyage de mille lieues commence par un pas.",
      author: "Lao Tseu"
    },
    {
      text: "La connaissance s'acquiert par l'expérience, tout le reste n'est que de l'information.",
      author: "Albert Einstein"
    },
    {
      text: "Ce qui ne me tue pas me rend plus fort.",
      author: "Friedrich Nietzsche"
    },
    {
      text: "La plus grande gloire n'est pas de ne jamais tomber, mais de se relever à chaque chute.",
      author: "Confucius"
    },
    {
      text: "Celui qui déplace une montagne commence par déplacer de petites pierres.",
      author: "Confucius"
    }
  ];

  export const getRandomQuote = (): Quote => {
    return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
  };
  