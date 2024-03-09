import { Router } from 'express'

import automobileController from '../controllers/automobile.controller'

const automobileRoutes = Router()

automobileRoutes.get('/:id', automobileController.getAutomobileById)
automobileRoutes.post('/create', automobileController.createAutomobile)
automobileRoutes.put('/update/:id', automobileController.updateAutomobile)
automobileRoutes.delete('/delete/:id', automobileController.deleteAutomobile)

export default automobileRoutes


