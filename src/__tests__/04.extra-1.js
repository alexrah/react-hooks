import * as React from 'react'
import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import App from '../final/04.extra-1'
import App from '../exercise/04.extra-1'

test('can play a game of tic tac toe', async () => {
  const {container} = render(<App />)



  // prettier-ignore
  const [
    s1, s2, s3,
    s4, s5, s6,
    s7, s8, s9 // eslint-disable-line no-unused-vars
  ] = Array.from(container.querySelectorAll('button'))


  // console.log('XXX');
  const regexPlayer = new RegExp(/Next player: (X|O)/,'i');
  const statusText = screen.getByText(/Next player/i).textContent
  // console.log(statusText);

  const matches = regexPlayer.exec(statusText);
  // console.log('YY');
  // console.log(matches)

  const firstPlayer = matches[1];
  const secondPlayer = firstPlayer === "X" ? "O" : "X";

  // screen.debug();

  expect(screen.getByText(`Next player: ${firstPlayer}`)).toBeInTheDocument()

  await userEvent.click(s1)
  expect(s1).toHaveTextContent(firstPlayer)

  expect(screen.getByText(`Next player: ${secondPlayer}`)).toBeInTheDocument()
  await userEvent.click(s5)
  expect(s5).toHaveTextContent(secondPlayer)

  expect(screen.getByText(`Next player: ${firstPlayer}`)).toBeInTheDocument()
  await userEvent.click(s9)
  expect(s9).toHaveTextContent(firstPlayer)

  expect(screen.getByText(`Next player: ${secondPlayer}`)).toBeInTheDocument()
  await userEvent.click(s7)
  expect(s7).toHaveTextContent(secondPlayer)

  expect(screen.getByText(`Next player: ${firstPlayer}`)).toBeInTheDocument()
  await userEvent.click(s3)
  expect(s3).toHaveTextContent(firstPlayer)

  expect(screen.getByText(`Next player: ${secondPlayer}`)).toBeInTheDocument()
  await userEvent.click(s2)
  expect(s2).toHaveTextContent(secondPlayer)

  expect(screen.getByText(`Next player: ${firstPlayer}`)).toBeInTheDocument()
  await userEvent.click(s6)
  expect(s6).toHaveTextContent(firstPlayer)

  // game is over so no more moves may be played
  expect(screen.getByText(`Winner: ${firstPlayer}`)).toBeInTheDocument()
  await userEvent.click(s4)
  expect(s4).toHaveTextContent('')

  alfredTip(
    () =>
      expect(JSON.parse(window.localStorage.getItem('tic'))).toEqual(
        // prettier-ignore
        [
          'X', 'O', 'X',
          null, 'O', 'X',
          'O', null, 'X',
        ],
      ),
    'Make sure that the "squares" localStorage item is updated with the JSON.stringified squares',
      true
  )
})
