import { sampleRouter, studentsListRouer, testRouter, userRouter } from '@src/routes'
import Express from 'express'

export const configureRoutes = (app:Express.Application) => {
    app.use('/sample', sampleRouter);
    app.use('/test', testRouter);

    app.use('/users',userRouter);
    app.use('/list',studentsListRouer)
}