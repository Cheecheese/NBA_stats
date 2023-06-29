import axios from 'axios'
import Link from "next/link"
async function  getPlayers(): Promise<{
  id: number,
  first_name: string,
  last_name: string,
  slug: string,
  position: string,
  height: string,
  weight: string,
  country: string,
  team_abbreviation: string,
}[]> {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/player');
    return response.data;
  } catch(e) {
    return [];
  }
}

export default async function Home() {
  const players = await  getPlayers();
  return (
    <div className='p-4'>
      <h2>players</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th style={{float: 'left'}}>Name</th>
            <th>Team</th>
            <th>Number</th>
            <th>Position</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Last attended</th>
            <th>Country</th>
          </tr>
        </thead>
  <tbody>
    
  {players.map(player => (
    <tr key={player.id}>
        <td>
          <Link href={'player/' + player.slug}>
            {player.first_name} {player.last_name}
          </Link>
        </td>
        <td>
          {player.team_abbreviation 
            ? <Link href={'team/' + player.team_abbreviation.toLowerCase()}>
              {player.team_abbreviation}
            </Link>
            : ''
          }
     
        </td>
        <td>Number</td>
        <td>{player.position}</td>
        <td>{player.height}</td>
        <td>{player.weight ? player.weight + ' lbs' : ''}</td>
        <td>Last</td>
        <td>{player.country}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  )
}
