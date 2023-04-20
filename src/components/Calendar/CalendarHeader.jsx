import styled from "styled-components"

const Wrapper = styled.header({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '70px',
  padding: '0 15px'
})

const Title = styled.h1({
  margin: '0',
  fontSize: '20px',
  fontWeight: '500'
})

const Button = styled.button({
  padding: '10px',
  border: 'none',
  background: 'none',
  fontSize: '45px',
  lineHeight: '1',
  color: 'red',
  cursor: 'pointer'
})

export const CalendarHeader = ({onClickAdd, chosenCell}) => {
  const handleClick = (dateAndTime) => {
    onClickAdd(prevState => {
      const [date, time] = dateAndTime.split(' ')
      if (date in prevState) {
        if (prevState[date].includes(time)) {
          return prevState
        }

        return {
          ...prevState,
          [date]: [...prevState[date], time]
        }
      }

      return {
        ...prevState,
        [date]: [time]
      }
    })
  }

  return (
    <Wrapper>
      <Title>Interview Calendar</Title>
      <Button onClick={() => {
          const date = prompt("Enter event time: DD.MM.YYYY HH:mm", chosenCell.day + ' ' + chosenCell.time);
          if (!date) return
          
          if (date.length !== 16) {
            alert('Incorrect event time')
            return
          }
          handleClick(date)
      }}>+</Button>
    </Wrapper>
  )
}