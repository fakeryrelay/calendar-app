import styled from "styled-components"

const Wrapper = styled.div({
  display: "flex",
  overflowY: 'scroll',
  marginBottom: '60px'
})

const CalendarColumn = styled.div({
  display: "flex",
  flexDirection: 'column',
  width: 'calc(100% / 7)'
})

const CalendarCell = styled.button(({background = '#fff', opacity = '.5'}) => ({
  minHeight: '46px',
  border: 'none',
  backgroundColor: background,
  padding: '0px',
  margin: '2px',
  borderTop: '1px solid #eee',
  borderRight: '1px solid #eee',

  opacity: opacity,
  cursor: "pointer"
}))

const TimeColumn = styled.div({
  display: "flex",
  flexDirection: 'column',
  width: '50px'
})


const TimeCell = styled.div({
  minHeight: '50px',
  position: 'relative'
})

const TimeText = styled.span({
  fontSize: '14px',
  color: '#000',
  lineHeight: '1',
  opacity: '.5',

  position: 'absolute',
  top: '-7px',
  right: '4px'
})

export const CalendarTable = ({dates, checkedDates, chosenCell, setChosenCell}) => {
  return (
    <Wrapper>
      <TimeColumn>
        {Array(24).fill('').map((_, i) => {
          if (i === 0) return <TimeCell key={i} />

          return (
            <TimeCell key={i}>
              <TimeText>{`${i < 10 ? '0' + i : String(i)}:00`}</TimeText>
            </TimeCell>
          )
        })}
      </TimeColumn>

      {dates.map((day) => (
        <CalendarColumn key={day}>
          {Array(24).fill('').map((_, i) => {
            const time = `${i < 10 ? '0' + i : String(i)}:00`
            const backgroundColor = day in checkedDates ? checkedDates[day].includes(time) ? 'MediumPurple' : undefined : undefined
            const opacity = chosenCell.day === day ? chosenCell.time === time ? '1' : undefined : undefined

            return (
              <CalendarCell key={`${day} ${time}`} onClick={() => setChosenCell({
                day: day,
                time: time
              })} background={backgroundColor} opacity={opacity} />
            )
          })}
        </CalendarColumn>
      ))}
    </Wrapper>
  )
}