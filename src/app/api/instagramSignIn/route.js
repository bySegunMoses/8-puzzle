import { db } from '../../../../firebase/firebaseAdmin';
import admin from 'firebase-admin';
import fetch from 'node-fetch';

export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    try {
        const response = await fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.INSTAGRAM_CLIENT_ID,
                client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
                code,
            }),
        });

        const { access_token } = await response.json();
        const userResponse = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`);
        const userData = await userResponse.json();

        const uid = `instagram_${userData.id}`;
        const customToken = await admin.auth().createCustomToken(uid);

        await db.collection('users').doc(uid).set({
            username: userData.username,
            accessToken: access_token,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.json({ customToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
