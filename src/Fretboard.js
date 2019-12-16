import React, { Fragment, useState } from 'react'
import { simplify } from '@tonaljs/note'
import { chord } from '@tonaljs/chord'
import classNames from 'classnames'
import { generateFretboard } from './generators'
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

function Fretboard() {
  const initialDeepestNote = 'F1'
  const initialChord = ''

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
          {fretboard.map(guitarString => (
            <li key={guitarString[0]}>
              <ol>
                {guitarString.map(fret => (
                  <li
                    key={fret}
                    className={classNames(
                      chord(selectedChord).intervals[
                        chord(selectedChord).notes.indexOf(fret)
                      ] &&
                        `_${
                          chord(selectedChord).intervals[
                            chord(selectedChord).notes.indexOf(fret)
                          ]
                        }`
                    )}>
                    {fret}
                    <div>
                      {
                        chord(selectedChord).intervals[
                          chord(selectedChord).notes.indexOf(fret)
                        ]
                      }
                    </div>
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
