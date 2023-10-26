import express  from "express";

const router = express.Router();
import UserController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

// Route Lavel Middleware 
router.use("/changepassword", checkUserAuth)
router.use("/loggeduser", checkUserAuth);

// public route
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);
router.post("/send-reset-password-email", UserController.sendUserPasswordResetEmail);
router.post("/reset-password/:id/:token", UserController.confPasswordResetLink);

// protected routes (Like Dashboard)
router.post("/changepassword", UserController.changePassword);
const val = router.get("/loggeduser", UserController.loggedUser);
console.log(val)

router.post("/logout", UserController.userLogout);
export default router; 