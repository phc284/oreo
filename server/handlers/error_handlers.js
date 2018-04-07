exports.catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

exports.flashValidationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err);
  // validation errors look like
  const errorKeys = Object.keys(err.errors);
  console.log(req);
  errorKeys.forEach(key => console.log('error', err.errors[key].message));
};
