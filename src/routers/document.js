const express = require('express')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const sharp = require('sharp')
const bodyParser = require('body-parser')
const auth = require('../middleware/auth')
const { documents } = require('../models/document')

const router = new express.Router()

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Upload document file config
const upload = multer({
    limits: {
        fileSize: 50000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.pdf/)) {
            return cb(new Error('Please upload a PDF file'))
        }
        cb(undefined, true)
    }
})

// Create article reports route
router.post('/documents/researchreport', auth, urlencodedParser, upload.single('document'), async (req, res) => {
    try {
        const document = new documents({
            title: req.body.title,
            type: "Research Report",
            date: req.body.date,
            abstract: req.body.abstract,
            file: req.file.buffer
        })

        await document.save()
        res.redirect(req.get('referer'))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Create opinion pieces route
router.post('/documents/opinionpieces', auth, urlencodedParser, upload.single('document'), async (req, res) => {
    try {
        const document = new documents({
            title: req.body.title,
            type: "Opinion Pieces",
            date: req.body.date,
            abstract: req.body.abstract,
            file: req.file.buffer
        })

        await document.save()
        res.redirect(req.get('referer'))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/documents', async (req, res) => {
    const match = {}
    let sort = {}

    if (req.query.type) {
        match.type = req.query.type
    }
    if (req.query.search) {
        match.search = req.query.search
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        const skip = parseInt(req.query.skip) || 0

        const docs = await documents.find(match).limit(4).skip(skip).sort('field -date')
        const count = await documents.count(match)

        res.status(200).send({
            documents: docs,
            count
        })
    } catch (error) {
        res.status(500).send(error.message)
        sort = undefined
    }
})

// Create article & workshop papers route
router.post('/documents/articleworkshop', auth, urlencodedParser, upload.single('document'), async (req, res) => {
    try {
        const document = new documents({
            title: req.body.title,
            type: "Article Workshops",
            date: req.body.date,
            abstract: req.body.abstract,
            file: req.file.buffer
        })

        await document.save()
        res.redirect(req.get('referer'))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Download document
router.get('/document/file/:id', async (req, res) => {
    try {
        const document = await documents.findById(req.params.id)

        if (!document || !document.file) {
            return res.status(400).send()
        }

        res.set('Content-Type', 'application/pdf')
        res.send(document.file)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// delete Document
router.delete('/document/delete/:id', auth, async (req, res) => {
    try {
        const document = await documents.findById(req.params.id)

        if (!document) res.status(404).send()
        await document.remove()
        res.status(200).send(document)
    } catch (error) {
        res.send(500).send()
    }
})

module.exports = router