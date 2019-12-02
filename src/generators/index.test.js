import {generateString} from './index'

it('generates E4 string', () => {
    expect(generateString('e4')).toMatchSnapshot()
})

it('generates A3 string', () => {
    expect(generateString('a3')).toMatchSnapshot()
})

