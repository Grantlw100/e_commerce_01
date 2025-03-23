import formatDynamicContent from "./formatDynamicContent.mjs";
import { Message, Notification, Content, Alert } from "../../models/index.mjs";


export const createEventResponse = async (event, userId) => {
    if (!event.responseType || !event.response) {
        return null; // No valid response type or response ID
    }

    // Find the corresponding message, alert, content, or notification
    const responseItem = event.ownedMessages.find(msg => 
        msg.responseType === event.responseType && msg.response.toString() === event.response.toString()
    );

    if (!responseItem) {
        return null; // No matching message found
    }

    // Retrieve the actual document from the correct model
    let messageContent;
    switch (event.responseType) {
        case "message":
            messageContent = await Message.findById(responseItem.response);
            break;
        case "notification":
            messageContent = await Notification.findById(responseItem.response);
            break;
        case "content":
            messageContent = await Content.findById(responseItem.response);
            break;
        case "userAlert":
            messageContent = await Alert.findById(responseItem.response);
            break;
        default:
            return null;
    }

    if (!messageContent) {
        return null;
    }

    // ✅ Replace placeholders with user-specific data (e.g., name, email)
    const formattedMessage = formatDynamicContent(event.responseType, messageContent, userId);
    
    return formattedMessage;
};

