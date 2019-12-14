import React, { Fragment, useState } from 'react'
import { simplify } from '@tonaljs/note'
import { chord } from '@tonaljs/chord'
import { generateFretboard } from './generators'
import './Fretboard.css'

function TonalInput({ getter, setter, tonalType }) {
  const [tonalInputError, setTonalInputError] = useState(false)
  const [tonalValue, setTonalValue] = useState('F1')
  const handleValueChange = value => {
    const wantedTonalValue = getter(value)
    if (wantedTonalValue) {
      setTonalInputError(false)
      setter(wantedTonalValue)
    } else {
      setTonalInputError(true)
    }
    setTonalValue(value)
  }

  return (
    <label htmlFor="lowest-note">
      Deepest note:
      <input
        type="text"
        value={tonalValue}
        onChange={e => handleValueChange(e.target.value)}
      />
      {tonalInputError && <span>{`not a valid ${tonalType}`}</span>}
    </label>
  )
}

function Fretboard() {
  const [chordInput, setChordInput] = useState('Cmaj7')
  const [selectedChord, setSelectedChord] = useState(chord('C3maj7'))
  const [fretboard, setFretboard] = useState(generateFretboard('F1'))

  return (
    <Fragment>
      <form action="">
        <TonalInput
          getter={simplify}
          setter={noteValue => setFretboard(generateFretboard(noteValue))}
          tonalType="note"
        />
      </form>
      <main>
        <ol>
          {fretboard.map(guitarString => (
            <li key={guitarString.flatNote}>{guitarString.flatNote}</li>
          ))}
        </ol>
        <ol>
          {fretboard.map(guitarString => (
            <li key={guitarString.flatNote}>
              <ol>
                {guitarString.frets.map(fret => (
                  <li key={fret}>
                    {fret}
                    {selectedChord.notes.includes(fret) && 'Selected'}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </main>
    </Fragment>
  )
}

export default Fretboard
