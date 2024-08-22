import { getStudetsList } from '@src/controllers';
import {Router} from 'express';

const studentsListRouer = Router();

studentsListRouer
.route('/')
.get(getStudetsList);

export {studentsListRouer};