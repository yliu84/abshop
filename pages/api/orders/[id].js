import nc from 'next-connect';
import { getSingleOrder } from '../../../controllers/orderControllers';
import { isAuth } from '../../../utils/auth';
import { onError } from '../../../utils/error';

const handler = nc({ onError });

handler.use(isAuth);

handler.get(getSingleOrder);

export default handler;
