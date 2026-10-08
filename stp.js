// ===================================================

// VERTEX FIVE - HOSPITAL INTELLIGENCE CORE JAVASCRIPT

// ===================================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("Vertex Hospital Intelligence system initialized.");

  // Helper: Normalize string by trimming, removing emojis and numbering

  function cleanTitle(str) {
    if (!str) return "";

    return str

      .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "")

      .replace(/^\d+[\.\s\-]+/, "")

      .trim();
  }

  // =====================================

  // 1. TIME PERIOD SELECTOR (CHARTS)

  // =====================================

  const timeSelects = document.querySelectorAll(".time-select");

  const chartData = {
    Today: {
      energy: [35, 50, 70, 85, 65, 45],

      water: [30, 45, 60, 75, 55, 40],

      energyTotal: "8,450 kWh",

      waterTotal: "10,200 L",
    },

    "This Week": {
      energy: [45, 60, 55, 75, 80, 65],

      water: [40, 55, 50, 70, 65, 50],

      energyTotal: "58,200 kWh",

      waterTotal: "71,400 L",
    },

    "This Month": {
      energy: [55, 65, 70, 60, 75, 85],

      water: [50, 60, 55, 65, 70, 60],

      energyTotal: "248,000 kWh",

      waterTotal: "310,000 L",
    },
  };

  function updateCharts(period) {
    const data = chartData[period] || chartData["Today"];

    // Find chart bars across the active page

    const energyBars = document.querySelectorAll(
      ".chart-card:nth-of-type(1) .bar, .chart:nth-of-type(1) .bar",
    );

    const waterBars = document.querySelectorAll(
      ".chart-card:nth-of-type(2) .bar, .water-bar",
    );

    if (energyBars.length > 0) {
      energyBars.forEach(function (bar, index) {
        if (data.energy[index] !== undefined) {
          bar.style.height = data.energy[index] + "%";
        }
      });
    }

    if (waterBars.length > 0) {
      waterBars.forEach(function (bar, index) {
        if (data.water[index] !== undefined) {
          bar.style.height = data.water[index] + "%";
        }
      });
    }
  }

  timeSelects.forEach(function (select) {
    select.addEventListener("change", function () {
      updateCharts(this.value);
    });
  });

  // =====================================

  // 2. CARD INFORMATION & POPUPS

  // =====================================

  const infoPopup = document.getElementById("infoPopup");

  const closePopup = document.getElementById("closePopup");

  const popupIcon = document.getElementById("popupIcon");

  const popupTitle = document.getElementById("popupTitle");

  const popupValue = document.getElementById("popupValue");

  const popupDescription = document.getElementById("popupDescription");

  const popupStatus = document.getElementById("popupStatus");

  const popupRecommendation = document.getElementById("popupRecommendation");

  const cardInformation = {
    "Current Consumption": {
      icon: "⚡",

      value: "8,450 kWh",

      description:
        "Real-time energy consumption across HVAC, surgical theaters, and hospital equipment.",

      status: "Optimal",

      recommendation:
        "High efficiency observed. Maintain automatic load balancing.",
    },

    "Water Usage": {
      icon: "💧",

      value: "10,200 L",

      description:
        "Daily water consumption across sterilization, ward usage, and clinical facilities.",

      status: "Normal",

      recommendation: "Continuous flow sensors show stable pipeline pressure.",
    },

    "Waste Management": {
      icon: "♻️",

      value: "72%",

      description:
        "Segregation efficiency for biohazard, recyclable, and clinical waste materials.",

      status: "Compliant",

      recommendation:
        "Medical waste processing protocols meeting ISO 14001 guidelines.",
    },

    Solar: {
      icon: "☀️",

      value: "4,280 kWh",

      description:
        "Clean rooftop solar energy generated and distributed into hospital microgrid.",

      status: "Active",

      recommendation: "Supplying 50.6% of peak afternoon energy load.",
    },

    "Solar Generation": {
      icon: "☀️",

      value: "4,280 kWh",

      description:
        "Clean rooftop solar energy generated and distributed into hospital microgrid.",

      status: "Active",

      recommendation: "Supplying 50.6% of peak afternoon energy load.",
    },

    "Beds Availability": {
      icon: "🛏️",

      value: "32 Available",

      description:
        "Immediately unallocated acute care and ICU beds across all wings.",

      status: "Available",

      recommendation:
        "Ward occupancy is within manageable levels. Emergency buffer is clear.",
    },

    Staff: {
      icon: "👩‍⚕️",

      value: "48 Available",

      description:
        "On-duty medical staff, surgeons, and nurses currently stationed in facilities.",

      status: "Balanced",

      recommendation:
        "Roster coverage at 98.4% across intensive care and outpatient units.",
    },

    Energy: {
      icon: "⚡",

      value: "1 Active Alert",

      description:
        "Elevated energy spikes recorded in diagnostic imaging unit 3.",

      status: "Attention",

      recommendation:
        "Inspect capacitor bank and schedule off-peak calibration.",
    },

    Water: {
      icon: "💧",

      value: "1 Active Alert",

      description:
        "Elevated return flow detected in central chiller plumbing loop.",

      status: "Monitoring",

      recommendation: "Check valve seals and acoustic leak sensor telemetry.",
    },

    Beds: {
      icon: "🛏️",

      value: "1 Active Alert",

      description: "Surgical recovery ward approaching 85% capacity threshold.",

      status: "Planning",

      recommendation:
        "Prepare step-down unit beds for incoming patient transfers.",
    },

    Collect: {
      icon: "📥",

      value: "IoT Telemetry",

      description:
        "Continuous real-time ingestion from smart meters, HVAC, and clinical sensors.",

      status: "Live Sync",

      recommendation:
        "Data pipeline operating at sub-second latency with zero packet loss.",
    },

    Analyze: {
      icon: "🔎",

      value: "Neural Patterning",

      description:
        "AI machine learning algorithms benchmark current readings against 12-month baselines.",

      status: "AI Active",

      recommendation:
        "Predictive model accuracy scoring 96.8% on anomaly detection.",
    },

    Recommend: {
      icon: "💡",

      value: "Decision Intelligence",

      description:
        "Automated, actionable directives generated for hospital engineering teams.",

      status: "Automated",

      recommendation:
        "Recommendations delivered to facility mobile dashboard in real-time.",
    },
  };

  // Card click event handler

  const clickableCards = document.querySelectorAll(
    ".card, .overview-card, .quick-card, .insight-card",
  );

  clickableCards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      // If it's a quick card link navigating to another page, let it navigate unless clicked

      if (this.classList.contains("quick-card") && this.getAttribute("href")) {
        return;
      }

      const headingEl = this.querySelector("h3, .overview-card-title");

      if (!headingEl) return;

      const rawTitle = headingEl.innerText;

      const cleaned = cleanTitle(rawTitle);

      // Lookup data

      let data = cardInformation[cleaned] || cardInformation[rawTitle];

      if (!data) {
        // Try fuzzy lookup

        for (const key in cardInformation) {
          if (
            cleaned.toLowerCase().includes(key.toLowerCase()) ||
            key.toLowerCase().includes(cleaned.toLowerCase())
          ) {
            data = cardInformation[key];

            break;
          }
        }
      }

      if (data && infoPopup) {
        if (popupIcon) popupIcon.innerText = data.icon;

        if (popupTitle) popupTitle.innerText = cleaned || rawTitle;

        if (popupValue) popupValue.innerText = data.value;

        if (popupDescription) popupDescription.innerText = data.description;

        if (popupStatus) popupStatus.innerText = data.status;

        if (popupRecommendation)
          popupRecommendation.innerText = data.recommendation;

        infoPopup.classList.add("show");
      }
    });
  });

  if (closePopup && infoPopup) {
    closePopup.addEventListener("click", function () {
      infoPopup.classList.remove("show");
    });
  }

  // =====================================

  // 3. ALERTS INFORMATION & POPUPS

  // =====================================

  const alertPopup = document.getElementById("alertPopup");

  const closeAlertPopup = document.getElementById("closeAlertPopup");

  const alertPopupIcon = document.getElementById("alertPopupIcon");

  const alertPopupTitle = document.getElementById("alertPopupTitle");

  const alertPopupDescription = document.getElementById(
    "alertPopupDescription",
  );

  const alertPopupStatus = document.getElementById("alertPopupStatus");

  const alertPopupRecommendation = document.getElementById(
    "alertPopupRecommendation",
  );

  const alertInformation = {
    "High Energy Consumption": {
      icon: "⚡",

      description:
        "Energy consumption in surgical wing B has risen 18% above typical morning baseline.",

      status: "Attention Required",

      recommendation:
        "Check sterilization autoclaves and chillers; inspect high-draw HVAC air-handlers.",
    },

    "Water Usage Monitoring": {
      icon: "💧",

      description:
        "A continuous 45L/min flow was detected overnight during scheduled non-operational hours.",

      status: "Under Monitoring",

      recommendation:
        "Inspect level 2 laboratory wash stations and valve seals for minor leaks.",
    },

    "Bed Availability": {
      icon: "🛏️",

      value: "32 Available",

      description:
        "Acute care ward reached 82% capacity following morning intake.",

      status: "Monitor Closely",

      recommendation:
        "Coordinate with discharge desk to expedite post-operative bed transitions.",
    },

    "Inspect Water System": {
      icon: "💧",

      description:
        "Pressure fluctuations observed in the secondary hydraulic loop feeding cooling towers.",

      status: "Maintenance Due",

      recommendation:
        "Schedule routine impeller inspection and check flow-rate restrictors.",
    },

    "Monitor Bed Capacity": {
      icon: "🛏️",

      description:
        "Anticipated surge during weekend schedule may reduce ICU buffer below threshold.",

      status: "Capacity Warning",

      recommendation:
        "Review on-call staffing schedules and stage backup ward beds.",
    },

    "Review Energy Consumption": {
      icon: "⚡",

      description: "Peak tariff rates active between 2:00 PM and 6:00 PM.",

      status: "Efficiency Protocol",

      recommendation:
        "Activate solar battery storage discharge to shave peak utility costs.",
    },

    "Solar Contribution": {
      icon: "☀️",

      description:
        "Photovoltaic output peaked at 4,280 kWh due to clear sky irradiance.",

      status: "Operating Optimally",

      recommendation:
        "System operating at 99.2% inverter conversion efficiency.",
    },
  };

  const alertItems = document.querySelectorAll(".alert-item");

  alertItems.forEach(function (alert) {
    alert.addEventListener("click", function () {
      const headingEl = this.querySelector(".alert-content h3, h3");

      if (!headingEl) return;

      const rawTitle = headingEl.innerText;

      const cleaned = cleanTitle(rawTitle);

      let data = alertInformation[cleaned] || alertInformation[rawTitle];

      if (!data) {
        for (const key in alertInformation) {
          if (
            cleaned.toLowerCase().includes(key.toLowerCase()) ||
            key.toLowerCase().includes(cleaned.toLowerCase())
          ) {
            data = alertInformation[key];

            break;
          }
        }
      }

      // Fallback generic alert

      if (!data) {
        const desc = this.querySelector("p")
          ? this.querySelector("p").innerText
          : "Important notification";

        data = {
          icon: "🔔",

          description: desc,

          status: "Logged",

          recommendation:
            "Review facility procedures and acknowledge notification.",
        };
      }

      if (alertPopup) {
        if (alertPopupIcon) alertPopupIcon.innerText = data.icon;

        if (alertPopupTitle) alertPopupTitle.innerText = cleaned || rawTitle;

        if (alertPopupDescription)
          alertPopupDescription.innerText = data.description;

        if (alertPopupStatus) alertPopupStatus.innerText = data.status;

        if (alertPopupRecommendation)
          alertPopupRecommendation.innerText = data.recommendation;

        alertPopup.classList.add("show");
      }
    });
  });

  if (closeAlertPopup && alertPopup) {
    closeAlertPopup.addEventListener("click", function () {
      alertPopup.classList.remove("show");
    });
  }

  // =====================================

  // 4. SETTINGS MODAL

  // =====================================

  const settingsPopup = document.getElementById("settingsPopup");

  const closeSettingsPopup = document.getElementById("closeSettingsPopup");

  const settingsLinks = document.querySelectorAll(
    ".settings-link, a[href='#settings'], .sidebar-bottom a:first-child",
  );

  settingsLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      if (settingsPopup) {
        settingsPopup.classList.add("show");
      }
    });
  });

  if (closeSettingsPopup && settingsPopup) {
    closeSettingsPopup.addEventListener("click", function () {
      settingsPopup.classList.remove("show");
    });
  }

  // =====================================

  // 5. LOGIN MODAL (LANDING PAGE)

  // =====================================

  const loginPopup = document.getElementById("loginPopup");

  const closeLoginPopup = document.getElementById("closeLoginPopup");

  const loginBtns = document.querySelectorAll(".login-btn, .open-login-btn");

  loginBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      if (loginPopup) {
        loginPopup.classList.add("show");
      } else {
        // If on another page, navigate to dashboard

        window.location.href = "overview.html";
      }
    });
  });

  if (closeLoginPopup && loginPopup) {
    closeLoginPopup.addEventListener("click", function () {
      loginPopup.classList.remove("show");
    });
  }

  // Close any modal when clicking backdrop

  window.addEventListener("click", function (e) {
    if (infoPopup && e.target === infoPopup) infoPopup.classList.remove("show");

    if (alertPopup && e.target === alertPopup)
      alertPopup.classList.remove("show");

    if (settingsPopup && e.target === settingsPopup)
      settingsPopup.classList.remove("show");

    if (loginPopup && e.target === loginPopup)
      loginPopup.classList.remove("show");
  });

  // Close any modal on ESC key

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (infoPopup) infoPopup.classList.remove("show");

      if (alertPopup) alertPopup.classList.remove("show");

      if (settingsPopup) settingsPopup.classList.remove("show");

      if (loginPopup) loginPopup.classList.remove("show");
    }
  });

  // =====================================

  // 6. MOBILE SIDEBAR DRAWER TOGGLE

  // =====================================

  const menuToggle = document.getElementById("menuToggle");

  const sidebar = document.querySelector(".sidebar");

  const sidebarOverlay = document.querySelector(".sidebar-overlay");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");

      if (sidebarOverlay) sidebarOverlay.classList.toggle("active");
    });
  }

  if (sidebarOverlay && sidebar) {
    sidebarOverlay.addEventListener("click", function () {
      sidebar.classList.remove("open");

      sidebarOverlay.classList.remove("active");
    });
  }

  // Landing page mobile navbar toggle

  const navHamburger = document.querySelector(".nav-hamburger");

  const navLinks = document.querySelector(".nav-links");

  if (navHamburger && navLinks) {
    navHamburger.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }
});

