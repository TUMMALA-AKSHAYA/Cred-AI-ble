/**
 * Standardize API responses
 */
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

/**
 * Standardize error responses
 */
const errorResponse = (res, message = 'An error occurred', statusCode = 500, error = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };

  // Include error details in development
  if (process.env.NODE_ENV === 'development' && error) {
    response.error = {
      message: error.message,
      stack: error.stack
    };
  }

  return res.status(statusCode).json(response);
};

/**
 * Algorand transaction response formatter
 */
const algorandTxResponse = (res, txId, data = {}, message = 'Transaction successful') => {
  return res.json({
    success: true,
    message,
    transaction: {
      txId,
      explorerUrl: `https://testnet.algoexplorer.io/tx/${txId}`,
      ...data
    },
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  successResponse,
  errorResponse,
  algorandTxResponse
};
