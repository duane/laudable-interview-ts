# Laudable Typescript Interview Challenge

## Instructions

1. Fork this repository.
2. Spend some time familiarizing yourself with the Overview and both Problem statements from this document as well
   as the codebase itself.
3. Once you are ready to start, set a timer for 1 hour and begin working on the problems.
4. When you get to the one-hour mark, stop coding and create a new markdown file in this repository. If you did not
   finish the problem you were working on, please discuss how far you got and how you planned to complete the problem.
   Additionally, please include any other reflections on your solution(s) - for example, if you had more time, what
   would you have done differently? Would you refactor anything? Do any aspects of your solution not scale well or are
   there hanging edge cases you know of?
5. Commit your solution as well as this markdown file and push to your forked repository.
6. Send us a link to your forked repository.

As a final note, please note that it is intended that completing both problems within the one-hour time limit is
challenging and _most candidates will not do this_ - so try to not be discouraged if you do not finish both (or even 
one of the) problems!

## Overview

### Concepts

One of the key capabilities of the Laudable application is the ability to display _call transcripts._ Transcripts are
broken up into _monologues_ which are blocks of text (analogous to paragraphs) that are spoken by a single person.
Each monologue then contains one or more _word(s)_.

Additionally, users have the ability to create _highlights_ within transcripts. (In the actual application, these
are used for things such as creating video clips from longer interviews.) Highlights are simply a contiguous selection
of the transcript, denoted by a start monologue and word position and end monologue and word position. Importantly,
highlights can (and often do) span multiple monologues.

As an example, the first sample highlight provided in the code corresponds to the denoted text in the first monologue:

> Hence! **Home, you idle creatures, get you home! Is this a holiday?** What, know you not, Being mechanical, you
> ought not walk Upon a laboring day without the sign Of your profession? Speak, what trade art thou?

### Technical

The codebase is a simple Next.js application that uses React, Typescript, and Tailwind. The challenge does not expect
any particular knowledge of these technologies - it is just a convenient way to be able to see immediately real-world
effects of the code you are writing. When run (see below), the application will display the contents of a sample
transcript.

The structure of the app is mostly self-explanatory, but the files relevant to the exercise are:
* `types.ts`: Contains the types used throughout the application. You should not need to modify this file.
* `data.ts`: Contains the sample transcript and highlights used during the exercise.
* `components.tsx`: Contains the components used to display transcripts and monologues.
* `index.tsx`: The top-level file that renders the application.

## Getting Started

1. Run `npm install` to install dependencies
2. Run `npm run dev` to start the development server
3. Navigate to `http://localhost:3000` to view the app
4. Start editing code! The browser will hot-reload as you make changes.

## Problem 1

When the app is loaded, you should see the sample transcript displayed. However, the sample _highlights_ are not shown
visually. Your first task is to modify the `MonologueComponent` component (found in `components.tsx`) to display
highlights. The scaffolding to do this has already been provided for you - there is a function `isHighlighted` within
the `MonologueComponent` already set up to control the visual highlighting of the word in question.

**Please modify this `isHighlighted` function to return `true` only for words that are part of a highlight.** You have
available to you the monologue index (`monologueIdx`, from the component), word index (the `wordIdx` function
argument), and the highlights (`highlights`, from the component).

## Problem 2

The second problem is to implement deduplication or merging of highlights. You can see this in the sample highlight
data provided: the first highlight (monologue 0, words 1 through 11) and second highlight (monologue 0, word 8 through
monologue 2, word 3) overlap (monologue 0, words 8 through 11 are in both highlights).

There is a button labeled `Merge Highlights` in `index.tsx` with the `mergeHighlights` function hooked up to its
`onClick` handler. **Please implement this function such that when this button is pressed, the highlights present in
`highlights` are merged and set via `setHighlights`.**

Two helpful things to keep in mind:
* If you are testing this behavior in the sample app, you can always reload the page to return the highlights to
  their pre-merge state (as they are loaded from a constant).
* The `mergeHighlights` function is called from within a React event handler. This means that you should not mutate
  the `highlights` array directly, but instead create a new array and set that via `setHighlights`.