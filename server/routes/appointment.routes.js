import express from "express";
import appointmentCtrl from "../controllers/appointment.controller.js";
const router = express.Router();
router.route("/api/appointments").post(appointmentCtrl.create);
router.route("/api/appointments").get(appointmentCtrl.list);
router.route("/api/appointments").delete(appointmentCtrl.removeAll);
router.param("appointmentId", appointmentCtrl.appointmentByID);
router.route("/api/appointments/:appointmentId").get(appointmentCtrl.read);
router.route("/api/appointments/:appointmentId").put(appointmentCtrl.update);
router.route("/api/appointments/:appointmentId").delete(appointmentCtrl.remove);

export default router;
