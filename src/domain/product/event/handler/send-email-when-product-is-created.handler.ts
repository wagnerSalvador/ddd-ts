import IEventHandler from "../../../@shared/event/event-handler.interface";
import IEvent from "../../../@shared/event/event.interface";

export default class SendEmailWhenProductIsCreateHandler implements IEventHandler {
  handle(event: IEvent): void {
    console.log("Sending emaill to...");
  }

}