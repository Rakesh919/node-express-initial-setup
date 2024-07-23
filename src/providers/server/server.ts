import { logger } from "@src/logger";
import { Application } from "express";
import os from 'os';
import cluster from 'cluster';

export const Server = (app:Application, PORT:number | string)=>{
    const cpuNums: number = os.cpus().length;

    if (cluster.isPrimary) {
        for (let i = 0; i < cpuNums; i++) {
          cluster.fork();
        }
  
        cluster.on('exit', () => {
          cluster.fork();
        });
        } else {
            app.listen(PORT, ()=>{
                logger.info(`Server Running on port ${PORT} ☁️  and PID ${process.pid} ⛈️`, {
                    __filename
                });
            }).on('error', (_error)=>{
              logger.error(`Error while starting server ${_error.message}`, {__filename});
              process.exit(1);
            })
      }
  
}
