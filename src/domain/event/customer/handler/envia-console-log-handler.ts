import IEventHandler from "../../@shared/event-handler.interface";
import IEvent from "../../@shared/event.interface";

export default class EnviaConsoleLogHandler implements IEventHandler {
  handle(event: IEvent): void {
    console.log(`EnviaConsoleLogHandler. Mensagem: "Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.toString()}".`);
  }
}