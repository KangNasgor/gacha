import { NextResponse } from "next/server";

export async function POST(){
  const randomPage = Math.floor(Math.random() * 10) + 1;
  var query = `
  query ($page : Int){
    Page(page : $page, perPage : 50) {
      media(sort : START_DATE_DESC, type : ANIME) {
        id
        characters(perPage : 75) {
          nodes {
            name {
              full
              native
            }
            gender
            description
            image {
              medium
              large
            } 
            media {
              nodes{
                title {
                  english
                }
              }
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

    const title = randomWaifu.media.nodes.map(item => item.title.english);
    const animeTitle = title[0];
    return NextResponse.json({randomWaifu, animeTitle});
  }
  catch(err){
    return NextResponse.json({
      error : "Error : " + err.message,
      status: 500,
    });
  }
}