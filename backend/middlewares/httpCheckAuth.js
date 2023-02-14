// An middleware function that checks users session and make sure user is authenticated
const httpCheckAuth = async (req, res, next) => {
  if (!req.session.isAuthenticated) {
    return res.status(400).send({ message: "User not authenticated" });
  }
  next();
};

export default httpCheckAuth;
