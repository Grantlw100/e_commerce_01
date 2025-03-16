import crypto from 'crypto';

// need to make these resolvers or express routes 
    // import { saveRefreshToken, getRefreshToken } from '../db/redis.js';
    // import { getIpAddress } from '../utils/getIpAddress.js';
import {
 guestRTokenExpiry,
 userRTokenExpiry,
 adminRTokenExpiry,
 superAdminRTokenExpiry
} from '../auth/keys.mjs';


/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                                        /* Refresh Token Generation */
                /* Creating refresh tokens for guest, user, and admin specific access tokens */

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


export function generateRefreshToken(userId, role, IP, userAgent)  {
    // roles for each user with applicable expiration times
    const roles = [{
        guest:{
            role: 'guest',
        expiresAt: new Date() + guestRTokenExpiry
        }, 
        user: {
            role: 'user', 
            expiresAt: new Date() + userRTokenExpiry
        }, 
        admin: {
            role: 'admin',
            expiresAt: new Date() + adminRTokenExpiry 
        }, 
        superAdmin: {
            role: 'superadmin',
            expiresAt: Date.now() + superAdminRTokenExpiry
        }
    }];

    // generate an opaque token
    const token = crypto.randomBytes(64).toString('hex');

    // get the expiration time for the token
    const tokenData = roles[role];

    // create the refresh token
    const refreshToken = {
        userId: userId,
        role: tokenData.role,
        token: token,
        createdAt: new Date(),
        expiresAt: tokenData.expiresAt,
        valid: true,
        metadata: {
            ip: IP,
            userAgent: userAgent
        }
    };
    // send the refresh token as the result
    return refreshToken;
};

// token verification
export function verifyRefreshToken(token) {
    const tokenData = getRefreshToken(token);
    if (!tokenData || !tokenData.valid || tokenData.expiresAt < new Date() || tokenData.revokedAt) {
        throw new error('Token is invalid');
    }
    return tokenData;
}

// token revocation
export function revokeRefreshToken(token) {
    const tokenData = getRefreshToken(token);
    if (!tokenData) {
        throw new error('Token not found');
    }
    tokenData.valid = false;
    tokenData.revokedAt = new Date();
    saveRefreshToken(tokenData);
    return tokenData;
}

// token deletion
export function deleteRefreshToken(token) {
    const tokenData = getRefreshToken(token);
    if (!tokenData) {
        throw new error('Token not found');
    }
    saveRefreshToken(tokenData);
    return tokenData;
}

