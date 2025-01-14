import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import App from '../final/01'
import App from '../exercise/01.extra-1'

test('typing a name shows a greeting', async () => {
  render(<App />)
  const regexMatch = /Frank/i;
  expect(screen.getByText(regexMatch)).toBeInTheDocument();
  expect(screen.getByDisplayValue(regexMatch)).toBeInTheDocument();
})
