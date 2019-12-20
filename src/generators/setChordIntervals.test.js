import { generateFretboard, setChordIntervals } from './index'

describe('setChordIntervals C3maj', () => {
  it('sets the tonic', () => {
    const fretboard = generateFretboard('F1')
    const indexC3 = 44
    const maj = { name: 'major', intervals: ['1P', '3M', '5P'] }
    expect(setChordIntervals(fretboard, indexC3, maj)).toMatchSnapshot()
  })
})
