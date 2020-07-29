 const express = require('express');

const router = express.Router();

const {Link} = require('../models')

router.get('/' , async (req, res)=> {
    const {accountId} = req

    let links = await Link.findAll({where : {accountId}})
    if(!links) return res.jsonNotFound();

    return res.jsonOK(links)
})

router.get('/:id' , async (req, res)=> {
    const {id} = req.params
    const {accountId} = req

    let link = await Link.findOne({where : {id, accountId}})
    if(!link) return res.jsonNotFound();

    return res.jsonOK(link)
})

router.post('/' , async (req, res)=> {

    const {label, url, image, isSocial} = req.body;

    const {accountId} = req

    const link = await  Link.create({
        label,
        isSocial,
        image,
        url,
        accountId
    })

    return res.jsonOK(link)
})

router.put('/:id' , async (req, res) => {
    const {id} = req.params
    
    const {accountId} = req
    const fields = ['label' , 'url', 'isSocial', 'image']

    let link = await Link.findOne({where : {id, accountId}})
    if(!link) return res.jsonNotFound();

    fields.map(fieldName => {
        const newValue = req.body[fieldName]
        if(newValue) link[fieldName] = newValue
    })

    await link.save();

    return res.jsonOK(link)
   
})

router.delete('/:id',  async (req, res) => {
    const {id} = req.params
    const {accountId} = req

    let link = await Link.findOne({where : {id, accountId}})
    if(!link) return res.jsonNotFound();

     link.destroy()

    return res.jsonOK()
})
module.exports = router;