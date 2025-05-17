export default class ApiError extends Error {
  constructor(
    status = 500,
    message = "Something went wrong",
    errors = [],
    type = "api_error",
    stack
  ) {
    super(message);
    this.statusCode = status;
    this.status = status < 400;
    this.errors = errors;
    this.type = type;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static notFoundError(resource = "resource") {
    return new ApiError(404, `${resource} not found`, [], "validation_error");
  }

  static validationError(errors) {
    return new ApiError(400, "Validation Error", errors);
  }

  static authError(message = "Authentication Error") {
    return new ApiError(401, message, [], "authentication_error");
  }
}
