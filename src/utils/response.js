const responseSuccess = (res, data, status = 200, message = "Success") => {
  return res.status(status).json({
    status,
    error: false,
    message,
    ...(data !== undefined && data !== null ? { data } : {}),
  });
};

const responseError = (res, details, status = 400, message) => {
  return res.status(status).json({
    status,
    error: true,
    message,
    ...(details !== undefined && details !== null ? { details } : {}),
  });
};

module.exports = {
  responseError,
  responseSuccess,
};
