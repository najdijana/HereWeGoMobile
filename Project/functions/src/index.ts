/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { RoleTypeOptions, User } from "./models/user.interface";
// import { QueryDocumentSnapshot } from "firebase-admin/firestore";
// import { Review } from "./models/review.interface";
admin.initializeApp();

// const stripe = require('stripe')(functions.config().stripe.testkey);
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript


// exports.stripeCharge = functions.firestore
//     .document('users/{userId}/payments/{paymentId}')
//     .onWrite(async (change, context) => {
//         const payment = change.after.data();
//         const userId = context.params.userId;
//         const paymentId = context.params.paymentId;

//         // Checks if payment exists or if it has already been charged
//         if (!payment || payment.charge) return null;

//         try {
//             const userRef = admin.firestore().collection('users').doc(userId);
//             const amount = payment.amount;
//             const idempotency_key = paymentId;  // Prevent duplicate charges
//             const source = payment.token.id;
//             const currency = 'usd';

//             // Create a PaymentIntent instead of a direct charge
//             const paymentIntent = await stripe.paymentIntents.create({
//                 amount: parseInt(amount, 10), // amount should be a number
//                 currency: currency,
//                 payment_method: source,
//                 confirmation_method: 'automatic',
//                 confirm: true,
//             }, {
//                 idempotencyKey: idempotency_key
//             });

//     // Save the paymentIntent details back to Firestore under the payment document
//     const paymentRef = userRef.collection('payments').doc(paymentId);
//     await paymentRef.set({ charge: paymentIntent }, { merge: true });

//     return { success: true };
// } catch (error) {
//     console.error("Error processing payment: ", error);
//     return { error };
// }
//     });



exports.updateGuiderOnUserUpdate = functions.firestore
    .document('users/{userId}')
    .onUpdate(async (change, context) => {
        const newData = change.after.data() as User;
        const userId = context.params.userId;

        if (newData.role === RoleTypeOptions.GUIDER) {
            // Reference to a specific guider document by the user ID
            const guiderRef = admin.firestore().collection('guiders').doc(userId);

            const guiderData = {
                id: userId, // Using the userId as the document ID for consistency
                user: newData
            };

            try {
                // Check if the document exists
                const doc = await guiderRef.get();
                if (doc.exists) {
                    // Document exists, so we update it
                    await guiderRef.update(guiderData);
                    logger.info(`Guider document updated successfully: ${userId}`);
                } else {
                    // Document does not exist, we create a new one
                    await guiderRef.set(guiderData);
                    logger.info(`Guider document created successfully: ${userId}`);
                }
            } catch (error) {
                logger.error(`Error updating guider document: ${error}`);
                throw new functions.https.HttpsError('unknown', `Failed to update guider document: ${error}`, error);
            }
        } else {
            logger.log(`No update needed for user ${userId} as the role is not 'GUIDER'.`);
        }
        return null;
    });

// exports.syncReviewToUser = functions.firestore
// .document('Packages/{packageId}/review/{reviewId}')
// .onCreate(async (change:QueryDocumentSnapshot, context:functions.EventContext) => {
//     const review = change.data() as Review;
//     const userId = review.user?.uid; // Assuming the user ID is stored in review.user.id

//     // Remove the user attribute from the review
//     const { user, ...reviewWithoutUser } = review;

//     // Add the review to the user's subcollection
//     await admin.firestore().collection('users').doc(userId).collection('review').doc(review.id).set(reviewWithoutUser);

//     console.log(`Review ${review.id} synced to user ${userId}`);
// });