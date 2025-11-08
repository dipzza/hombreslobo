export const ROOM_A_ID = '3007f2b5-9d3e-4153-becd-757d1ebd4ae4';
export const ROOM_B_ID = '472d306b-1dae-43fd-b619-9f4a023d3082';
export const ROOM_C_ID = '1b89c202-39e3-4dba-8646-069a18a55831';
export const ROOM_D_ID = '3f862454-86d7-4285-b545-e11fdbd33750';

export const serverConfig = {
  iceServers: [
      {urls: 'stun:freestun.net:3478' }, 
      {urls: 'turn:freestun.net:3478', username: 'free', credential: 'free' }
  ]
}
