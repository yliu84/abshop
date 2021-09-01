import nc from 'next-connect';
import { getSingleProduct } from '../../../../controllers/productControllers';

const handler = nc();

handler.get(getSingleProduct);

export default handler;
