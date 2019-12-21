import setChordIntervals from './setChordIntervals'
import { generateFretboard } from '.'
import { note } from '@tonaljs/tonal'

describe('setChordIntervals', () => {
  it('sets intervals C3maj', () => {
    const fretboard = generateFretboard('F1')
    const fretC3 = {
      fretIndex: 44,
      ...note('C3')
    }
    const maj = { name: 'major', intervals: ['1P', '3M', '5P'] }
    expect(setChordIntervals(fretboard, fretC3, maj)).toMatchSnapshot()
  })
  it('sets intervals C3maj', () => {
    const fretboard = generateFretboard('F1')
    const fretGd3 = {
      fretIndex: 32,
      ...note('G#3')
    }
    const maj = { name: 'major', intervals: ['1P', '3M', '5P'] }
    expect(setChordIntervals(fretboard, fretGd3, maj)).toMatchSnapshot()
  })
})
