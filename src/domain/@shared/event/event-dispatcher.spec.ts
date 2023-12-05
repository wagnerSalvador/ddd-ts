import Address from "../../customer/value-object/address";
import Customer from "../../customer/entity/customer";
import CustomerChangedAddressEvent from "../../customer/event/customer-changed-address-event";
import CustomerCreatedEvent from "../../customer/event/customer-created-event";
import EnviaConsoleLog1Handler from "../../customer/event/handler/envia-console-log-1-handler";
import EnviaConsoleLog2Handler from "../../customer/event/handler/envia-console-log-2-handler";
import EnviaConsoleLogHandler from "../../customer/event/handler/envia-console-log-handler";
import SendEmailWhenProductIsCreateHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created-event";
import EventDispatcher from "./event-dispatcher";

describe("Domain event's tests", () => {
  it("Should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreateHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toContainEqual(eventHandler);
  });

  it("Should be unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreateHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("Should be unregister all events", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreateHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });
  it("Should be notity all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreateHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    const productCreatedEvent = new ProductCreatedEvent(new Date(), {
      name: "Product 1",
      description: "Product 1 description",
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("Should be notify customer created", () => {
    const eventDispatcher = new EventDispatcher();
    const handler1 = new EnviaConsoleLog1Handler();
    const handler2 = new EnviaConsoleLog2Handler();
    const spyEventHandler1 = jest.spyOn(handler1, "handle");
    const spyEventHandler2 = jest.spyOn(handler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", handler1);
    eventDispatcher.register("CustomerCreatedEvent", handler2);

    const address = new Address("Rua joão pessoa", 99, "zipcode", "bla");
    const customer = new Customer("1", "Cliente 1", address);
     
    const customerCreated = new CustomerCreatedEvent(new Date(), {
      id: customer.id,
      name: customer.name,
    });

    eventDispatcher.notify(customerCreated);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("Should be notify user created", () => {
    const eventDispatcher = new EventDispatcher();
    const handler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(handler, "handle");

    eventDispatcher.register("CustomerChangedAddressEvent", handler);
    
    const address = new Address("Rua joão pessoa", 99, "zipcode", "bla");
    const customer = new Customer("1", "Cliente 1", address);
    
    customer.changeAddress(new Address("Rua Caracas", 99, "zipcode", "bla"));
    const customerCreated = new CustomerChangedAddressEvent(new Date(), {
      id: customer.id,
      name: customer.name,
      address: customer.address,
    });

    eventDispatcher.notify(customerCreated);

    expect(spyEventHandler).toHaveBeenCalled();

  });
});
