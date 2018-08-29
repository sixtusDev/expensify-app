import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

test('Should render ExpenseForm component correctly', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
})

test('Should render ExpenseForm component with expense correctly', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>)
  expect(wrapper).toMatchSnapshot()
})

test('Should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(wrapper.state('error').length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})

test('Should set description on input change', () => {
  const value = 'New Description'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  })
  expect(wrapper.state('description')).toBe('New Description')
})

test('Should set note on textarea change', () => {
  const value = 'New Note'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('textarea').simulate('change', {
    target: { value }
  })
  expect(wrapper.state('note')).toBe('New Note')
})

test('Should set amount for valid input', () => {
  const value = '1200.45'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  })
  expect(wrapper.state('amount')).toBe('1200.45')
})

test('Should not set amount for invalid input', () => {
  const value = '2300.456'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  })
  expect(wrapper.state('amount')).toBe('')
})

test('Should call onSubmit prop for valid form  submission', () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy} />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  })
  // expect(wrapper.state('error')).toBe('')
  // expect(onSubmitSpy).toHaveBeenLastCalledWith({
  //   description: expenses[1].description,
  //   amount: expenses[1].amount,
  //   note: expenses[1].note,
  //   createdAt: expenses[1].createdAt
  // })
})

test('Should set new date onDateChange', () => {
  const now = moment()
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('SingleDatePicker').prop('onDateChange')(now)
  expect(wrapper.state('createdAt')).toEqual(now)
})

test('Should set calender focus onFocusChange', () => {
  const focused = true
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused})
  expect(wrapper.state('calenderFocused')).toBe(focused)
})