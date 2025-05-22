
document.addEventListener("DOMContentLoaded", function () {
  const PERFORMER_SHEET = "https://docs.google.com/spreadsheets/d/1-la1e-tNf3IzDYkMznsog4ImyLedx4XKEDhuaYI8YaE/export?format=csv";
  const VOTE_SHEET = "https://docs.google.com/spreadsheets/d/1-TFe1-8qJNbvmhlajS3hGZ8nZfI6jIU_yAZJMvEhdiQ/export?format=csv";
  const gallery = document.getElementById("performer-gallery");
  const leaderboard = document.getElementById("leaderboard-list");
  const carousel = document.getElementById("carousel-track");

  Papa.parse(PERFORMER_SHEET, {
    download: true,
    header: true,
    complete: function(results) {
      gallery.innerHTML = "";
      carousel.innerHTML = "";
      const performers = results.data.filter(row => row.Performer);

      performers.forEach((row, index) => {
        const card = document.createElement("div");
        card.className = "card";

        const image = document.createElement("img");
        image.src = row["Photo Link"] || "https://via.placeholder.com/300x300?text=No+Image";
        image.alt = row.Performer;

        const h3 = document.createElement("h3");
        h3.textContent = row.Performer;

        const p = document.createElement("p");
        p.textContent = row.Bio || "No bio provided.";

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
        if (index < 10) carousel.appendChild(card.cloneNode(true));
      });
    }
  });

  Papa.parse(VOTE_SHEET, {
    download: true,
    header: true,
    complete: function(results) {
      leaderboard.innerHTML = "";
      const counts = {};
      results.data.forEach(row => {
        const name = row.Performer?.trim();
        if (name) counts[name] = (counts[name] || 0) + 1;
      });
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
      sorted.forEach(([name, votes]) => {
        const li = document.createElement("li");
        li.textContent = `${name}: ${votes} votes`;
        leaderboard.appendChild(li);
      });
    }
  });
});
