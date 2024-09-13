export const jwtConfig = {
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    jwtExpiration: process.env.JWT_EXPIRATION || '1h',
};

// to import this config in other file use
// import { jwtConfig } from '';
