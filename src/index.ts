import express from "express"
import morgan from "morgan"
import cors from "cors"
import jsonapp from "./data/app.json"
import { Logger } from "./utils/logs"
import { routerInitialize } from "./routers/router"

export class Application {
    public AppServer: express.Application
    constructor() {
        this.AppServer = express()

        this.AppServer.use(express.json())
        this.config()
        this.routes()
        
        this.AppServer.use(express.urlencoded({extended: true}))
        this.AppServer.listen(jsonapp.Config_data.port, () => {
            Logger().info(`Server running on: http://localhost:${jsonapp.Config_data.port}/${jsonapp.Config_data.schema}/${jsonapp.Config_data.path}`)
           
        })
    }
    private config(): void {
        this.AppServer.use(cors())
        this.AppServer.use(morgan("dev"))
    }
    private routes(): void {
        this.AppServer.use(routerInitialize.postLogin())
        this.AppServer.use(routerInitialize.postRegister())
        this.AppServer.use(routerInitialize.getProfile())
        this.AppServer.use(routerInitialize.putProfile())
        this.AppServer.use(routerInitialize.deleteProfile())
        this.AppServer.use("/registerapp",(req, res) => {
            res.status(200).json({message: "Welcome to CoinPouch"})
        })
    }
}

new Application().AppServer