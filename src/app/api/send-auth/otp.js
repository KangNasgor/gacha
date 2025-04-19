const otpStorage = {};

const generateOTP = () => {
    const otp =  Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

const storeOTP = (email, otp) => {
    const expirationDate = Date.now() + 5 * 60 * 1000;
    otpStorage[email] = {otp, expirationDate};
}

const validateOTP = (email, otp) => {
    const storedOtp = otpStorage[email].otp;
    if(storedOtp && storedOtp.otp === otp && Date.now() < storedOtp.expirationDate){
        return true;
    }
    return false;
}
export {generateOTP, storeOTP, validateOTP, otpStorage};