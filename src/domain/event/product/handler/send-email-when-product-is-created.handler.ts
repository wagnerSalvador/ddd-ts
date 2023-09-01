import IEventHandler from "../../@shared/event-handler.interface";
import IEvent from "../../@shared/event.interface";

export default class SendEmailWhenProductIsCreateHandler implements IEventHandler {
  handle(event: IEvent): void {
    console.log("Sending emaill to...");
  }

}