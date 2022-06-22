import * as React from 'react'
import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import App from '../final/06'
import App from '../exercise/06.extra-4'

beforeEach(() => jest.spyOn(window, 'fetch'))
afterEach(() => window.fetch.mockRestore())

test('displays the pokemon', async () => {
  const {container} = render(<App />)
  const input = screen.getByLabelText(/pokemon/i)
  const submit = screen.getByText(/^submit$/i)

  const statusElement  = container.querySelector('pre');

  expect(statusElement.textContent).toEqual('idle');

  // verify that an initial request is made when mounted
  await userEvent.type(input, 'pikachu')
  await userEvent.click(submit)

  expect(window.fetch).toHaveBeenCalled();
  expect(statusElement.textContent).toEqual('pending');

  await screen.findByRole('heading', {name: /pikachu/i});
  await screen.findByText(/resolved/i);

  expect(statusElement.textContent).toEqual('resolved');

  // verify that a request is made when props change
  await userEvent.clear(input)
  await userEvent.type(input, 'ditto')
  await userEvent.click(submit)

  await screen.findByRole('heading', {name: /ditto/i})

  // verify that when props remain the same a request is not made
  window.fetch.mockClear()
  await userEvent.click(submit)

  await screen.findByRole('heading', {name: /ditto/i})

  alfredTip(
    () => expect(window.fetch).not.toHaveBeenCalled(),
    'Make certain that you are providing a dependencies list in useEffect.',
  )

  // verify that an error msg is shown in case of failed results
  await userEvent.clear(input)
  await userEvent.type(input, 'pikachuxxx');
  await userEvent.click(submit)
  const errMsg = await screen.findByText(/There was an error:/i);
  expect(errMsg).toBeInTheDocument();
  // expect(statusElement.textContent).toEqual('rejected');

})
