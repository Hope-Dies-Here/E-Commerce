const success = (res, data, message) => {
  res.status(200).json({
    status: "success",
    data,
    message: message || "Success",
  });
};
const created = (res, data, message) => {
  res.status(201).json({
    status: "success",
    data,
    message: message || "Created successfully",
  });
};
const error = (res, message, status = 500) => {
  res.status(status).json({
    status: "error",
    message,
  });
};
const notFound = (res, message) => {
  res.status(404).json({
    status: "error",
    message,
    error,
  });
};
const unauthorized = (res, message) => {
  res.status(401).json({
    status: "error",
    message,
  });
};
const forbidden = (res, message) => {
  res.status(403).json({
    status: "error",
    message,
  });
};
const badRequest = (res, message) => {
  res.status(400).json({
    status: "error",
    message,
  });
};

module.exports = Response = {
  created,
  success,
  error,
  notFound,
  unauthorized,
  forbidden,
  badRequest,
};
// Usage:
