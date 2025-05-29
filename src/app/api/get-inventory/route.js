import { NextResponse } from "next/server";
import { connectDB } from "../mysql/route";
import { cookies } from "next/headers";

export async function GET(){
    const connection = await connectDB();
    const cache = {};
    try{
        const user_id = (await cookies()).get('user_id')?.value;
        const [waifu_ids_ani] = await connection.execute('SELECT * FROM user_waifus WHERE user_id = ? AND type = "ani"', [user_id]);
        const [waifu_ids_mal] = await connection.execute('SELECT * FROM user_waifus where user_id = ? AND type = "mal"', [user_id]);

        const waifusAni = waifu_ids_ani.map(item => item.waifu_id);
        const waifusMal = waifu_ids_mal.map(item => item.waifu_id);

        // Below is a GraphQL query that's using alias to fetch multiple data in one query, the alias is w1,w2, or w3, depends on the index so it's dynamic
        // Using .join('') to make all the characters joined as one string
        const aniQuery = `
        query {
        ${waifusAni.map((id, index) => `
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

        const responseAni = await fetch("https://graphql.anilist.co", {
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

        const user_inventory = `user_inventory_${user_id}`;

        if(cache[user_inventory]){
            const inventory = cache[user_inventory];
            return NextResponse.json({
                success : true,
                inventory : inventory,
            });
        }
        const responseMal = await Promise.all(
            waifusMal.map(id => {
                return fetch(`https://api.jikan.moe/v4/characters/${id}/full`, {
                    headers : {
                        'Content-Type' : 'application/json',
                        Accept : 'application/json',
                    }
                })
                .then(res => res.json())
                .then(res => res.data);
            })
        );

        const waifus = [...responseAni, ...responseMal];

        const inventory = waifus.sort((a, b) => { // sorting all the waifus alphabetically
            const nameA = a.name?.full || a.name;
            const nameB = b.name?.full || b.name;
            return nameA.localeCompare(nameB);
        });
        cache[user_inventory] = inventory;
        setTimeout(() => {
            delete cache[user_inventory]
        }), 120000;
        return NextResponse.json({
            success : true,
            inventory : inventory
        });
    }
    catch(err){
        return NextResponse.json({
            success : false,
            message : 'Error : ' + err,
        });
    }
}