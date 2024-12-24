export const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};