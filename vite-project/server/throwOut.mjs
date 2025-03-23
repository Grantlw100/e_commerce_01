import { makeExecutableSchema } from '@graphql-tools/schema';
import fulltypedefs from './schemas/typeDefs/typedefs.mjs';
import {resolvers} from './schemas/index.mjs';

try {
    console.log("✅ Creating Schema...");
    
    const testSchema = makeExecutableSchema({
        typeDefs: fulltypedefs,
        resolvers: resolvers
    });

    console.log("✅ Schema Created Successfully!");
    console.log("✅ Query Type Exists:", testSchema.getTypeMap()["Query"] ? "Yes" : "No");
    console.log("✅ Mutation Type Exists:", testSchema.getTypeMap()["Mutation"] ? "Yes" : "No");
    console.log("✅ Subscription Type Exists:", testSchema.getTypeMap()["Subscription"] ? "Yes" : "No");

} catch (error) {
    console.error("🚨 Schema Creation Failed:", error);
}