import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import {v4 as uuidV4} from "uuid";
import {
    // expiration times need to be timestamp in seconds - 1000 milliseconds in a second - 
        guestATokenExpiry,
        userATokenExpiry,
        adminATokenExpiry,
        superadminATokenExpiry,
        overlordATokenExpiry,
        storeATokenExpiry,
        superStoreATokenExpiry,
        // URN Address for the tokens
        ISSURN,
        AUDURN,
        // secrets
        secret,
        adminSecret,
        superadminSecret,
        overlordSecret,
        storeSecret,
        superStoreSecret
    } from "./keys.mjs";
    


/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                        
                            /* Access Token Generation */
                /* Creating role, user, and admin specific access tokens */

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/



// #region PAYLOAD --------------------------------------------------------------------------------------------------------------------------------------------------------------

// Payload Options for each role
    // JWT automatically sets iat and nbf to the current time and can be removed from the payload 
        // maxAge removed from the payload as it is not a standard claim
        // jti is a unique identifier for the token
        // sub is the subject of the token
        // aud is the audience of the token
        // iss is the issuer of the token
        // exp is the expiration time of the token
        // role is the role of the user
        // permissions is the permissions of the user
        // rate_limit is the rate limit of the user
        // rate_reset is the rate reset of the user
const roleOptions = {
    guest: {
        iss: ISSURN,
        aud: AUDURN,
        role: "guest",
        expiration: guestATokenExpiry,
        secret: secret,
        permissions: "read",
        rates: 500,
        rateResets: 3600
    },
    user: {
        iss: ISSURN,
        aud: AUDURN,
        role: "user",
        expiration: userATokenExpiry,
        secret: secret,
        permissions: ["read", "write"],
        rates: 500,
        rateResets: 3600
    },
    admin: {
        iss: ISSURN,
        aud: AUDURN,
        role: "admin",
        expiration: adminATokenExpiry,
        secret: adminSecret,
        permissions: ["read", "write", "update", "delete"],
        rates: 1000,
        rateResets: 1800
    },
    superadmin: {
        iss: ISSURN,
        aud: AUDURN,
        role: "superadmin",
        expiration: superadminATokenExpiry,
        secret: superadminSecret,
        permissions: ["read", "write", "update", "delete", "admin", "superadmin"],
        rates: 2000,
        rateResets: 3600
    },
    store: {
        iss: ISSURN,
        aud: AUDURN,
        role: "store",
        expiration: storeATokenExpiry,
        secret: storeSecret,
        permissions: ["read", "write", "update", "delete"],
        rates: 1000,
        rateResets: 1800
    },
    superStore: {
        iss: ISSURN,
        aud: AUDURN,
        role: "superStore",
        expiration: superStoreATokenExpiry,
        secret: superStoreSecret,
        permissions: ["read", "write", "update", "delete", "admin", "superadmin"],
        rates: 2000,
        rateResets: 3600
    },
    overlord: {
        iss: ISSURN,
        aud: AUDURN,
        role: "overlord",
        expiration: overlordATokenExpiry,
        secret: overlordSecret,
        permissions: ["read", "write", "update", "delete", "admin", "superadmin", "overlord"],
        rates: 3000,
        rateResets: 3600
    }
};

        // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region ACCESS TOKEN GENERATOR -------------------------------------------------------------------------------------------------------------------------------------------

// Access Token Generator
    // if generating a token for admin or superadmin, generate the user token first and then the admin token
    // if generating a token for a guest, generate a new userId and parse it from the token for the database 
