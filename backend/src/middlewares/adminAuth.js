module.exports = function adminAuth(req, res, next) {
  const adminKey = req.headers["admin-key"];
  const expected = process.env.ADMIN_KEY || "secretKey5521";

  if (!adminKey || adminKey !== expected) {
    return res.status(401).json({ message: "Unauthorized (admin only)" });
  }

  next();
};
