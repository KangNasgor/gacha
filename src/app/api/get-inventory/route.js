import { NextResponse } from "next/server";
import { connectDB } from "../mysql/route";
import { cookies } from "next/headers";

export async function GET(){
    const connection = await connectDB();
    const aniQuery = `
        query($id : Int){
            Character(id : $id){
                id
                name {
                    full
                    native
                }
                image {
                    medium
                }
                description
                media{
                    nodes{
                        title{
                            english
                        }
                    }
                }
            }
        }
    `
    try{
        const user_id = (await cookies()).get('user_id')?.value;
        const [waifu_ids] = await connection.execute('SELECT * FROM user_waifus WHERE user_id = ? AND type = "ani"', [user_id]);
        const waifus = waifu_ids.map(item => item.waifu_id);
        const fetchWaifus = await Promise.all(
            waifus.map(id => { // This will return the waifus as objects inside a new array fetchWaifus
                return fetch("https://graphql.anilist.co", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    body: JSON.stringify({
                      query: aniQuery,
                      variables : {
                        id : id
                      }
                    }),
                })
                .then(res => res.json())
                .then(res => res.data?.Character ? res.data?.Character : null);
            })
        );
        return NextResponse.json({
            success : true,
            inventory : fetchWaifus,
        });
    }
    catch(err){
        return NextResponse.json({
            success : false,
            message : 'Error :' + err,
        });
    }
}