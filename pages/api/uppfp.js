import fs from 'fs';
import formidable from 'formidable';
import path from 'path';
import pool from '@/app/api/mysql/route';

export const config = {
    api: {
        bodyParser : false,
    }
};

export default async function handler(req, res){
    const uploadPath = path.join(process.cwd(), '/public/user-pfp');

    const form = formidable({
        uploadDir : uploadPath,
        keepExtensions : true
    })
    
    if(!fs.existsSync(uploadPath)){
        fs.mkdirSync(uploadPath, {recursive : true});
    }
    
    // await pool.execute('UPDATE users SET picture = ? WHERE id = ?', []);

    try{
        const data = await form.parse(req)
        return res.status(200).json({ success: true, message: 'Success' });
    }
    catch(err){
        return res.status(500).json({ success: false, message: err.message });
    }
}