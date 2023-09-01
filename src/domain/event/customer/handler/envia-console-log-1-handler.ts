import IEventHandler from "../../@shared/event-handler.interface";
import IEvent from "../../@shared/event.interface";

export default class EnviaConsoleLog1Handler implements IEventHandler {
  handle(event: IEvent): void {
    console.log('Handler1: EnviaConsoleLog1Handler. Mensagem: "Esse é o primeiro console.log do evento: CustomerCreated".');
  }

}