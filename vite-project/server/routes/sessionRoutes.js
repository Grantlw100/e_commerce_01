const sessionRoutes = require('express').Router();

const { saveGlobalState, loadGlobalState } = require('../utils/State-Cart-Mgmt-Utils/store-manage');

sessionRoutes.post('/').post(async (req, res) => {
  try {
    await saveGlobalState(req.body);
    res.status(200).json('Global state saved!');
  } catch (error) {
    console.error('Error saving global state:', error);
    res.status(500).json('Error saving global state');
  }
});

sessionRoutes.get('/').get(async (req, res) => {
  try {
    const session = await loadGlobalState();
    res.status(200).json(session);
  } catch (error) {
    console.error('Error loading global state:', error);
    res.status(500).json('Error loading global state');
  }
});

module.exports = sessionRoutes;