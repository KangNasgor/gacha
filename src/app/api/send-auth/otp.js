import { connectDB } from "@/app/mysql/route";

const generateOTP = () => {
    const otp =  Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

const storeOTP = async (email, otp) => {
    const expirationDate = Date.now() + 5 * 1000;
    const connection = await connectDB();
    const [rows] = await connection.execute(
        'INSERT INTO otp_codes (email, otp, expires_at) VALUES (?, ?, ?)',
        [email, otp, new Date(expirationDate)]
    );

    await connection.end();
}

const validateOTP = async (email, otp) => {
    const connection = await connectDB();
    const [rows] = await connection.execute(
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