const UserModel = require('../models/User');

module.exports = {
    async create(data) {
        return await UserModel.create(data);
    },

    async findById(id) {
        return await UserModel.findById(id);
    },

    async findByEmail(email) {
        return await UserModel.findOne({ email });
    },

    async findAll() {
        return await UserModel.find();
    },

    async updateById(id, data) {
        return await UserModel.findByIdAndUpdate(id, data, { new: true });
    },

    async deleteById(id) {
        return await UserModel.findByIdAndDelete(id);
    }
};
