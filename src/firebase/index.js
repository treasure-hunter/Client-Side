import { initializeApp } from 'firebase'
const app = initializeApp({
  apiKey: "AIzaSyBcuLoD388iMtThDVgw83xloalWRQX4v4s",
  authDomain: "treasure-hunter-1c288.firebaseapp.com",
  databaseURL: "https://treasure-hunter-1c288.firebaseio.com",
  projectId: "treasure-hunter-1c288",
});

export const fire = app
export const db = app.database()
export const auth = app.auth()