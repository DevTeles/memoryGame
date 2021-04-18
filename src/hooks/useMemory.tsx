import React, {useCallback} from 'react';
import {createContext, ReactNode, useContext, useState} from 'react';

import letter from '../assets/letter.png';
import chaves from '../assets/chaves.jpeg';
import donaflorinda from '../assets/donaflorinda.png';
import bruxa from '../assets/bruxa.png';
import chiquinha from '../assets/chiquinha.png';
import madruga from '../assets/madruga.png';
import paty from '../assets/paty.png';
import barriga from '../assets/barriga.png';
import personagem from '../assets/personagem.png';

export interface letterProps {
  id: number;
  name: string;
  icon: any;
  letter: any;
  isCorrect: boolean;
}

interface MemoryProviderProps {
  children: ReactNode;
}

interface MemoryContextData {
  user: string;
  letters: letterProps[];
  rounds: number;
  updateRounds: (round: number) => void;
  addUser: (user: string) => void;
  updateLetters: (update: letterProps[]) => void;
}

const MemoryContext = createContext<MemoryContextData>({} as MemoryContextData);

export function MemoryProvider({children}: MemoryProviderProps): JSX.Element {
  const [user, setUser] = useState('');
  const [rounds, setRounds] = useState(0);
  const [letters, setLetters] = useState<letterProps[]>(
    [
      {id: 1, name: 'chaves', icon: chaves, isCorrect: false, letter},
      {
        id: 2,
        name: 'donaflorinda',
        icon: donaflorinda,
        isCorrect: false,
        letter,
      },
      {
        id: 3,
        name: 'bruxa',
        icon: bruxa,
        isCorrect: false,
        letter,
      },
      {
        id: 4,
        name: 'chiquinha',
        icon: chiquinha,
        isCorrect: false,
        letter,
      },
      {id: 5, name: 'madruga', icon: madruga, isCorrect: false, letter},
      {id: 6, name: 'paty', icon: paty, isCorrect: false, letter},
      {
        id: 7,
        name: 'barriga',
        icon: barriga,
        isCorrect: false,
        letter,
      },
      {
        id: 8,
        name: 'personagem',
        icon: personagem,
        isCorrect: false,
        letter,
      },
      {id: 9, name: 'chaves', icon: chaves, isCorrect: false, letter},
      {
        id: 10,
        name: 'donaflorinda',
        icon: donaflorinda,
        isCorrect: false,
        letter,
      },
      {
        id: 11,
        name: 'bruxa',
        icon: bruxa,
        isCorrect: false,
        letter,
      },
      {
        id: 12,
        name: 'chiquinha',
        icon: chiquinha,
        isCorrect: false,
        letter,
      },
      {id: 13, name: 'madruga', icon: madruga, isCorrect: false, letter},
      {id: 14, name: 'paty', icon: paty, isCorrect: false, letter},
      {
        id: 15,
        name: 'barriga',
        icon: barriga,
        isCorrect: false,
        letter,
      },
      {
        id: 16,
        name: 'personagem',
        icon: personagem,
        isCorrect: false,
        letter,
      },
    ].sort(() => 0.5 - Math.random()),
  );

  const addUser = useCallback((userPlay: string) => {
    setUser(userPlay);
  }, []);

  const updateLetters = useCallback((update: letterProps[]) => {
    setLetters(update);
  }, []);

  const updateRounds = useCallback((round: number) => {
    setRounds(round);
  }, []);

  return (
    <MemoryContext.Provider
      value={{letters, addUser, user, updateLetters, rounds, updateRounds}}>
      {children}
    </MemoryContext.Provider>
  );
}

export function useMemory(): MemoryContextData {
  const context = useContext(MemoryContext);

  return context;
}
