import {Router} from 'express';
import {membershipRoute} from './MembershipRoutes';
import {informationRoute} from './InformationRouters';
import {transactionRoute} from './TransactionRouters';
import express from 'express';
import path from 'path';

export const routers = Router();

routers.use('/api/v1', membershipRoute);
routers.use('/api/v1', informationRoute);
routers.use('/api/v1', transactionRoute);
routers.use('/uploads', express.static(path.join(__dirname, '../uploads')));
