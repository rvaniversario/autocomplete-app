const searchInput = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search stores.json and filter it
const searchStores = async (searchInputText) => {
  const res = await fetch("../data/stores.json");
  const stores = await res.json();

  // Get matches to current text input
  let matches = stores.filter((store) => {
    const regex = new RegExp(`^${searchInputText}`, "gi");
    return store.name.match(regex) || store.city.match(regex);
  });

  if (searchInputText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

// Show results in HTML
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <ul class="list-group">
            <li class="list-group-item border-top-0 border-start-0 border-end-0 border-bottom border-secondary rounded-0">Store Name: ${match.name} <br> Address: ${match.address} ${match.city} ${match.state} ${match.zip}</li>
        </ul>
      `
      )
      .join("");

    matchList.innerHTML = html;
  }
};

searchInput.addEventListener("input", () => searchStores(searchInput.value));
