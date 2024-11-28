export interface Event {
    event_id: number;
    created_by: number; // Foreign key referencing the user who created the event
    company_id: number | null; // Foreign key referencing the company (nullable)
    event_name: string;
    start_date: string;
    end_date: string;
    location: string | null;
    description: string | null;
    event_type: 'temporary' | 'permanent'; // Enum type from your database
    event_code: string | null; // Nullable field
}
