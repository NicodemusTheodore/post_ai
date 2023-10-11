if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const userRoute = require("./routes/routes");

// MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(userRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// module.exports = {
//   apps: [
//     {
//       name: "Post-Ai-v1",
//       script: "./app.js",
//       env: {
//         NODE_ENV: "production",
//         PORT: 80,
//         DATABASE_URL:
//           "postgresql://postgres:xoDccr10oog4I6ZC@db.vdqjvvhlfurqqhxfjgtm.supabase.co:5432/postgres",
//         JWT_SECRET_KEY: "ITSASECRETOWO",
//         GOOGLE_CLIENT_ID:
//           "67397716409-s973udh9vugjkj9i230mvoap8kh0b9qr.apps.googleusercontent.com",
//         USER: "nicodemustheodore680@gmail.com",
//         PASS: "fray sbxs vxze nsvq",
//         OPENAI_API_KEY: "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",
//         CLOUDINARY_CLOUD_NAME: "individual-project",
//         CLOUDINARY_API_KEY: "927592415522561",
//         CLOUDINARY_API_SECRET: "k3j0UZqUunYFu8MSuNftXTObha0",
//       },
//     },
//   ],
// };
