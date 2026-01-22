import { page } from './page.js';
import { roomIDToPeerID, serverConfig } from './config/peerServer.js';
import { roles } from './config/game.js';

let players = []; // {nickname, conn, role}[]

export function joinAsNarratorHost() {
  const roomID = page.getSelectedRoomID();

  const peer = new Peer(roomIDToPeerID(roomID), { config: serverConfig });
  peer.on('error', _ => {
    alert(`La sala ${roomID} ta pillá, selecciona otra gracias un saludo`);
    peer.destroy();
    location.reload();
  });

  peer.on('open', id => {
    page.hideJoinMenu();
    page.showNarratorView();
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
      page.updatePlayers(players);
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