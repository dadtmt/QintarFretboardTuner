import * as R from 'ramda'
import { note, distance } from '@tonaljs/tonal'
import { transposeFrom, enharmonic } from '@tonaljs/note'

export const getInterval = (fret, tonic, chordNotes) => {
  const { letter, acc, interval } = R.head(chordNotes)
  const dist = distance(
    `${letter}${acc}`,
    `${fret.note.letter}${fret.note.acc}`
  )
  return dist === '1P' || dist === '0A' || dist === '2d'
    ? interval
    : R.length(R.tail(chordNotes))
    ? getInterval(fret, tonic, R.tail(chordNotes))
    : ''
}

export default (fretboard, tonic, chord) => {
  const chordNotes = chord.intervals.map(interval => ({
    ...R.pipe(transposeFrom(tonic), enharmonic, note)(interval),
    interval
  }))
  return R.map(fret => ({
    ...fret,
    selectedChordInterval: getInterval(fret, tonic, chordNotes)
  }))(fretboard)
}
