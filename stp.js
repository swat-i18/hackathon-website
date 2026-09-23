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
        "Today": {
            energy: [35, 50, 70, 85, 65, 45],
            water: [30, 45, 60, 75, 55, 40],
            energyTotal: "8,450 kWh",
            waterTotal: "10,200 L"
        },
        "This Week": {
            energy: [45, 60, 55, 75, 80, 65],
            water: [40, 55, 50, 70, 65, 50],
            energyTotal: "58,200 kWh",
            waterTotal: "71,400 L"
        },
        "This Month": {
            energy: [55, 65, 70, 60, 75, 85],
            water: [50, 60, 55, 65, 70, 60],
            energyTotal: "248,000 kWh",
            waterTotal: "310,000 L"
        }
    };

    function updateCharts(period) {
        const data = chartData[period] || chartData["Today"];
        
        // Find chart bars across the active page
        const energyBars = document.querySelectorAll(".chart-card:nth-of-type(1) .bar, .chart:nth-of-type(1) .bar");
        const waterBars = document.querySelectorAll(".chart-card:nth-of-type(2) .bar, .water-bar");

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
            description: "Real-time energy consumption across HVAC, surgical theaters, and hospital equipment.",
            status: "Optimal",
            recommendation: "High efficiency observed. Maintain automatic load balancing."
        },
        "Water Usage": {
            icon: "💧",
            value: "10,200 L",
            description: "Daily water consumption across sterilization, ward usage, and clinical facilities.",
            status: "Normal",
            recommendation: "Continuous flow sensors show stable pipeline pressure."
        },
        "Waste Management": {
            icon: "♻️",
            value: "72%",
            description: "Segregation efficiency for biohazard, recyclable, and clinical waste materials.",
            status: "Compliant",
            recommendation: "Medical waste processing protocols meeting ISO 14001 guidelines."
        },
        "Solar": {
            icon: "☀️",
            value: "4,280 kWh",
            description: "Clean rooftop solar energy generated and distributed into hospital microgrid.",
            status: "Active",
            recommendation: "Supplying 50.6% of peak afternoon energy load."
        },
        "Solar Generation": {
            icon: "☀️",
            value: "4,280 kWh",
            description: "Clean rooftop solar energy generated and distributed into hospital microgrid.",
            status: "Active",
            recommendation: "Supplying 50.6% of peak afternoon energy load."
        },
        "Beds Availability": {
            icon: "🛏️",
            value: "32 Available",
            description: "Immediately unallocated acute care and ICU beds across all wings.",
            status: "Available",
            recommendation: "Ward occupancy is within manageable levels. Emergency buffer is clear."
        },
        "Staff": {
            icon: "👩‍⚕️",
            value: "48 Available",
            description: "On-duty medical staff, surgeons, and nurses currently stationed in facilities.",
            status: "Balanced",
            recommendation: "Roster coverage at 98.4% across intensive care and outpatient units."
        },
        "Energy": {
            icon: "⚡",
            value: "1 Active Alert",
            description: "Elevated energy spikes recorded in diagnostic imaging unit 3.",
            status: "Attention",
            recommendation: "Inspect capacitor bank and schedule off-peak calibration."
        },
        "Water": {
            icon: "💧",
            value: "1 Active Alert",
            description: "Elevated return flow detected in central chiller plumbing loop.",
            status: "Monitoring",
            recommendation: "Check valve seals and acoustic leak sensor telemetry."
        },
        "Beds": {
            icon: "🛏️",
            value: "1 Active Alert",
            description: "Surgical recovery ward approaching 85% capacity threshold.",
            status: "Planning",
            recommendation: "Prepare step-down unit beds for incoming patient transfers."
        },
        "Collect": {
            icon: "📥",
            value: "IoT Telemetry",
            description: "Continuous real-time ingestion from smart meters, HVAC, and clinical sensors.",
            status: "Live Sync",
            recommendation: "Data pipeline operating at sub-second latency with zero packet loss."
        },
        "Analyze": {
            icon: "🔎",
            value: "Neural Patterning",
            description: "AI machine learning algorithms benchmark current readings against 12-month baselines.",
            status: "AI Active",
            recommendation: "Predictive model accuracy scoring 96.8% on anomaly detection."
        },
        "Recommend": {
            icon: "💡",
            value: "Decision Intelligence",
            description: "Automated, actionable directives generated for hospital engineering teams.",
            status: "Automated",
            recommendation: "Recommendations delivered to facility mobile dashboard in real-time."
        }
    };

    // Card click event handler
    const clickableCards = document.querySelectorAll(".card, .overview-card, .quick-card, .insight-card");
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
                    if (cleaned.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(cleaned.toLowerCase())) {
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
                if (popupRecommendation) popupRecommendation.innerText = data.recommendation;
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
    const alertPopupDescription = document.getElementById("alertPopupDescription");
    const alertPopupStatus = document.getElementById("alertPopupStatus");
    const alertPopupRecommendation = document.getElementById("alertPopupRecommendation");

    const alertInformation = {
        "High Energy Consumption": {
            icon: "⚡",
            description: "Energy consumption in surgical wing B has risen 18% above typical morning baseline.",
            status: "Attention Required",
            recommendation: "Check sterilization autoclaves and chillers; inspect high-draw HVAC air-handlers."
        },
        "Water Usage Monitoring": {
            icon: "💧",
            description: "A continuous 45L/min flow was detected overnight during scheduled non-operational hours.",
            status: "Under Monitoring",
            recommendation: "Inspect level 2 laboratory wash stations and valve seals for minor leaks."
        },
        "Bed Availability": {
            icon: "🛏️",
            value: "32 Available",
            description: "Acute care ward reached 82% capacity following morning intake.",
            status: "Monitor Closely",
            recommendation: "Coordinate with discharge desk to expedite post-operative bed transitions."
        },
        "Inspect Water System": {
            icon: "💧",
            description: "Pressure fluctuations observed in the secondary hydraulic loop feeding cooling towers.",
            status: "Maintenance Due",
            recommendation: "Schedule routine impeller inspection and check flow-rate restrictors."
        },
        "Monitor Bed Capacity": {
            icon: "🛏️",
            description: "Anticipated surge during weekend schedule may reduce ICU buffer below threshold.",
            status: "Capacity Warning",
            recommendation: "Review on-call staffing schedules and stage backup ward beds."
        },
        "Review Energy Consumption": {
            icon: "⚡",
            description: "Peak tariff rates active between 2:00 PM and 6:00 PM.",
            status: "Efficiency Protocol",
            recommendation: "Activate solar battery storage discharge to shave peak utility costs."
        },
        "Solar Contribution": {
            icon: "☀️",
            description: "Photovoltaic output peaked at 4,280 kWh due to clear sky irradiance.",
            status: "Operating Optimally",
            recommendation: "System operating at 99.2% inverter conversion efficiency."
        }
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
                    if (cleaned.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(cleaned.toLowerCase())) {
                        data = alertInformation[key];
                        break;
                    }
                }
            }

            // Fallback generic alert
            if (!data) {
                const desc = this.querySelector("p") ? this.querySelector("p").innerText : "Important notification";
                data = {
                    icon: "🔔",
                    description: desc,
                    status: "Logged",
                    recommendation: "Review facility procedures and acknowledge notification."
                };
            }

            if (alertPopup) {
                if (alertPopupIcon) alertPopupIcon.innerText = data.icon;
                if (alertPopupTitle) alertPopupTitle.innerText = cleaned || rawTitle;
                if (alertPopupDescription) alertPopupDescription.innerText = data.description;
                if (alertPopupStatus) alertPopupStatus.innerText = data.status;
                if (alertPopupRecommendation) alertPopupRecommendation.innerText = data.recommendation;
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
    const settingsLinks = document.querySelectorAll(".settings-link, a[href='#settings'], .sidebar-bottom a:first-child");

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
        if (alertPopup && e.target === alertPopup) alertPopup.classList.remove("show");
        if (settingsPopup && e.target === settingsPopup) settingsPopup.classList.remove("show");
        if (loginPopup && e.target === loginPopup) loginPopup.classList.remove("show");
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
