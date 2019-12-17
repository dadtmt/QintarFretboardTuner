import {
  generateFretboard,
  generateString,
  generateStringsFromDeepestNote,
  setChordIntervals
} from './index'

describe('generateString', () => {
  it('generates E4 string', () => {
    expect(generateString('e4')).toMatchSnapshot()
  })

  it('generates A3 string', () => {
    expect(generateString('a3')).toMatchSnapshot()
  })
})

describe('generateString', () => {
  it('generates a P5 StringsFlatNote', () => {
    expect(generateStringsFromDeepestNote('F1')).toMatchSnapshot()
  })

  it('generates a 10 P5 StringsFlatNote', () => {
    expect(generateStringsFromDeepestNote('F1', 10)).toMatchSnapshot()
  })
})

describe('generateFretboard', () => {
  it('generates a fretBoard', () => {
    expect(generateFretboard('F1')).toMatchSnapshot()
  })
})

describe('setChordIntervals', () => {
  it('sets the tonic', () => {
    const fretboard = generateFretboard('F1')
    const tonicE4 = 0
    const chordType = { name: 'major', intervals: ['1P', '3M', '5P'] }
    expect(setChordIntervals(fretboard, tonicE4, chordType)).toMatchSnapshot()
  })
})
