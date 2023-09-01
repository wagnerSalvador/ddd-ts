import IEventDispatcher from "./event-dispatcher.interface";
import IEventHandler from "./event-handler.interface";
import IEvent from "./event.interface";

export default class EventDispatcher implements IEventDispatcher {
  private eventHandlers: { [eventName: string]: IEventHandler[] } = {};
  get getEventHandlers(): { [eventName: string]: IEventHandler[] } {
    return this.eventHandlers;
  }
  notify(event: IEvent): void {
    const eventName = event.constructor.name;
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandle) => {
        eventHandle.handle(event);
      });
    }
  }
  register(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }
  unregister(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);
      if (index != -1) this.eventHandlers[eventName].splice(index);
    }
  }
  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
