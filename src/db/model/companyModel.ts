// src/db/model/companyModel.ts

export interface Company {
    company_id?: number;  // Auto-increment primary key
    name: string;
    email: string;
    phone_number?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    website_url?: string
    created_at?: Date;    // Date when the company was created
    updated_at?: Date;    // Date when the company information was last updated
    company_picture_url?: string;  // New field for profile picture URL

}
