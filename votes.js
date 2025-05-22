
document.addEventListener('DOMContentLoaded', function() {
  const leaderboard = document.getElementById('leaderboard');
  leaderboard.innerHTML = '';
  const topPerformers = ["Performer 3", "Performer 17", "Performer 22", "Performer 45", "Performer 58"];
  topPerformers.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    leaderboard.appendChild(li);
  });
});
