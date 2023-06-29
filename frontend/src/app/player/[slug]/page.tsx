import axios from 'axios'
import { useRouter } from 'next/router'
 
async function  getPlayerInfo(slug: string): Promise<{
  id: number,
  first_name: string;
  last_name: string;
  slug: string;
  birthdate: string;
  season_exp: string;
  team_city: string;
  team_name: string;
  jersey: string;
  team_abbreviation: string;
  country: string;
  school: string;
  weight: string;
  height: string;
  draft_year: string;
  draft_round: string;
  draft_number: string;
  position: string;
} | null> {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/player/${slug}`);
    return response.data;
  } catch(e) {
    return null;
  }
}

export default async function PlayerDetail(props: {
  params: {
    slug: string
  }
}) {
  const player = await getPlayerInfo(props.params.slug);
  if(!player) {
    return (
      <div>
        nope
        </div>
    )
  }
  return (

    <div className='p-4 flex align-center flex-col'>
      {player.team_city} { player.team_name} | #{ player.jersey} | {player.position}
      <h1 className='mt-1 text-xl leading-8 tracking-tight font-semibold'>
        
        { player.first_name} { player.last_name}
      </h1>
      <div className='mt-5 flex gap-4 w-full justify-center'>
        <div className='flex flex-col items-center'>
          <div>PPG</div>
          <div>{player.height}</div>
        </div>
        <div className='flex flex-col items-center'>
          <div>RGP</div>
          <div>{player.height}</div>
        </div>
        <div className='flex flex-col items-center'>
          <div>APG</div>
          <div>{player.height}</div>
        </div>
        <div className='flex flex-col items-center'>
          <div>PIE</div>
          <div>{player.height}</div>
        </div>
      </div>
      <div className='mt-5 grid grid-cols-4 gap-4'>
        <div className='flex flex-col items-center'>
          <div>Height</div>
          <div>{player.height}</div>
        </div>
        <div className='flex flex-col items-center'>
          <div>Weight</div>
          <div>{player.weight}</div>
        </div>
        <div className='flex flex-col items-center'>
          <div>Country</div> 
          <div>{player.country}</div>
        </div>
        <div className='flex flex-col items-center'>
          <div>Last attended</div> 
          <div>
            {player.school}
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div>Age</div>
          <div>{new Date().getFullYear() - new Date(player.birthdate).getFullYear()}</div>
        </div>
        <div className='flex flex-col items-center'>
        <div>Birthday</div>
        <div>{new Date(player.birthdate).toDateString()}</div>
        </div>
        <div className='flex flex-col items-center'>
          <div>Draft</div>
          <div>{player.draft_year} R{player.draft_round} Pick {player.draft_number}</div>
        </div>
        <div className='flex flex-col items-center'>
          <div>Experience</div>
          <div>{player.season_exp}</div>
        </div>
      </div>
      <h1 className='mt-1 text-l leading-8 tracking-tight font-semibold'>
        TRADITIONAL SPLITS
      </h1>
      <table>
        <thead>
          <tr>
            <th style={{float: 'left'}}>By year</th>
            <th>Team</th>
            <th>GP</th>
            <th>MIN</th>
            <th>PTS</th>
            <th>FGM</th>
            <th>FGA</th>
            <th>FG%</th>
            <th>3PM</th>
            <th>3PA</th>
            <th>3P%</th>
            <th>FTM</th>
            <th>FTA</th>
            <th>OREB</th>
            <th>DREB</th>
            <th>REB</th>
            <th>AST</th>
            <th>TOV</th>
            <th>STL</th>
            <th>BLK</th>
            <th>PF</th>
            <th>FP</th>
            <th>DD2</th>
            <th>TD3</th>
            <th>+/-</th>
          </tr>
        </thead>
      </table>
      <h1 className='mt-1 text-l leading-8 tracking-tight font-semibold'>
        ADVANCED SPLITS
      </h1>
      <h1 className='mt-1 text-l leading-8 tracking-tight font-semibold'>
        MISC SPLITS
      </h1>
      <h1 className='mt-1 text-l leading-8 tracking-tight font-semibold'>
        SCORING SPLITS
      </h1>
      <h1 className='mt-1 text-l leading-8 tracking-tight font-semibold'>
        USAGE SPLITS
      </h1>
    </div>
  )
}
