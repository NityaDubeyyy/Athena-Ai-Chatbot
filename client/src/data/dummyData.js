// import { assets } from '../assets/assets.js';

// export const dummyUserData = {
//     "_id": "689c6deed410acddc0d95a0e",
//     "name": "GreatStack",
//     "email": "admin@example.com",
//     "password": "$2b$10$VESVdPDjL5LF.KCU6jKyqeXNSLASAAfpR2kkIJExtMO.PJvZJAudy",
//     "credits": 200,
//         "imageUrl": assets.ai_image11,

// // copy for server controllers
// export const dummyPlans = [
//         import { assets } from '../assets/assets.js';

//         export const dummyUserData = {
//             _id: '689c6deed410acddc0d95a0e',
//             name: 'GreatStack',
//             email: 'admin@example.com',
//             password: '$2b$10$VESVdPDjL5LF.KCU6jKyqeXNSLASAAfpR2kkIJExtMO.PJvZJAudy',
//             credits: 200,
//             imageUrl: assets.ai_image11,
//         };

//         export const dummyPlans = [
//             {
//                 _id: 'basic',
//                 name: 'Basic',
//                 price: 10,
//                 credits: 100,
//                 imageUrl: assets.ai_image9,
//                 features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models'],
//             },
//             {
//                 _id: 'pro',
//                 name: 'Pro',
//                 price: 20,
//                 credits: 500,
//                 imageUrl: assets.ai_image10,
//                 features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time'],
//             },
//             {
//                 _id: 'premium',
//                 name: 'Premium',
//                 price: 30,
//                 credits: 1000,
//                 imageUrl: assets.ai_image8,
//                 features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager'],
//             },
//         ];

//         export const dummyChats = [
//             {
//                 _id: '689de4bbaa932dc3a8ef6cd7',
//                 userId: dummyUserData._id,
//                 userName: dummyUserData.name,
//                 name: 'New Chat',
//                 messages: [
//                     {
//                         isImage: false,
//                         isPublished: false,
//                         role: 'user',
//                         content: 'a boy running on water',
//                         timestamp: 1755178179612,
//                     },
//                     {
//                         isImage: true,
//                         isPublished: true,
//                         role: 'assistant',
//                         content: assets.ai_image11,
//                         timestamp: 1755178194747,
//                     },
//                 ],
//                 createdAt: '2025-08-14T13:29:31.398Z',
//                 updatedAt: '2025-08-14T13:29:54.753Z',
//             },
//             {
//                 _id: '689ccb9016a922dd57a23fce',
//                 userId: dummyUserData._id,
//                 userName: dummyUserData.name,
//                 name: 'New Chat',
//                 messages: [
//                     {
//                         isImage: false,
//                         isPublished: false,
//                         role: 'user',
//                         content: 'hello',
//                         timestamp: 1755106415912,
//                     },
//                     {
//                         isImage: false,
//                         isPublished: false,
//                         role: 'assistant',
//                         content: 'Hello! 😊 How can I assist you today?',
//                         timestamp: 1755106420723,
//                     },
//                     {
//                         isImage: true,
//                         isPublished: true,
//                         role: 'assistant',
//                         content: assets.ai_image1,
//                         timestamp: 1755107486680,
//                     },
//                     {
//                         isImage: false,
//                         isPublished: false,
//                         role: 'user',
//                         content: 'i have to create a realistic image of jungle with wild animals so create a prompt for it',
//                         timestamp: 1755158982894,
//                     },
//                     {
//                         isImage: false,
//                         isPublished: false,
//                         role: 'assistant',
//                         content: "Here's a detailed and structured prompt to generate a highly realistic jungle scene with wild animals...",
//                         timestamp: 1755158995829,
//                     },
//                     {
//                         isImage: true,
//                         isPublished: true,
//                         role: 'assistant',
//                         content: assets.ai_image2,
//                         timestamp: 1755159034238,
//                     },
//                 ],
//                 createdAt: '2025-08-13T17:29:52.421Z',
//                 updatedAt: '2025-08-14T09:39:19.046Z',
//             },
//             {
//                 _id: Date.now().toString(),
//                 userId: 'gs123456789',
//                 name: 'New Chat',
//                 userName: dummyUserData.name,
//                 messages: [],
//                 createdAt: new Date().toISOString(),
//                 updatedAt: new Date().toISOString(),
//             },
//         ];

//         export const dummyPublishedImages = [
//             { imageUrl: assets.ai_image11, userName: dummyUserData.name },
//             { imageUrl: assets.ai_image10, userName: dummyUserData.name },
//             { imageUrl: assets.ai_image9, userName: dummyUserData.name },
//             { imageUrl: assets.ai_image8, userName: dummyUserData.name },
//             { imageUrl: assets.ai_image7, userName: dummyUserData.name },
//             { imageUrl: assets.ai_image6, userName: dummyUserData.name },
//             { imageUrl: assets.ai_image5, userName: dummyUserData.name },
//             { imageUrl: assets.ai_image4, userName: dummyUserData.name },
//             { imageUrl: assets.ai_image3, userName: dummyUserData.name },
//             { imageUrl: assets.ai_image2, userName: dummyUserData.name },
//             { imageUrl: assets.ai_image1, userName: dummyUserData.name },
//         ];
//                             role: 'assistant',

