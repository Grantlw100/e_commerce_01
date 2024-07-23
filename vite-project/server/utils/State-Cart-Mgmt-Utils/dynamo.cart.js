const dynamoDB = require('./config/connection.aws.js');

const addItemToCart = async (userId, item) => {
    const params = {
      TableName: process.env.CART_TABLE,
      Key: { userId },
      UpdateExpression: 'SET items = list_append(if_not_exists(items, :emptyList), :item)',
      ExpressionAttributeValues: {
        ':item': [item],
        ':emptyList': []
      },
      ReturnValues: 'UPDATED_NEW'
    };
    await dynamoDB.update(params).promise();
  };
  
  const getCartItems = async (userId) => {
    const params = {
      TableName: process.env.CART_TABLE,
      Key: { userId }
    };
    const result = await dynamoDB.get(params).promise();
    return result.Item ? result.Item.items : [];
  };
  
  const removeItemFromCart = async (userId, itemId) => {
    const cartItems = await getCartItems(userId);
    const updatedItems = cartItems.filter(item => item.id !== itemId);
  
    const params = {
      TableName: process.env.CART_TABLE,
      Key: { userId },
      UpdateExpression: 'SET items = :updatedItems',
      ExpressionAttributeValues: {
        ':updatedItems': updatedItems
      },
      ReturnValues: 'UPDATED_NEW'
    };
    await dynamoDB.update(params).promise();
  };
  