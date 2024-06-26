import prisma from "../db/db.js";
import { verifyToken } from "../utility/token.js";
import message from "../config/message.js";

const { error } = message;

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(404).json({
        success: false,
        message: error.tokenNotGenreted,
      });
    }

    const decodeToken = verifyToken(token);

    if (!decodeToken) {
      return res.status(401).json({ message: error.userUnauthorize });
    }

    const user = await prisma.user.findUnique({
        where: { id: decodeToken.id },
        select: { id: true, name: true, email: true, gender: true,interest:true,profilePic:true,publicUrl:true },
      });

    if (!user) {
      return res.status(404).json({ message: error.userNotfound });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
