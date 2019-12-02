import * as R from "ramda"
import {enharmonic, transposeFrom} from "@tonaljs/note"
import {transpose} from "@tonaljs/tonal"

const fretIntervals = [
    "m2","M2","m3", "M3","P4","d5","P5","m6","M6","m7","M7","P8"
]

export const generateString = flatNote => 
    R.map(R.pipe(transposeFrom(flatNote), enharmonic), fretIntervals)

export const generateStringsFromDeepestNote = (flatNote, acc = [] ,stringCount = 6) =>
    stringCount > 0 ? 
        generateStringsFromDeepestNote(transpose(flatNote,"P5"), [flatNote, ...acc], stringCount - 1)
        : acc


export const generateFretboard = () => null
