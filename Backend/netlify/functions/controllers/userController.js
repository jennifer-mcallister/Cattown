const User = require("../models/User");
const bcrypt = require("bcrypt");
const Savefile = require("../models/Savefile");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.login = async (req, res, next) => {
  try {
    const { username, password: canditatePassword } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json("Incorrect username");
    }

    const isPasswordCorrect = await bcrypt.compare(
      canditatePassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json("Incorrect password");
    }

    return res.json({ savefileId: user.savefile });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
};

exports.register = async (req, res, next) => {
  try {
    const { username, password, mail } = req.body;
    const usernameExists = await User.findOne({ username: username });
    const mailExists = await User.findOne({ mail: mail });

    if (mailExists) {
      return res.status(401).json("This email already has an account");
    }

    if (usernameExists) {
      return res.status(401).json("Username is already taken");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newSavefile = await Savefile.create({
      gold: 0,
      stats: {
        luck: 1,
        health: 1,
        strength: 1,
        fireDamage: 1,
        waterDamage: 1,
        shadowDamage: 1,
        natureDamage: 1,
      },
      uniqueItems: [],
      relics: [],
      cats: [],
    });

    await User.create({
      username: req.body.username,
      mail: req.body.mail,
      password: hashedpassword,
      savefile: newSavefile._id,
    });

    res.status(200).json("Success 200");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.forgottPassword = async (req, res, next) => {
  try {
    const { mail } = req.body;
    const accountExists = await User.findOne({ mail: mail });
    if (!accountExists) {
      return res.status(404).json("404 Not found");
    }

    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "jennifer_mca@hotmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailBody = `
        Hi ${accountExists.username},

        We have received your request to reset your password. Please click the link below to reset.
        
        http://localhost:5173/account/reset/${accountExists._id}

        Cattown
        `;

    const mailContent = {
      from: "jennifer_mca@hotmail.com",
      to: accountExists.mail,
      subject: "Reset password",
      text: mailBody,
    };

    transporter.sendMail(mailContent, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mejlet skickat: ", info.response);
      }
    });

    return res.status(200).json("Success 200");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { password, username, userId } = req.body;
    const account = await User.findOne({ _id: userId });

    if (!account) return res.status(404).json("404 Not found");

    if (account.username !== username)
      return res.status(404).json("404 Not found");

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate(account, { password: hashedpassword });

    return res.status(200).json("Success 200");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
