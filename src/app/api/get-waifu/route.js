import { NextResponse } from "next/server";

export async function POST(){
  const randomPage = Math.floor(Math.random() * 10) + 1;

  var query = `
  query ($page : Int){
    Page(page : $page, perPage : 25) {
      media(sort : START_DATE_DESC, type : ANIME) {
        id
        characters(perPage : 50) {
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

  const fetchAnilist = async () => {
    const res = await fetch(url, options);
    const data = await res.json();
    const media = data.data.Page.media;
    const characters = media.flatMap(media => media.characters.nodes);
    const waifus = characters.filter(char => char.gender === "Female");
    const selectedWaifu = waifus[Math.floor(Math.random() * waifus.length)];
    const title = selectedWaifu.media?.nodes?.[0].title.english; // check if the waifu is fetched from anilist api, it will search for the title

    return {selectedWaifu, title};
  }

  const fetchMAL = async (page = 1) => {
    const res = await fetch(`https://api.jikan.moe/v4/characters?page=${page}`, {
      headers : {
        'Content-Type' : 'application/json',
        Accept : 'application/json',
      }
    }); 
    const data = await res.json();
    const selectedWaifu = data.data[Math.floor(Math.random() * data.data.length)];
    const resWaifu = await fetch(`https://api.jikan.moe/v4/characters/${selectedWaifu.mal_id}/full`, {Accept : 'application/json'});
    const dataWaifu = await resWaifu.json();
    const waifu = dataWaifu.data;

    return waifu;
  }

  try{
    const [anilistWaifu, malWaifu] = await Promise.all([
      fetchAnilist(),
      fetchMAL(randomPage),
    ]);
    const waifus = [anilistWaifu.selectedWaifu, malWaifu];
    const selectedWaifu = waifus[Math.floor(Math.random() * waifus.length)];
    const title = anilistWaifu.title;
    return NextResponse.json({selectedWaifu, title});
  }
  catch(err){
    return NextResponse.json({
      error : "Error : " + err.message,
    }, {status : 500});
  }
}

//waifuAnilist