// // const Taxjar = require('taxjar');
// // const shippo = require('shippo')(process.env.REACT_APP_SHIPPO_API_KEY)

// const calculateShipping = async (addressTo, parcel) => {
//     const addressFrom = {
//         name: 'Grant Williams',
//         street1: '6307 wild orchid dr',
//         city: 'Lithia',
//         state: 'FL',
//         zip: '33547',
//         country: 'US',
//         phone: '+1 910 916 4339',
//         email: 'Grant.l.williams@outlook.com'
//     };
//     try { 
//         const shipment = await shippo.shipment.create({
//             address_to: addressTo,
//             address_from: addressFrom,
//             parcels: [parcel],
//             async: false
//         });
//         return shipment.rates;
//     } catch (error) {
//         console.error('Error calculating shipping rates:', error.message);
//         throw new Error('Shipping calculation failed. Please check the provided addresses and parcel details.');
//     }
// };


// const client = new Taxjar({
//     apiKey: process.env.REACT_APP_TAXJAR_API_KEY
// });

// const calculateTax = async (order) => {
//     try {
//         const taxes = await client.taxForOrder(order);
//         return taxes;
//     } catch (error) {
//         console.error('Error calculating taxes:', error.message);
//         throw new Error('Tax calculation failed. Please check the order details.');
//     }
// };

// const formatPrice = (price) => {
//     return price.toFixed(2);
// };

// export { calculateShipping, calculateTax, formatPrice };