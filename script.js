const data = [
  { id: 1, name: "DevLens", desc: "Inspect layouts and boundaries", active: true, icon: "icons/logo-devlens.svg" },
  { id: 2, name: "StyleSpy", desc: "Copy CSS instantly", active: true, icon: "icons/logo-style-spy.svg" },
  { id: 3, name: "SpeedBoost", desc: "Boost performance", active: false, icon: "icons/logo-speed-boost.svg" },
  { id: 4, name: "JSONWizard", desc: "Format JSON responses", active: true, icon: "icons/logo-json-wizard.svg" },
  { id: 5, name: "TabMaster Pro", desc: "Organize tabs", active: true, icon: "icons/logo-tab-master-pro.svg" },
  { id: 6, name: "ViewportBuddy", desc: "Test resolutions", active: false, icon: "icons/logo-viewport-buddy.svg" },
  { id: 7, name: "Markup Notes", desc: "Annotate pages", active: true, icon: "icons/logo-markup-notes.svg" },
  { id: 8, name: "GridGuides", desc: "Overlay grids", active: false, icon: "icons/logo-grid-guides.svg" },
  { id: 9, name: "Palette Picker", desc: "Pick colors", active: true, icon: "icons/logo-palette-picker.svg" },
  { id: 10, name: "LinkChecker", desc: "Check broken links", active: true, icon: "icons/logo-link-checker.svg" },
  { id: 11, name: "DOM Snapshot", desc: "Capture DOM", active: false, icon: "icons/logo-dom-snapshot.svg" },
  { id: 12, name: "ConsolePlus", desc: "Advanced console", active: true, icon: "icons/logo-console-plus.svg" }
];

let currentFilter = "all";

const grid = document.getElementById("grid");

function render() {
  grid.innerHTML = "";

  const filtered = data.filter(item => {
    if (currentFilter === "active") return item.active;
    if (currentFilter === "inactive") return !item.active;
    return true;
  });

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    const cardTop = document.createElement("div");
    cardTop.className = "card__top";

    const iconDiv = document.createElement("div");
    iconDiv.className = "icon";

    const img = document.createElement("img");
    img.src = item.icon;
    img.alt = item.name;
    iconDiv.appendChild(img);

    const infoDiv = document.createElement("div");

    const h3 = document.createElement("h3");
    h3.textContent = item.name;

    const p = document.createElement("p");
    p.textContent = item.desc;

    infoDiv.appendChild(h3);
    infoDiv.appendChild(p);

    cardTop.appendChild(iconDiv);
    cardTop.appendChild(infoDiv);

    const cardBottom = document.createElement("div");
    cardBottom.className = "card__bottom";

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove";
    removeBtn.textContent = "Remove";
    removeBtn.dataset.id = item.id;

    const label = document.createElement("label");
    label.className = "switch";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.active;
    checkbox.dataset.id = item.id;

    const slider = document.createElement("span");
    slider.className = "slider";

    label.appendChild(checkbox);
    label.appendChild(slider);

    cardBottom.appendChild(removeBtn);
    cardBottom.appendChild(label);

    card.appendChild(cardTop);
    card.appendChild(cardBottom);

    grid.appendChild(card);
  });

  attachEvents();
}

function attachEvents() {
  document.querySelectorAll(".switch input").forEach(input => {
    input.removeEventListener("change", handleToggle);
    input.addEventListener("change", handleToggle);
  });

  document.querySelectorAll(".remove").forEach(btn => {
    btn.removeEventListener("click", handleRemove);
    btn.addEventListener("click", handleRemove);
  });
}

function handleToggle(e) {
  const id = Number(e.target.dataset.id);
  const item = data.find(i => i.id === id);
  if (item) {
    item.active = e.target.checked;
    render();
  }
}

function handleRemove(e) {
  const id = Number(e.target.dataset.id);
  const index = data.findIndex(i => i.id === id);
  if (index !== -1) {
    data.splice(index, 1);
    render();
  }
}

render();