import React from 'react'
import ReactDOM from 'react-dom'
import Fretboard from './Fretboard'
import renderer, { act } from 'react-test-renderer'
import { toMatchDiffSnapshot } from 'snapshot-diff'

expect.extend({ toMatchDiffSnapshot })

it('renders correctly', () => {
  const component = renderer.create(<Fretboard />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  const wrongNoteEventValue = { target: { value: 'xVfGu' } }
  act(() => {
    component.root.findAllByType('input')[0].props.onChange(wrongNoteEventValue)
  })

  const wrongNoteEventUpdate = component.toJSON()
  expect(tree).toMatchDiffSnapshot(wrongNoteEventUpdate)
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Fretboard />, div)
  ReactDOM.unmountComponentAtNode(div)
})
