import {User} from '../models/user.model.js';

const handleAddUser = async (req, res) => {
    try {
        const body = {...req.body};
        const edu = body.education.map((item) => {
            return {...item}
        });

        const {
            name,
            email,
            phoneNo,
            city,
            state,
            pincode,
        } = body;
        
        const profilePic = `uploads//userImages//${phoneNo}`;

        const userSchema = {
            name: name,
            email: email,
            phoneNo: phoneNo,
            city: city,
            state: state,
            pincode: pincode,
            profilePic: profilePic,
            education: edu
        };

        const doc = new User(userSchema);
        const result = await doc.save();

        return res.status(200).json({msg: 'success', data: result});
    } catch (e) {
        return res.status(500).json({msg: `Data Insertion error ${e}`});
    }
}

const handleGetUser = async (req, res) => {
    try{
        const result = await User.find({});
        return res.status(200).json({msg:'success', data: result})
    }catch(e){
        return res.status(500).json({msg:`Data fetching error : ${e}`})
    }
}

const handleGetIndividualUser = async (req, res) => {

    try{
        const {attr, id} = req.params;

        const query = {[attr]: id};        
        const result = await User.find(query);

        return res.status(200).json({msg: 'success', data: result});
    }catch(e){
        return res.status(500).json({msg:`Data fetching error : ${e}`})        
    }
}

export {
    handleAddUser,
    handleGetUser,
    handleGetIndividualUser
};