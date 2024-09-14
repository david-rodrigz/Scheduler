const monthYear = document.getElementById('monthYear');
const dayHeading = document.getElementById('dayHeading');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDate = new Date(currentYear, currentMonth, 0);
    const lastDate = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDate.getDate();
    const firstDayIndex = (firstDate.getDay() + 1) % 7;
    const lastDayIndex = lastDate.getDay() + 1;

    const monthYearString = currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
    monthYear.textContent = monthYearString;

    const dayHeadingString = currentDate.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'});
    dayHeading.textContent = dayHeadingString;

    let datesHtml = '';

    // Loop to add the dates of the previous month that appear in the current month's calendar view
    for (let i = firstDayIndex; i > 0; i--) {
        const prevDate = new Date(currentYear, currentMonth, 1 - i);
        // datesHtml += `<div class="date inactive">${prevDate.getDate()}</div>`;
        datesHtml += `<div></div>`;
    }
    
    // Loop to add the dates of the current month
    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
        datesHtml += `<div class="date ${activeClass}">${i}</div>`;
    }

    // Loop to add the dates of the next month that appear in the current month's calendar view
    for (let i = 1; i <= 7 - lastDayIndex; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        // datesHtml += `<div class="date inactive">${nextDate.getDate()}</div>`;
        datesHtml += `<div></div>`;
    }

    datesElement.innerHTML = datesHtml;
};

const populateOpenSlots = () => {
    const slotsContainer = document.getElementById('slotsContainer');
    let slotsHtml = '';
    for (let i = 0; i < 24; i++) {
        slotsHtml += `<div class="slot">${i}:00_m</div>`;
    }
    slotsContainer.innerHTML = slotsHtml;
};

const setSchedulerHeight = () => {
    const calendar = document.getElementById('calendar');
    const slotsContainer = document.getElementById('slotsContainer');

    let calendarHeight = calendar.offsetHeight;
    slotsContainer.style.height = `${calendarHeight}px`;
};

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

updateCalendar();
setSchedulerHeight();
populateOpenSlots();
