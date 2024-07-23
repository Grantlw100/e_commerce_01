const s3Routes = require('express').Router();
const { uploadSingleFile, uploadMultipleFiles, saveFile, loadFile, deleteFile } = require('../../utils/s3.utility');

s3Routes.post('/single', async (req, res) => {
    try {
        const file = req.file; // Assuming file is coming from a form with multipart/form-data
        const result = await uploadSingleFile(file);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error uploading single file:', error);
        res.status(500).json('Error uploading file');
    }
});

s3Routes.post('/multiple', async (req, res) => {
    try {
        const files = req.files; // Assuming files are coming from a form with multipart/form-data
        const result = await uploadMultipleFiles(files);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error uploading multiple files:', error);
        res.status(500).json('Error uploading files');
    }
});

s3Routes.post('/save', async (req, res) => {
    try {
        await saveFile(req.body);
        res.status(200).json('File saved!');
    } catch (error) {
        console.error('Error saving file:', error);
        res.status(500).json('Error saving file');
    }
});

s3Routes.get('/:id', async (req, res) => {
    try {
        const file = await loadFile(req.params.id);
        res.status(200).json(file);
    } catch (error) {
        console.error('Error loading file:', error);
        res.status(500).json('Error loading file');
    }
});

s3Routes.delete('/:id', async (req, res) => {
    try {
        await deleteFile(req.params.id);
        res.status(200).json('File deleted!');
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json('Error deleting file');
    }
});

module.exports = s3Routes;
