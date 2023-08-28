'use strict'
const {
    getItems,
    getItem,
    addItem,
    deleteItem,
    updateItem,
} = require('../controllers/items')

const Item = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
    },
}

// Options for get all items
const getItemsOpts = {
    description: 'get all items',
    body: {
        type: 'object',
        properties: {
            hello: 'hello',
        },
    },
    schema: {
        response: {
            200: {
                description: 'returns all items',
                type: 'array',
                items: Item,
            },
        },
    },
    handler: getItems,
}

const getItemOpts = {
    schema: {
        response: {
            200: Item,
        },
    },
    handler: getItem,
}

const postItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: {
                    type: 'string',
                },
            },
        },
        response: {
            201: Item,
        },
    },
    handler: addItem,
}

const deleteItemOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    handler: deleteItem,
}

const updateItemOpts = {
    schema: {
        response: {
            200: Item,
        },
    },
    handler: updateItem,
}

const itemRoutes = async (fastify, options, done) => {
    // Get all items
    await fastify.get('/items', getItemsOpts)
    // Get single items
    await fastify.get('/item/:id', getItemOpts)
    // Add item
    await fastify.post('/items', postItemOpts)
    // Delete item
    await fastify.delete('/items/:id', deleteItemOpts)
    // Update item
    await fastify.put('/items/:id', updateItemOpts)
    done()
}

module.exports = itemRoutes
