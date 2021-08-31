import nc from 'next-connect';
import onError from '../../../../utils/error';
import { isAuth } from '../../../../utils/auth';
import { updateOrderToDelivered } from '../../../../controllers/adminControllers';

const handler = nc({
  onError,
});
handler.use(isAuth);
handler.put(updateOrderToDelivered);

export default handler;
