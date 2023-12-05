import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderRepositoryInterface from "./order.repository.interface";
import OrderItemModel from "../../../infrastructure/checkout/repository/sequelize/model/order-item";
import OrderModel from "../../../infrastructure/checkout/repository/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          product_id: item.productId,
          order_id: item.orderId,
        })),
      },
      { include: [{ model: OrderItemModel }] }
    );
  }
  async update(entity: Order): Promise<void> {
    const sequelize = OrderModel.sequelize;
    await sequelize.transaction(async (t) => {
      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction: t,
      });
      const items = entity.items.map((item) => ({
        id: item.id,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));
      await OrderItemModel.bulkCreate(items, { transaction: t });
      await OrderModel.update(
        { total: entity.total() },
        { where: { id: entity.id }, transaction: t }
      );
    });
  }
  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [{ model: OrderItemModel }],
    });
    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map(
        (itemModel) =>
          new OrderItem(
            itemModel.id,
            itemModel.product_id,
            itemModel.quantity,
            itemModel.price,
            itemModel.order_id
          )
      )
    );
  }
  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });
    return ordersModel.map(
      (orderModel) =>
        new Order(
          orderModel.id,
          orderModel.customer_id,
          orderModel.items.map(
            (itemModel) =>
              new OrderItem(
                itemModel.id,
                itemModel.product_id,
                itemModel.quantity,
                itemModel.price,
                itemModel.order_id
              )
          )
        )
    );
  }
}
