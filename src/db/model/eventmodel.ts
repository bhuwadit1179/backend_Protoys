// src/db/model/eventModel.ts
export interface Event {
    event_id?: number; // Optional for new events
    customer_id: number;
    event_name: string;
    start_date: Date;
    end_date: Date;
    location: string;
    description: string;
}
