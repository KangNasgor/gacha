import pool from "../mysql/route";

const generateOTP = () => {
    const otp =  Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

const storeOTP = async (email, otp) => {
    const expirationDate = Date.now() + 5 * 60 * 1000;
    const [rows] = await pool.execute(
        'INSERT INTO otp_codes (email, otp, expires_at) VALUES (?, ?, ?)',
        [email, otp, new Date(expirationDate)]
    );
}

const validateOTP = async (email, otp) => {
    const [rows] = await pool.execute(
        'SELECT * FROM otp_codes WHERE email = ?',
        [email]
    );
    const expirationDate = rows[0].expires_at;
    const expirationDateTime = new Date(expirationDate).getTime();
    if(Date.now() < expirationDateTime){
        return true;
    }
    return false;
}

export {generateOTP, storeOTP, validateOTP};