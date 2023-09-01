import IEvent from "../@shared/event.interface";

export default class ProductCreatedEvent implements IEvent {
  dataTimeOccured: Date;
  eventData: any;
  constructor(dataTimeOccured: Date, eventData: any) {
    this.dataTimeOccured = dataTimeOccured;
    this.eventData = eventData;
  }
}
