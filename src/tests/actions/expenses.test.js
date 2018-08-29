import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

test('Should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' })
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

test('Should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' })
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  })
})

test('Should setup add expense action object with provide arguments', () => {
  const expenseData = {
    description: 'Rent',
    amount: 12500,
    note: 'February rent',
    createdAt: 1000
  }
  const action = addExpense(expenseData)
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  })
})

test('Should setup add expense action object with default parameters', () => {
  const action = addExpense()
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: '',
      amount: 0,
      note: '',
      createdAt: 0,
      id: expect.any(String)
    }
  })
})