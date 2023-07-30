import IEventHandler from "./event-handler.interface";
import IEvent from "./event.interface";
// Notifica e registra tudo  que vai acontecer.
export default interface IEventDispatcher {
  notify(event: IEvent): void;
  // Exemplo no me do evento UsuarioCriado e a classe que será executada quando esse evento acontecer
  register(eventName: string, eventHandler: IEventHandler): void;
  unregister(eventName: string, eventHandler: IEventHandler): void;
  unregisterAll(): void;
}
