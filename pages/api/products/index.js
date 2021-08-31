import nc from 'next-connect';
import { allProducts } from '../../../controllers/productControllers';
// import onError from '../../../middlewares/errors';

const handler = nc();

handler.get(allProducts);

export default handler;
