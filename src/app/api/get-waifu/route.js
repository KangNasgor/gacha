import { NextResponse } from "next/server";

export async function POST(){
  const randomPage = Math.floor(Math.random() * 10) + 1;
  var query = `
  query ($page : Int){
    Page(page : $page, perPage : 5) {
      media(sort : START_DATE_DESC, type : ANIME) {
        id
        title {
          romaji
        }
        characters(perPage : 5, sort : FAVOURITES_DESC) {
          nodes {
            name {
              full
              native
            }
            gender
            description
            image {
              medium
            }  
          }
        }
      }
    }
  }
  `;
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables : {
          page : randomPage
        }
      }),
    };
  try{
    const response = await fetch(url, options);
    const data = await response.json();
    const media = data.data.Page.media;
    const characters = media.flatMap(media => media.characters.nodes);
    const waifus = characters.filter(char => char.gender === "Female");
    const randomWaifu = waifus[Math.floor(Math.random() * waifus.length)]
    return NextResponse.json(randomWaifu);
  }
  catch(err){
    return NextResponse.json({
      error : "Error : " + err,
      status: 500,
    });
  }
}