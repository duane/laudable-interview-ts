# Notes

### Problem 1

The first problem took me 13 minutes. Unfortunately, github copilot immediately suggested the correct implementation for the function `coordinateInHighlightSpan`. I converted the function to a style more similar to what I would want to write, and then disabled the copilot. This is a simple two-dimensional comparison, so I don't think copilot suggested any real insight here.

This is not a perfect implementation; this makes as many as `O(n)` comparisons per-word where `n` is the number of highlights. Assuming in-order highlights, this is possible in constant time: the render function can maintain a cursor index indexing the next expected highlight. Once the checked word is past the end of the indexed highlight the index may be advanced, assuming it does not pass the end of the highlights array. I elected to move on to the second problem rather than implement this.

### Problem 2.

The second problem took me 35 minutes. (I finished when the timer read 48 minutes) Again, I assumed in-order highlights, where highlights are ordered by `(startMonologue, startWord)`.

The problem then becomes comparing adjacent highlights, and merging all contiguous highlights into a single one. This is of `O(n)` complexity where `n` is the number of highlights. Merging is as simple as constructing a new highlight from the least `(startMonologue, startWord)` and `(endMonologue, endWord)` pair. The in-order assumption allows us to re-use the `coordinateInHighlightSpan` function from problem 1 here once extracted to a common module to check the end-coordinate of the preceeding highlight against the latter one, and the start-coordinate of the latter highlight against the preceeding one.

I'm fairly happy with this solution—there are fewer checks that may be made, but the problem is broken down into discrete functions that do *just* what they're named, allowing for straightforward reasoning about the logic of the procedure.

## What about non-ordered highlights?

Because merging with non-ordered highlights takes `O(n^2)` time, it would always be worth it to sort the highlights in `O(n log n)` time before merging. It seems reasonable, however, to expect the data to come pre-sorted.

## What would I do differently if I were to make this ready for production?

I would unit-test the function in each problem (and ancillary functions like `coordinateInHighlightSpan`). Notably, only having three highlights, two of which are merged, allows many edge cases to not be tested—hence why I added three highlights (currently commented out), including a second merge of three highlights. I'm glad I did this, because it revealed a bug where I wasn't testing the mergeability correctly, and it only *happened* to work correctly with the given data.

There's also the issue of invalid data—what happens when highlights span past the transcript; what happens with invalid data (e.g. negative indexes); what happens when the highights are not ordered correctly; and pathologically worst-case scenarios (e.g. `N` highlights where `N` is the number of words, each one spanning from a successive word to the end of the transcript).

## Closing thoughts

This was fun—it was nice to have the the data and transcript and UI ready to test.

I am pretty new to GitHub copilot, and I found it interesting how incorrect the comments it suggested were, but once I named `coordinateInHighlightSpan` correctly it suggested exactly what I inteded to write (with, amusingly, incorrect variable references). I hope the complexity of the second problem with copilot disabled, plus these notes, are enough to demonstrate my unassisted ability.

Cheers!
Dee
