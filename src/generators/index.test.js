import {addSemitone, areInSameOctave, generateFret, generateString} from './index'

describe ("areInSameOctave", () => {
    it("E4 and F4 are in the same octave", () => {
        expect(areInSameOctave("e4", "f4")).toBeTruthy()
    })
    it("F4 and E5 are same octave", () => {
        expect(areInSameOctave("f4", "e5")).toBeTruthy()
    })
    it("E4 and E5 are not in the same octave", () => {
        expect(areInSameOctave("e4", "e5")).toBeFalsy()
    })
    it("E4 and F5 are not the same octave", () => {
        expect(areInSameOctave("e4", "f5")).toBeFalsy()
    })
})

describe ("generateFret", () => {
    it("returns next semitone", () => {
        expect(generateFret('E4')('E4')).toEqual(['F4','F4'])
    })
    it("returns next semitone", () => {
        expect(generateFret('E4')('F4')).toEqual(['Gb4', 'Gb4'])
    })
    it("returns false when fret is the octave above the flat note", () => {
        expect(generateFret('E4')('E5')).toBeFalsy()
    })
})

it('generates E4 string', () => {
    expect(generateString('e4')).toMatchSnapshot()
})
