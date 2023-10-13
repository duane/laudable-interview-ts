import { Highlight, Monologue, Transcript } from "./types";

type TranscriptComponentProps = {
  transcript: Transcript;
  highlights: Highlight[];
};

export const TranscriptComponent = (
  {
    transcript,
    highlights
  }: TranscriptComponentProps
) => {
  return (
    <div className="flex flex-col gap-2">
      {transcript.monologues.map((monologue, idx) => (
        <MonologueComponent
          key={`monologue-${idx}`}
          monologue={monologue}
          monologueIdx={idx}
          highlights={highlights}
        />
      ))}
    </div>
  );
};

type MonologueComponentProps = {
  monologue: Monologue;
  monologueIdx: number;
  highlights: Highlight[];
};

export const MonologueComponent = (
  {
    monologue,
    monologueIdx,
    highlights
  }: MonologueComponentProps
) => {
  function isHighlighted(wordIdx: number) {
    return true;
  }

  return (
    <div className="flex flex-col">
      <div className="font-bold">{monologue.speaker}</div>
      <div className="">
        {monologue.words.map((word, wordIdx) => (
          <span
            key={`monologue-${monologueIdx}-word-${wordIdx}`}
            className={isHighlighted(wordIdx) ? "bg-yellow-200" : ""}
          >
            {wordIdx != 0 && <span> </span>}
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};
