import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        msg: "please login first.",
        redirectTo: "/api/auth/login"
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || process.env.your_secret_key);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        msg: "Token expired. Please login again.",
        redirectTo: "/login"
      });
    }
    return res.status(401).json({
      msg: "Invalid token. Please login.",
      redirectTo: "/login"
    });
  }
};