// =====================================

// API INTEGRATION

const API_BASE =
  window.location.protocol === "file:" ||
  (window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1")
    ? "http://localhost:3000"
    : "";

function showError() {
  console.warn("Backend API unavailable. Using default static values.");
}

function hideError() {}

async function fetchDashboardData() {
  try {
    const response = await fetch(`${API_BASE}/api/dashboard`);
    if (!response.ok) throw new Error("Server error");
    const data = await response.json();
    
    hideError();

    window.previousMetrics = window.previousMetrics || {};
    const metricsMap = {
      "Current Consumption": `${data.energy.currentConsumption} ${data.energy.unit}`,
      "Water Usage": `${data.water.usage} ${data.water.unit}`,
      "Waste Management": `${data.waste.segregation}${data.waste.unit}`,
      "Solar": `${data.solar.generation} ${data.solar.unit}`,
      "Solar Generation": `${data.solar.generation} ${data.solar.unit}`,
      "Beds Availability": `${data.beds.available} Available`,
      "Staff": `${data.staff.available} Available`,
    };

    // Update dashboard.html cards
    document.querySelectorAll(".card-content").forEach((content) => {
      const h3 = content.querySelector("h3");
      const h2 = content.querySelector("h2");
      if (h3 && h2 && metricsMap[h3.innerText.trim()] !== undefined) {
        const newValue = metricsMap[h3.innerText.trim()];
        if (window.previousMetrics[h3.innerText.trim()] && window.previousMetrics[h3.innerText.trim()] !== newValue) {
            content.closest('.card').classList.remove('flash-update');
            void content.closest('.card').offsetWidth;
            content.closest('.card').classList.add('flash-update');
        }
        window.previousMetrics[h3.innerText.trim()] = newValue;
        h2.innerText = newValue;
      }
    });

    // Update overview.html cards
    document.querySelectorAll(".overview-card").forEach((card) => {
      const h3 = card.querySelector("h3");
      const valDiv = card.querySelector(".overview-value");
      if (h3 && valDiv && metricsMap[h3.innerText.trim()] !== undefined) {
        valDiv.innerText = metricsMap[h3.innerText.trim()];
      }
    });

    // Update analytics.html quick cards
    document.querySelectorAll(".chart-card").forEach((card) => {
      const h3 = card.querySelector("h3");
      const h2 = card.querySelector("h2");
      if (h3 && h2 && !h3.innerText.includes("Energy") && !h3.innerText.includes("Water")) {
        const key = h3.innerText.trim();
        if (metricsMap[key] !== undefined) {
          h2.innerText = metricsMap[key];
        }
      }
    });
  } catch (err) {
    console.error(err);
    showError();
  }
}

async function fetchInsights() {
  try {
    const response = await fetch(`${API_BASE}/api/insights`);
    if (!response.ok) throw new Error("Server error");
    const data = await response.json();

    // Update dashboard.html insights list
    const insightsContainer = document.querySelector(".insights-list");
    if (insightsContainer) {
      insightsContainer.innerHTML = "";
      data.slice(0, 3).forEach((insight) => {
        insightsContainer.innerHTML += `
          <div class="insight-item">
            <div class="insight-icon">✨</div>
            <div class="insight-text">
              <h3>${insight.title}</h3>
              <p>${insight.message}</p>
            </div>
          </div>`;
      });
    }

    // Update ai-insights.html diagnostics list
    const diagnosticContainer = document.querySelector(".diagnostic-list");
    if (diagnosticContainer) {
      diagnosticContainer.innerHTML = "";
      data.forEach((insight) => {
        const severityClass = insight.severity || "low";
        diagnosticContainer.innerHTML += `
          <div class="insight-item ${severityClass}">
            <div class="insight-icon">✨</div>
            <div class="insight-text">
              <h3>${insight.title}</h3>
              <p>${insight.message}</p>
            </div>
          </div>`;
      });
    }

    // Update ai-insights.html recommendations list
    const recommendationsContainer = document.querySelector(".recommendations-list");
    if (recommendationsContainer) {
      recommendationsContainer.innerHTML = "";
      data.forEach((insight) => {
        recommendationsContainer.innerHTML += `
          <div class="insight-item action-required">
            <div class="insight-icon">💡</div>
            <div class="insight-text">
              <h3>${insight.title}</h3>
              <p>${insight.recommendation}</p>
            </div>
          </div>`;
      });
    }
  } catch (err) {
    console.error(err);
  }
}


window.resolveAlert = async function(id) {
  try {
    await fetch(`${API_BASE}/api/alerts/${id}/resolve`, { method: 'PUT' });
    fetchAlerts(); // Refresh alerts list instantly
  } catch(err) {
    console.error(err);
  }
};

async function fetchAlerts() {
  try {
    const response = await fetch(`${API_BASE}/api/alerts/active`);
    if (!response.ok) throw new Error("Server error");
    const data = await response.json();

    const list = document.querySelector(".alerts-list");
    if (list) {
      list.innerHTML = "";
      data.forEach((alert) => {
        const severityClass = alert.severity || "low";
        list.innerHTML += `
          <div class="alert-item ${severityClass}">
            <div class="alert-icon">🔔</div>
            <div class="alert-content">
              <h3>${alert.title}</h3>
              <p>${alert.message}</p>
            </div>
            <div class="alert-time" style="display:flex; flex-direction:column; align-items:flex-end;">
              <span>Active</span>
              <button onclick="resolveAlert(${alert.id})" style="margin-top:8px; padding:4px 8px; border:none; border-radius:4px; background:var(--accent-primary); color:var(--bg-main); cursor:pointer; font-weight:bold;">Acknowledge</button>
            </div>
          </div>`;
      });
    }
  } catch (err) {
    console.error(err);
  }
}



let energyChartInstance = null;
let waterChartInstance = null;

async function loadAnalyticsCharts(timeframe = 'Today') {
  if (!window.location.pathname.includes("analytics.html")) return;
  
  let energyLabels = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
  let energyData = [3500, 5000, 7000, 8500, 6500, 4500];
  let waterLabels = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
  let waterData = [3000, 4500, 6000, 7500, 5500, 4000];

  try {
    const energyRes = await fetch(`${API_BASE}/api/analytics/energy`);
    if (energyRes.ok) {
        const energyJson = await energyRes.json();
        if (energyJson.length > 0) {
            energyLabels = energyJson.slice(-10).map(d => {
                const date = new Date(d.timestamp);
                return `${date.getHours()}:${date.getMinutes()}`;
            });
            energyData = energyJson.slice(-10).map(d => d.current_consumption_kwh);
        }
    }
  } catch (err) { console.warn("Using fallback energy data"); }

  const energyCtx = document.getElementById('energyChart');
  if (energyCtx) {
    if (energyChartInstance) energyChartInstance.destroy();
    energyChartInstance = new Chart(energyCtx, {
      type: 'line',
      data: {
        labels: energyLabels,
        datasets: [{
          label: 'Energy (kWh)',
          data: energyData,
          borderColor: '#35E0C0',
          backgroundColor: 'rgba(53, 224, 192, 0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#F2FFFC' } } },
        scales: {
          x: { ticks: { color: '#9BC7C0' }, grid: { color: '#1D5B54' } },
          y: { ticks: { color: '#9BC7C0' }, grid: { color: '#1D5B54' } }
        }
      }
    });
  }

  try {
    const waterRes = await fetch(`${API_BASE}/api/analytics/water`);
    if (waterRes.ok) {
        const waterJson = await waterRes.json();
        if (waterJson.length > 0) {
            waterLabels = waterJson.slice(-10).map(d => {
                const date = new Date(d.timestamp);
                return `${date.getHours()}:${date.getMinutes()}`;
            });
            waterData = waterJson.slice(-10).map(d => d.daily_usage_liters);
        }
    }
  } catch (err) { console.warn("Using fallback water data"); }

  const waterCtx = document.getElementById('waterChart');
  if (waterCtx) {
    if (waterChartInstance) waterChartInstance.destroy();
    waterChartInstance = new Chart(waterCtx, {
      type: 'bar',
      data: {
        labels: waterLabels,
        datasets: [{
          label: 'Water (L)',
          data: waterData,
          backgroundColor: '#7CE7A8',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#F2FFFC' } } },
        scales: {
          x: { ticks: { color: '#9BC7C0' }, grid: { display: false } },
          y: { ticks: { color: '#9BC7C0' }, grid: { color: '#1D5B54' } }
        }
      }
    });
  }
  const emBtn = document.getElementById('emergencyToggle');
  if (!emBtn) return;
  emBtn.addEventListener('click', () => {
    document.body.classList.toggle('emergency-mode');
    if (document.body.classList.contains('emergency-mode')) {
      emBtn.innerText = "🛑 Cancel Emergency Protocol";
      emBtn.style.backgroundColor = "#5a1111";
      document.querySelectorAll('.card').forEach(card => {
        if (card.innerText.includes('Beds') || card.innerText.includes('Staff')) {
          card.classList.add('emergency-pulse');
        }
      });
    } else {
      emBtn.innerText = "🚨 Trigger Emergency Protocol";
      emBtn.style.backgroundColor = "#ff4d4d";
      document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('emergency-pulse');
      });
    }
  });
}

