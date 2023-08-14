import * as admin from 'firebase-admin';

const firebase = admin.initializeApp();

export const auth = firebase.auth();
export const messaging = firebase.messaging();
