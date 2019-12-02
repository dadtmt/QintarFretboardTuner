import React from 'react';
import ReactDOM from 'react-dom';
import Fretboard from './Fretboard';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Fretboard />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Fretboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});

