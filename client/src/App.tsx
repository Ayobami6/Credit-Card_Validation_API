import axios from 'axios';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

const App: React.FC = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiryDate, setExpireDate] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handlePayment = async () => {
        try {
            const data = {
                cardNumber,
                cvv,
                expiryDate,
            };
            setLoading(true);
            const response = await axios.post(
                'http://0.0.0.0:3000/validate',
                data
            );
            setLoading(false);
            enqueueSnackbar(response.data.message, { variant: 'success' });
            console.log(response);
        } catch (error) {
            setLoading(false);
            enqueueSnackbar(error.response.data.error, { variant: 'error' });
            console.log(error.response.data.error);
        }
    };

    return (
        <>
            <div className='p-4'>
                <h1 className='text-3xl my-8 text-center'> Make Payment</h1>
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                    <div className='my-4'>
                        <h2 className='text-2xl font-bold text-gray-800 text-center'>
                            Enter Payment Details
                        </h2>
                        <div className='my-4'>
                            <label
                                htmlFor=''
                                className='text-xl mr-4 text-gray-500'
                            >
                                Card Number
                            </label>
                            <input
                                type='text'
                                value={cardNumber}
                                className='border-2 border-gray-500 px-4 py-2 w-full'
                                placeholder='Enter Credit Card Number'
                                onChange={(e) => setCardNumber(e.target.value)}
                            />
                        </div>
                        <div className='my-4'>
                            <label
                                htmlFor=''
                                className='text-xl mr-4 text-gray-500'
                            >
                                CVV
                            </label>
                            <input
                                type='text'
                                value={cvv}
                                className='border-2 border-gray-500 px-4 py-2 w-full'
                                placeholder='Enter CVV'
                                onChange={(e) => setCvv(e.target.value)}
                            />
                        </div>
                        <div className='my-4'>
                            <label
                                htmlFor=''
                                className='text-xl mr-4 text-gray-500'
                            >
                                Expiry Date
                            </label>
                            <input
                                type='text'
                                value={expiryDate}
                                className='border-2 border-gray-500 px-4 py-2 w-full'
                                placeholder='Enter Expiry Date (2024-05)'
                                onChange={(e) => setExpireDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='self-center '>
                        {loading ? (
                            <div className='w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin'></div>
                        ) : (
                            ''
                        )}
                    </div>
                    <button
                        className='self-center w-60 p-2 w-20 bg-sky-300 m-8 rounded-xl text-white font-bold text-lg'
                        onClick={handlePayment}
                    >
                        Pay
                    </button>
                </div>
            </div>
        </>
    );
};

export default App;
