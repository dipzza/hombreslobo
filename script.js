import { serverConfig } from './config/peerServer.js';
import { roles } from './config/game.js';
import { page } from './page.js';

document.getElementById('join-as-player-form').addEventListener('submit', (event) => {
  event.preventDefault();
  joinAsPlayer();
});

document.getElementById('join-as-narrator').addEventListener('click', () => {
  joinAsNarratorHost();
});

function joinAsPlayer() {
  const peer = new Peer({ config: serverConfig });

  peer.on('open', id => {
    const conn = peer.connect(page.getSelectedRoomID());

    conn.on('open', () => {
      conn.send({ nickname: page.getPlayerNickname() });
      page.hideJoinMenu();
      page.showPlayerView();
    });

    conn.on('data', data => {
      if (data.role) {
        page.showPlayerRole(data.role);
      }
    });

    conn.on('error', err => {
      alert("Could not connect to host: " + err.message);
      location.reload();
    });
  });
}

let players = []; // {nickname, conn, role}[]

function joinAsNarratorHost() {
  page.hideJoinMenu();
  page.showNarratorView();

  const peer = new Peer(page.getSelectedRoomID(), { config: serverConfig });
  peer.on('error', err => {
    alert("Room may be in use, error: " +err.message)
    location.reload();
  });

  peer.on('connection', conn => {
    conn.on('data', data => {
      if (data.nickname) {
        players.push({
          nickname: data.nickname,
          conn,
          role: null
        });
        page.updatePlayers(players);
      }
    });

    conn.on('close', () => {
      players = players.filter(p => p.conn !== conn);
      page.updatePlayerCount(players);
    })
  });

  renderRolePicker();
}

let selectedRoles = [];
document.getElementById('deal-roles').onclick = () => {
  const shuffledRoles = shuffle(selectedRoles);
  for (let i = 0; i < shuffledRoles.length; i++) {
    players[i].role = shuffledRoles[i];
    players[i].conn.send({ role: shuffledRoles[i] });
  }
  page.updatePlayers(players);
};

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function renderRolePicker() {
  const container = document.getElementById("role-picker");
  container.innerHTML = '';
  
  roles.forEach(role => {
    const count = selectedRoles.filter(r => r === role).length;

    const div = document.createElement('div');
    div.className = 'role-option';
    div.innerHTML = `
      <strong>${role}</strong><br>
      <button data-role="${role}" data-change="-1">−</button>
      <span>${count}</span>
      <button data-role="${role}" data-change="1">+</button>
    `;
    container.appendChild(div);
  });

  document.getElementById('role-count').textContent = selectedRoles.length;
  document.getElementById('deal-roles').disabled = selectedRoles.length !== players.length || players.length === 0;

  container.querySelectorAll('button').forEach(btn => {
    btn.onclick = () => {
      const role = btn.dataset.role;
      const change = parseInt(btn.dataset.change);
      if (change === 1) {
        selectedRoles.push(role);
      } else {
        const idx = selectedRoles.lastIndexOf(role);
        if (idx !== -1) selectedRoles.splice(idx, 1);
      }
      renderRolePicker();
    };
  });
}