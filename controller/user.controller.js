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

        res.status(200).json({msg: 'success', data: result});
    } catch (e) {
        res.status(500).json({msg: `Data Insertion error ${e}`});
    }
};

export {
    handleAddUser,
};