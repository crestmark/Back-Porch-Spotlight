
document.addEventListener("DOMContentLoaded", function () {
  const PERFORMER_SHEET = "https://docs.google.com/spreadsheets/d/1-la1e-tNf3IzDYkMznsog4ImyLedx4XKEDhuaYI8YaE/export?format=csv";
  const VOTE_SHEET = "https://docs.google.com/spreadsheets/d/1-TFe1-8qJNbvmhlajS3hGZ8nZfI6jIU_yAZJMvEhdiQ/export?format=csv";

  const gallery = document.getElementById("performer-gallery");
  const ticker = document.getElementById("vote-ticker");

  let voteCounts = {};

  Papa.parse(VOTE_SHEET, {
    download: true,
    header: true,
    complete: function(results) {
      results.data.forEach(row => {
        const name = row.Performer?.trim();
        if (name) voteCounts[name] = (voteCounts[name] || 0) + 1;
      });

      const top = Object.entries(voteCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);
      ticker.textContent = top.map(([name, count]) => `${name}: ${count} votes`).join(" | ");
    }
  });

  Papa.parse(PERFORMER_SHEET, {
    download: true,
    header: true,
    complete: function(results) {
      gallery.innerHTML = "";
      results.data.forEach(row => {
        const number = row["Number"]?.trim();
        const name = row["Performer"]?.trim();
        const photo = row["Photo Link"]?.trim();
        const bio = row["Bio"]?.trim();
        const fullName = `${number ? number + " " : ""}${name}`;
        if (!name) return;

        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = photo || "https://via.placeholder.com/300x300?text=No+Image";
        card.appendChild(img);

        const h3 = document.createElement("h3");
        h3.textContent = fullName;
        card.appendChild(h3);

        const p = document.createElement("p");
        p.textContent = bio || "No bio provided.";
        card.appendChild(p);

        const voteBtn = document.createElement("a");
        voteBtn.href = `https://form.jotform.com/251406526850051?Performer=${encodeURIComponent(fullName)}`;
        voteBtn.className = "vote-button";
        voteBtn.target = "_blank";
        voteBtn.textContent = "Vote Now";
        card.appendChild(voteBtn);

        gallery.appendChild(card);
      });
    }
  });
});
