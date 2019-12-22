import React from 'react'
import ReactDOM from 'react-dom'
import renderer, { act } from 'react-test-renderer'
import { toMatchDiffSnapshot } from 'snapshot-diff'
import SuggestChord, { chordSuggestions } from './SuggestChord'

expect.extend({ toMatchDiffSnapshot })

describe('chordSuggestions', () => {
  it('suggest all chord names', () => {
    expect(chordSuggestions).toMatchSnapshot()
  })
})

describe('SuggestChord', () => {
  it('renders correctly', () => {
    const component = renderer.create(<SuggestChord />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SuggestChord />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
