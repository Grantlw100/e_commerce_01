// TO BE  USED FOR FORMATTING CONTENT
// ✅ Helper function for replacing placeholders in text
export const replacePlaceholders = (text, replacements) => {
    if (!text) return "";
    for (const [placeholder, value] of Object.entries(replacements)) {
        text = text.replace(new RegExp(placeholder, "g"), value);
    }
    return text;
};


// Create helper function that will allow users to create content capable of accepting dynamic inputs 
    // text should be stored in database similar to:
    // "Hello {{username}}, your subscription is expiring soon!"
    // "Hi {{username}}, we have a special promotion for you!"

    export const formatDynamicContent = (type, data, replacements) => {
        if (!data) return null;
    
        // ✅ Default Replacements
        const defaultReplacements = {
            "{{username}}": replacements?.user?.name || "User",
            "{{email}}": replacements?.user?.email || "your email",
            "{{date}}": new Date().toLocaleDateString(),
            "{{store}}": replacements?.store?.name || "our store",
        };
    
        // ✅ Expand replacements for products, stores, keywords, promotions, etc.
        const expandReplacements = (key, items) => {
            if (items && Array.isArray(items)) {
                items.forEach((item, index) => {
                    Object.entries(item).forEach(([field, value]) => {
                        defaultReplacements[`{{${key}[${index}].${field}}}`] = value || "";
                    });
                });
            }
        };
    
        // ✅ Dynamic Placeholder Expansion
        expandReplacements("products", replacements?.products);
        expandReplacements("stores", replacements?.stores);
        expandReplacements("keywords", replacements?.keywords);
        expandReplacements("promotions", replacements?.promotions);
        expandReplacements("categories", replacements?.categories);
        expandReplacements("seasons", replacements?.seasons);
    
        // ✅ Replace placeholders based on content type
        if (type === "content") {
            if (data.elements && Array.isArray(data.elements)) {
                data.elements = data.elements.map(element => ({
                    ...element,
                    text: replacePlaceholders(element.text, defaultReplacements)
                }));
            }
        } else {
            data.text = replacePlaceholders(data.text, defaultReplacements);
        }
    
        return data;
    };
    
    // ✅ Helper function for replacing placeholders in text
    const replacePlaceholders = (text, replacements) => {
        if (!text) return "";
        for (const [placeholder, value] of Object.entries(replacements)) {
            text = text.replace(new RegExp(placeholder, "g"), value);
        }
        return text;
    };
    
    // USAGE 
        // How data should be sent to the formatDyanmicContent function
        // {
        //     "type": "content",
        //     "elements": [
        //         { "position": "top", "index": 0, "text": "Check out {{products[0].name}} for only {{products[0].price}}!" },
        //         { "position": "bottom", "index": 1, "text": "Visit {{store}} to grab yours!" }
        //     ]
        // }
        
        

        // How data should be sent as a replacement object to the formatDyanmicContent function
        // {
        //     "user": { "name": "John Doe", "email": "john@example.com" },
        //     "store": { "name": "Super Store" },
        //     "products": [
        //         { "name": "Nike Shoes", "price": 99.99, "image": "nike-shoes.jpg" }
        //     ]
        // }
        
        
        // Post Formatting data output 
        // {
        //     "type": "content",
        //     "elements": [
        //         { "position": "top", "index": 0, "text": "Check out Nike Shoes for only $99.99!" },
        //         { "position": "bottom", "index": 1, "text": "Visit Super Store to grab yours!" }
        //     ]
        // }
        
        