import connection from '../connection';
import { Company } from '../model/companyModel';

export const getCompanybyFilter = (filters = {}): Promise<Company[] | null> => {
    return new Promise((resolve, rejects) => {
        let query = 'SELECT * FROM companies';

        // Generate query conditions based on filters
        const filterKeys = Object.keys(filters);
        if (filterKeys.length > 0) {
            const conditions = filterKeys.map(key => `${key} = ?`).join(' AND ');
            query += ` WHERE ${conditions}`;
        }

        const filterValues = Object.values(filters);

        connection.query(query, filterValues, (error, results) => {
            if (error) return rejects(error);
            resolve(results || null);
        });
    });
};

export const insertCompany = (companyData: Company): Promise<void> => {
    return new Promise((resolve, reject) => {
        const {
            name,
            email,
            phone_number,
            address,
            city,
            state,
            postal_code,
            country,
            website_url,
        } = companyData
    })
}
