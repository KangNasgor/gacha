import { NextResponse } from "next/server";

export async function POST(){
  var query = `query ($id: Int) {
    Media (id: $id, type: ANIME) {
        id
        title {
            romaji
            english
            native
        }
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
          id: 15125
        },
      }),
    };
  try{
    const response = await fetch(url, options);
    const data = response.json();
    return NextResponse.json(data);
  }
  catch(err){
    return NextResponse.json({
      error : "fetching waifu failed, sorry :(",
      status: 500,
    });
  }
}