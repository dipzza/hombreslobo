import { page } from './page.js';
import { roomIDToPeerID, serverConfig } from './config/peerServer.js';

export function joinAsPlayer() {
  const peer = new Peer({ config: serverConfig });
  const roomID = page.getSelectedRoomID();

  peer.on('open', id => {
    const conn = peer.connect(roomIDToPeerID(roomID));
    peer.on('error', _ => {
      alert(`La sala ${roomID} ta cerrá, espera a que la abra el narrador`);
      peer.destroy();
      location.reload();
    })

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
  });  
}