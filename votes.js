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
