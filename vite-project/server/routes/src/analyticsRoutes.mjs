import { Router } from 'express';
const analyticsRoute = Router();
import stuff from '../generalUtils/crud.mjs';
const {
    getUser,
    globalSecondaryData,
    fetchSessionTimestamps,
    getItem,
    batchGetItemFields,
    batchGetPartition,
    batchGetPartitionSort,
    batchGetTimeRange,
    putItem,
    batchPutItems,
    batchPutItemsTransaction,
    mutateItem,
    batchUpdateTransactions,
    batchUpdates,
    deletePartition,
    deletePartitionSort,
    conditionalDeleteUser,
    batchDeleteItems
} = stuff;

const ATable = process.env.ATABLE;

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

                /* ANALYTICS TABLE ROUTES */
        /* Creating Analytics table routes from crud.js */

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



// #region GETTERS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// GET timestamp#sessionId's
    analyticsRoute.get('/ids', async (req, res) => {
        try {
            const ids = await fetchSessionTimestamps(req.body.eventType, req.body.startTime, req.body.endTime);
            res.status(200).json(ids);
        } catch (error) {
            console.error('Error loading data:', error);
            res.status(500).json('Error loading data');
        }
    });

// GET single event type and all relevant data for timestamp#sessionId 
    analyticsRoute.get('/', async (req, res) => {
        try {
        const item = await getItem(req.body.partitionKeyValue, req.body.sortKeyValue, req.body.table);
        res.status(200).json(item);
        } catch (error) {
        console.error('Error loading data:', error);
        res.status(500).json('Error loading data');
        }
    });


// GET specific items from a user using GSI
  analyticsRoute.get('/partSort', async (req, res) => {
    try {
      const item = await batchGetPartitionSort(req.body.keys, req.body.table);
      res.status(200).json(item);
    } catch (error) {
      console.error('Error loading user:', error);
      res.status(500).json('Error loading user');
    }
  });

// GET multiple users and all relevant data for latest session
  analyticsRoute.get('/sort', async (req, res) => {
    try {
      const items = await batchGetPartition(req.body.PKeys, req.body.table);
      res.status(200).json(items);
    } catch (error) {
      console.error('Error loading users:', error);
      res.status(500).json('Error loading users');
    }
  });

// GET multiple items and specific fields
  analyticsRoute.get('/fields', async (req, res) => {
    try {
      const items = await batchGetItemFields(req.body.table, req.body.keys, req.body.fields);
      res.status(200).json(items);
    } catch (error) {
      console.error('Error loading items:', error);
      res.status(500).json('Error loading items');
    }
  });

  // #endregion --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region POSTERS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// POST single item
  analyticsRoute.post('/', async (req, res) => {
    try {
      await putItem(req.body.item, req.body.table);
      res.status(200).json('item saved!');
    } catch (error) {
      console.error('Error saving item:', error);
      res.status(500).json('Error saving item');
    }
  });
  
// POST multiple items
  analyticsRoute.post('/batch', async (req, res) => {
    try {
      await batchPutItems(req.body.items, req.body.table);
      res.status(200).json('items saved!');
    } catch (error) {
      console.error('Error saving items:', error);
      res.status(500).json('Error saving items');
    }
  })

// POST multiple items with transaction
  analyticsRoute.post('/batch/transaction', async (req, res) => {
    try {
      await batchPutItemsTransaction(req.body.items, req.body.table);
      res.status(200).json('items saved!');
    } catch (error) {
      console.error('Error saving items:', error);
      res.status(500).json('Error saving items');
    }
  })

  // #endregion --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region UPDATERS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Update single item with 1 or multiple items
  analyticsRoute.put('/item', async (req, res) => {
    try {
      await mutateItem(req.body.table, req.body.partitionKeyValue, req.body.sortKeyNeeded, req.body.fields);
      res.status(200).json('item updated!');
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json('Error updating item');
    }
  });

// Update multiple items
  analyticsRoute.put('/batch', async (req, res) => {
    try {
      await batchUpdates(req.body.updates, req.body.table);
      res.status(200).json('items updated!');
    } catch (error) {
      console.error('Error updating items:', error);
      res.status(500).json('Error updating items');
    }
  });

// Update multiple items with transaction
  analyticsRoute.put('/batch/transaction', async (req, res) => {
    try {
      await batchUpdateTransactions(req.body.updates, req.body.table);
      res.status(200).json('items updated!');
    } catch (error) {
      console.error('Error updating items:', error);
      res.status(500).json('Error updating items');
    }
  });

  // #endregion --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region DELETERS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// DELETE single item
  analyticsRoute.delete('/item', async (req, res) => {
    try {
      await deleteItem(req.body.partitionKeyVale, req.body.table);
      res.status(200).json('item deleted!');
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json('Error deleting item');
    }
  });

// DELETE multiple items
  analyticsRoute.delete('/items', async (req, res) => {
    try {
      await batchDeleteItems(req.body.PKeys, req.body.table);
      res.status(200).json('items deleted!');
    } catch (error) {
      console.error('Error deleting items:', error);
      res.status(500).json('Error deleting items');
    }
  });

// DELETE items by sort and partition 
    analyticsRoute.delete('/partSort', async (req, res) => {
        try {
        await deletePartitionSort(req.body.partitionKeyValue, req.body.sortKeyValue, req.body.table);
        res.status(200).json('items deleted!');
        } catch (error) {
        console.error('Error deleting items:', error);
        res.status(500).json('Error deleting items');
        }
    });

  // #endregion --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export default analyticsRoute;