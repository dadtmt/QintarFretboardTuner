import React, { useState } from 'react'
import { entries } from '@tonaljs/chord-dictionary'
import Autosuggest from 'react-autosuggest'

export const chordSuggestions = entries()
  .map(chordType => chordType.name)
  .filter(chordType => chordType)

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0
    ? chordSuggestions
    : chordSuggestions.filter(
        value => value.toLowerCase().slice(0, inputLength) === inputValue
      )
}

const getSuggestionValue = suggestion => suggestion

const renderSuggestion = suggestion => <div>{suggestion}</div>

function SuggestChord() {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState(chordSuggestions)
  const onChange = (event, { newValue }) => setValue(newValue)
  const onSuggestionsFetchRequested = ({ value }) =>
    setSuggestions(getSuggestions(value))
  const onSuggestionsClearRequested = () => setSuggestions(chordSuggestions)
  const inputProps = {
    placeholder: 'Choose a chord',
    value,
    onChange
  }

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  )
}

export default SuggestChord
