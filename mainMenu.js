import { joinAsPlayer } from './player.js';
import { joinAsNarratorHost } from './narrator.js';

let joined = false;

document.getElementById('join-as-player-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (!joined) {
    joined = true;
    joinAsPlayer();
  }
});

document.getElementById('join-as-narrator').addEventListener('click', () => {
  if (!joined) {
    joined = true;
    joinAsNarratorHost();
  }
});

