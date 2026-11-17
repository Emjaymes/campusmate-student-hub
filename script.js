// ==========================================
// CAMPUSMATE - STUDENT HUB
// Complete JavaScript
// ==========================================


// 1. STUDY RESOURCES

const resources = [
  {
    name: "Probability & Statistics II",
    course: "STA 2240",
    type: "PDF"
  },
  {
    name: "Digital Logic",
    course: "SPC 2207",
    type: "PDF"
  },
  {
    name: "Network Design & Management",
    course: "SPI 2202",
    type: "PDF"
  },
  {
    name: "Software Engineering I",
    course: "SPI 2203",
    type: "PDF"
  },
  {
    name: "Calculus I",
    course: "SPM 2101",
    type: "PDF"
  },
  {
    name: "Object Oriented Programming I",
    course: "SPC 2204",
    type: "PDF"
  },
  {
    name: "Web Application Development I",
    course: "SPI 2201",
    type: "PDF"
  }
];


// 2. ACTUAL GROUP B YEAR II BIT TIMETABLE

const timetable = [
  {
    day: "Tuesday",
    time: "07:00 – 10:00",
    code: "STA 2240",
    course: "Probability & Statistics II",
    room: "LH 32",
    lecturer: "Dr. J. Ngure"
  },
  {
    day: "Tuesday",
    time: "10:00 – 13:00",
    code: "SPC 2207",
    course: "Digital Logic",
    room: "JSM 201",
    lecturer: "Kennedy Kamau"
  },
  {
    day: "Tuesday",
    time: "13:00 – 16:00",
    code: "SPI 2202",
    course: "Network Design & Management",
    room: "KLH 101",
    lecturer: "Ngigi Stanley"
  },
  {
    day: "Thursday",
    time: "10:00 – 13:00",
    code: "SPI 2203",
    course: "Software Engineering I",
    room: "KLH 301",
    lecturer: "Dr. C. Mukunga"
  },
  {
    day: "Thursday",
    time: "13:00 – 16:00",
    code: "SPM 2101",
    course: "Calculus I",
    room: "AUD",
    lecturer: "Dr. Eunice Mueni"
  },
  {
    day: "Friday",
    time: "10:00 – 13:00",
    code: "SPC 2204",
    course: "Object Oriented Programming I",
    room: "JSM 206",
    lecturer: "Dr. Stephen Kihara"
  },
  {
    day: "Friday",
    time: "13:00 – 16:00",
    code: "SPI 2201",
    course: "Web Application Development I",
    room: "JSM 302",
    lecturer: "Lawrence Kimani"
  }
];


// 3. CAMPUS ANNOUNCEMENTS

const announcements = [
  {
    title: "Semester Registration",
    text: "Remember to confirm your semester registration before the deadline.",
    date: "Academic notice"
  },
  {
    title: "Library Information",
    text: "Visit the university library for available study and revision materials.",
    date: "Student services"
  },
  {
    title: "Academic Updates",
    text: "Keep checking official university channels for examination updates.",
    date: "Campus notice"
  }
];


// 4. USEFUL LINKS

const usefulLinks = [
  {
    name: "Kirinyaga University",
    url: "https://www.kyu.ac.ke/"
  },
  {
    name: "HELB",
    url: "https://www.helb.co.ke/"
  },
  {
    name: "KUCCPS",
    url: "https://www.kuccps.net/"
  },
  {
    name: "GitHub",
    url: "https://github.com/"
  }
];


// 5. LOCAL STORAGE

function loadItems(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

let lostItems = loadItems("campusLostItems");
let marketItems = loadItems("campusMarketItems");


// 6. HTML ELEMENTS

const extra = document.getElementById("extra-content");
const pageTitle = document.getElementById("page-title");


// 7. SECURITY HELPER
// Safely displays user-submitted text.

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}


// 8. DASHBOARD

function showDashboard() {

  extra.hidden = true;

  // Study resources preview

  document.getElementById("resource-preview").innerHTML =
    resources.slice(0, 3).map(item => `
      <div class="resource-item">
        <div>
          <strong>${escapeHTML(item.name)}</strong>
          <small>${escapeHTML(item.course)}</small>
        </div>
        <span class="file-tag">
          ${escapeHTML(item.type)}
        </span>
      </div>
    `).join("");


  // Announcements preview

  document.getElementById("announcement-preview").innerHTML =
    announcements.map(item => `
      <div class="announcement-item">
        <strong>${escapeHTML(item.title)}</strong>
        <p>${escapeHTML(item.text)}</p>
        <small>${escapeHTML(item.date)}</small>
      </div>
    `).join("");


  // Actual timetable preview

  document.getElementById("timetable-preview").innerHTML =
    timetable.map(item => `
      <div class="class-item">
        <div>
          <strong>
            ${escapeHTML(item.day)} — ${escapeHTML(item.course)}
          </strong>
          <small>
            ${escapeHTML(item.code)} ·
            ${escapeHTML(item.room)} ·
            ${escapeHTML(item.lecturer)}
          </small>
        </div>

        <span class="file-tag">
          ${escapeHTML(item.time)}
        </span>
      </div>
    `).join("");
}


