const monthYearHeading = document.getElementById('monthYear');
const dayHeading = document.getElementById('dayHeading');
const datesElement = document.getElementById('dates');

// Buttons
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let monthYear = new Date(); // Tracks the month and year in calendar view
let selectedDate = new Date(); // Tracks the selected date (DEBUG: set to first open slot in openSlots list)

const updateCalendar = () => {
    const currentYear = monthYear.getFullYear();
    const currentMonth = monthYear.getMonth();

    const firstDate = new Date(currentYear, currentMonth, 0);
    const lastDate = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDate.getDate();
    const firstDayIndex = (firstDate.getDay() + 1) % 7;
    const lastDayIndex = lastDate.getDay() + 1;

    const monthYearString = monthYear.toLocaleString('default', {month: 'long', year: 'numeric'});
    monthYearHeading.textContent = monthYearString;

    const dayHeadingString = selectedDate.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'});
    dayHeading.textContent = dayHeadingString;

    let datesHtml = '';

    // Loop to avoid adding the dates of the previous month
    for (let i = firstDayIndex; i > 0; i--) {
        datesHtml += `<div></div>`;
    }
    
    // Loop to add the dates of the current month
    for (let i = 1; i <= totalDays; i++) {
        // Store the date in each date button with data-date attribute
        const date = new Date(currentYear, currentMonth, i);
        const dateString = date.toDateString();
        // add class "selected" if date is the selectedDate
        const isSelected = isSameDate(date, selectedDate) ? 'selected' : '';
        // Add a marker to today's date only
        const calendarDate = isSameDate(date, new Date()) ? 
            `<span>${i}</span><div class="today-marker"></div>` :
            `${i}`;
        const isDisabled = isDayAvailable(date) ? '' : 'disabled';
        datesHtml += `<button class="date ${isSelected}" data-date="${dateString}" ${isDisabled}>${calendarDate}</button>`;
    }

    // Loop to avoid adding the dates of the next month
    for (let i = 1; i <= 7 - lastDayIndex; i++) {
        datesHtml += `<div></div>`;
    }

    datesElement.innerHTML = datesHtml;
    // Dynamically set the slots-container height
    setSlotsContainerHeight();
};

const populateOpenSlots = () => {
    const slotsContainer = document.getElementById('slotsContainer');
    let slotsHtml = '';
    for (let i = 0; i < 24; i++) {
        slotsHtml += `<button class="slot">${i}:00_m</button>`;
    }
    slotsContainer.innerHTML = slotsHtml;
};

const setSlotsContainerHeight = () => {
    const days = document.getElementById('days');
    const dates = document.getElementById('dates');
    const padding = 26;
    const slotsContainer = document.getElementById('slotsContainer');

    let calendarHeight = days.offsetHeight + dates.offsetHeight + padding;
    slotsContainer.style.height = `${calendarHeight}px`;
};

const isSameDate = (date1, date2)  => {
    return date1.toDateString() === date2.toDateString();
};

const isDayAvailable = (date) => {
    // DEBUG: return true only if found in openSlots list
    if (date.getDay() == 0 || date.getDay() == 6) {
        return false;
    }
    return true;
};

prevBtn.addEventListener('click', () => {
    monthYear.setMonth(monthYear.getMonth() - 1);
    updateCalendar();
});

nextBtn.addEventListener('click', () => {
    monthYear.setMonth(monthYear.getMonth() + 1);
    updateCalendar();
});

datesElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('date')) {
        const date = event.target.getAttribute('data-date');
        selectedDate = new Date(date);
        updateCalendar();
    }
});

updateCalendar();
populateOpenSlots();
