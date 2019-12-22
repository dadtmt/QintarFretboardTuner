import React from 'react'
import ReactDOM from 'react-dom'
import SuggestChord from './SuggestChord'
import renderer, { act } from 'react-test-renderer'
import { toMatchDiffSnapshot } from 'snapshot-diff'

expect.extend({ toMatchDiffSnapshot })

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