// 9. PAGE NAVIGATION

function openPage(page) {

  document.querySelectorAll(".nav-link").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === page
    );
  });

  const titles = {
    dashboard: "Dashboard",
    resources: "Study Resources",
    timetable: "IT StudentsTimetable",
    announcements: "Announcements",
    lost: "Lost & Found",
    marketplace: "Student Marketplace",
    links: "Useful Links"
  };

  pageTitle.textContent = titles[page] || "CampusMate";

  if (page === "dashboard") {
    showDashboard();
    return;
  }

  extra.hidden = false;

  switch (page) {

    case "resources":
      renderResources();
      break;

    case "timetable":
      renderTimetable();
      break;

    case "announcements":
      renderAnnouncements();
      break;

    case "lost":
      renderLost();
      break;

    case "marketplace":
      renderMarketplace();
      break;

    case "links":
      renderLinks();
      break;

    default:
      extra.innerHTML = "<p>Page not found.</p>";
  }

  extra.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


// 10. STUDY RESOURCES

function renderResources(filter = "") {

  const filtered = resources.filter(item =>
    (item.name + " " + item.course)
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  extra.innerHTML = `
    <div class="panel-heading">
      <div>
        <p class="eyebrow">LEARN AND GROW</p>
        <h3>Study Resources</h3>
      </div>
    </div>

    <input
      class="search-input"
      id="resource-search"
      placeholder="Search notes or unit codes..."
      value="${escapeHTML(filter)}"
    >

    <div class="section-list">
      ${
        filtered.length
        ? filtered.map(item => `
          <div class="action-card">
            <h4>${escapeHTML(item.name)}</h4>
            <p>
              ${escapeHTML(item.course)} ·
              ${escapeHTML(item.type)}
            </p>
            <button type="button"
              onclick="alert('Study material downloads will be added in a future update.')">
              View resource →
            </button>
          </div>
        `).join("")
        : "<p>No matching resources found.</p>"
      }
    </div>
  `;

  const search = document.getElementById("resource-search");

  search.addEventListener("input", event => {

    const position = event.target.selectionStart;
    const value = event.target.value;

    renderResources(value);

    const updatedSearch = document.getElementById("resource-search");

    updatedSearch.focus();
    updatedSearch.setSelectionRange(position, position);

  });
}


// 11. ACTUAL WEEKLY TIMETABLE

function renderTimetable() {

  const days = ["Tuesday", "Thursday", "Friday"];

  extra.innerHTML = `
    <div class="panel-heading">
      <div>
        <p class="eyebrow">GROUP B · YEAR II BIT</p>
        <h3>Semester One Timetable</h3>
      </div>
    </div>

    ${days.map(day => `

      <div class="day-section">

        <h3 class="day-heading"
          style="margin: 20px 0 12px;">
          ${day}
        </h3>

        <div class="section-list">

          ${timetable
            .filter(item => item.day === day)
            .map(item => `

              <div class="action-card">

                <h4>${escapeHTML(item.course)}</h4>

                <p>
                  Unit: ${escapeHTML(item.code)}
                </p>

                <p>
                  Time: ${escapeHTML(item.time)}
                </p>

                <p>
                  Venue: ${escapeHTML(item.room)}
                </p>

                <p>
                  Lecturer: ${escapeHTML(item.lecturer)}
                </p>

              </div>

            `).join("")}

        </div>

      </div>

    `).join("")}

    <p class="form-label">
      Group B · Year II BIT · Semester One
    </p>
  `;
}


// 12. ANNOUNCEMENTS

function renderAnnouncements() {

  extra.innerHTML = `
    <div class="panel-heading">
      <div>
        <p class="eyebrow">CAMPUS UPDATES</p>
        <h3>Announcements</h3>
      </div>
    </div>

    <div class="section-list">

      ${announcements.map(item => `

        <div class="action-card">

          <h4>${escapeHTML(item.title)}</h4>

          <p>${escapeHTML(item.text)}</p>

          <p>${escapeHTML(item.date)}</p>

        </div>

      `).join("")}

    </div>
  `;
}


// 13. LOST AND FOUND

function renderLost() {

  extra.innerHTML = `
    <div class="panel-heading">
      <div>
        <p class="eyebrow">HELP EACH OTHER</p>
        <h3>Lost & Found</h3>
      </div>
    </div>

    <form id="lost-form">

      <label class="form-label">Item name</label>

      <input
        class="form-input"
        name="name"
        required
        maxlength="100"
        placeholder="e.g. Black wallet"
      >

      <label class="form-label">Location</label>

      <input
        class="form-input"
        name="location"
        required
        maxlength="100"
        placeholder="Where was it lost or found?"
      >

      <label class="form-label">Description</label>

      <input
        class="form-input"
        name="description"
        required
        maxlength="250"
        placeholder="Give a short description"
      >

      <button class="primary-btn" type="submit">
        Post item
      </button>

    </form>

    <h3 style="margin:25px 0 15px">
      Student reports
    </h3>

    <div class="section-list">

      ${
        lostItems.length
        ? lostItems.map(item => `

          <div class="action-card">

            <h4>${escapeHTML(item.name)}</h4>

            <p>
              ${escapeHTML(item.location)}
            </p>

            <p>
              ${escapeHTML(item.description)}
            </p>

          </div>

        `).join("")
        : "<p>No reports yet. You can add the first one.</p>"
      }

    </div>
  `;


  document.getElementById("lost-form")
    .addEventListener("submit", event => {

      event.preventDefault();

      const data = new FormData(event.target);

      lostItems.push({
        name: data.get("name"),
        location: data.get("location"),
        description: data.get("description")
      });

      localStorage.setItem(
        "campusLostItems",
        JSON.stringify(lostItems)
      );

      renderLost();

    });

}


// 14. STUDENT MARKETPLACE

function renderMarketplace() {

  extra.innerHTML = `
    <div class="panel-heading">
      <div>
        <p class="eyebrow">BUY AND SELL</p>
        <h3>Student Marketplace</h3>
      </div>
    </div>

    <form id="market-form">

      <label class="form-label">Item for sale</label>

      <input
        class="form-input"
        name="name"
        required
        maxlength="100"
        placeholder="e.g. Scientific calculator"
      >

      <label class="form-label">Price (KSh)</label>

      <input
        class="form-input"
        name="price"
        type="number"
        min="1"
        required
        placeholder="e.g. 800"
      >

      <label class="form-label">Contact information</label>

      <input
        class="form-input"
        name="contact"
        required
        maxlength="100"
        placeholder="Your preferred contact"
      >

      <button class="primary-btn" type="submit">
        List item
      </button>

    </form>

    <h3 style="margin:25px 0 15px">
      Available listings
    </h3>

    <div class="section-list">

      ${
        marketItems.length
        ? marketItems.map(item => `

          <div class="action-card">

            <h4>${escapeHTML(item.name)}</h4>

            <p>
              KSh ${escapeHTML(item.price)}
            </p>

            <p>
              Contact: ${escapeHTML(item.contact)}
            </p>

          </div>

        `).join("")
        : "<p>No listings yet. Be the first seller.</p>"
      }

    </div>
  `;


  document.getElementById("market-form")
    .addEventListener("submit", event => {

      event.preventDefault();

      const data = new FormData(event.target);

      marketItems.push({
        name: data.get("name"),
        price: data.get("price"),
        contact: data.get("contact")
      });

      localStorage.setItem(
        "campusMarketItems",
        JSON.stringify(marketItems)
      );

      renderMarketplace();

    });

}


// 15. USEFUL LINKS

function renderLinks() {

  extra.innerHTML = `
    <div class="panel-heading">
      <div>
        <p class="eyebrow">STUDENT SERVICES</p>
        <h3>Useful Links</h3>
      </div>
    </div>

    <div class="section-list">

      ${usefulLinks.map(link => `

        <div class="action-card">

          <h4>${escapeHTML(link.name)}</h4>

          <a
            href="${link.url}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit website →
          </a>

        </div>

      `).join("")}

    </div>
  `;
}


// 16. NAVIGATION BUTTONS

document.querySelectorAll("[data-page]").forEach(button => {

  button.addEventListener("click", () => {

    openPage(button.dataset.page);

  });

});


document.querySelectorAll("[data-go]").forEach(button => {

  button.addEventListener("click", () => {

    openPage(button.dataset.go);

  });

});


// 17. START CAMPUSMATE

showDashboard();