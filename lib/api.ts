import { type Match } from "@/app/data"; // Adjust path if your data.ts is elsewhere

const API_URL = "https://api.football-data.org/v4/competitions/WC/matches";
const API_TOKEN = process.env.FOOTBALL_API_TOKEN || "YOUR_FALLBACK_TOKEN_HERE";

export async function fetchMatchesFromAPI(): Promise<Match[]> {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Auth-Token": API_TOKEN,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.matches) return [];

    // Map the external API structure to match your exact local TypeScript Match type
    return data.matches.map((apiMatch: any) => {
      const teamAId = Number(apiMatch.homeTeam.id);
      const teamBId = Number(apiMatch.awayTeam.id);
      const teamAScore = apiMatch.score?.fullTime?.home !== undefined ? apiMatch.score.fullTime.home : null;
      const teamBScore = apiMatch.score?.fullTime?.away !== undefined ? apiMatch.score.fullTime.away : null;

      // 1. Normalize Status: API returns "FINISHED", local expects "Finished"
      const status: "Upcoming" | "Finished" = 
        apiMatch.status === "FINISHED" ? "Finished" : "Upcoming";

      // 2. Normalize Stage: API returns "GROUP_STAGE", local expects "Group Stage"
      let stage: Match["stage"] = "Group Stage";
      if (apiMatch.stage === "LAST_32") stage = "Round of 32";
      else if (apiMatch.stage === "LAST_16") stage = "Round of 16";
      else if (apiMatch.stage === "QUARTER_FINALS") stage = "Quarter-Final";
      else if (apiMatch.stage === "SEMI_FINALS") stage = "Semi-Final";
      else if (apiMatch.stage === "FINAL") stage = "Final";

      // 3. Dynamically compute winnerTeamId for the scoring file
      let winnerTeamId: number | null = null;
      if (status === "Finished" && teamAScore !== null && teamBScore !== null) {
        if (teamAScore > teamBScore) {
          winnerTeamId = teamAId;
        } else if (teamBScore > teamAScore) {
          winnerTeamId = teamBId;
        }
      }

      return {
        id: Number(apiMatch.id),
        date: apiMatch.utcDate ? apiMatch.utcDate.split("T")[0] : "",
        time: apiMatch.utcDate ? apiMatch.utcDate.split("T")[1].substring(0, 5) : "",
        teamAId,
        teamBId,
        teamAName: apiMatch.homeTeam.name,
        teamBName: apiMatch.awayTeam.name,
        teamAScore,
        teamBScore,
        stage,
        status,
        winnerTeamId,
      };
    });
  } catch (error) {
    console.error("Error inside fetchMatchesFromAPI:", error);
    return [];
  }
}

export async function syncMatchData(matchId: number): Promise<Match | null> {
  try {
    const allMatches = await fetchMatchesFromAPI();
    const found = allMatches.find(m => m.id === matchId);
    return found || null;
  } catch (error) {
    console.error(`Error syncing single match ${matchId}:`, error);
    return null;
  }
}