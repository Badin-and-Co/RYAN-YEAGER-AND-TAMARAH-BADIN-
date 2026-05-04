const guests = {
  "camila-pastrana": {
    name: "Camila Pastrana",
    allowedGuests: 2
  },
  "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1
  },
  "andrea-garcia-plus-one": {
    name: "Andrea Garcia + Guest",
    allowedGuests: 2
  },
  "john-smith": {
    name: "John Smith",
    allowedGuests: 1
  }
};

/*
HOW TO ADD YOUR 135 GUESTS:

Copy this format:

"first-last": {
  name: "First Last",
  allowedGuests: 1
},

or for plus one:

"first-last-plus-one": {
  name: "First Last + Guest",
  allowedGuests: 2
},

Then send that person this link:

index.html?guest=first-last

Example:
index.html?guest=camila-pastrana
*/

const params = new URLSearchParams(window.location.search);
const guestKey = params.get("guest");

let currentGuest = guests[guestKey] || {
  name: "Beautiful Guest",
  allowedGuests: 1
};

const envelopeScreen = document.getElementById("envelopeScreen");
const invitationPage = document.getElementById("invitationPage");
const openEnvelope = document.getElementById("openEnvelope");

const guestPreview = document.getElementById("guestPreview");
const guestName = document.getElementById("guestName");
const guestLimitText = document.getElementById("guestLimitText");
const nameInput = document.getElementById("nameInput");

const attendance = document.getElementById("attendance");
const yesOptions = document.getElementById("yesOptions");
const meal = document.getElementById("meal");
const guestCount = document.getElementById("guestCount");
const rsvpForm = document.getElementById("rsvpForm");

guestPreview.textContent = `For ${currentGuest.name}`;
guestName.textContent = currentGuest.name;
nameInput.value = currentGuest.name;

if (currentGuest.allowedGuests === 2) {
  guestLimitText.textContent = "We have reserved 2 seats in your honor.";
} else {
  guestLimitText.textContent = "We have reserved 1 seat in your honor.";
}

function buildGuestCountOptions() {
  guestCount.innerHTML = "";

  for (let i = 1; i <= currentGuest.allowedGuests; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${i} guest${i > 1 ? "s" : ""}`;
    guestCount.appendChild(option);
  }
}

buildGuestCountOptions();

openEnvelope.addEventListener("click", () => {
  envelopeScreen.classList.add("hidden");
  invitationPage.classList.remove("hidden");
  window.scrollTo(0, 0);
});

attendance.addEventListener("change", () => {
  if (attendance.value === "Yes") {
    yesOptions.classList.remove("hidden");
    meal.required = true;
  } else {
    yesOptions.classList.add("hidden");
    meal.required = false;
    meal.value = "";
  }
});

rsvpForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const attending = attendance.value;
  const selectedMeal = attending === "Yes" ? meal.value : "Not applicable";
  const selectedGuestCount = attending === "Yes" ? guestCount.value : "0";

  if (!attending) {
    alert("Please select if you will attend.");
    return;
  }

  if (attending === "Yes" && !selectedMeal) {
    alert("Please select a meal preference.");
    return;
  }

  const subject = `Wedding RSVP - ${currentGuest.name}`;

  const body =
`Wedding RSVP

Name: ${currentGuest.name}
Attendance: ${attending}
Meal Preference: ${selectedMeal}
Confirming For: ${selectedGuestCount}

Guest Link Code: ${guestKey || "No guest code used"}`;

  const email = "tamy.badar@hotmail.com";

  window.location.href =
    `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

/* SCROLL REVEAL EFFECT */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
