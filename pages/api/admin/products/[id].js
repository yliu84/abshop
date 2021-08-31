import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import {
  deleteProduct,
  getSingleProduct,
  updateProduct,
} from '../../../../controllers/productControllers';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(getSingleProduct);
handler.put(updateProduct);
handler.delete(deleteProduct);
export default handler;