import { assets } from '../assets/assets.js';

// ---- Dummy User ----
export const dummyUserData = {
    _id: '689c6deed410acddc0d95a0e',
    name: 'GreatStack',
    email: 'admin@example.com',
    password: '$2b$10$VESVdPDjL5LF.KCU6jKyqeXNSLASAAfpR2kkIJExtMO.PJvZJAudy',
    credits: 200,
    imageUrl: assets.ai_image11,
};

// ---- Dummy Plans ----
export const dummyPlans = [
    {
        _id: 'basic',
        name: 'Basic',
        price: 10,
        credits: 100,
        imageUrl: assets.ai_image9,
        features: [
            '100 text generations',
            '50 image generations',
            'Standard support',
            'Access to basic models',
        ],
    },
    {
        _id: 'pro',
        name: 'Pro',
        price: 20,
        credits: 500,
        imageUrl: assets.ai_image10,
        features: [
            '500 text generations',
            '200 image generations',
            'Priority support',
            'Access to pro models',
            'Faster response time',
        ],
    },
    {
        _id: 'premium',
        name: 'Premium',
        price: 30,
        credits: 1000,
        imageUrl: assets.ai_image8,
        features: [
            '1000 text generations',
            '500 image generations',
            '24/7 VIP support',
            'Access to premium models',
            'Dedicated account manager',
        ],
    },
];

// ---- Dummy Chats ----
export const dummyChats = [
    {
        _id: '689de4bbaa932dc3a8ef6cd7',
        userId: dummyUserData._id,
        userName: dummyUserData.name,
        name: 'New Chat',
        messages: [
            {
                isImage: false,
                isPublished: false,
                role: 'user',
                content: 'a boy running on water',
                timestamp: 1755178179612,
            },
            {
                isImage: true,
                isPublished: true,
                role: 'assistant',
                content: assets.ai_image11,
                timestamp: 1755178194747,
            },
        ],
        createdAt: '2025-08-14T13:29:31.398Z',
        updatedAt: '2025-08-14T13:29:54.753Z',
    },
    {
        _id: '689ccb9016a922dd57a23fce',
        userId: dummyUserData._id,
        userName: dummyUserData.name,
        name: 'New Chat',
        messages: [
            {
                isImage: false,
                isPublished: false,
                role: 'user',
                content: 'hello',
                timestamp: 1755106415912,
            },
            {
                isImage: false,
                isPublished: false,
                role: 'assistant',
                content: 'Hello! 😊 How can I assist you today?',
                timestamp: 1755106420723,
            },
            {
                isImage: true,
                isPublished: true,
                role: 'assistant',
                content: assets.ai_image1,
                timestamp: 1755107486680,
            },
            {
                isImage: false,
                isPublished: false,
                role: 'user',
                content:
                    'i have to create a realistic image of jungle with wild animals so create a prompt for it',
                timestamp: 1755158982894,
            },
            {
                isImage: false,
                isPublished: false,
                role: 'assistant',
                content: "Here's a detailed and structured prompt to generate a realistic jungle scene...",
                timestamp: 1755158995829,
            },
            {
                isImage: true,
                isPublished: true,
                role: 'assistant',
                content: assets.ai_image2,
                timestamp: 1755159034238,
            },
        ],
        createdAt: '2025-08-13T17:29:52.421Z',
        updatedAt: '2025-08-14T09:39:19.046Z',
    },
    {
        _id: Date.now().toString(),
        userId: 'gs123456789',
        name: 'New Chat',
        userName: dummyUserData.name,
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

// ---- Dummy Published Images ----
export const dummyPublishedImages = [
    { imageUrl: assets.ai_image11, userName: dummyUserData.name },
    { imageUrl: assets.ai_image10, userName: dummyUserData.name },
    { imageUrl: assets.ai_image9, userName: dummyUserData.name },
    { imageUrl: assets.ai_image8, userName: dummyUserData.name },
    { imageUrl: assets.ai_image7, userName: dummyUserData.name },
    { imageUrl: assets.ai_image6, userName: dummyUserData.name },
    { imageUrl: assets.ai_image5, userName: dummyUserData.name },
    { imageUrl: assets.ai_image4, userName: dummyUserData.name },
    { imageUrl: assets.ai_image3, userName: dummyUserData.name },
    { imageUrl: assets.ai_image2, userName: dummyUserData.name },
    { imageUrl: assets.ai_image1, userName: dummyUserData.name },
];