window.exportCSV = async function() {
  try {
    const res = await fetch(`${API_BASE}/api/analytics/energy`);
    const data = await res.json();
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }
    
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(obj => Object.values(obj).join(",")).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Hospital_Energy_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("Export failed", err);
    alert("Export failed. Ensure backend is running.");
  }
};


window.executeReallocation = function(btn) {
  const originalText = btn.innerHTML;
  btn.innerHTML = "🔄 Calculating optimal transfer...";
  btn.style.opacity = "0.7";
  btn.disabled = true;
  
  setTimeout(() => {
    btn.innerHTML = "✅ Transfer Complete: 4 shifted to ER";
    btn.style.backgroundColor = "var(--primary)";
    btn.style.color = "var(--bg-main)";
    btn.style.opacity = "1";
    
    // Visually update the staff metric to simulate the fix
    const staffVal = document.getElementById('staffVal');
    if (staffVal && staffVal.innerText.includes('/')) {
        let parts = staffVal.innerText.split('/');
        let available = parseInt(parts[0]) - 4; // 4 less available, now on duty
        staffVal.innerText = available + " / " + parts[1];
    }
    
    // Trigger pulse on the card
    btn.closest('.card').classList.add('flash-update');
    setTimeout(() => {
        btn.closest('.card').classList.remove('flash-update');
    }, 1500);
  }, 1500);
};


