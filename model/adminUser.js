const mongoose = require('mongoose');

const adminUser = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    nickname: String,
    avatar: String,
    password: {
        type: String,
        required: true
    },
    desc: String,
    phone: String,
    job: Number,
    sex: Number
}, {versionKey: false, timestamps: {createdAt: 'create_time',
        updatedAt: 'updated_time'}});

module.exports = mongoose.model('admin_user', adminUser);