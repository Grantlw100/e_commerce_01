// // define access requirements 
// // implement middleware
// // test middleware
// // apply middleware to resolvers 

// const hasAdmin = (next) => async (root, args, context, info) => {
//     const user = context.user; 
//     if (!user || !user.isAdmin) {
//         throw new Error('Not authenticated');
//     }
//     return next(root, args, context, info);
// }

// const hasUser = (role) => (next) => async (root, args, context, info) => {
//     const user = context.user;
//     if (!user || user.role !== 'user') {
//         throw new Error('Not authorized');
//     }
//     return next(root, args, context, info);
// }

// const hasGuest = (role) => (next) => async (root, args, context, info) => {
//     const user = context.user;
//     if (!user || user.role !== 'guest') {
//         throw new Error('Not authorized');
//     }
//     return next(root, args, context, info);
// }

// const hasSuperAdmin = (role) => (next) => async (root, args, context, info) => {
//     const user = context.user;
//     if (!user || user.role !== 'superAdmin') {
//         throw new Error('Not authorized');
//     }
//     return next(root, args, context, info);
// }