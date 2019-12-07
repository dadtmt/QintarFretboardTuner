import React from 'react'
import { generateFretboard } from './generators'
import './Fretboard.css'

function Fretboard () {
  const fretboard = generateFretboard('F1')
  return (<main>
    <ol>
      {fretboard.map(
        string => <li key={string.flatNote}>{string.flatNote}</li>
      )}
    </ol>
    <ol>
      {fretboard.map(
        string => <li key={string.flatNote}>
          <ol>
            {
              string.frets.map(fret => <li key={fret}>{fret}</li>)
            }
          </ol>
        </li>
      )}
    </ol>
  </main>)
}

export default Fretboard
