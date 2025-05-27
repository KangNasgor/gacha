import { NextResponse } from "next/server";
import { connectDB } from "../mysql/route";
import { cookies } from "next/headers";

export async function GET(){
    const connection = await connectDB();
    try{
        const user_id = (await cookies()).get('user_id')?.value;
        const [waifu_ids] = await connection.execute('SELECT * FROM user_waifus WHERE user_id = ? AND type = "ani"', [user_id]);
        const waifus = waifu_ids.map(item => item.waifu_id);
        const aniQuery = `
        query {
        ${waifus.map((id, index) => `
            w${index}: Character(id : ${id}){
                id
                name {
                    full
                    native
                }
                image {
                    medium
                }
                description
                media(perPage: 1){
                    nodes{
                        title{
                            english
                        }
                    }
                }
            }
            `).join('')}
        }`;
        const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              query: aniQuery,
            }),
        })
        .then(res => res.json())
        .then(res => Object.values(res.data));
        return NextResponse.json({
            success : true,
            inventory : response
        });
    }
    catch(err){
        return NextResponse.json({
            success : false,
            message : 'Error : ' + err,
        });
    }
}