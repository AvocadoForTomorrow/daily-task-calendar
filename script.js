/****************
  Configuration
*****************/

// If you want to control the starting month/year, you can do so here:
const currentDate = new Date();
let currentMonth = currentDate.getMonth();  // 0-11 (0 = January, 11 = December)
let currentYear = currentDate.getFullYear();

/****************
  Generating the Calendar
*****************/

const calendarContainer = document.getElementById('calendar');

// A function to render a month grid
function renderCalendar(month, year) {
  // Clear existing calendar
  calendarContainer.innerHTML = '';

  // Create month header
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthDiv = document.createElement('div');
  monthDiv.className = 'month';
  monthDiv.textContent = `${monthNames[month]} ${year}`;
  calendarContainer.appendChild(monthDiv);

  // Create next/prev buttons
  const navDiv = document.createElement('div');
  navDiv.style.textAlign = 'center';
  
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.addEventListener('click', () => {
    changeMonth(-1);
  });
  
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.addEventListener('click', () => {
    changeMonth(1);
  });

  navDiv.appendChild(prevButton);
  navDiv.appendChild(nextButton);
  calendarContainer.appendChild(navDiv);

  // Create a grid container for days
  const calendarGrid = document.createElement('div');
  calendarGrid.className = 'calendar-grid';

  // Determine how many days in the month
  // If month is 11 (December) and we add 1, it becomes 12 (January), then year + 1
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Determine the day of the week the month starts on
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0-6 (0 = Sunday, 6 = Saturday)

  // Add blank days for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyDay = document.createElement('div');
    calendarGrid.appendChild(emptyDay);
  }

  // Fill in the days of the month
  for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';

    // Display the date number
    dayDiv.textContent = dayNum;

    // Retrieve the status (green or red) from local storage if available
    const dayKey = `${year}-${month}-${dayNum}`;
    const dayStatus = localStorage.getItem(dayKey);

    // If saved as 'done', mark as green
    if (dayStatus === 'done') {
      dayDiv.classList.add('green');
    }

    // Handle clicks
    dayDiv.addEventListener('click', () => {
      toggleDayStatus(dayKey, dayDiv);
    });

    calendarGrid.appendChild(dayDiv);
  }

  calendarContainer.appendChild(calendarGrid);
}

function toggleDayStatus(key, dayElement) {
  if (dayElement.classList.contains('green')) {
    // If it's currently green (done), revert to red (not done)
    dayElement.classList.remove('green');
    localStorage.removeItem(key);
  } else {
    // If it's currently red (not done), make it green (done)
    dayElement.classList.add('green');
    localStorage.setItem(key, 'done');
  }
}

// Change the month by offset (+1 next, -1 previous)
function changeMonth(offset) {
  currentMonth += offset;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
}

// Initially render the current month
renderCalendar(currentMonth, currentYear);
