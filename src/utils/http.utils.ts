import https from 'https';

export function getHttpAgent(): https.Agent {
    return new https.Agent({
        rejectUnauthorized: false,
    });
}