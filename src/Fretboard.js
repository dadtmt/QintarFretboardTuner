import React, { Fragment, useState } from 'react'
import { simplify } from '@tonaljs/note'
import { chord } from '@tonaljs/chord'
import { generateFretboard } from './generators'
import './Fretboard.css'

function TonalInput({
  initialValue,
  label,
  getter,
  setter,
  tonalType,
  validate
}) {
  const [tonalInputError, setTonalInputError] = useState(false)
  const [tonalValue, setTonalValue] = useState(initialValue)
  const handleValueChange = value => {
    const wantedTonalValue = getter(value)
    if (validate(wantedTonalValue)) {
      setTonalInputError(false)
      setter(wantedTonalValue)
    } else {
      setTonalInputError(true)
    }
    setTonalValue(value)
  }

  return (
    <label htmlFor={label}>
      {`${label} : `}
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
  const initialDeepestNote = 'F1'
  const initialChord = 'C3maj7'

  const [fretboard, setFretboard] = useState(
    generateFretboard(initialDeepestNote)
  )
  const [selectedChord, setSelectedChord] = useState(initialChord)

  return (
    <Fragment>
      <form action="">
        <TonalInput
          initialValue={initialDeepestNote}
          label="Deepest note"
          getter={simplify}
          setter={noteValue => setFretboard(generateFretboard(noteValue))}
          tonalType="note"
          validate={noteValue => noteValue !== ''}
        />
        <TonalInput
          initialValue={initialChord}
          label="Selected Chord"
          getter={chord}
          setter={chordValue => setSelectedChord(chordValue.name)}
          tonalType="chord"
          validate={chordValue => !chordValue.empty}
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
                    {chord(selectedChord).notes.includes(fret) && 'Selected'}
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
