import * as R from 'ramda'

export default (fretboard, note, chord) =>
  R.map(fret => ({
    ...fret,
    selectedChordInterval:
      note.letter === fret.note.letter && note.acc === fret.note.acc ? '1P' : ''
  }))(fretboard)
