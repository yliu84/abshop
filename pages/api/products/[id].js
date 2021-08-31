import nc from 'next-connect';
import { getSingleProduct } from '../../../controllers/productControllers';
// import onError from '../../../middlewares/errors';

const handler = nc();

handler.get(getSingleProduct);

export default handler;
