// Middleware check quyền admin
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403); // 403 hợp lý hơn cho "forbidden"
    throw new Error("Not authorized as an admin");
  }
};

export { authenticate, authorizeAdmin };