import IEventHandler from "../../../@shared/event/event-handler.interface";
import IEvent from "../../../@shared/event/event.interface";

export default class EnviaConsoleLog1Handler implements IEventHandler {
  handle(event: IEvent): void {
    console.log('Handler1: EnviaConsoleLog1Handler. Mensagem: "Esse é o primeiro console.log do evento: CustomerCreated".');
  }

}