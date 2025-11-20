const healthCheck = async(req, res)=>{
    return res.status(200).json({
        "status":"200",
        "message":"Health check successfull"
    });
}
export { healthCheck };