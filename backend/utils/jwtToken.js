import jwt from "jsonwebtoken";
export const sendToken = (user, statusCode, res, message) => {
    const token = jwt.sign({  id: user.id  }, process.env.JWT_SECRET_KEY, {
        expiresIn: 15 * 24 * 60 * 60,
    });
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 
        ),
        httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        message,
        token,
    });
}

