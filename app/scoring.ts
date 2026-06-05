import { players, playerTeams, teams, type Match } from "./data";

export function calculateLeaderboard(mode: "random" | "combined", matches: Match[] = []) {
  return players
    .map((player) => {
      const randomTeamIds = playerTeams
        .filter((item) => item.playerId === player.id && item.teamType === "random")
        .map((item) => item.teamId);

      const favoriteTeamIds = playerTeams
        .filter(
          (item) => item.playerId === player.id && item.teamType === "favorite",
        )
        .map((item) => item.teamId);

      const randomPoints = randomTeamIds.reduce(
        (total, teamId) => total + calculateTeamPoints(teamId, matches),
        0,
      );

      const favoritePoints = favoriteTeamIds.reduce(
        (total, teamId) => total + calculateTeamPoints(teamId, matches),
        0,
      );

      return {
        name: player.name,
        randomPoints,
        favoritePoints,
        totalPoints:
          mode === "random" ? randomPoints : randomPoints + favoritePoints,
      };
    })
    .sort((a, b) => b.totalPoints - a.totalPoints);
}

export function calculateTeamPoints(teamId: number, matches: Match[] = []) {
  return matches.reduce((total, match) => {
    if (match.status !== "Finished") {
      return total;
    }

    if (match.teamAId !== teamId && match.teamBId !== teamId) {
      return total;
    }

    return total + calculateMatchPoints(match, teamId);
  }, 0);
}

export function calculateMatchPoints(match: Match, teamId: number) {
  if (match.stage === "Group Stage") {
    if (match.winnerTeamId === teamId) {
      return 2;
    }

    if (match.winnerTeamId === null && match.teamAScore === match.teamBScore) {
      return 1;
    }

    return 0;
  }

  if (match.winnerTeamId !== teamId) {
    return 0;
  }

  const bonusPointsByStage = {
    "Round of 32": 1,
    "Round of 16": 2,
    "Quarter-Final": 3,
    "Semi-Final": 4,
    Final: 5,
  };

  return 2 + bonusPointsByStage[match.stage];
}

export function getTeamName(teamId: number) {
  return teams.find((team) => team.id === teamId)?.name ?? "Unknown team";
}

export function getPlayerTeamNames(
  playerId: number,
  teamType: "random" | "favorite",
) {
  return playerTeams
    .filter((item) => item.playerId === playerId && item.teamType === teamType)
    .map((item) => getTeamName(item.teamId));
}