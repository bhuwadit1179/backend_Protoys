// types/express.d.ts
import express from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        event?: {
            event_id: number;
        };
        user?: {
            user_id: number;
        };
    }
}
