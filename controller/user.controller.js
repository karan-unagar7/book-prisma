import prisma from "../db/db.js";
import message from "../config/message.js";
import { generateToken } from "../utility/token.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utility/mail.js";
import { EMAIL } from "../config/config.js";
import { fileUpload, fileDestroy } from "../utility/cloudinary.js";

const { user, error } = message;

export const signUp = async (req, res) => {
  try {
    const { name, email, password, gender, interest } = req.body;

    if ((name && email && password && gender) === undefined) {
      return res
        .status(400)
        .json({ success: false, message: error.allFieldRequired });
    }

    const userDetail = await prisma.user.findUnique({ where: { email } });
    if (userDetail) {
      return res
        .status(409)
        .json({ success: false, message: error.userAlreadyExicts });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const {secure_url,public_id} = await fileUpload(req.file?.path);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        gender,
        interest,
        profilePic: secure_url,
        publicUrl: public_id,
      },
    });

    const emailTemp = `
    <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f0f0f0">
<tr>
<td align="center">
  <table width="600" cellpadding="0" cellspacing="0">
      <tr>
          <td>
              <div style="padding: 20px; background-color: white; text-align: center;">
              <img src="https://media.istockphoto.com/id/1472307744/photo/clipboard-and-pencil-on-blue-background-notepad-icon-clipboard-task-management-todo-check.webp?b=1&s=170667a&w=0&k=20&c=WfRoNKWq5Dr-23RuNifv1kbIR1LVuZAsCzzSH2I3HsY=" alt="Logo" width="200" height="100" style="display: block; margin: 0 auto;">
                  <h1>Welcome to Our Service!</h1>
                  <p>Dear ${name},</p>
                  <p>Thank you for registering with Our app. You're now a part of our community.</p>
                  <p>Your account details:</p>
                  
                  <strong>Username:</strong> ${name}<br>
                  <strong>Email:</strong> ${email}
                  
                  <p>We're excited to have you on board, and you can start using our service right away.</p>
                  <p>If you have any questions or need assistance, please don't hesitate to contact our support team at ${EMAIL}.</p>
                  <p>Best regards,</p>
              </div>
          </td>
      </tr>
  </table>
</td>
</tr>
</table>

`;
    const mailOptions = {
      to: email,
      subject: "Sign-Up Successfully",
      html: emailTemp,
    };
    await sendEmail(mailOptions);
    return res.status(201).json({ success: true, message: user.signUp });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((email || password) === undefined) {
      return res
        .status(400)
        .json({ success: false, message: error.allFieldRequired });
    }
    const userDetail = await prisma.user.findUnique({ where: { email } });
    if (!userDetail) {
      return res
        .status(404)
        .json({ success: false, message: error.userNotfound });
    }

    const isMatchPass = await bcrypt.compare(password, userDetail.password);
    if (!isMatchPass) {
      return res
        .status(401)
        .json({ success: false, message: error.wrongPassword });
    }

    const token = generateToken({ id: userDetail.id });
    return res
      .status(200)
      .json({ success: true, token: token, message: user.signIn });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { id, publicUrl } = req.user;
    await prisma.user.delete({
      where: {
        id,
      },
    });
    await fileDestroy(publicUrl);
    return res.status(200).json({ success: true, data: "Delete Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
