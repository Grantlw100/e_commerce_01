import {Router} from 'express';
const userRoute = Router();
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
} = stuff
const UTable = process.env.UTABLE;



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
                /* USER TABLE ROUTES */
        /* Creating User table routes from userCrud.js */
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//



// #region GETTERS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// GET single User and all relevant data for latest session 
    userRoute.get('/:id', async (req, res) => {
      try {
        const user = await getUser(req.params.id);
        res.status(200).json(user);
      } catch (error) {
        console.error('Error loading user:', error);
        res.status(500).json('Error loading user');
      }
    });

// GET specific items from a user using GSI
    userRoute.get('/:id/:request', async (req, res) => {
      try {
        const user = await globalSecondaryData(req.params.id, req.params.request, req.body.table);
        res.status(200).json(user);
      } catch (error) {
        console.error('Error loading user:', error);
        res.status(500).json('Error loading user');
      }
    });

// GET multiple users and all relevant data for latest session
    userRoute.get('/', async (req, res) => {
      try {
        const users = await batchGetPartition(req.body.PKeys, req.body.table);
        res.status(200).json(users);
      } catch (error) {
        console.error('Error loading users:', error);
        res.status(500).json('Error loading users');
      }
    });

// GET multiple users and specific items from each user using GSI
    userRoute.get('/:request', async (req, res) => {
      try {
        const users = await batchGetItemFields(UTable, req.body.keys, req.body.fields);
        res.status(200).json(users);
      } catch (error) {
        console.error('Error loading users:', error);
        res.status(500).json('Error loading users');
      }
    });

        // #endregion --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region POSTERS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// POST single User
    userRoute.post('/', async (req, res) => {
      try {
        await putItem(req.body.item, UTable);
        res.status(200).json('User saved!');
      } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json('Error saving user');
      }
    });
    
// POST multiple Users
    userRoute.post('/batch', async (req, res) => {
      try {
        await batchPutItems(req.body.items, UTable);
        res.status(200).json('Users saved!');
      } catch (error) {
        console.error('Error saving users:', error);
        res.status(500).json('Error saving users');
      }
    })

// POST multiple Users with transaction
    userRoute.post('/batch/transaction', async (req, res) => {
      try {
        await batchPutItemsTransaction(req.body.items, UTable);
        res.status(200).json('Users saved!');
      } catch (error) {
        console.error('Error saving users:', error);
        res.status(500).json('Error saving users');
      }
    })

        // #endregion --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region UPDATERS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Update single User with 1 or multiple items
    userRoute.put('/id', async (req, res) => {
      try {
        await mutateItem(UTable, req.body.partitionKeyValue, req.body.sortKeyNeeded, req.body.fields);
        res.status(200).json('User updated!');
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json('Error updating user');
      }
    });

// Update multiple Users
    userRoute.put('/batch', async (req, res) => {
      try {
        await batchUpdates(req.body.updates, UTable);
        res.status(200).json('Users updated!');
      } catch (error) {
        console.error('Error updating users:', error);
        res.status(500).json('Error updating users');
      }
    });

// Update multiple Users with transaction
    userRoute.put('/batch/transaction', async (req, res) => {
      try {
        await batchUpdateTransactions(req.body.updates, UTable);
        res.status(200).json('Users updated!');
      } catch (error) {
        console.error('Error updating users:', error);
        res.status(500).json('Error updating users');
      }
    });

        // #endregion --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// #region DELETERS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
// DELETE single User
    userRoute.delete('/:id', async (req, res) => {
      try {
        await deleteItem(req.params.id, UTable);
        res.status(200).json('User deleted!');
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json('Error deleting user');
      }
    });

// DELETE single User with condition
    userRoute.delete('/:id/:condition', async (req, res) => {
      try {
        await conditionalDeleteUser(req.params.id, req.params.conditionValue, req.params.condition);
        res.status(200).json('User deleted!');
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json('Error deleting user');
      }
    });

// DELETE multiple Users
    userRoute.delete('/', async (req, res) => {
      try {
        await batchDeleteItems(req.body.ids, UTable);
        res.status(200).json('Users deleted!');
      } catch (error) {
        console.error('Error deleting users:', error);
        res.status(500).json('Error deleting users');
      }
    });

        // #endregion --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export default userRoute;