import { useState } from "react";
import { TranscriptComponent } from "../components/components";
import { HIGHLIGHTS, TRANSCRIPT } from "../components/data";
import { Highlight } from "../components/types";
import { coordinateInHighlightSpan } from "../util";

export default function IndexPage() {
  const [highlights, setHighlights] = useState<Highlight[]>(HIGHLIGHTS);
  function highlightsAreMergeable(leftHighlight: Highlight, rightHighlight: Highlight) {
    // Return true if the left highlight ends in the right highlight.
    // ...or if the right highlight starts in the left highlight.
    return coordinateInHighlightSpan(leftHighlight, rightHighlight.startMonologue, rightHighlight.startWord) ||
      coordinateInHighlightSpan(rightHighlight, leftHighlight.endMonologue, leftHighlight.endWord);
  }

  // select whichever (monologue, word) pair comes before the other.
  function coordinateMin(monologueA: number, wordA: number, monologueB: number, wordB: number) {
    if (monologueA < monologueB) {
      return [monologueA, wordA];
    }
    if (monologueA == monologueB) {
      return [monologueA, Math.min(wordA, wordB)];
    }
    return [monologueB, wordB];
  }

  // select whichever (monologue, word) pair comes after the other.
  function coordinateMax(monologueA: number, wordA: number, monologueB: number, wordB: number) {
    if (monologueA > monologueB) {
      return [monologueA, wordA];
    }
    if (monologueA == monologueB) {
      return [monologueA, Math.max(wordA, wordB)];
    }
    return [monologueB, wordB];
  }

  // Return the combination of two given highlights.
  function mergeHighlightPair(leftHighlight: Highlight, rightHighlight: Highlight) {
    let [startMonologue, startWord] = coordinateMin(leftHighlight.startMonologue, leftHighlight.startWord, rightHighlight.startMonologue, rightHighlight.startWord);
    let [endMonologue, endWord] = coordinateMax(leftHighlight.endMonologue, leftHighlight.endWord, rightHighlight.endMonologue, rightHighlight.endWord);

    return {
      startMonologue,
      startWord,
      endMonologue,
      endWord
    };
  }

  function mergeHighlights() {
    // If we can assume mergeable highlights are adjacent in the array, we can implement this in O(n) time where n is the number of highlights.
    // If we cannot assume mergeable highlights are adjacent in the array, we can implement this in O(n^2) time where n is the number of highlights.
    // I assume they are adjacent, as it is relatively simple to order the highlights by the (startMonologue, startWord) coordinate.
    if (highlights.length <= 1) {
      return;
    }
    let newHighlights: Highlight[] = [];

    // Consider the highlights pair by pair.
    var leftHighlight = HIGHLIGHTS[0], rightHighlight = HIGHLIGHTS[1];

    // The variable `nextIdx` represents the next highlight AFTER the left and right highlight are considered.
    for (var nextIdx = 2; nextIdx <= HIGHLIGHTS.length; ++nextIdx) {
      if (highlightsAreMergeable(leftHighlight, rightHighlight)) {
        leftHighlight = mergeHighlightPair(leftHighlight, rightHighlight);
      } else {
        newHighlights.push(leftHighlight);
        leftHighlight = rightHighlight;
      }

      // If we haven't hit the end of the highlights, fetch the next one.
      if (nextIdx < highlights.length)
        rightHighlight = highlights[nextIdx];
      else // Otherwise, finish off the newHighlights array with the sole remaining highlight.
        newHighlights.push(leftHighlight);
    }

    console.log(`Before merge there were ${highlights.length} highlights`);
    console.log(`After merge there were ${newHighlights.length} highlights`);
    console.log(`Highlights: ${JSON.stringify(newHighlights)}`)

    setHighlights(newHighlights);
  }

  return (
    <>
      <button
        className={[
          "h-11 px-2 py-2.5 bg-white rounded-md shadow border border-gray-300",
          "justify-center items-center gap-2 inline-flex cursor-pointer"
        ].join(" ")}
        onClick={mergeHighlights}
      >
        Merge Segments
      </button>
      <TranscriptComponent transcript={TRANSCRIPT} highlights={highlights} />
    </>
  );
}