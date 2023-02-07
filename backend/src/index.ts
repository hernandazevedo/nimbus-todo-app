
import express from 'express'
import cors from 'cors'
import { NimbusApp } from '@zup-it/nimbus-backend-express'
import * as dotenv from 'dotenv'
import configs from '../nimbus-ts.json'
import { routes } from './screens'

dotenv.config()
console.log(process.env)

const expressApp = express()
expressApp.use(cors()).use(express.json())
expressApp.listen(configs.port, () => {
  console.log(`App listening at http://localhost:${configs.port}`)
})

new NimbusApp(expressApp, routes, { basePath: configs.basePath })
