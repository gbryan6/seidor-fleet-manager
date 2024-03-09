import { Router } from 'express'

import autobomileRoutes from './routes/automobile.routes'
import driverRoutes from './routes/driver.routes'
import driverUtilizationRoutes from './routes/driverUtilization.routes'

const routes = Router()

routes.use('/automobile', autobomileRoutes)
routes.use('/driver', driverRoutes)
routes.use('/driver-utilization', driverUtilizationRoutes)

export default routes