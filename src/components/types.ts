export type Transcript = {
  monologues: Monologue[];
};

export type Monologue = {
  words: string[];
  speaker: string;
};

export type Highlight = {
  startMonologue: number;
  startWord: number;
  endMonologue: number;
  endWord: number;
};
