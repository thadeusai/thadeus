export const parseError = (errorObject) => ({
    statusCode: errorObject.statusCode,
    message: errorObject.error,
})