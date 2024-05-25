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
admin.initializeApp();
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

