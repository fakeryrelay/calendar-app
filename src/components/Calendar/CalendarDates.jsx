import styled from "styled-components";

Date.prototype.getFirstMondayDate = function() {
  let firstMondayDate = 1;

  const onejan = new Date(this.getFullYear(), 0, 1);
  for (let i = 0; i < 7; i++) {
    if (onejan.getDay() === 1) {
      return firstMondayDate
    }
    firstMondayDate += 1;
    onejan.setDate(onejan.getDate() + 1)
  }
}

const Wrapper = styled.div({
  borderTop: '1px solid #e5e5e5',
  borderBottom: '1px solid #e5e5e5',
  backgroundColor: '#f5f5f5',
  padding:  '8px 8px 15px 50px',
})

const Dates = styled.div({
  display: 'flex',
  justifyContent: 'space-around',
  textTransform: 'uppercase',
  fontWeight: '500',
  textAlign: 'center'
})

const NavFooter = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavButton = styled.button`
  padding: 0 5px;
  width: calc(100% / 7);
  border: none;
  background-color: transparent;
  color: red;
  font-size: 25px;
  line-height: 1;
  cursor: pointer;
`

export const CalendarDates = ({weekDays, activeWeek ,setActiveWeek}) => {
  const year = new Date().getFullYear();
  const monthName = new Date(year, 0, ((activeWeek - 1) * 7) + new Date().getFirstMondayDate()).toLocaleString('default', { month: 'long' });

  return (
    <Wrapper>
      <Dates>
        {weekDays.map(day => (
            <div key={`${day.name} ${day.calendarDate}`}>
              <div style={{marginBottom: '3px', fontSize: '11px'}}>{day.name}</div>
              <div>{day.calendarDate.slice(0, 2)}</div>
            </div>
          )
        )}
      </Dates>

      <NavFooter>
        <NavButton className='active' onClick={() => setActiveWeek(prevState => prevState - 1)}>«</NavButton>
        {/* <button onClick={() => setActiveWeek(prevState => prevState - 1)}>«</button> */}
        <div style={{textTransform: 'capitalize'}}>{monthName} {year}</div>
        <NavButton onClick={() => setActiveWeek(prevState => prevState + 1)}>»</NavButton>
      </NavFooter>
    </Wrapper>
  )
}