import * as R from 'ramda'
import { transpose, note } from '@tonaljs/tonal'

export const getInterval = (fret, tonic, intervals) => {
  const { letter, acc } = note(transpose(tonic, R.head(intervals)))
  return letter === fret.note.letter && acc === fret.note.acc
    ? R.head(intervals)
    : R.length(intervals)
    ? getInterval(fret, tonic, R.tail(intervals))
    : ''
}

export default (fretboard, tonic, chord) =>
  R.map(fret => ({
    ...fret,
    selectedChordInterval: getInterval(fret, tonic, chord.intervals)
  }))(fretboard)
