require("express-async-errors");

const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

const cors = require("cors");
const express = require("express");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173/", "https://foodexplorer-backend-8v1b.onrender.com"],
  credentials: true
}));

=======
>>>>>>> parent of 952fdc4 (Commit para o deploy)
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
