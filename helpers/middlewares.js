/**
 * This middleware checks if a given id is integer
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 * @return {undefined}
 */
function mustBeGUID(req, res, next) {
  const id = req.params.id;

  if (
    !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      id
    )
  ) {
    res.status(400).json({ message: "ID must be a GUID" });
  } else {
    next();
  }
}

/**
 * This middleware checks if a fields match
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 * @return {undefined}
 */
function checkFieldsPost(req, res, next) {
  const { title, director, releaseDate, genre, actors } = req.query;

  if (title && director && releaseDate && genre && actors) {
    next();
  } else {
    res.status(400).json({ message: "Fields are not good" });
  }
}

module.exports = {
  mustBeGUID,
  checkFieldsPost,
};
