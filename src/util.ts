import { Highlight } from "./components/types";

export function coordinateInHighlightSpan(highlight: Highlight, monologueIdx: number, wordIdx: number) {
    // If the entire monologue before or after the highlight, return false.
    if (monologueIdx < highlight.startMonologue || monologueIdx > highlight.endMonologue) {
        return false;
    }
    // If the monologue is a boundary monologue, check the word index for inclusion in the highlight.
    if ((monologueIdx == highlight.startMonologue && wordIdx < highlight.startWord)
        || (monologueIdx == highlight.endMonologue && wordIdx > highlight.endWord)) {
        return false;
    }
    return true;
}