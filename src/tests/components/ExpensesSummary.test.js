import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('Should render ExpensesSummary correctly with no expenses', () => {
  const wrapper = shallow(
    <ExpensesSummary expensesCount={0} expensesTotal={0}/>
  )
  expect(wrapper).toMatchSnapshot()
})

test('Should render ExpensesSummary correctly with multiple expenses', () => {
  const wrapper = shallow(
    <ExpensesSummary expensesCount={50} expensesTotal={120003044458}/>
  )
  expect(wrapper).toMatchSnapshot()
})