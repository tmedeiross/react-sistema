import React from 'react';
import { shalow } from 'enzyme';
import App from './App';

it('should render as expected', () => {
  const wrapper = shalow(<App />);

  expect(wrapper);
});
