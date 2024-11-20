import {Otp} from '../../models/Day-3/otp.model.js';
import {D3User} from '../../models/Day-3/d3user.model.js';
import bcrypt from 'bcrypt';
import {main} from '../../utils/sendMail.js';

async function encodePass(pass, name, email, service){
    bcrypt.hash(pass, 10, async (err, hash) => {
        if(err){
            return;
        }

        const userSchema = {
            email,
            password: hash,
            name,
            verify: false,
            service
        }
        
        try{
            const docs = new D3User(userSchema);
            await docs.save();
        }catch(e){
            console.log(`DB errorrr: ${e}`);
        }

    });
}

const handleEmailVerification = async (req, res) => {
    try{
        const {name, email, password, service} = req.body;
        await encodePass(password, name, email, service);
        
        res.cookie('email', email, {
            httpOnly: true, 
            secure: true,
            maxAge: 600000, // 10min
        });

        return res.redirect('/api/v1/day3/otp');
    }catch(e){
        return res.status(500).json({msg: `Email error : ${e}`});
    }
}

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const handleOtp = async (req, res) => {
    try{
        if(!req.cookies.email){
            return res.status(400).json({msg: 'Can not found email ID, register or login first'});
        }
        
        const otp = generateOtp();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);


        const data = await Otp.findOne({email: req.cookies.email});
        if(data){
            await Otp.deleteOne({email: req.cookies.email});
        }

        const otpSchema = {
            otp: otp,
            otpExpiry: otpExpiry,
            email: req.cookies.email,
        }

        const doc = new Otp(otpSchema);
        const result = await doc.save();

        main(req.cookies.email, otp);

        return res.status(200).json({msg: `Otp sent successfully to ${result}`});

    }catch(e){
        return res.status(500).json({msg: `OTP error : ${e}`});
    }
}

const handleVerifyOtp = async (req, res) => {
    try{
        if(!req.cookies.email){
            return res.status(400).json({msg: 'Can not found email ID, register or login first'});
        }
        const {otp} = req.params;

        const email = req.cookies.email;

        const query = {email};

        const data = await Otp.findOne(query);

        if (!data) {
            return res.status(404).send("User not found");
        }

        if (data.otp !== otp) {
            return res.status(400).send("Invalid OTP");
        }

        if (new Date() > data.otpExpiry) {
            return res.status(400).send("OTP has expired");
        }
        
        //Deleting Otp
        await Otp.deleteOne({ email });

        await D3User.updateOne({ email }, { $set: { verify: true } });

        return res.status(200).json({msg: `Otp verified successfully`});

    }catch(e){
        return res.status(500).json({msg: `OTP Verify error : ${e}`});
    }
}

const handleLogin = async (req, res) => {
    try{
        const {email, password} = req.body;

        const data = await D3User.findOne({email});
        
        if(data){
            
            bcrypt.compare(password, data.password, async function(err, result) {
                if(err){
                    return;
                }
    
                if(result){
                    if(data.verify){
                        return res.status(200).json({msg: 'User is verified and logged in'});
                    }

                    res.cookie('email', email, {
                        httpOnly: true, 
                        secure: true,
                        maxAge: 600000, // 10min
                    });

                    return res.redirect('/api/v1/day3/otp');
                }
                return res.status(401).json({msg: 'Password is wrong'})
            });
        }else{
            return res.status(404).json({msg: 'User does not exists, Register first'});
        }
    }catch(e){
        return res.status(500).json({msg: `Somehing went wrong : ${e}`});
    }
}


export {
    handleEmailVerification,
    handleOtp,
    handleVerifyOtp,
    handleLogin,
}