import { Highlight, Monologue, Transcript } from "./types";
import { coordinateInHighlightSpan } from "../util";

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
    // This is O(n) where n is the number of highlights.
    // This results in O(m*n) comparisons each render pass where `m` is the number of words.
    // Ideally, we would have a cursor here that would represent the "next" highlight, making this a constant-time check.
    // I will loop back to this if I have time to attempt to implement this.
    // EDIT: I judged that I did not have time, and stopped the timer after a few minutes of looking at how to integrate this into the render loop.
    for (var highlight of highlights) {
      if (coordinateInHighlightSpan(highlight, monologueIdx, wordIdx)) {
        return true;
      }
    }
    return false;
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
