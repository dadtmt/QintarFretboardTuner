import * as R from "ramda"
import {enharmonic, transposeFrom} from "@tonaljs/note"

const fretIntervals = [
    "m2","M2","m3", "M3","P4","d5","P5","m6","M6","m7","M7","P8"
]

export const generateString = flatNote => 
    fretIntervals.map(R.pipe(transposeFrom(flatNote), enharmonic))
