import {sendEmail} from '../services/emailService.js';

export const subscribe = (email) => {
    // logic for subscribing to the newsletter
    return {email};
};

export const sendNewsletter = (subject, content) => {
    // logic for sending the newsletter
    return sendEmail('subscribers@example.com', subject, content);
}