export default class ApiResponse {
  constructor(statusCode = 200, data = null, message = "Success", errors = []) {
    this.statusCode = statusCode;
    this.status = statusCode < 400;
    this.message = message;
    this.data = data;
    this.errors = [];
  }

  static success(data = null, message = "success", statusCode = 200) {
    return new ApiResponse(statusCode, data, message);
  }
}
