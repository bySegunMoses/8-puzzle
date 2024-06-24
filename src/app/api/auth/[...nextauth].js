// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

export default NextAuth({
    providers: [
        Providers.Instagram({
            clientId: process.env.INSTAGRAM_CLIENT_ID,
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
            authorizationUrl: "https://api.instagram.com/oauth/authorize?scope=user_profile,user_media&response_type=code"
        })
    ],
    callbacks: {
        async signIn(user, account, profile) {
            const { accessToken } = account;
            const res = await axios.get(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
            const instagramUser = res.data;
            user.id = instagramUser.id;
            user.username = instagramUser.username;
            return true;
        },
        async session(session, user) {
            session.user = user;
            return session;
        },
    }
});
