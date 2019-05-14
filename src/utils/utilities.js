// Promise resolve/reject wrapper
export const promiseWrapper = promise =>
    promise
        .then(data => ({
            data,
            error: null
        }))
        .catch(error => ({
            error,
            data: null
        }));

export const buildResponseMessage = (message, responseCode = 500) => {
    return {
        responseCode,
        responseMessage: message
    }
}
