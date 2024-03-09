import { Router } from 'express'

import autobomileRoutes from './routes/automobile.routes'
import driverRoutes from './routes/driver.routes'
import driverUtilizationRoutes from './routes/driverUtilization.routes'

const routes = Router()

routes.use('/automobiles', autobomileRoutes)
routes.use('/drivers', driverRoutes)
routes.use('/driver-utilizations', driverUtilizationRoutes)

export default routes