// MODAL SYSTEM
window.showModal = function(title, bodyHTML, footerHTML) {
  const overlay = document.getElementById('customModal');
  if (!overlay) return;
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalBody').innerHTML = bodyHTML;
  if (footerHTML) document.getElementById('modalFooter').innerHTML = footerHTML;
  overlay.classList.add('active');
};
window.closeModal = function() {
  const overlay = document.getElementById('customModal');
  if (overlay) overlay.classList.remove('active');
};

window.initiateOverflow = function() {
  showModal(
    "Initiating Overflow Protocols",
    `
      <div style="display:flex; align-items:center; gap:12px; margin-bottom: 16px;">
        <div style="font-size:2rem; animation: pulse-emergency 1s infinite alternate;">⚠️</div>
        <div>
          <strong style="color:var(--text-main);">Routing patients to Wing C...</strong><br>
          Notifying standby personnel in Ward 4.
        </div>
      </div>
      <div class="progress-container"><div class="progress-bar" id="overflowProgress"></div></div>
      <p id="overflowStatus" style="margin-top:12px; font-size:0.85rem;">Establishing secure comms...</p>
    `,
    `<button class="btn-outline" onclick="closeModal()">Cancel</button>`
  );
  
  setTimeout(() => { 
      const pb = document.getElementById('overflowProgress');
      if(pb) pb.style.width = '100%'; 
  }, 100);
  setTimeout(() => { 
      const st = document.getElementById('overflowStatus');
      if(st) st.innerHTML = "<span style='color:var(--primary); font-weight:bold;'>✅ Wing C personnel mobilized. 12 beds reserved.</span>"; 
  }, 2000);
  setTimeout(() => { 
    const ft = document.getElementById('modalFooter');
    if(ft) ft.innerHTML = `<button class="btn-primary" onclick="closeModal()">Acknowledge</button>`;
  }, 2200);
};

