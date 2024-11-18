import {Contact} from '../models/contact.model.js';
import validator from 'validator';

const phonePatt = new RegExp('^[0-9]{10}$');

const handleContactUs = async (req, res) => {
    try{
        const {name, email, phoneNo, message, address, subject} = req.body;

        if(!validator.isEmail(email)){
            return res.status(400).json({msg: 'Email is not valid'});
        }
        
        if(!phonePatt.test(phoneNo)){
            return res.status(400).json({msg: 'Phone No is not valid'});
        }

        const contactSchema = {
            name: name,
            email: email,
            phoneNo: phoneNo,
            message: message,
            address: address,
            subject: subject
        }

        const doc = new Contact(contactSchema);
        const result = await doc.save();

        return res.status(200).json({msg: 'success', data: result});
    }catch(e){
        return res.status(500).json({msg: `something went wrong : ${e}`})
    }
}

export {
    handleContactUs,
}