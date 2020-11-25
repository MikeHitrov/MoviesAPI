function mustBeInteger(req, res, next) {
  const id = req.params.id;

  if (!Number.isInteger(parseInt(id))) {
    res.status(400).json({ message: "ID must be an integer" });
  } else {
    next();
  }
}
function checkFieldsPost(req, res, next) {
  const { title, director, releaseDate, genre, actors } = req.this.params;

  if (title && director && releaseDate && genre && actors) {
    next();
  } else {
    res.status(400).json({ message: "Fields are not good" });
  }
}
module.exports = {
  mustBeInteger,
  checkFieldsPost,
};
