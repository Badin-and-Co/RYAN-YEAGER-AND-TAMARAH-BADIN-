const guests = {
  "kay-kelly": {
    name: "Kay Kelly",
    allowedGuests: 2,
    extraGuests: ["Jeff Kelly"]
  },

  "nicole-yeager": {
    name: "Nicole Yeager",
    allowedGuests: 1,
    extraGuests: []
  },

  "stephen-yeager": {
    name: "Stephen Yeager",
    allowedGuests: 1,
    extraGuests: []
  },

  "david-yeager": {
    name: "David Yeager",
    allowedGuests: 1,
    extraGuests: []
  },

  "austin-&-ashley-kelly": {
    name: "Austin & Ashley Kelly",
    allowedGuests: 2,
  },
   "josh-&-abby-kelly": {
    name: "Josh & Abby Kelly",
    allowedGuests: 2,
  },
   "will-&-steph-kelly": {
    name: "Will & Stephanie Kelly",
    allowedGuests: 2,
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
   "maria-lopez": {
    name: "Maria Lopez",
    allowedGuests: 1,
    extraGuests: []
  },
  
};

const params = new URLSearchParams(window.location.search);
const guestKey = params.get("guest");

let currentGuest = guests[guestKey] || {
  name: "Beautiful Guest",
  allowedGuests: 1,
  extraGuests: []
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
    buildExtraGuestFields();
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
  title.textContent = "Please enter each additional guest name and meal choice:";
  extraGuestsBox.appendChild(title);

  for (let i = 1; i <= extraGuestAmount; i++) {
    const suggestedName =
      currentGuest.extraGuests && currentGuest.extraGuests[i - 1]
        ? currentGuest.extraGuests[i - 1]
        : "";

    const labelName = document.createElement("label");
    labelName.textContent = `Guest ${i + 1} Name`;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "extraGuestName";
    input.name = `extraGuest${i + 1}Name`;
    input.placeholder = `Guest ${i + 1} full name`;
    input.value = suggestedName;
    input.required = true;

    const labelMeal = document.createElement("label");
    labelMeal.textContent = `Guest ${i + 1} Meal`;

    const select = document.createElement("select");
    select.className = "extraGuestMeal";
    select.name = `extraGuest${i + 1}Meal`;
    select.required = true;

    select.innerHTML = `
      <option value="">Select meal</option>
      <option value="Carnivore">Carnivore</option>
      <option value="Vegetarian">Vegetarian</option>
    `;

    extraGuestsBox.appendChild(labelName);
    extraGuestsBox.appendChild(input);
    extraGuestsBox.appendChild(labelMeal);
    extraGuestsBox.appendChild(select);
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

  const extraGuestNames = document.querySelectorAll(".extraGuestName");
  const extraGuestMeals = document.querySelectorAll(".extraGuestMeal");

  let extraGuestsInfo = [];

  extraGuestNames.forEach((input, index) => {
    const mealChoice = extraGuestMeals[index] ? extraGuestMeals[index].value : "";

    if (!input.value.trim()) {
      alert(`Please enter Guest ${index + 2} name.`);
      return;
    }

    if (!mealChoice) {
      alert(`Please select Guest ${index + 2} meal.`);
      return;
    }

    extraGuestsInfo.push(
      `Guest ${index + 2}: ${input.value.trim()} - Meal: ${mealChoice}`
    );
  });

  document.getElementById("guestCodeInput").value = guestKey || "No guest code";
  document.getElementById("mainGuestInput").value = currentGuest.name;
  document.getElementById("extraGuestsInput").value =
    extraGuestsInfo.length > 0 ? extraGuestsInfo.join(", ") : "None";

  const formData = new FormData(rsvpForm);

  formData.append("guestCode", guestKey || "No guest code");
  formData.append("mainGuest", currentGuest.name);
  formData.append("attendance", attending);
  formData.append("mainGuestMeal", selectedMeal);
  formData.append("guestCount", selectedGuestCount);
  formData.append("extraGuests", extraGuestsInfo.length > 0 ? extraGuestsInfo.join(", ") : "None");
  formData.append("notes", notes);
  formData.append("submittedAt", new Date().toLocaleString());

  fetch(rsvpForm.action, {
    method: "POST",
    body: formData,
    headers: {
      "Accept": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        alert("Thank you! Your RSVP has been saved.");
        rsvpForm.reset();
        nameInput.value = currentGuest.name;
        clearExtraGuestFields();
        yesOptions.classList.add("hidden");
      } else {
        alert("Something went wrong. Please try again.");
      }
    })
    .catch(error => {
      alert("Something went wrong. Please try again.");
    });
});

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
