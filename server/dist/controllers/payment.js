/**
 *@Payment controllers module, with all endpoints logic
 *
 */
// utils functions
const isAmericanExpress = (cardNumber) => {
    if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) {
        return true;
    }
    return false;
};
const isLuhnsValid = (cardNumber) => {
    // check if cardNumber is between 16 and 19 digits long
    if (!(cardNumber.length >= 16 && cardNumber.length <= 19)) {
        return false;
    }
    const digits = cardNumber.split('').reverse().map(Number);
    const sum = digits.reduce((total, digit, index) => {
        // use odd numbers to get next second digit
        if (index % 2 === 1) {
            // if second digit, double it
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        return total + digit;
    }, 0);
    return sum % 10 === 0;
};
// home / get controller
export const home = (req, res) => {
    res.send('Welcome Home');
};
export const validPayment = (req, res) => {
    try {
        // destructure the request data from the request body
        const { expiryDate, cvv, cardNumber } = req.body;
        // get today's date
        const today = new Date();
        const newExpiryDate = new Date(expiryDate);
        // check if card is expired
        if (today > newExpiryDate)
            return res.status(400).json({ error: 'Card expired' });
        const isExpress = isAmericanExpress(cardNumber);
        if (isExpress) {
            if (cvv.length !== 4) {
                return res.status(400).json({ error: 'Invalid CVV' });
            }
        }
        else {
            if (cvv.length !== 3) {
                return res.status(400).json({ error: 'Invalid CVV' });
            }
        }
        const isValid = isLuhnsValid(cardNumber);
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid card number' });
        }
        return res.status(200).json({ message: 'Payment Successful' });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
