import moment from 'moment'
import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('Should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

test('Should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[2].id
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([expenses[0], expenses[1]])
})

test('Should not remove expense from id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})

test('Should add an expense', () => {
  const expense = {
    id: '4',
    description: 'Electric bill',
    note: '',
    amount: 2300,
    createdAt: moment().add('4', 'months')
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([...expenses, expense])
})

test('Should edit an expense', () => {
  const updates = {
    description: 'Water bill',
    amount: 720
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates
  }
  const state = expensesReducer(expenses, action)
  expect(state[1]).toEqual({...state[1], ...updates})
})

test('Should not edit an expense if expense not found', () => {
  const updates = {
    description: 'Laptop',
    amount: 54000
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})