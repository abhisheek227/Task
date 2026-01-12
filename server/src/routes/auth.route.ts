import express from "express";
import { refreshAccessToken, userLogin, userRegister } from "../controller/auth.controller.ts";
import { authmiddleware } from "../middleware/auth.middleware.ts";

const router = express.Router();

router.route('/register').post(userRegister)
router.route('/login').post(userLogin)
router.route('/done').get(authmiddleware, (req, res) => {
    // res.send(req.user)
    res.json({
        user: req.user,
    })
})
// router.route('/verify').get(authmiddleware,)
router.route('/refreshtoken').post(refreshAccessToken);

export default router;