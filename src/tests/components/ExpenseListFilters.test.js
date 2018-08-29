import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import { filters, altFilters} from '../fixtures/filters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
  setTextFilter = jest.fn()
  sortByDate = jest.fn()
  sortByAmount = jest.fn()
  setStartDate = jest.fn()
  setEndDate = jest.fn()

  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  )
})

test('Should render ExpenseListFilter correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('Should render ExpenseListFilter with alt filters correctly', () => {
  wrapper.setProps({
    filters: {altFilters}
  })
  expect(wrapper).toMatchSnapshot()
})

test('Should handle text change', () => {
  const value = 'filter text'
  wrapper.find('input').simulate('change', {
    target: { value }
  })
  expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('Should sort by date', () => {
  const value = 'date'
  wrapper.setProps({
    filters: altFilters
  })
  wrapper.find('select').simulate('change', {
    target: { value }
  })
  expect(sortByDate).toHaveBeenCalled()
})

test('Should sort by amount', () => {
  const value = 'amount'
  wrapper.find('select').simulate('change', {
    target: { value }
  })
  expect(sortByAmount).toHaveBeenCalled()
})

test('Should handle date changes', () => {
  const startDate = moment(0)
  const endDate = moment(0).add('4', 'days')
  wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate})
  expect(setStartDate).toHaveBeenCalledWith(startDate)
  expect(setEndDate).toHaveBeenCalledWith(endDate)
})

test('Should handle date focus changes', () => {
  const calenderFocused = 'startDate'
  wrapper.find('DateRangePicker').prop('onFocusChange')(calenderFocused)
  expect(wrapper.state('calenderFocused')).toBe(calenderFocused)
})

