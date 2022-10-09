const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
]
const DAYS = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT'
]

//아래에 있는 변수 2개는 달력 날짜 클릭이나 prev next 월 변경으로 인해 값이 바뀔 것이다.
let displayDayIndex = new Date().getDay()
let displayDate = new Date().getDate()

//아래에 있는 변수 2개를 기준 삼아서 drawCalendar 함수를 실행한다. 이 변수들은 달력 날짜 클릭으로 인해 값이 바뀔 것이다.
let displayMonthIndex = new Date().getMonth()
let displayYear = new Date().getFullYear()

function drawCalendar() {
  const currentDay = document.querySelector('.current-day')
  currentDay.textContent = `${DAYS[displayDayIndex]}`

  const currentDate = document.querySelector('.current-date')
  currentDate.textContent = `${displayDate}`

  document.querySelectorAll('td').forEach(td => {
    td.textContent = ''
    td.classList.remove('its-today')}) //기존 달력 다 지우기

  const currentMonthYear = document.querySelector('.current-month-year')
  currentMonthYear.textContent = `${MONTHS[displayMonthIndex]} ${displayYear}`

  const tempYear = displayYear
  const tempMonth = (displayMonthIndex + 1).toString()
  let weekNum = 1

  for (let i=1; i<=31; i++) {
    const tempDate = new Date(`${tempYear}-${tempMonth}-${i}`)
    if (i === tempDate.getDate()) { //2022-11-31 getDate 하면 1일이 나온다. i랑 날짜를 비교해서 둘이 일치할 때까지만 td에 숫자값을 추가한다. (해당 월 마지막 날짜까지만 표시하는 셈)
      const dayNum = tempDate.getDay() + 1

      const newTd = document.querySelector(`.calendar-table tbody tr:nth-child(${weekNum}) td:nth-child(${dayNum})`)
      newTd.textContent = i
      newTd.id = `${i}${tempDate.getDay()}` //changeDisplay함수 실행할 때 식별자로 활용

      if (i === new Date().getDate() && displayMonthIndex === new Date().getMonth() && displayYear === new Date().getFullYear()) {
        newTd.classList.add('its-today') //오늘 날짜는 검은색 말고 다른 색으로 표시
      }

      if(dayNum === 7) {
        weekNum++ //이 날이 토요일이라면 몇번째주를 나타내는 weekNum을 1증가시켜서 다음날이 줄바꿈해서 달력에 나타도록 한다.
      }
    }
  }
}

drawCalendar()

function prev() {
  if (displayMonthIndex === 0) {
    displayMonthIndex = 11 //1월에서 전년도 12월로 넘어감
    displayYear -- //1월 표시 상태에서 prev 누르면 1년 감소
  }
  else {
    displayMonthIndex = (displayMonthIndex - 1) % 12
  }
  displayDate = 1 //월 변경하면 해당 월 1일로 맞춰서 day date 표시한다.
  displayDayIndex = new Date(`${displayYear}-${displayMonthIndex + 1}-${displayDate}`).getDay()
  drawCalendar()
}

function next() {
  if (displayMonthIndex === 11) {
    displayYear ++ //12월 표시 상태에서 next 누르면 1년 증가
  }
  displayMonthIndex = (displayMonthIndex + 1) % 12

  displayDate = 1 //월 변경하면 해당 월 1일로 맞춰서 day date 표시한다.
  displayDayIndex = new Date(`${displayYear}-${displayMonthIndex + 1}-${displayDate}`).getDay()
  drawCalendar()
}

const buttonPrev = document.querySelector('.button-prev')
buttonPrev.addEventListener('click', prev)

const buttonNext = document.querySelector('.button-next')
buttonNext.addEventListener('click', next)

function changeDisplay(e) {
  if (e.target.id) {
    const id = parseInt(e.target.id)
    displayDayIndex = id % 10
    displayDate = (id - id % 10) / 10
    drawCalendar()
  }
}

const tds = document.querySelectorAll('td')
tds.forEach(td => td.addEventListener('click', changeDisplay))