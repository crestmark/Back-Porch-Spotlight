
document.addEventListener("DOMContentLoaded", function () {
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/1-la1e-tNf3IzDYkMznsog4ImyLedx4XKEDhuaYI8YaE/export?format=csv";
  const gallery = document.getElementById("performer-gallery");

  fetch(SHEET_URL)
    .then(response => response.text())
    .then(csv => {
      const rows = csv.split("\n").slice(1);
      gallery.innerHTML = '';
      rows.forEach(row => {
        const cols = row.split(',');
        const name = cols[1]?.trim();  // Column B: Performer
        const img = cols[6]?.trim();   // Column G: Photo URL
        const bio = cols[7]?.trim();   // Column H: Bio

        if (name) {
          const card = document.createElement("div");
          card.className = "card";

          const image = document.createElement("img");
          image.src = img || "https://via.placeholder.com/300x300?text=No+Image";
          image.alt = name;

          const h3 = document.createElement("h3");
          h3.textContent = name;

          const p = document.createElement("p");
          p.textContent = bio || "No bio provided.";

          const voteBtn = document.createElement("a");
          voteBtn.href = "https://form.jotform.com/251406526850051";
          voteBtn.textContent = "Vote Now";
          voteBtn.className = "vote-button";
          voteBtn.target = "_blank";

          card.appendChild(image);
          card.appendChild(h3);
          card.appendChild(p);
          card.appendChild(voteBtn);

          gallery.appendChild(card);
        }
      });
    })
    .catch(err => {
      gallery.innerHTML = "<p>Failed to load performers. Please try again later.</p>";
      console.error(err);
    });
});
