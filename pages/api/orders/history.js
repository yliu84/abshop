import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';
import { onError } from '../../../utils/error';
import { getAllOrders } from '../../../controllers/orderControllers';

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.get(getAllOrders);

export default handler;
