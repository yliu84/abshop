import nc from 'next-connect';
import { newOrder } from '../../../controllers/orderControllers';
import { isAuth } from '../../../utils/auth';
import { onError } from '../../../utils/error';

const handler = nc({ onError });

handler.use(isAuth);

handler.post(newOrder);

export default handler;
