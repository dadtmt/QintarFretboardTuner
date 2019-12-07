import {
  generateFretboard,
  generateString,
  generateStringsFromDeepestNote
} from './index'

it('generates E4 string', () => {
  expect(generateString('e4')).toMatchSnapshot()
})

it('generates A3 string', () => {
  expect(generateString('a3')).toMatchSnapshot()
})

it('generates a P5 StringsFlatNote', () => {
  expect(generateStringsFromDeepestNote('F1')).toMatchSnapshot()
})

it('generates a 10 P5 StringsFlatNote', () => {
  expect(generateStringsFromDeepestNote('F1', 10)).toMatchSnapshot()
})

it('generates a Quintar fretboard', () => {
  expect(generateFretboard('F1')).toMatchSnapshot()
})
