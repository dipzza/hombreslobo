export const page = {
  getSelectedRoomID,
  getPlayerNickname,
  hideJoinMenu,
  showPlayerView,
  showPlayerRole,
  showNarratorView,
  updatePlayers: updateConnectedPlayers,
  updatePlayerCount,
  updateActivePlayers: updateGamePlayers
}

// Main Page
function getSelectedRoomID() {
  return document.querySelector('input[name="room"]:checked').value;
}

function getPlayerNickname() {
  return document.getElementById('nickname').value.trim();
}

function hideJoinMenu() {
  document.getElementById('menu').hidden = true;
}

// Player View
function showPlayerView() {
  document.getElementById('player-view').hidden = false;
}

function showPlayerRole(role) {
  document.getElementById('player-message').textContent = "Tu rol: " + role;
}

// Narrator View
function showNarratorView() {
  document.getElementById('narrator-view').hidden = false;
}

function updateConnectedPlayers(players) {
  const playersList = document.getElementById('connected-players-list');
  playersList.innerHTML = '';
  for (const {nickname} of players) {
    const li = document.createElement('li');
    li.textContent = nickname;
    playersList.appendChild(li);
  }

  document.getElementById('players-count').textContent = players.length;
}

function updateGamePlayers(players) {
  const activePlayersList = document.getElementById('game-players-list');
  activePlayersList.innerHTML = '';
  for (const {nickname, role} of players) {
    const li = document.createElement('li');
    li.textContent = nickname + (role ? ` (${role})` : '');
    activePlayersList.appendChild(li);
  }
}

function updatePlayerCount(players) {
  document.getElementById('players-count').textContent = players.length;
}


