import * as R from "ramda"
import  {transpose} from "@tonaljs/tonal"

const fretIntervals = [
    "m2","M2","m3", "M3","P4","d5","P5","m6","M6","m7","M7","P8"
]

export const generateString = flatNote => 
    fretIntervals.map(fretInterval => 
        transpose(flatNote, fretInterval))
