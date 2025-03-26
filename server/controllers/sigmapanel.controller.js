import Sigmapanel from '../models/sigmapanel.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'
const create = async (req, res) => { 
const sigmapanel = new Sigmapanel(req.body) 
try {
await sigmapanel.save()
return res.status(200).json({ 
message: "Successfully Created!"
})
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const list = async (req, res) => { 
try {
let sigmapanels = await Sigmapanel.find().select('patientID visitDateTime vHeight vWeight vBmi vTemp vBloodPressure vPulseRate mhMedicalHistory mhFamilyHistory mhSocialHistory mhAllergies mhCurrentMedications diagnosis plMedication plReferrals plFollowup plProcedures notes') 
res.json(sigmapanels)
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const sigmapanelByID = async (req, res, next, id) => { 
try {
let sigmapanel = await Sigmapanel.findById(id) 
if (!sigmapanel)
return res.status(400).json({ 
error: "sigmapanel not found"
})
req.sigmapanel = sigmapanel 
next()
} catch (err) {
return res.status('400').json({ 
error: "Could not retrieve sigmapanel"
}) 
}
}
const read = (req, res) => {
//req.profile.hashed_password = undefined 
//req.profile.salt = undefined
return res.json(req.sigmapanel) 
}
const update = async (req, res) => { 
try {
let sigmapanel = req.sigmapanel
sigmapanel = extend(sigmapanel, req.body) 
sigmapanel.updated = Date.now() 
await sigmapanel.save()
//project.hashed_password = undefined 
//project.salt = undefined
res.json(sigmapanel) 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}


export default { create, sigmapanelByID, read, list, update }


