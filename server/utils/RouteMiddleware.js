const send = res => {
  return (...args) => res.json(...args);
};

const errorHandlerWrapper = (res, { errorStatus = 500 }) => {
  res.status(errorStatus);
  return send(res);
};

const successHandlerWrapper = (res, { successStatus = 200 }) => {
  res.status(successStatus);
  return send(res);
};

const resultHandler = (result, res, options, handlerWrapperFn, cb) =>
  cb
    ? cb(res, result, () => {
        handlerWrapperFn(res, options)(result);
      })
    : handlerWrapperFn(res, options)(result);

module.exports = {
  validate: (verify, res, errorMessage) => {
    if (!verify) return res.status(400).send(errorMessage);
  },
  promiseResultHandler: (res, options = {}) => (
    promise,
    successHandlerCb,
    errorHandlerCb
  ) =>
    promise
      .then(success =>
        resultHandler(
          success,
          res,
          options,
          successHandlerWrapper,
          successHandlerCb
        )
      )
      .catch(err =>
        resultHandler(err, res, options, errorHandlerWrapper, errorHandlerCb)
      )
};
