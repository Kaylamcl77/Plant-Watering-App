// ============================================================
// app.js — what your site DOES.
// Plain JavaScript, no libraries, no installs.
// It uses STARTUP and LISTINGS from data.js (loaded first).
// ============================================================

(function () {
  "use strict";

  const storage = {
    get: function (key, fallback) {
      try { const saved = localStorage.getItem(key); return saved === null ? fallback : JSON.parse(saved); }
      catch (error) { return fallback; }
    },
    set: function (key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) {} }
  };
  const watered = storage.get("watered", []);
  const list = document.getElementById("plant-list");
  const summary = document.getElementById("plant-summary");

  document.title = STARTUP.name + " | Plant care, made simple";
  document.getElementById("brand-name").textContent = STARTUP.name;
  document.getElementById("tagline").textContent = STARTUP.tagline;
  document.getElementById("pitch").textContent = STARTUP.pitch;

  function daysUntil(date) { return Math.round((new Date(date + "T12:00:00") - new Date("2026-11-02T12:00:00")) / 86400000); }
  function priorityLabel(days) {
    if (days <= 0) return { text: days < 0 ? "Overdue" : "Due today", className: "urgent" };
    if (days === 1) return { text: "Tomorrow", className: "soon" };
    return { text: "In " + days + " days", className: "planned" };
  }

  function makePlantCard(plant) {
    const priority = priorityLabel(daysUntil(plant.nextWatering));
    const complete = watered.indexOf(plant.id) !== -1;
    const card = document.createElement("article");
    card.className = "plant-card" + (complete ? " is-watered" : "");
    const copy = document.createElement("div");
    copy.className = "plant-copy";
    const icon = document.createElement("div");
    icon.className = "plant-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "✿";
    const details = document.createElement("div");
    details.innerHTML = "<span class=\"tag\">" + plant.species + "</span><h3>" + plant.name + "</h3><p>" + plant.location + " · " + plant.note + "</p>";
    copy.append(icon, details);
    const action = document.createElement("div");
    action.className = "plant-action";
    const status = document.createElement("span");
    status.className = "priority " + priority.className;
    status.textContent = complete ? "Watered today" : priority.text;
    const button = document.createElement("button");
    button.className = "button secondary";
    button.type = "button";
    button.textContent = complete ? "Undo" : "Mark watered";
    button.addEventListener("click", function () {
      const position = watered.indexOf(plant.id);
      if (position === -1) watered.push(plant.id); else watered.splice(position, 1);
      storage.set("watered", watered);
      renderPlants();
    });
    action.append(status, button);
    card.append(copy, action);
    return card;
  }

  function renderPlants() {
    const ordered = PLANTS.slice().sort(function (a, b) { return daysUntil(a.nextWatering) - daysUntil(b.nextWatering); });
    list.replaceChildren.apply(list, ordered.map(makePlantCard));
    const remaining = PLANTS.filter(function (plant) { return watered.indexOf(plant.id) === -1; }).length;
    summary.textContent = remaining + " plant" + (remaining === 1 ? "" : "s") + " need attention";
  }

  function renderSitters() {
    const sitterList = document.getElementById("sitter-list");
    SITTERS.forEach(function (sitter) {
      const card = document.createElement("article");
      card.className = "sitter-card";
      card.innerHTML = "<div class=\"avatar\">" + sitter.name.charAt(0) + "</div><div class=\"sitter-info\"><h2>" + sitter.name + "</h2><p>" + sitter.area + " · ★ " + sitter.rating + " · " + sitter.visits + "</p></div><strong>" + sitter.price + "</strong>";
      sitterList.append(card);
    });
  }

  function showView() {
    const requested = (window.location.hash || "#home").slice(1);
    const current = document.getElementById(requested) ? requested : "home";
    document.querySelectorAll("[data-view]").forEach(function (view) { view.hidden = view.id !== current; });
    document.querySelectorAll("nav a").forEach(function (link) { link.toggleAttribute("aria-current", link.getAttribute("href") === "#" + current); });
    window.scrollTo(0, 0);
  }

  document.getElementById("notify-button").addEventListener("click", function () { document.getElementById("notify-message").hidden = false; this.textContent = "You're on the list"; this.disabled = true; });
  window.addEventListener("hashchange", showView);
  renderPlants();
  renderSitters();
  showView();
})();
