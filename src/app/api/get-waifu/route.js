import { NextResponse } from "next/server";

export async function POST(){
  const randomID = Math.floor(Math.random() * 20000) + 1;
  var query = `query ($id: Int) {
    Character (id: $id) {
        id
        name {
            full
            native
        }
        image{
            large
            medium
        }
        gender
        age
        description
    }
    }`;
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: {
          id: randomID
        },
      }),
    };
  try{
    const response = await fetch(url, options);
    const data = await response.json();
    return NextResponse.json(data);
  }
  catch(err){
    return NextResponse.json({
      error : "fetching waifu failed, sorry :(",
      status: 500,
    });
  }
}