const accessTokenGenerator =(userId, role) => {

    if ( !role || typeof role !== "string" || !roleOptions[role] ) {
        return new Error("Role unrecognized or not provided");
    }

    // guests receive temporary userIds that will auto delete from the database if not used after preset time limit 
        // if no guest account, create user id here and send to database, delete if the user logins within the same session 
    if ( !userId || typeof userId !== "string" ) {
        userId = uuidV4();
    }
   
    const payloadOptions = roleOptions[role];
    let payload = {
        id: userId,
        iss: payloadOptions.iss,
        sub: userId,
        aud: payloadOptions.aud,
        jti: uuidV4(),
        role: payloadOptions.role,
        permissions: payloadOptions.permissions,
        rate_limit: payloadOptions.rates,
        rate_reset: payloadOptions.rateResets,
        version: 1
    };
    


    const token = jwt.sign(payload, payloadOptions.secret, { expiresIn: payloadOptions.expiration });

    return token;
    // parse incoming userId from JWT to database to create guest account
}

        // #endregion ------------------------------------------------------------------------------------------------------------------------------------------------------------------



export default accessTokenGenerator;



// NOTES: 
    
// import ip information from express.js function and request-ip npm package
    // example code:
        // const requestIp = require('request-ip');
        // const express = require('express');
        // const app = express();

        // app.use((req, res, next) => {
        //   const clientIp = requestIp.getClientIp(req); // Get user's IP address
        //   console.log(clientIp);
        //   next();
        // });

        // app.get('/', (req, res) => {
        //   res.send('Check the console for the user\'s IP address');
        // });

        // app.listen(3000, () => console.log('Server running on port 3000'));
// ip package to parse and manipulate IP addresses
    // example code:
        // const ip = require('ip');

        // console.log('My IP address is:', ip.address());
        // console.log('Is this a private IP?', ip.isPrivate(ip.address()));
// geoip-lite package to look up IP address information
    // example code:
        // const geoip = require('geoip-lite');

        // const ipAddress = '8.8.8.8'; // Example IP address
        // const geo = geoip.lookup(ipAddress);
        
        // console.log(geo);
        // Output: { range: [...], country: 'US', region: 'CA', city: 'Mountain View', ll: [37.386, -122.0838], ... }
// ipaddr.js provides utilities for working with ipv4 
    // example code:
        // const ipaddr = require('ipaddr.js');

        // const ip = '2001:4860:4860::8888';
        // if (ipaddr.isValid(ip)) {
        // const parsedIp = ipaddr.parse(ip);
        // console.log('Parsed IP:', parsedIp.toString());
        // } else {
        // console.log('Invalid IP address');
        // }
// SUMMARY 
    // Use request-ip for basic IP extraction in web applications.
    // Combine it with geoip-lite if you need geolocation data.
    // Use ip or ipaddr.js for IP validation, parsing, or private IP detection.
    

// implement four digit pin code for user authentication for follow on requests 

// create auth middleware for resolvers and also begin create access token functions for OAuth2.0 and JWT

//Rate Limiting 
    // Rate Limit in rate_limit Claim:
        //Include the allowed number of requests as part of the token.
        // example: 
            // rate_limit: 1000
                // The rate_limit claim used to reduce the amount of actions a user can make through a time period 
            // rate_reset: 3600
                // The rate_reset claim used to reset the rate_limit claim to the original value after a set time period
        // server-side Validation:
            // track the number of requests per token in a store (e.g., Redis)
            // decrement the rate_limit claim for each request that succeeds 
        // token renewal 
            // if the rate_limit is exhausted or the token expires, force the client to request a new token 
            // example
                // const updatedToken = jwt.sign({ ...decoded, rate_limit: 100}, process.env.JWT_SECRET, { expiresIn: '1h' });


// combining standard and private calims for server-to-client Tokens 
    // use standard claims ( sub, exp, etc ) for basic validation 
    // use private calims ( rate_limit, rate_reset, etc ) for server-side validation
    // encode both into the token payload whrn signing it 
    // Example of COmbined Payload:
        //{
        //   "sub": "user123",
        //   "iat": 1672502400,
        //   "exp": 1672506000,
        //   "rate_limit": 100,
        //   "rate_reset": 3600,
        //   "role": "admin",
        //   "permissions": ["create", "read", "update", "delete"],
        //   "quota": {
        //     "uploads_remaining": 10,
        //     "downloads_remaining": 50
        //   }
        // }
