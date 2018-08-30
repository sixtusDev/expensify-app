import React from 'react'
import numeral from 'numeral'
import  { connect } from 'react-redux'
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total'

export const ExpensesSummary = (props) => {
  const expenseWord = props.expensesCount === 1 ? 'expense' : 'expenses'
  return (
    <div>
      <h2>
        Viewing {props.expensesCount} {expenseWord} totalling {numeral(props.expensesTotal / 100).format('$0,0.00')}
      </h2>
    </div>
  )
}

const mapStateToProps = (state) => {
  const expenses = selectExpenses(state.expenses, state.filters)
  return {
    expensesCount: expenses.length,
    expensesTotal: selectExpensesTotal(expenses)
  }
}

export default connect(mapStateToProps)(ExpensesSummary)