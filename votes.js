
document.addEventListener('DOMContentLoaded', function() {
  const leaderboard = document.getElementById('leaderboard');
  leaderboard.innerHTML = '';
  const topPerformers = ["Mel Arizpe", "Ava Martinez", "Vanity Bird", "Ubaldo Enriquez", "Heather Henderson"];
  topPerformers.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    leaderboard.appendChild(li);
  });
});
