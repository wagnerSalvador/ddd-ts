import IEvent from "./event.interface";

// Toda vez que um evento é chamado é executado um handler para ele, no caso posso ter N handlers para um mesmo evento pois baseado no evento ele vai executar algma coisa

export default interface IEventHandler<T extends IEvent = IEvent> {
  handle(event: T): void;
}
