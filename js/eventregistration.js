  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("eventId");

  if (!eventId) {
    alert("No event selected. Please go back and choose an event.");
  }

  // Fetch event title
  (async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/events/${eventId}`);
      if (response.ok) {
        const event = await response.json();
        const heading = document.getElementById("eventHeading");
        if (heading) heading.textContent = "Register for: " + event.title;
      }
    } catch (error) {
      console.warn("Couldn't fetch event title.");
    }
  })();

  document.getElementById('payBtn').onclick = async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !phone) {
      alert('Please fill in all required fields.');
      return;
    }

    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!eventId) {
      alert("No event ID found in the URL.");
      return;
    }

    const registrationData = {
      name: name,
      phno: phone
    };

    const btn = document.getElementById('payBtn');
    btn.disabled = true;
    btn.textContent = "Processing...";

    try {
      const response = await fetch(`http://localhost:8080/api/registrations/event/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });

      if (response.ok) {
        alert('Registration successful! Thank you for registering.');
        document.getElementById('registrationForm').reset();
      } else {
        const errorText = await response.text();
        alert('Registration failed: ' + errorText);
      }
    } catch (error) {
      alert('Error connecting to server: ' + error.message);
    } finally {
      btn.disabled = false;
      btn.textContent = "Proceed to Pay & Register";
    }
  };
  
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