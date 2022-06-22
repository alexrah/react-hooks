import * as React from 'react'
import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import App from '../final/06'
import App from '../exercise/06.extra-5'
import async from "async";

// jest.useFakeTimers();
// jest.spyOn(global, 'setTimeout');

beforeEach(() => {
  jest.spyOn(window, 'fetch')
})
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
  /* useless: use test above instead*/
  expect(statusElement.textContent).toEqual('resolved');

  await expect( async () => await screen.findByText(/There was an error:/i) ).rejects.toThrow();
  // await waitFor( () => expect(screen.queryByText(/There was an error:/i)).toBeNull() )

  // verify that a request is made when props change
  await userEvent.clear(input)
  await userEvent.type(input, 'ditto')
  await userEvent.click(submit)

  await screen.findByRole('heading', {name: /ditto/i})

  // verify that when props remain the same a request is not made
  window.fetch.mockClear()
  await userEvent.click(submit)

  await screen.findByRole('heading', {name: /ditto/i})

  await expect( async () => await screen.findByText(/There was an error:/i) ).rejects.toThrow()

  alfredTip(
    () => expect(window.fetch).not.toHaveBeenCalled(),
    'Make certain that you are providing a dependencies list in useEffect.',
  )

  // verify that an error msg is shown in case of failed results
  await userEvent.clear(input)
  await userEvent.type(input, 'pikachuxxx');
  await userEvent.click(submit)

  // let test = await expect( async() => await screen.findByText(/There was an error:/i)).resolves.toBeInTheDocument()
  let test = await screen.findByText(/There was an error:/i)
  expect(test).toBeInTheDocument();

  // console.log("AAA",`${date.getMinutes().toString()}:${date.getMilliseconds().toString()}`);
  // screen.debug()
  // const wait = await waitFor( async () => await expect(window.fetch).rejects.toThrow(),{ timeout: 10000} );

  // await expect(window.fetch).resolves.toBe(expect.any(Promise))
  //   date = new Date
  //   console.log("ZZZ",`${date.getMinutes().toString()}:${date.getMilliseconds().toString()}`);
  //   screen.debug()

  // if(wait){
  //   console.log(typeof wait);
  //   console.log(wait)
  //   date = new Date
  //   console.log("BBB",`${date.getMinutes().toString()}:${date.getMilliseconds().toString()}`);
  // }

  // await waitFor( () => expect(screen.queryByText(/There was an error:/i)).toBeInTheDocument() )

  // expect(statusElement.textContent).toEqual('rejected');

  // test for ErrorBoundary reset after an error
  await userEvent.clear(input);
  await userEvent.type(input,'bulbasaur');
  await userEvent.click(submit);
  await screen.findByRole('heading', {name: /bulbasaur/i})
  // let errMsg = await screen.findByText(/There was an error:/i);
  // expect(errMsg).toThrow();
  await expect( async () => await screen.findByText(/There was an error:/i) ).rejects.toThrow()


},20000)
