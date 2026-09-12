const asyncHandler = (reqHandler) => {
    (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next)).catch(next);
    }
}

export default asyncHandler;

// const asyncHandler = (fn) => async(req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

