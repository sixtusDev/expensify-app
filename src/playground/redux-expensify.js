import { createStore, combineReducers} from 'redux'
import uuid from 'uuid'

// Action Generators
// Add Expense action generator
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

// Remove Expense action generator
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

// Edit Expense action generator
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// Set Text Filter action generator
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

// Sort by amount action generator
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
})

// Sort by date action generator
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})

// Set start date action generator
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})

// Set end date action generator
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})


// Expenses Reducer
const expensesReducerDefaultState = []
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ]
    case 'REMOVE_EXPENSE':
      return state.filter((expense) => expense.id !== action.id)
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense
        }
      })
    default:
      return state
  }
}

// Filters Reducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state
  }
}

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

    return startDateMatch && endDateMatch && textMatch
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1
    }
  })
}

// Store Creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
)

store.subscribe(() => {
  const state = store.getState()
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses)
})

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -11000 }))
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 300, createdAt: -1000 }))

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// store.dispatch(setTextFilter('cof'))
// store.dispatch(setTextFilter())

store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// store.dispatch(setStartDate(-100))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(999))

const demoState = {
  expenses: [{
    id: 'ghjkl34567',
    description: 'January Rent',
    note: 'This was the final rent for that address',
    amount: 54000,
    createdAt: 0
  }],
  filters: {
    text: 'Rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
}
