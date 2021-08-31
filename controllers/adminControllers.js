import db from '../config/db';
import Order from '../models/Order';
import Product from '../models/product';
import User from '../models/User';

const getAdminSummary = async (req, res) => {
  await db.connect();
  const ordersCount = await Order.countDocuments();
  const productsCount = await Product.countDocuments();
  const usersCount = await User.countDocuments();
  const ordersPriceGroup = await Order.aggregate([
    {
      $group: {
        _id: null,
        sales: { $sum: '$totalPrice' },
      },
    },
  ]);

  const ordersPrice =
    ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        totalSales: { $sum: '$totalPrice' },
      },
    },
  ]);

  await db.disconnect();
  res
    .status(200)
    .json({ ordersCount, productsCount, usersCount, ordersPrice, salesData });
};

const getAdminOrders = async (req, res) => {
  await db.connect();
  const orders = await Order.find({}).populate('user', 'name');
  await db.disconnect();
  res.status(200).json(orders);
};

const updateOrderToDelivered = async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliveredOrder = await order.save();
    await db.disconnect();
    res.status(200).json({ message: 'order delivered', order: deliveredOrder });
  } else {
    await db.disconnect();
    res.status(404).json({ message: 'order not found' });
  }
};

const getAllUsers = async (req, res) => {
  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  res.status(200).json(users);
};

const getSingleUser = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  await db.disconnect();
  res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  db.connect();
  const user = await User.findById(req.query.id);

  if (!user) {
    await db.disconnect();
    res.status(404).json({ message: 'User Not Found' });
  }

  await user.remove();

  db.disconnect();

  res.status(200).json({
    success: true,
    message: 'User is deleted.',
  });
};

const updateUser = async (req, res) => {
  db.connect();
  const user = await User.findById(req.query.id);

  if (!user) {
    await db.disconnect();
    res.status(404).json({ message: 'User Not Found' });
  }

  user.name = req.body.name;
  user.isAdmin = Boolean(req.body.isAdmin);

  await user.save();
  await db.disconnect();

  res.status(200).json({ message: 'User Updated Successfully' });
};

export {
  getAdminSummary,
  getAdminOrders,
  updateOrderToDelivered,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
};
