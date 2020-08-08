import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from './app-reducer';

let startState: InitialStateType

beforeEach(() => {
  startState = {
    status: 'idle',
    error: 'some error'
  }
})

test('correct change app status', () => {

  const endState = appReducer(startState, setAppStatusAC('loading'))

  expect(endState.status).toBe('loading')

})

test('app error message should be correct', () => {

  const endState = appReducer(startState, setAppErrorAC('ERROR'))

  expect(endState.error).toBe('ERROR')

})
