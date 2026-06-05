import { type Match } from "@/app/data";

/**
 * Fetch match data from football-data.org API
 * Free tier available: https://www.football-data.org/
 * 
 * For 2026 World Cup in North America, use competition code: WC
 */
export async function fetchMatchesFromAPI(): Promise<Partial<Match>[]> {
  try {
    // Using football-data.org free API
    // Competition code 'WC' is for World Cup
    const response = await fetch("https://api.football-data.org/v4/competitions/WC/matches", {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
      },
    });

    if (!response.ok) {
      console.warn(`API fetch failed: ${response.status}. Using mock data.`);
      return getMockMatches();
    }

    const data = await response.json();
    return parseMatchData(data.matches);
  } catch (error) {
    console.warn("Error fetching from football-data.org, using mock data:", error);
    return getMockMatches();
  }
}

/**
 * Parse matches from football-data.org format
 */
function parseMatchData(apiMatches: any[]): Partial<Match>[] {
  return apiMatches.map((match) => ({
    id: match.id,
    date: match.utcDate,
    time: new Date(match.utcDate).toLocaleTimeString("en-ZA", {
      timeZone: "Africa/Johannesburg",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    teamAId: match.homeTeam.id,
    teamBId: match.awayTeam.id,
    teamAName: match.homeTeam.name,
    teamBName: match.awayTeam.name,
    teamAScore: match.score.fullTime.home,
    teamBScore: match.score.fullTime.away,
    stage: match.stage,
    status: match.status === "FINISHED" ? "Finished" : "Upcoming",
    winnerTeamId:
      match.score.fullTime.home > match.score.fullTime.away
        ? match.homeTeam.id
        : match.score.fullTime.away > match.score.fullTime.home
          ? match.awayTeam.id
          : null,
  }));
}

/**
 * Mock match data for development/fallback
 */
function getMockMatches(): Partial<Match>[] {
  return [
    {
      id: 1,
      date: "2026-06-01",
      time: "15:00",
      teamAId: 30,
      teamBId: 16,
      teamAScore: null,
      teamBScore: null,
      stage: "Group Stage",
      status: "Upcoming",
      winnerTeamId: null,
    },
  ];
}

/**
 * Update a single match with new data from the API
 */
export async function syncMatchData(matchId: number): Promise<Partial<Match> | null> {
  try {
    const response = await fetch(
      `https://api.football-data.org/v4/matches/${matchId}`,
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
        },
      }
    );

    if (!response.ok) return null;

    const match = await response.json();
    return parseMatchData([match.match])[0];
  } catch (error) {
    console.error("Error syncing match data:", error);
    return null;
  }
}
