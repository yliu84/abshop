import db from '../config/db';
import Order from '../models/order';

const newOrder = async (req, res) => {
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: req.user._id,
  });
  const order = await newOrder.save();
  await db.disconnect();

  res.status(201).json({
    success: true,
    order,
  });
};

const getSingleOrder = async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.status(200).json(order);
};

const UpdateOrderToPaid = async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.payer.email_address,
    };
    const paidOrder = await order.save();
    await db.disconnect();
    res.status(200).json({ message: 'order paid', order: paidOrder });
  } else {
    await db.disconnect();
    res.status(404).json({ message: 'order not found' });
  }
};

const getAllOrders = async (req, res) => {
  await db.connect();
  const orders = await Order.find({ user: req.user._id });
  await db.disconnect();
  res.status(200).json(orders);
};

export { newOrder, getSingleOrder, UpdateOrderToPaid, getAllOrders };
