import express from 'express';
import cors from 'cors';
import storage from 'node-persist';

(async () => {
    const app = express();
    const port = 5001;

    app.use(express.json());
    app.use(cors());

    await storage.init();

    // set up some initial seed data
    await storage.set('1111', {name: "Peter Parker", cardType: "maestro", balance: 500.00});
    await storage.set('2222', {name: "Miles Morales", cardType: "mastercard", balance: 2500.00});
    await storage.set('3333', {name: "Miguel O'Hara", cardType: "visa", balance: 5000.00});

    app.post<{ pin: string }, {name: string, cardType: string, balance: number}>('/submit-pin', async (req, res) => {
        const account = await storage.get(req.body.pin);
        if (account) {
            res.json(account);
        } else {
            res.sendStatus(404);
        }
    });

    app.get<{ pin: string }, { balance: number } | string>('/balance', async (req, res) => {
        const pin = req.query.pin;
        if (pin) {
            const account = await storage.get(pin.toString());
            if (account) {
                res.json({ balance: account.balance });
            } else {
                res.sendStatus(404);
            }
        } else {
            res.status(400).send('PIN is required');
        }
    });

    app.post<{ pin: string, amount: string }, {name: string, cardType: string, balance: number}>('/deposit', async (req, res) => {
        const { pin, amount } = req.body;
        const account = await storage.get(pin);
        if (account) {
            account.balance += parseFloat(amount);
            await storage.set(pin, account);
            res.json(account);
        } else {
            res.sendStatus(404);
        }
    });

    app.post<{ pin: string, amount: string }, {name: string, cardType: string, balance: number}>('/withdraw', async (req, res) => {
        const { pin, amount } = req.body;
        const account = await storage.get(pin);
        if (account) {
            account.balance -= parseFloat(amount);
            await storage.set(pin, account);
            res.json(account);
        } else {
            res.sendStatus(404);
        }
    });

    app.listen(port, () => {
        /* eslint-disable no-console */
        console.log(`Listening: http://localhost:${port}`);
        /* eslint-enable no-console */
    });
})();
