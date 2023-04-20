
import styled from 'styled-components';

import { useState } from 'react';

import { CalendarHeader } from './CalendarHeader';
import { CalendarDates } from './CalendarDates';
import { CalendarTable } from './CalendarTable';

import { generateWeekDates, getActualWeek } from './../../utils/calendar.utils';


const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '740px',
  height: '100vh',
  maxHeight: '100vh',
  margin: '0 auto',
  position: 'relative'
})

const CalendarFooter = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#eee',
  borderTop: '1px solid #c5c5c5',
  height: '60px',
  padding: '0 10px',
  position: 'fixed',
  bottom: '0',
  width: '100%',
  maxWidth: '740px',
  margin: '0 auto'
})

const FooterButton = styled.button({
  border: 'none',
  backgroundColor: 'transparent',
  color: 'red',
  fontSize: '20px',
  fontWeight: '500',
  padding: '10px',

  cursor: 'pointer'
})

const checkedDates = {
  '20.04.2023': ['10:00', '11:00'],
  '23.04.2023': ['10:00', '12:00'],
}

export const Calendar = () => {
  const [activeWeek, setActiveWeek] = useState(getActualWeek())
  const [fulfilledCells, setFulfilledCells] = useState({...checkedDates}) 
  const [chosenCell, setChosenCell] = useState({
    day: '20.04.2023',
    time: '10:00'
  })

  const weekDays = generateWeekDates(activeWeek)

  const handleDelete = () => {
    setFulfilledCells(prevState => {
      return {
        ...prevState,
        [chosenCell.day]: prevState[chosenCell.day].filter(time => time !== chosenCell.time)
      }
    })
  }

  return (
    <Wrapper>
      <CalendarHeader onClickAdd={setFulfilledCells} chosenCell={chosenCell}/>
      <CalendarDates weekDays={weekDays} activeWeek={activeWeek} setActiveWeek={setActiveWeek}/>

      <CalendarTable
        dates={weekDays.map(el => el.calendarDate)}
        checkedDates={fulfilledCells}
        chosenCell={chosenCell}
        setChosenCell={setChosenCell}
      />

      <CalendarFooter>
        <FooterButton>Today</FooterButton>
          {
            chosenCell.day in fulfilledCells &&
            fulfilledCells[chosenCell.day].includes(chosenCell.time) &&
            <FooterButton onClick={handleDelete}>Delete</FooterButton>
          }
      </CalendarFooter>
    </Wrapper>
  )
}