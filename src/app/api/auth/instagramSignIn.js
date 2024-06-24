// pages/api/instagramSignIn.js
import { db } from '../../firebaseAdmin';
import admin from 'firebase-admin';
import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Get Instagram OAuth token and user data
        const { code } = req.query;
        const instagramResponse = await fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: process.env.INSTAGRAM_CLIENT_ID,
                client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
                code,
            }),
        });
        const instagramData = await instagramResponse.json();

        const { access_token } = instagramData;
        const userResponse = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`);
        const userData = await userResponse.json();

        // Create Firebase custom token
        const uid = `instagram_${userData.id}`;
        const customToken = await admin.auth().createCustomToken(uid);

        // Save user data to Firestore
        await db.collection('users').doc(uid).set({
            username: userData.username,
            accessToken: access_token,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(200).json({ customToken });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
