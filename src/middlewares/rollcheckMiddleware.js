const roleCheck = (requiredRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (requiredRoles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ error: "Access denied. Admin only" });
    }
  };
};

module.exports = roleCheck;