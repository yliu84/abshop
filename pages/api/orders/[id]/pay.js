import nc from 'next-connect';
import { UpdateOrderToPaid } from '../../../../controllers/orderControllers';
import { isAuth } from '../../../../utils/auth';
import { onError } from '../../../../utils/error';

const handler = nc({ onError });

handler.use(isAuth);

handler.put(UpdateOrderToPaid);

export default handler;
