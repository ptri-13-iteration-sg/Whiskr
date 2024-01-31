const setJwtCookie = (res, token) => {
  res.cookie('jwt-cookie', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
};
const handleServerError = (res, error) => {
  console.log(error);
  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = { setJwtCookie, handleServerError };
