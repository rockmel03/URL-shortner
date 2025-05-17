export default function asyncHandler(requestHandler) {
  return async function (req, res, next) {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
