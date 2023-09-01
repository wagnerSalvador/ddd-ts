import EnviaConsoleLog1Handler from "../customer/handler/envia-console-log-1-handler";
import EnviaConsoleLog2Handler from "../customer/handler/envia-console-log-2-handler";
import SendEmailWhenProductIsCreateHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created-event";
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

  it("Should be notify user created", () => {
    const eventDispatcher = new EventDispatcher();
    const handler1 = new EnviaConsoleLog1Handler();
    const handler2 = new EnviaConsoleLog2Handler();
    const spyEventHandler1 = jest.spyOn(handler1, "handle");
    const spyEventHandler2 = jest.spyOn(handler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", handler1);
    eventDispatcher.register("CustomerCreatedEvent", handler2);

  });
});
