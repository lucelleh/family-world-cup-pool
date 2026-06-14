import { type Match } from "@/app/data";

/**
 * Fetch match data from football-data.org API
 * Free tier available: https://www.football-data.org/
 * * For 2026 World Cup in North America, use competition code: WC
 */
export async function fetchMatchesFromAPI(): Promise<Match[]> {
  try {
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
function parseMatchData(apiMatches: any[]): Match[] {
  if (!apiMatches) return [];

  return apiMatches.map((match) => {
    const teamAId = Number(match.homeTeam.id);
    const teamBId = Number(match.awayTeam.id);
    const teamAScore = match.score?.fullTime?.home !== undefined ? match.score.fullTime.home : null;
    const teamBScore = match.score?.fullTime?.away !== undefined ? match.score.fullTime.away : null;

    // 1. Normalize Status: "FINISHED" -> "Finished"
    const status: "Upcoming" | "Finished" = 
      match.status === "FINISHED" ? "Finished" : "Upcoming";

    // 2. Normalize Stage: "GROUP_STAGE" -> "Group Stage"
    let stage: Match["stage"] = "Group Stage";
    if (match.stage === "LAST_32") stage = "Round of 32";
    else if (match.stage === "LAST_16") stage = "Round of 16";
    else if (match.stage === "QUARTER_FINALS") stage = "Quarter-Final";
    else if (match.stage === "SEMI_FINALS") stage = "Semi-Final";
    else if (match.stage === "FINAL") stage = "Final";

    // 3. Compute winnerTeamId dynamically for scoring
    let winnerTeamId: number | null = null;
    if (status === "Finished" && teamAScore !== null && teamBScore !== null) {
      if (teamAScore > teamBScore) {
        winnerTeamId = teamAId;
      } else if (teamBScore > teamAScore) {
        winnerTeamId = teamBId;
      }
    }

    return {
      id: Number(match.id),
      date: match.utcDate ? match.utcDate.split("T")[0] : "",
      time: new Date(match.utcDate).toLocaleTimeString("en-ZA", {
        timeZone: "Africa/Johannesburg",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      teamAId,
      teamBId,
      teamAName: match.homeTeam.name,
      teamBName: match.awayTeam.name,
      teamAScore,
      teamBScore,
      stage,
      status,
      winnerTeamId,
    };
  });
}

/**
 * Mock match data for development/fallback
 */
function getMockMatches(): Match[] {
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
export async function syncMatchData(matchId: number): Promise<Match | null> {
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