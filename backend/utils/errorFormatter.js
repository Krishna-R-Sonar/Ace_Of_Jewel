export const formatError = (error) => {
    return {
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack
    }
}