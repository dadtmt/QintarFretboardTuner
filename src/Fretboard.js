import React, { Fragment, useState } from 'react'
import * as R from 'ramda'
import { simplify } from '@tonaljs/note'
import { chord } from '@tonaljs/chord'
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
  const initialChord = ''

  const [fretboard, setFretboard] = useState(
    generateFretboard(initialDeepestNote)
  )
  const [selectedChord, setSelectedChord] = useState(initialChord)
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
        <TonalInput
          initialValue={initialChord}
          label="Selected Chord"
          getTonal={chord}
          setTonal={chordValue => setSelectedChord(chordValue.name)}
          tonalType="chord"
          validTonal={chordValue => !chordValue.empty}
        />
      </form>
      <main>
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
