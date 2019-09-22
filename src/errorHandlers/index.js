/* File is copied from wesbos - learn node git hub repo and modified*/

const INTERNAL_SERVER_ERROR = 500;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;

/**
 * Custom Error Handler class to throw errors with custom status code
 */
class ErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch and errors they throw, and pass it along to our express middleware with next()
*/

const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/*
  Not Found Error Handler
  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
const notFound = (req, res, next) => {
  const err = new Error("Not found");
  err.status = NOT_FOUND;

  next(err, req, res);
};

const ValidationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err, req, res);
  // validation errors look like
  const error = err.errors[0];
  error.status = BAD_REQUEST;
  next(error, req, res);
  // add more custom logic if needed
};

/*
Development Error Handler
In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
// eslint-disable-next-line no-unused-vars
const developmentErrors = (err, req, res, next) => {
  const { status, message } = err;
  err.stack = err.stack || "";
  const errorDetails = {
    message,
    status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      "<mark>$&</mark>"
    )
  };
  res.status(status || INTERNAL_SERVER_ERROR).send(errorDetails);
};

/*
  Production Error Handler
  No stack traces are leaked to user
*/
// eslint-disable-next-line no-unused-vars
const productionErrors = (err, req, res, next) => {
  const { status, message } = err;
  res.status(status || INTERNAL_SERVER_ERROR);
  res.send({
    message: message,
    error: {}
  });
};

module.exports = {
  productionErrors,
  developmentErrors,
  ValidationErrors,
  catchErrors,
  notFound,
  ErrorHandler
};
