

module.exports = {
    home:(req,res)=>{
        res.status(200).json("Welcome to home page!")
    },
    dashboard:(req,res)=>{
        res.status(200).json("Welcome to admin dashboard!")
    }
}