import {nanoid} from 'nanoid'
import { Link } from '../models/link.model'

const generateShortUrl = async(req, res)=>{
    const link = req.body.url;
    if(!link){
        throw new ApiError(400,"url is missing")
    }

    try {
        const url = new URL(link)
    } catch (error) {
        new ApiError(400, "Please provide correct url")
    }
    if(!(url.protocol==="http:" || url.protocol==="https:")){
        throw new ApiError(400,"Provide a link with proper protocol")
    }

    let code  = nanoid(8);
    const codeExist = await Link.findOne({
        code
    })

    if(codeExist){
        code = nanoid(8)
    }

    const shortLinkCreated = await Link.create({
        code,
        url:url.href
    })
    return res
    .status(200);
}

export {generateShortUrl}