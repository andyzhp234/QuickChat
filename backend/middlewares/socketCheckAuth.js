// An middleware function that checks users session and make sure user is authenticated
const socketCheckAuth = (socket, next) => {
  console.log("checking auth: ", socket.request.session.id);
  console.log(socket.request.session);
  if (!socket.request.session.isAuthenticated) {
    const socketError = new Error("User not authenticated");
    return next(socketError);
  }
  next();
};

export default socketCheckAuth;
