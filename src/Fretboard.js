import React, { Fragment, useState } from 'react'
import * as R from 'ramda'
import { simplify } from '@tonaljs/note'
import { chordType } from '@tonaljs/chord-dictionary'
import { generateFretboard } from './generators'
import setChordIntervals from './generators/setChordIntervals'
import './Fretboard.css'

function TonalInput({
  initialValue,
  label,
  getTonal,
  setTonal,
  tonalType,
  validTonal
}) {
  const [tonalError, setTonalError] = useState(false)
  const [inputValue, setInputValue] = useState(initialValue)
  const handleValueChange = value => {
    const wantedTonalValue = getTonal(value)
    if (validTonal(wantedTonalValue)) {
      setTonalError(false)
      setTonal(wantedTonalValue)
    } else {
      setTonalError(true)
    }
    setInputValue(value)
  }

  return (
    <label htmlFor={label}>
      {`${label} : `}
      <input
        type="text"
        value={inputValue}
        onChange={e => handleValueChange(e.target.value)}
      />
      {tonalError && <span>{`not a valid ${tonalType}`}</span>}
    </label>
  )
}

function Fret({ fretIndex, note, selectedChordInterval, onClick }) {
  return (
    <li onClick={onClick}>
      <aside>{fretIndex}</aside>
      <article>{note.name}</article>
      <div>{selectedChordInterval}</div>
    </li>
  )
}

function Fretboard() {
  const initialDeepestNote = 'F1'
  const [fretboard, setFretboard] = useState(
    generateFretboard(initialDeepestNote)
  )
  const major = chordType('major')
  return (
    <Fragment>
      <form action="">
        <TonalInput
          initialValue={initialDeepestNote}
          label="Deepest note"
          getTonal={simplify}
          setTonal={noteValue => setFretboard(generateFretboard(noteValue))}
          tonalType="note"
          validTonal={noteValue => noteValue !== ''}
        />
        <span>Click on a fret to display major chords</span>
      </form>
      <main className="Fretboard">
        <ol>
          {R.splitEvery(13, fretboard).map(
            (guitarString, guitarStringIndex) => (
              <li key={guitarStringIndex}>
                <ol>
                  {guitarString.map(fret => (
                    <Fret
                      {...fret}
                      key={fret.fretIndex}
                      onClick={() => {
                        setFretboard(
                          setChordIntervals(fretboard, fret.note, major)
                        )
                      }}
                    />
                  ))}
                </ol>
              </li>
            )
          )}
        </ol>
      </main>
    </Fragment>
  )
}

export default Fretboard
