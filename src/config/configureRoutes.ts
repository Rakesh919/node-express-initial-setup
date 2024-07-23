import { sampleRouter, testRouter } from '@src/routes'
import Express from 'express'

export const configureRoutes = (app:Express.Application) => {
    app.use('/sample', sampleRouter);
    app.use('/test', testRouter);
}