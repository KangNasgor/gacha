import { NextResponse } from "next/server";

var waifuBeforeHolder = null;
var lockedWaifus = [];

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
    lockedWaifus.push(waifuBeforeHolder);
    const response = await fetch(url, options);
    const data = await response.json();
    const media = data.data.Page.media;

    const characters = media.flatMap(media => media.characters.nodes);
    const waifus = characters.filter(char => char.gender === "Female");
    const waifuIds = waifus.map(char => char.id);
    const filterWaifu = waifus.filter(char => !lockedWaifus.includes(char.id));
    const randomWaifu = filterWaifu[Math.floor(Math.random() * filterWaifu.length)];

    const title = randomWaifu.media.nodes.map(item => item.title.english);
    const animeTitle = title[0];
    waifuBeforeHolder = randomWaifu;
    return NextResponse.json({randomWaifu, animeTitle});
  }
  catch(err){
    return NextResponse.json({
      error : "Error : " + err.message,
    }, {status : 500});
  }
}