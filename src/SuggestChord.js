import React from 'react'
import { entries } from '@tonaljs/chord-dictionary'

export const chordSuggestions = entries()
  .map(chordType => chordType.name)
  .filter(chordType => chordType)

function SuggestChord() {
  return <div>SuggestChord</div>
}

export default SuggestChord
