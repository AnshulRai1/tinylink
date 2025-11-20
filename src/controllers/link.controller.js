import {nanoid} from 'nanoid'
import { Link } from '../models/link.model.js'
import { ApiResponse } from '../utils/ApiResponse.js';

const generateShortUrl =  async(req, res)=>{
    const link = req.body.url;
    if(!link){
        throw new ApiError(400,"url is missing")
    }

    let url;
    try {
        url = new URL(link)
    } catch (error) {
        throw new ApiError(400, "Please provide correct url")
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
    .status(200)
    .json(
        new ApiResponse(200, shortLinkCreated, "Short link successfully created")
    )
}

export {generateShortUrl}