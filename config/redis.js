var express = require('express').Router();
var redis = require('redis');
var product = require('../models/admin/product');

let client = redis.createClient();

client.on('connect',function(){
    console.log('Connected to Redis...')
})

module.exports = client;

