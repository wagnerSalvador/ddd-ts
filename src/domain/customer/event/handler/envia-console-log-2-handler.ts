import IEventHandler from "../../../@shared/event/event-handler.interface";
import IEvent from "../../../@shared/event/event.interface";

export default class EnviaConsoleLog2Handler implements IEventHandler {
  handle(event: IEvent): void {
    console.log('Handler2: EnviaConsoleLog2Handler. Mensagem: "Esse é o segundo console.log do evento: CustomerCreated".');
  }
}