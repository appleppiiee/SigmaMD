import express from 'express';
import clinicCtrl from '../controllers/clinic.controller.js';  

const router = express.Router();

router.route('/api/clinics').post(clinicCtrl.create); 

router.route('/api/clinics').get(clinicCtrl.list); 

router.route('/api/clinics').delete(clinicCtrl.removeMany); 

router.param('clinicId', clinicCtrl.clinicByID);

router.route('/api/clinics/:clinicId')
  .get(clinicCtrl.read)    
  .put(clinicCtrl.update)   
  .delete(clinicCtrl.remove);  

export default router;
