import {generateFretboard, generateString, generateStringsFromDeepestNote} from './index'

it('generates E4 string', () => {
    expect(generateString('e4')).toMatchSnapshot()
})

it('generates A3 string', () => {
    expect(generateString('a3')).toMatchSnapshot()
})

it('generates a P5 StringsFlatNote', () => {
    expect(generateStringsFromDeepestNote("F1")).toMatchSnapshot()
})

it('generates a Quart fretboard', () => {
    expect(generateFretboard()).toMatchSnapshot()
})
