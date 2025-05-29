import mongoose, { Schema } from "mongoose"


const userschema=new Schema({

    name:String,
    email:{
        unique:true,
        type:String,
        required:[true,"Email required !"]
    },
    password:{
        type:String,
        required:[true,"Password required"]
    },
    about:String,
    ProfileURL:String

})


let UserData;
if (mongoose.models.UserData) {
    UserData = mongoose.model('UserData');
} else {
    UserData = mongoose.model('UserData', userschema);
}

export { UserData };