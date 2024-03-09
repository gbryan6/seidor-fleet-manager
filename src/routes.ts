import { Router } from 'express'

import autobomileRoutes from './routes/automobile.routes'
import driverRoutes from './routes/driver.routes'
import automobileUtilizationRoutes from './routes/automobileUtilization.routes'

const routes = Router()

routes.use('/automobiles', autobomileRoutes)
routes.use('/automobile-utilizations', automobileUtilizationRoutes)
routes.use('/drivers', driverRoutes)

export default routes