import { GraphQLError } from "graphql";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import rateLimit from "express-rate-limit";
import {
    // expiration times need to be timestamp in seconds - 1000 milliseconds in a second - 
        guestATokenExpiry,
        userATokenExpiry,
        adminATokenExpiry,
        superadminATokenExpiry,
        overlordATokenExpiry,
        storeATokenExpiry,
        superStoreATokenExpiry,
        
        // secrets
        secret,
        adminSecret,
        superadminSecret,
        overlordSecret,
        storeSecret,
        superStoreSecret
    } from "./keys.mjs";

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

/* AUTHORIZATION UTILITY */
/* Authorize whether a user has permissions to achieve certain functionalities */

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


/* AUTHENTICATION MIDDLEWARE */

function isAuthorized({ req, res }) {

    // Extract token from headers, body, or query parameters
    let token;

    if (req.headers.authorization) {
        const authHeader = req.headers.authorization;
        const parts = authHeader.split(" ");
        if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
            token = parts[1];
        } else {
            throw new Error("Invalid Authorization header format.");
        }
    }

    token = token || req.body.token || req.query.token;

    if (!token) {
        throw new Error("No token provided.");
    }

    let decodedToken;

    // Try verifying the token with each secret
    const secrets = [
        { secret: secret, role: 'user' },
        { secret: adminSecret, role: 'admin' },
        { secret: superadminSecret, role: 'superadmin' },
        { secret: overlordSecret, role: 'overlord' },
        { secret: storeSecret, role: 'store' },
        { secret: superStoreSecret, role: 'superStore' },

    ];

    let verified = false;

    for (const keyObj of secrets) {
        try {
            decodedToken = verify(token, keyObj.secret);
            // Confirm the role matches
            if (decodedToken.role === keyObj.role) {
                verified = true;
                break; // Stop once the token is successfully verified
            }
        } catch (err) {
            // If verification fails, try the next secret
            continue;
        }
    }

    if (!verified) {
        // If none of the secrets worked, the token is invalid
        throw new Error("Invalid token.");
    }

    const user = {
        id: decodedToken.id,
        role: decodedToken.role,
        permissions: decodedToken.permissions,
        rateLimit: decodedToken.rates,
        rateReset: decodedToken.rateResets,
    };

    // Attach user data to the request object
    req.user = user;

    // Proceed to the next middleware or resolver
    return req;
}



export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})


export const AuthenticationError = new GraphQLError("Could not authenticate user.", {
    extensions: {
            code: "UNAUTHENTICATED",
        },
    }
);

export const RoleError = new GraphQLError("User does not have permission.", {
    extensions: {
        code: "UNAUTHORIZED ",
    },
});

export const ExpiryError = new GraphQLError("User must login again", {
    extensions: {
        code: "UNAUTHORIZED ",
    },
});

export const JTIError = new GraphQLError("User JTI not applicable", {
    extensions: {
        code: "UNAUTHORIZED ",
    },
});

export const URLError = new GraphQLError("User URN not applicable", {
    extensions: {
        code: "UNAUTHORIZED ",
    },
});

export const TokenError = new GraphQLError("User token not applicable", {
    extensions: {
        code: "UNAUTHORIZED ",
    },
});

export const PermissionError = new GraphQLError("User does not have permission", {
    extensions: {
        code: "UNAUTHORIZED ",
    },
});

export const RateLimitError = new GraphQLError("User has exceeded rate limit", {
    extensions: {
        code: "UNAUTHORIZED ",
    },
});

export default isAuthorized;
