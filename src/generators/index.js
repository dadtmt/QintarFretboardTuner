import * as R from "ramda"
import  {distance, interval, transpose} from "@tonaljs/tonal"

export const addSemitone = note => transpose(note, "m2")

export const areInSameOctave = (a, b) => 
    R.prop("oct", interval(distance(a, b))) === 0
    
export const generateFret = 
flatNote => 
    fret => areInSameOctave(flatNote, fret) && [addSemitone(fret), addSemitone(fret)]
export const generateString = flatNote => 
R.unfold(generateFret(flatNote), flatNote)
