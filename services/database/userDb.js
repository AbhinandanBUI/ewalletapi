const users = require("../../model/user.model")



exports.verifyEmail = async (pemail,pmobile) => {
    try {
        // console.log(data);
        let emailfound = await users.find({
            email: pemail,
            mobile:pmobile
        });
        return emailfound;
    } catch (e) {
        throw new Error('Unable to find email: ' + e.message)
    }
};

exports.allUser = async () => {
    try {
        // console.log(data);
        let userList = await users.find({
            
        });
        return userList;
    } catch (e) {
        throw new Error('Unable to find userlist: ' + e.message)
    }
};
exports.GetAccount = async (data) => {
    try {
        // console.log(data);
        let userList = await users.find({mobile:data.mobile
            // ,loanerId:data.loanerId           
        });
        return userList;
    } catch (e) {
        throw new Error('Unable to find userlist: ' + e.message)
    }
};


exports.generateUserId = async (data)=>{
    try {
        // console.log(data);
        let emailfound = await users.find();
        return emailfound;
    } catch (e) {
        throw new Error('Unable to generate  userid: ' + e.message)
    }
}


/**
 * Create admin 
 * @param {request} req
 * @returns new admin 
 */
exports.create = async (data) => {
    try {
        let userData = ({
            userId:data.userId,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            mobile: data.mobile,
            password: data.password,
            roleId: data.roleId,
            dob:data.dob,
            isActive: 1,
            isDelete: 0,
        })
        const user = await new users(userData).save()

        return user
    } catch (e) {
        throw new Error('Unable to create admin: ' + e.message)
    }
}

exports.login = async(data)=>{
    try {
        // console.log(data);
        let userlogin = await users.findOne({
            email:data.email,password:data.password
        });
        if (userlogin == null) {
            return 'user do not found';
        } else {
            return userlogin;
        }
        
    } catch (e) {
        throw new Error('Unable to check userdetails : ' + e.message)
    }
}

exports.updateUserProfile = async(data)=>{
    try {
        const mdata ={
            profilePath:data.pathName,
            imageName:data.fileName,
            imageSize:data.imageSize,
        }
        const result = await users.findOneAndUpdate({userId:data.userId},{$set:mdata});
        
        return result;
    } catch (e) {
        throw new Error('Unable to check userdetails : ' + e.message)
    }
}
