import request from 'supertest';
import express from 'express';
import {
    isAmericanExpress,
    isLuhnsValid,
    validPayment,
} from '../controllers/payment';

describe('isAmericanExpress', () => {
    it('should return true for card numbers starting with 34 or 37', () => {
        expect(isAmericanExpress('341234567890123')).toBe(true);
        expect(isAmericanExpress('371234567890123')).toBe(true);
    });

    it('should return false for card numbers not starting with 34 or 37', () => {
        expect(isAmericanExpress('391234567890123')).toBe(false);
        expect(isAmericanExpress('301234567890123')).toBe(false);
    });
});

describe('isLuhnsValid', () => {
    it('returns true for valid card numbers', () => {
        expect(isLuhnsValid('4532015112830366')).toBe(true);
        expect(isLuhnsValid('6011514433546201')).toBe(true);
        expect(isLuhnsValid('6771549495586802')).toBe(true);
    });

    it('returns false for invalid card numbers', () => {
        expect(isLuhnsValid('1234567812345678')).toBe(false);
        expect(isLuhnsValid('11311222233334444')).toBe(false);
        expect(isLuhnsValid('9999888877776666')).toBe(false);
    });

    it('returns false for card numbers that are too short or too long', () => {
        expect(isLuhnsValid('123456781234')).toBe(false); // 12 digits
        expect(isLuhnsValid('12345678123456789000')).toBe(false); // 20 digits
    });

    it('returns false for non-numeric strings', () => {
        expect(isLuhnsValid('abcdefghij')).toBe(false);
        expect(isLuhnsValid('1234abcd')).toBe(false);
    });
});

describe('POST /validate', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.post('/validate', validPayment);
    });

    it('returns 400 if card is expired', async () => {
        const res = await request(app).post('/validate').send({
            expiryDate: '2000-01-01',
            cvv: '123',
            cardNumber: '4532015112830366',
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Card expired');
    });

    it('returns 400 if CVV is invalid', async () => {
        const res = await request(app).post('/validate').send({
            expiryDate: '2030-01-01',
            cvv: '12',
            cardNumber: '371234567890123',
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Invalid CVV');
    });

    it('returns 400 if card number is invalid', async () => {
        const res = await request(app).post('/validate').send({
            expiryDate: '2030-01-01',
            cvv: '123',
            cardNumber: '11131222233334444',
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Invalid card number');
    });

    it('returns 201 if payment is valid', async () => {
        const res = await request(app).post('/validate').send({
            expiryDate: '2030-01-01',
            cvv: '123',
            cardNumber: '4532015112830366',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Payment Successful');
    });
});
