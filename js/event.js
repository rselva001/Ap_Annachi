// ========== Mobile menu functionality ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const body = document.body;

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  mobileMenuOverlay.classList.toggle('active');
  body.classList.toggle('menu-open');
  const icon = mobileMenuBtn.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

mobileMenuOverlay.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  mobileMenuOverlay.classList.remove('active');
  body.classList.remove('menu-open');
  const icon = mobileMenuBtn.querySelector('i');
  icon.classList.remove('fa-times');
  icon.classList.add('fa-bars');
});

document.querySelectorAll('.mobile-menu-links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    body.classList.remove('menu-open');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// ========== Calendar functionality ==========
const calendarDays = document.querySelector('.calendar-days');
const calendarMonth = document.querySelector('.calendar-month');
const prevBtn = document.querySelector('.calendar-prev');
const nextBtn = document.querySelector('.calendar-next');
const selectedDateEl = document.querySelector('.selected-date');
const eventList = document.querySelector('.event-list');

let currentDate = new Date();
let allEvents = [];

prevBtn.addEventListener('click', () => {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  updateCalendar();
});

nextBtn.addEventListener('click', () => {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  updateCalendar();
});

document.addEventListener('DOMContentLoaded', () => {
  fetchEvents();
});

// ========== Fetch events ==========

function fetchEvents() {
  fetch('http://localhost:8080/api/events/all')
    .then(response => response.json())
    .then(events => {
      allEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));
      updateCalendar();
      populateEventGrid(allEvents);
    })
    .catch(error => {
      console.error('Error fetching events:', error);
      document.querySelector('.events-grid').innerHTML = '<p>Error loading events.</p>';
    });
}


// ========== Update calendar ==========
function updateCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  calendarMonth.textContent = new Date(year, month).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  calendarDays.innerHTML = '';

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();
  const today = new Date();

  for (let i = 0; i < startDay; i++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day other-month';
    calendarDays.appendChild(dayElement);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = i;

    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayElement.classList.add('today');
    }

    const hasEvent = allEvents.some(event => event.date === dateKey);
    if (hasEvent) {
      dayElement.classList.add('event-day');
    }

    if (
      i === currentDate.getDate() &&
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    ) {
      dayElement.classList.add('selected');
    }

    dayElement.addEventListener('click', () => {
      currentDate = date;
      updateCalendar();
      updateEvents();
    });

    calendarDays.appendChild(dayElement);
  }

  const endDay = lastDay.getDay();
  for (let i = endDay + 1; i <= 6; i++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day other-month';
    calendarDays.appendChild(dayElement);
  }

  updateEvents();
}

// ========== Show events for selected date ==========
function updateEvents() {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const selectedDate = `${year}-${month}-${day}`;

  selectedDateEl.textContent = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  eventList.innerHTML = '';

  const todaysEvents = allEvents.filter(e => e.date === selectedDate);

  if (todaysEvents.length === 0) {
    eventList.innerHTML = '<p>No events scheduled for this day.</p>';
    return;
  }

  todaysEvents.forEach(event => {
    const formattedTime = formatTime(event.time);
    const eventElement = document.createElement('div');
    eventElement.className = 'calendar-event';
    eventElement.innerHTML = `
      <div class="event-time">${formattedTime}</div>
      <div class="event-details">
        <h4>${event.title}</h4>
        <p>${event.description}</p>
        <a href="eventregistration.html?eventId=${event.id}" class="event-register-btn" style="margin-top:8px;display:inline-block;">Register</a>
      </div>
    `;
    eventList.appendChild(eventElement);
  });
}

// ========== Populate event grid ==========
function populateEventGrid(events) {
  const eventsGrid = document.querySelector('.events-grid');
  eventsGrid.innerHTML = '';

  if (events.length === 0) {
    eventsGrid.innerHTML = '<p>No upcoming events.</p>';
    return;
  }

  events.forEach(event => {
    const [year, month, day] = event.date.split('-');
    const eventDate = new Date(year, month - 1, day);
    const formattedDay = String(eventDate.getDate()).padStart(2, '0');
    const formattedMonth = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const formattedYear = eventDate.getFullYear();
    const formattedTime = formatTime(event.time);

    const card = document.createElement('div');
    card.className = 'event-card';
    // card.innerHTML = `
    //   <div class="event-date">
    //     <span class="event-day">${formattedDay}</span>
    //     <span class="event-month">${formattedMonth}</span>
    //     <span class="event-year">${formattedYear}</span>
    //   </div>
    //   <div class="event-info">
    //     <h2 class="event-name">${event.title}</h2>
    //     <div class="event-meta">
    //       <span><i class="fas fa-clock"></i> ${formattedTime}</span>
    //       <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
    //     </div>
    //     <p class="event-desc">${event.description}</p>
    //     <a href="eventregistration.html" class="event-register-btn">Register</a>
    //   </div>
    // `;
    card.innerHTML = `
  <div class="event-date">
    <span class="event-day">${formattedDay}</span>
    <span class="event-month">${formattedMonth}</span>
    <span class="event-year">${formattedYear}</span>
  </div>
  <div class="event-info">
    <h2 class="event-name">${event.title}</h2>
    <div class="event-meta">
      <span><i class="fas fa-clock"></i> ${formattedTime}</span>
      <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
    </div>
    <p class="event-desc">${event.description}</p>
    <a href="eventregistration.html?eventId=${event.id}" class="event-register-btn">Register</a>
  </div>
`;

    eventsGrid.appendChild(card);
  });
}


// ========== Utility ==========
function formatTime(time24) {
  if (!time24) return '';
  const [hourStr, minuteStr] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
}

// ========== Bottom Navbar Hide/Show on Scroll ==========
let lastScrollY = window.scrollY;
const bottomNavbar = document.querySelector('.bottom-navbar');
if (bottomNavbar) {
  bottomNavbar.style.transition = 'transform 0.3s';
  window.addEventListener('scroll', function () {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      // Scrolling down
      bottomNavbar.style.transform = 'translateY(100%)';
    } else {
      // Scrolling up
      bottomNavbar.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
  });
}
