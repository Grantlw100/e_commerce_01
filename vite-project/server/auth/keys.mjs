

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                        
                            /* ENV KEYS FOR PROPER ACCESS */
                /* Creating role, user, and admin specific access tokens */

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/



// JSON WEB TOKEN KEYS 

export const guestATokenExpiry = process.env.GUEST_A_TOKEN_EXPIRY || '24h';
export const userATokenExpiry = process.env.USER_A_TOKEN_EXPIRY || '24h';
export const adminATokenExpiry =  process.env.ADMIN_A_TOKEN_EXPIRY || '8h';
export const superadminATokenExpiry = process.env.SUPER_ADMIN_A_TOKEN || '4h';
export const overlordATokenExpiry = process.env.OVERLORD || '4h';
export const storeATokenExpiry = process.env.STORE_A_TOKEN || '4h';
export const superStoreATokenExpiry = process.env.SUPER_STORE_A_TOKEN || '4h';


// URN Address for the token
export const ISSURN = process.env.ISS_URN || 'http://localhost:3000';
export const AUDURN = process.env.AUD_URN || 'http://localhost:3000';

// secret = key used to sign token
export const secret = process.env.JWT_SECRET;
export const adminSecret = process.env.JWT_ADMIN_SECRET;
export const superadminSecret = process.env.JWT_SUPERADMIN_SECRET;
export const overlordSecret = process.env.JWT_OVERLORD_SECRET;
export const storeSecret = process.env.JWT_STORE_SECRET;
export const superStoreSecret = process.env.JWT_SUPERSTORE_SECRET;

//  OPAQUE KEYS 

export const guestRTokenExpiry = process.env.GUEST_R_TOKEN_EXPIRY || (7 * 24 * 60 * 60 * 1000);
export const userRTokenExpiry = process.env.USER_R_TOKEN_EXPIRY || (3 * 24 * 60 * 60 * 1000);
export const adminRTokenExpiry = process.env.ADMIN_R_TOKEN_EXPIRY || 24 * 60 * 60 * 1000;
export const superAdminRTokenExpiry = process.env.SUPER_ADMIN_R_TOKEN_EXPIRY || 8 * 60 * 60 * 1000;
export const overlordRTokenExpiry = process.env.OVERLORD_R_TOKEN_EXPIRY || 4 * 60 * 60 * 1000;
export const storeRTokenExpiry = process.env.STORE_R_TOKEN_EXPIRY || 4 * 60 * 60 * 1000;
export const superStoreRTokenExpiry = process.env.SUPER_STORE_R_TOKEN_EXPIRY || 4 * 60 * 60 * 1000;