window.confirmEmergency = function() {
  closeModal();
  document.body.classList.add('emergency-mode');
  const emBtn = document.getElementById('emergencyToggle');
  if(emBtn) {
      emBtn.innerText = "🛑 Cancel Emergency Protocol";
      emBtn.style.backgroundColor = "#5a1111";
  }
  document.querySelectorAll('.card').forEach(card => {
    if (card.innerText.includes('Beds') || card.innerText.includes('Staff')) {
      card.classList.add('emergency-pulse');
    }
  });
};


function initEmergencyProtocol() {
  const emBtn = document.getElementById('emergencyToggle');
  if (!emBtn) return;
  emBtn.addEventListener('click', () => {
    if (document.body.classList.contains('emergency-mode')) {
      document.body.classList.remove('emergency-mode');
      emBtn.innerText = "🚨 Trigger Emergency Protocol";
      emBtn.style.backgroundColor = "#ff4d4d";
      document.querySelectorAll('.card').forEach(card => card.classList.remove('emergency-pulse'));
    } else {
      if (typeof showModal === 'function') {
          showModal(
            "🚨 SYSTEM OVERRIDE: CODE RED",
            `
              <p style="color:#ffb3b3; font-weight:bold; font-size:1.1rem;">WARNING: Initiating Hospital-Wide Emergency Protocol.</p>
              <ul style="margin-top:16px; margin-left:20px; line-height:1.8;">
                <li>Standard operations dashboard will be overridden.</li>
                <li>Emergency lighting sequences will be triggered.</li>
                <li>Available standby staff will be universally paged.</li>
              </ul>
              <p style="margin-top:20px; font-size:1rem; color:var(--text-main);">Are you absolutely sure you want to proceed?</p>
            `,
            `
              <button class="btn-outline" onclick="closeModal()">Cancel</button>
              <button class="btn-primary" style="background:#ff4d4d; color:white; border:none;" onclick="confirmEmergency()">AUTHORIZE CODE RED</button>
            `
          );
      }
    }
  });
}

function initApp() {
  if (window.location.pathname === "/" || window.location.pathname.endsWith("index.html")) {
    return; // Don't fetch on landing page
  }

  
  const timeSelect = document.querySelector('.time-select');
  if (timeSelect) {
      timeSelect.addEventListener('change', (e) => {
          loadAnalyticsCharts(e.target.value);
      });
  }
  
  initEmergencyProtocol();
  fetchDashboardData();

  fetchInsights();
  fetchAlerts();
  loadAnalyticsCharts();

  setInterval(() => {
    initEmergencyProtocol();
  fetchDashboardData();
    fetchInsights();
    fetchAlerts();
    loadAnalyticsCharts();
  }, 30000);
}

document.addEventListener("DOMContentLoaded", initApp);
