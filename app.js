let performers = [];
const rounds = 6;

function fetchPerformersFromSheet() {
  const url = 'https://opensheet.elk.sh/1-la1e-tNf3IzDYkMznsog4ImyLedx4XKEDhuaYI8YaE/Master%20Log';

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      performers = data
        .map(row => row["Performer"])  // <- Use the exact column label
        .filter(name => !!name);       // Remove empty entries
    });
}

const performers = Array.from({ length: 64 }, (_, i) => `Performer ${i + 1}`);
const rounds = 6;

function generateBracket() {
  const left = document.getElementById("left-bracket");
  const right = document.getElementById("right-bracket");

  const half = performers.length / 2;
  const leftPerformers = performers.slice(0, half);
  const rightPerformers = performers.slice(half);

  createSideBracket(left, leftPerformers, true);
  createSideBracket(right, rightPerformers, false);
}

function createSideBracket(container, performerList, isLeft) {
  for (let round = 0; round < rounds; round++) {
    const column = document.createElement("div");
    column.className = "bracket-column";
    const matches = Math.pow(2, rounds - round - 1);

    for (let i = 0; i < matches; i++) {
      const match = document.createElement("div");
      match.className = "match";
      const p1 = performerList[i * 2] || "TBD";
      const p2 = performerList[i * 2 + 1] || "TBD";
      match.innerHTML = round === 0 ? `<strong>${p1}</strong><br>${p2}` : "Winner TBD";
      column.appendChild(match);
    }

    if (isLeft) {
      container.insertBefore(column, container.firstChild);
    } else {
      container.appendChild(column);
    }
  }
}

function fetchLeaderboard() {
  const sheetURL = 'https://opensheet.elk.sh/1-TFe1-8qJNbvmhlajS3hGZ8nZfI6jIU_yAZJMvEhdiQ/Form Responses 1';
  fetch(sheetURL)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('leaderboard-list');
      list.innerHTML = '';

      const tally = {};
      data.forEach(entry => {
        const name = entry["Performer Name"];
        if (name) {
          tally[name] = (tally[name] || 0) + 1;
        }
      });

      const sorted = Object.entries(tally)
        .sort(([, aVotes], [, bVotes]) => bVotes - aVotes);

      sorted.forEach(([name, votes]) => {
        const li = document.createElement('li');
        li.textContent = `${name}: ${votes} vote${votes !== 1 ? 's' : ''}`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Failed to fetch leaderboard data", err);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  generateBracket();
  fetchLeaderboard();
});
