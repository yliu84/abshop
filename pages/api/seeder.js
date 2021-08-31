import nc from 'next-connect';
import Product from '../../models/product';
import User from '../../models/user';
import data from '../../utils/data';
import db from '../../config/db';

const handler = nc();

const seedProducts = async (req, res) => {
  try {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users);
    await Product.deleteMany();
    await Product.insertMany(data.products);
    await db.disconnect();

    res.status(200).json({
      message: 'All products are added',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

handler.get(seedProducts);

export default handler;
