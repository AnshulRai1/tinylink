import {nanoid} from 'nanoid'
import { Link } from '../models/link.model.js'
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

const generateShortUrl = asyncHandler(async(req, res)=>{
    const link = req.body.url;
    if(!link){
        throw new ApiError(400,"url is missing")
    }
    let urlObj;
    try {
        urlObj = new URL(link)
    } catch (error) {
        throw new ApiError(400, "Please provide correct url")
    }
    if(!(urlObj.protocol==="http:" || urlObj.protocol==="https:")){
        throw new ApiError(400,"Only Provide a link with proper protocol(https or http)")
    }

    urlObj.hostname = urlObj.hostname.toLowerCase()//converts the domain to lowercase
    let normalizedUrl = urlObj.href.replace(/\/+$/,"");//removes the trailing slashes
    const existingLink = await Link.findOne({url:normalizedUrl})
    if(existingLink){
        return res.status(200)
        .json(
            new ApiResponse(200, {
                code:existingLink.code,
                shortUrl:`${process.env.BASE_DOMAIN}/${existingLink.code}`,
                originalUrl:existingLink.url
            },
            "Short link already exists"
        )
        )
    }

    let code = nanoid(8)
    while(await Link.findOne({code})){
        code = nanoid(8)
    }

    const shortLinkCreated = await Link.create({
        code,
        url:normalizedUrl,
        createdAt: new Date()
    })
    return res
    .status(201)
    .json(
        new ApiResponse(201, {
            code:shortLinkCreated.code,
            shortUrl:`${process.env.BASE_DOMAIN}/${shortLinkCreated.code}`,
            originalUrl:shortLinkCreated.url
        },
        "Short link successfully created"
    )
    )
})

const getAllLinks = asyncHandler(async (req, res)=>{
    const links = await Link.find({}).sort({createdAt:-1})
    const formatted = links.map(link=>({
        code: link.code,
        shortUrl:`${process.env.BASE_DOMAIN}/${link.code}`,
        clicks:link.clicks,
        originalUrl:link.url,
        lastClicked:link.lastClicked,
        createdAt:link.createdAt
    }))
    console.log(formatted,"/n")
    return res
    .status(200)
    .json(
        new ApiResponse(200,
            formatted,
            "All short links successfully fetched"
        )
    )
})

export { 
    generateShortUrl,
    getAllLinks
} 