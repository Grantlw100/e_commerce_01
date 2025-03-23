import { getItem, createItem, updateItem } from "./utils.mjs";


const EventResolvers = {
    Query: {
        getEvent: async (_, { id }) => {
            return await getItem({modelName: "Event", id});
        }
    },
    Mutation: {
        createEvent: async (_, { Event }) => {
            return await createItem({modelName: "Event", input: Event});
        },
        updateEvent: async (_, { id, Event }) => {
            return await updateItem({modelName: "Event", id, input: Event});
        },
        deleteEvent: async (_, { id }) => {
            return await deleteItem({modelName: "Event", id});
        }
    }
};

export default EventResolvers;