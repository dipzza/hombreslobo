import { ROOM_A_ID, ROOM_B_ID, ROOM_C_ID } from "./config/peerServer.js";

export const page = {
  getSelectedRoomID,
  getPlayerNickname,
  hideJoinMenu,
  showPlayerView,
  showPlayerRole,
  showNarratorView,
  updatePlayers,
  updatePlayerCount
}

const roomRadioOptionToRoomId = {
  'A': ROOM_A_ID,
  'B': ROOM_B_ID,
  'C': ROOM_C_ID,
};

// Main Page
function getSelectedRoomID() {
  const roomCheckedOption = document.querySelector('input[name="room"]:checked');
  return roomRadioOptionToRoomId[roomCheckedOption.value];
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

function updatePlayers(players) {
  const playersList = document.getElementById('players-list');
  playersList.innerHTML = '';
  for (const {nickname, role} of players) {
    const li = document.createElement('li');
    li.textContent = nickname + (role ? ` (${role})` : '');
    playersList.appendChild(li);
  }

  document.getElementById('players-count').textContent = players.length;
}

function updatePlayerCount(players) {
  document.getElementById('players-count').textContent = players.length;
}


