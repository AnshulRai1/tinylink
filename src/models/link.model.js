import mongoose, { Schema } from "mongoose";

const linkSchema = new Schema(
    {
        code:{
            type:String,
            required:true,
            minLength:6,
            maxLength:8,
            match: /^[A-Za-z0-9]+$/
        },
        url:{
            type:String,
            required:true
        },
        clicks:{
            type:Number,
            default:0,
        },
        createdAt:{
            type:Date,
            default:Date.now,
        },
        lastClicked:{
            type:Date,
            default:null
        }
    }
)
linkSchema.index({ code: 1 }, { unique: true });

export const Link = mongoose.model("Link", linkSchema)