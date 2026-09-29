const mongoose = require("mongoose")
const{Schema, model}=mongoose

const blacklistTokenSchema = new Schema({
token:{
    type:String,
    required:[true, "token is required to be added in blacklist"]
}
},{
    timestamps:true
})
const tokenBlacklistModel = mongoose.model("blacklistTokens",blacklistTokenSchema)
module.exports = tokenBlacklistModel