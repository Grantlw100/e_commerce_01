const userSession = require('express').Router();

const { saveUserSession, loadUserSession, deleteUserSession,  } = require('../../utils/State-Cart-Mgmt-Utils/user-manage');

userSession.post('/').post(async (req, res) => {
  try {
    await saveUserSession(req.body);
    res.status(200).json('User session saved!');
  } catch (error) {
    console.error('Error saving user session:', error);
    res.status(500).json('Error saving user session');
  }
});

userSession.get('/:id').get(async (req, res) => {
  try {
    const session = await loadUserSession(req.params.id);
    res.status(200).json(session);
  } catch (error) {
    console.error('Error loading user session:', error);
    res.status(500).json('Error loading user session');
  }
});

userSession.delete('/:id').delete(async (req, res) => {
  try {
    await deleteUserSession(req.params.id);
    res.status(200).json('User session deleted!');
  } catch (error) {
    console.error('Error deleting user session:', error);
    res.status(500).json('Error deleting user session');
  }
});

module.exports = userSession;