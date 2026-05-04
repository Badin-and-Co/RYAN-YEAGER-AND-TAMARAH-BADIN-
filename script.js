const guests = {
  "patricia-arenas-ramirez": {
    name: "Patricia Arenas Ramirez",
    allowedGuests: 3
  },

  "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1
  },

  "andrea-garcia-plus-one": {
    name: "Andrea Garcia",
    allowedGuests: 2
  },

  "family-example-plus-two": {
    name: "Family Example",
    allowedGuests: 3
  },

  "family-example-plus-three": {
    name: "Family Example",
    allowedGuests: 4
  }
};

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

/* THIS FIXES THE TOP SEAT NUMBER */
guestLimitText.textContent =
  `We have reserved ${currentGuest.allowedGuests} seat${currentGuest.allowedGuests > 1 ? "s" : ""} in your honor.`;

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
    clearExtraGuestFields();
  }
});

guestCount.addEventListener("change", () => {
  buildExtraGuestFields();
});

function clearExtraGuestFields() {
  const extraGuestsBox = document.getElementById("extraGuestsBox");
  if (extraGuestsBox) {
    extraGuestsBox.innerHTML = "";
  }
}

function buildExtraGuestFields() {
  const extraGuestsBox = document.getElementById("extraGuestsBox");
  if (!extraGuestsBox) return;

  extraGuestsBox.innerHTML = "";

  const totalGuestsSelected = Number(guestCount.value);
  const extraGuestAmount = totalGuestsSelected - 1;

  if (extraGuestAmount <= 0) return;

  const title = document.createElement("p");
  title.className = "extra-guest-title";
  title.textContent = "Please enter the name of your additional guest(s):";
  extraGuestsBox.appendChild(title);

  for (let i = 1; i <= extraGuestAmount; i++) {
    const label = document.createElement("label");
    label.textContent = `Guest ${i + 1} Name`;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "extraGuestName";
    input.placeholder = `Guest ${i + 1} full name`;
    input.required = true;

    extraGuestsBox.appendChild(label);
    extraGuestsBox.appendChild(input);
  }
}

rsvpForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const attending = attendance.value;
  const selectedMeal = attending === "Yes" ? meal.value : "Not applicable";
  const selectedGuestCount = attending === "Yes" ? guestCount.value : "0";
  const notes = document.getElementById("notes") ? document.getElementById("notes").value : "";

  if (!attending) {
    alert("Please select if you will attend.");
    return;
  }

  if (attending === "Yes" && !selectedMeal) {
    alert("Please select a meal preference.");
    return;
  }

  const extraGuestInputs = document.querySelectorAll(".extraGuestName");
  let extraGuestNames = [];

  extraGuestInputs.forEach((input, index) => {
    extraGuestNames.push(`Guest ${index + 2}: ${input.value}`);
  });

  const subject = `Wedding RSVP - ${currentGuest.name}`;

  const body =
`Wedding RSVP

Name: ${currentGuest.name}
Attendance: ${attending}
Meal Preference: ${selectedMeal}
Confirming For: ${selectedGuestCount}

Additional Guest Names:
${extraGuestNames.length > 0 ? extraGuestNames.join("\n") : "None"}

Notes:
${notes || "No notes"}

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
