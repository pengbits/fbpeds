module.exports = (req,res,next) => {
  if(req.error){
    res.status(error.status || 400)
    res.json({
      error: {
        message: error.message || 'An Error occurred'
      }
    })
  }
  next()
}