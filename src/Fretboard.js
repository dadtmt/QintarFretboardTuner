import React, { Fragment, useState } from 'react'
import { simplify } from '@tonaljs/note'
import { generateFretboard } from './generators'
import './Fretboard.css'

function Fretboard() {
  const [inputError, setInputError] = useState(false)
  const [lowestNote, setLowestNote] = useState('F1')
  const [fretboard, setFretboard] = useState(generateFretboard('F1'))

  return (
    <Fragment>
      <form action="">
        <label htmlFor="lowest-note">
          Lowest note:
          <input
            type="text"
            value={lowestNote}
            onChange={e => {
              const value = e.target.value
              const noteValue = simplify(value)
              if (noteValue) {
                setInputError(false)
                setFretboard(generateFretboard(noteValue))
              } else {
                setInputError(true)
              }
              setLowestNote(value)
            }}
          />
        </label>
        {inputError && <span>not a valid note</span>}
      </form>
      <main>
        <ol>
          {fretboard.map(string => (
            <li key={string.flatNote}>{string.flatNote}</li>
          ))}
        </ol>
        <ol>
          {fretboard.map(string => (
            <li key={string.flatNote}>
              <ol>
                {string.frets.map(fret => (
                  <li key={fret}>{fret}</li>
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
