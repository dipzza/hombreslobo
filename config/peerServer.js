export const ROOM_A_ID = '3007f2b5-9d3e-4153-becd-757d1ebd4ae4';
export const ROOM_B_ID = '472d306b-1dae-43fd-b619-9f4a023d3082';
export const ROOM_C_ID = '1b89c202-39e3-4dba-8646-069a18a55831';
export const ROOM_D_ID = '3f862454-86d7-4285-b545-e11fdbd33750';

const response = 
  await fetch("https://dipzza.metered.live/api/v1/turn/credentials?apiKey=de7751b1831959da36efac9771311a6bf31f");
const iceServers = await response.json();

export const serverConfig = {
  iceServers
}
export function roomIDToPeerID(roomID) {
  return {
    'A': ROOM_A_ID,
    'B': ROOM_B_ID,
    'C': ROOM_C_ID
  }[roomID];
}