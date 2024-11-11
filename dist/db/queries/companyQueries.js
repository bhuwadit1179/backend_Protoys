"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCompany = exports.getCompanybyFilter = void 0;
const connection_1 = __importDefault(require("../connection"));
const getCompanybyFilter = (filters = {}) => {
    return new Promise((resolve, rejects) => {
        let query = 'SELECT * FROM companies';
        // Generate query conditions based on filters
        const filterKeys = Object.keys(filters);
        if (filterKeys.length > 0) {
            const conditions = filterKeys.map(key => `${key} = ?`).join(' AND ');
            query += ` WHERE ${conditions}`;
        }
        const filterValues = Object.values(filters);
        connection_1.default.query(query, filterValues, (error, results) => {
            if (error)
                return rejects(error);
            resolve(results || null);
        });
    });
};
exports.getCompanybyFilter = getCompanybyFilter;
const insertCompany = (companyData) => {
    return new Promise((resolve, reject) => {
        const { name, email, phone_number, address, city, state, postal_code, country, website_url, } = companyData;
    });
};
exports.insertCompany = insertCompany;
