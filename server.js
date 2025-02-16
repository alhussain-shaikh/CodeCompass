const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const NodeCache = require("node-cache");

// server used to send send emails
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(process.env.PORT, () => console.log("Server Running"));
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const contactEmail = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASS
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

router.post("/contact", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: "hussain.al21@vit.edu",
    subject: "Contact Form Submission - Code Compass",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };

  const cacheKey = `${email}-${message}`;
  const cachedResponse = cache.get(cacheKey);

  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      const response = { code: 200, status: "Message Sent" };
      cache.set(cacheKey, response);
      res.json(response);
    }
  });
});
