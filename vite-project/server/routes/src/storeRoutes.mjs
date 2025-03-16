import {Router} from 'express';

const storeRouter = Router();
import stuff from '../generalUtils/crud.mjs';
const  {
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

const UTable = process.env.UTABLE;

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

                /* STORE TABLE ROUTES */
        /* Creating Store table routes from crud.js.js */

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



// #region GETTERS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// GET single User and all relevant data from stateIdIndex
    storeRouter.get('/:id', async (req, res) => {
      try {
        const user = await getItem(req.params.id);
        res.status(200).json(user);
      } catch (error) {
        console.error('Error loading user:', error);
        res.status(500).json('Error loading user');
      }
    });

// GET specific items from a user using GSI
    storeRouter.get('/:id/:request', async (req, res) => {
      try {
        const user = await globalSecondaryData(req.params.id, req.params.request, req.body.table);
        res.status(200).json(user);
      } catch (error) {
        console.error('Error loading user:', error);
        res.status(500).json('Error loading user');
      }
    });

// GET multiple users and all relevant data from latest stateIdIndex
    storeRouter.get('/', async (req, res) => {
      try {
        const users = await batchGetPartition(req.body.PKeys, req.body.table);
        res.status(200).json(users);
      } catch (error) {
        console.error('Error loading users:', error);
        res.status(500).json('Error loading users');
      }
    });

// GET multiple users and specific items from each user using GSI
    storeRouter.get('/partSort', async (req, res) => {
      try {
        const user = await batchGetPartitionSort(req.body.keys, req.body.table);
        res.status(200).json(user);
      } catch (error) {
        console.error('Error loading user:', error);
        res.status(500).json('Error loading user');
      }
    });

// GET multiple users and all relevant data from specific fields 
    storeRouter.get('/:request', async (req, res) => {
      try {
        const users = await batchGetItemFields(req.body.table, req.body.keys, req.body.fields);
        res.status(200).json(users);
      } catch (error) {
        console.error('Error loading users:', error);
        res.status(500).json('Error loading users');
      }
    });

        // #endregion----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



// #region POSTERS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// POST single User
    storeRouter.post('/', async (req, res) => {
      try {
        await putItem(req.body.item, req.body.table);
        res.status(200).json('item saved!');
      } catch (error) {
        console.error('Error saving item:', error);
        res.status(500).json('Error saving item');
      }
    });

// POST multiple Users
    storeRouter.post('/batch', async (req, res) => {
      try {
        await batchPutItems(req.body.items, req.body.table);
        res.status(200).json('items saved!');
      } catch (error) {
        console.error('Error saving items:', error);
        res.status(500).json('Error saving items');
      }
    });

// POST multiple Users with transaction
    storeRouter.post('/batch/transaction', async (req, res) => {
      try {
        await batchPutItemsTransaction(req.body.items, req.body.table);
        res.status(200).json('items saved!');
      } catch (error) {
        console.error('Error saving items:', error);
        res.status(500).json('Error saving items');
      }
    });

        // #endregion----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



// #region UPDATERS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Update single User with 1 or more fields 
    storeRouter.put('/', async (req, res) => {
      try {
        await mutateItem(req.body.item, req.body.table);
        res.status(200).json('item updated!');
      } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json('Error updating item');
      }
    });

// Update multiple Users with 1 or more fields
    storeRouter.put('/batch', async (req, res) => {
      try {
        await batchUpdates(req.body.items, req.body.table);
        res.status(200).json('items updated!');
      } catch (error) {
        console.error('Error updating items:', error);
        res.status(500).json('Error updating items');
      }
    });

// Update multiple Users with transaction
    storeRouter.put('/batch/transaction', async (req, res) => {
      try {
        await batchUpdateTransactions(req.body.items, req.body.table);
        res.status(200).json('items updated!');
      } catch (error) {
        console.error('Error updating items:', error);
        res.status(500).json('Error updating items');
      }
    });

        // #endregion----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



// #region DELETORS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Delete single User
    storeRouter.delete('/:id', async (req, res) => {
      try {
        await deletePartition(req.params.id, req.body.table);
        res.status(200).json('item deleted!');
      } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json('Error deleting item');
      }
    });

// Delete single User with sort key
    storeRouter.delete('/:id/:sort', async (req, res) => {
      try {
        await deletePartitionSort(req.params.id, req.params.sort, req.body.table);
        res.status(200).json('item deleted!');
      } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json('Error deleting item');
      }
    });

// Delete multiple Users
    storeRouter.delete('/', async (req, res) => {
      try {
        await batchDeleteItems(req.body.keys, req.body.table);
        res.status(200).json('items deleted!');
      } catch (error) {
        console.error('Error deleting items:', error);
        res.status(500).json('Error deleting items');
      }
    });

        // #endregion----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



export default storeRouter;