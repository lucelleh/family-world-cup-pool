export type Player = {
  id: number;
  name: string;
};

export type Team = {
  id: number;
  name: string;
};

export type PlayerTeam = {
  playerId: number;
  teamId: number;
  teamType: "random" | "favorite";
};

export type Match = {
  id: number;
  date: string;
  time: string;
  teamAId: number;
  teamBId: number;
  teamAScore: number | null;
  teamBScore: number | null;
  stage:
    | "Group Stage"
    | "Round of 32"
    | "Round of 16"
    | "Quarter-Final"
    | "Semi-Final"
    | "Final";
  status: "Upcoming" | "Finished";
  winnerTeamId: number | null;
};

export const players: Player[] = [
  { id: 1, name: "Gerrit" },
  { id: 2, name: "Anika" },
  { id: 3, name: "Liam" },
  { id: 4, name: "Mia" },
  { id: 5, name: "Johan" },
  { id: 6, name: "Elmarie" },
  { id: 7, name: "Ben" },
  { id: 8, name: "Lisa" },
  { id: 9, name: "Noah" },
];

export const teams: Team[] = [
  { id: 1, name: "Argentina" },
  { id: 2, name: "France" },
  { id: 3, name: "Brazil" },
  { id: 4, name: "England" },
  { id: 5, name: "Belgium" },
  { id: 6, name: "Portugal" },
  { id: 7, name: "Netherlands" },
  { id: 8, name: "Spain" },
  { id: 9, name: "Italy" },
  { id: 10, name: "Germany" },
  { id: 11, name: "Croatia" },
  { id: 12, name: "Morocco" },
  { id: 13, name: "Uruguay" },
  { id: 14, name: "Colombia" },
  { id: 15, name: "USA" },
  { id: 16, name: "Mexico" },
  { id: 17, name: "Switzerland" },
  { id: 18, name: "Japan" },
  { id: 19, name: "Senegal" },
  { id: 20, name: "Denmark" },
  { id: 21, name: "Austria" },
  { id: 22, name: "Korea Republic" },
  { id: 23, name: "Iran" },
  { id: 24, name: "Australia" },
  { id: 25, name: "Serbia" },
  { id: 26, name: "Nigeria" },
  { id: 27, name: "Egypt" },
  { id: 28, name: "Tunisia" },
  { id: 29, name: "Algeria" },
  { id: 30, name: "South Africa" },
  { id: 31, name: "Ghana" },
  { id: 32, name: "Cameroon" },
  { id: 33, name: "Canada" },
  { id: 34, name: "Costa Rica" },
  { id: 35, name: "Panama" },
  { id: 36, name: "Qatar" },
  { id: 37, name: "Saudi Arabia" },
  { id: 38, name: "Ecuador" },
  { id: 39, name: "Chile" },
  { id: 40, name: "Paraguay" },
  { id: 41, name: "New Zealand" },
  { id: 42, name: "Jamaica" },
  { id: 43, name: "Wales" },
  { id: 44, name: "Scotland" },
  { id: 45, name: "Norway" },
];

export const playerTeams: PlayerTeam[] = [
  // Gerrit
  { playerId: 1, teamId: 3, teamType: "random" },
  { playerId: 1, teamId: 18, teamType: "random" },
  { playerId: 1, teamId: 12, teamType: "random" },
  { playerId: 1, teamId: 33, teamType: "random" },
  { playerId: 1, teamId: 30, teamType: "random" },
  { playerId: 1, teamId: 30, teamType: "favorite" },

  // Anika
  { playerId: 2, teamId: 2, teamType: "random" },
  { playerId: 2, teamId: 31, teamType: "random" },
  { playerId: 2, teamId: 22, teamType: "random" },
  { playerId: 2, teamId: 44, teamType: "random" },
  { playerId: 2, teamId: 35, teamType: "random" },
  { playerId: 2, teamId: 2, teamType: "favorite" },

  // Liam
  { playerId: 3, teamId: 1, teamType: "random" },
  { playerId: 3, teamId: 15, teamType: "random" },
  { playerId: 3, teamId: 26, teamType: "random" },
  { playerId: 3, teamId: 43, teamType: "random" },
  { playerId: 3, teamId: 36, teamType: "random" },
  { playerId: 3, teamId: 1, teamType: "favorite" },

  // Mia
  { playerId: 4, teamId: 10, teamType: "random" },
  { playerId: 4, teamId: 19, teamType: "random" },
  { playerId: 4, teamId: 24, teamType: "random" },
  { playerId: 4, teamId: 39, teamType: "random" },
  { playerId: 4, teamId: 45, teamType: "random" },
  { playerId: 4, teamId: 10, teamType: "favorite" },

  // Johan
  { playerId: 5, teamId: 4, teamType: "random" },
  { playerId: 5, teamId: 32, teamType: "random" },
  { playerId: 5, teamId: 23, teamType: "random" },
  { playerId: 5, teamId: 41, teamType: "random" },
  { playerId: 5, teamId: 42, teamType: "random" },
  { playerId: 5, teamId: 4, teamType: "favorite" },

  // Elmarie
  { playerId: 6, teamId: 5, teamType: "random" },
  { playerId: 6, teamId: 13, teamType: "random" },
  { playerId: 6, teamId: 21, teamType: "random" },
  { playerId: 6, teamId: 28, teamType: "random" },
  { playerId: 6, teamId: 37, teamType: "random" },
  { playerId: 6, teamId: 5, teamType: "favorite" },

  // Ben
  { playerId: 7, teamId: 6, teamType: "random" },
  { playerId: 7, teamId: 14, teamType: "random" },
  { playerId: 7, teamId: 20, teamType: "random" },
  { playerId: 7, teamId: 27, teamType: "random" },
  { playerId: 7, teamId: 34, teamType: "random" },
  { playerId: 7, teamId: 6, teamType: "favorite" },

  // Lisa
  { playerId: 8, teamId: 7, teamType: "random" },
  { playerId: 8, teamId: 16, teamType: "random" },
  { playerId: 8, teamId: 25, teamType: "random" },
  { playerId: 8, teamId: 29, teamType: "random" },
  { playerId: 8, teamId: 38, teamType: "random" },
  { playerId: 8, teamId: 7, teamType: "favorite" },

  // Noah
  { playerId: 9, teamId: 8, teamType: "random" },
  { playerId: 9, teamId: 9, teamType: "random" },
  { playerId: 9, teamId: 11, teamType: "random" },
  { playerId: 9, teamId: 17, teamType: "random" },
  { playerId: 9, teamId: 40, teamType: "random" },
  { playerId: 9, teamId: 8, teamType: "favorite" },
];

export const matches: Match[] = [
  {
    id: 1,
    date: "Today",
    time: "15:00",
    teamAId: 30,
    teamBId: 16,
    teamAScore: null,
    teamBScore: null,
    stage: "Group Stage",
    status: "Upcoming",
    winnerTeamId: null,
  },
  {
    id: 2,
    date: "Today",
    time: "18:00",
    teamAId: 10,
    teamBId: 18,
    teamAScore: 2,
    teamBScore: 1,
    stage: "Group Stage",
    status: "Finished",
    winnerTeamId: 10,
  },
  {
    id: 3,
    date: "Tomorrow",
    time: "21:00",
    teamAId: 3,
    teamBId: 12,
    teamAScore: 1,
    teamBScore: 1,
    stage: "Group Stage",
    status: "Finished",
    winnerTeamId: null,
  },
  {
    id: 4,
    date: "Saturday",
    time: "17:00",
    teamAId: 1,
    teamBId: 15,
    teamAScore: 3,
    teamBScore: 0,
    stage: "Group Stage",
    status: "Finished",
    winnerTeamId: 1,
  },
  {
    id: 5,
    date: "Saturday",
    time: "20:00",
    teamAId: 2,
    teamBId: 31,
    teamAScore: 2,
    teamBScore: 0,
    stage: "Group Stage",
    status: "Finished",
    winnerTeamId: 2,
  },
  {
    id: 6,
    date: "Sunday",
    time: "16:00",
    teamAId: 4,
    teamBId: 32,
    teamAScore: 1,
    teamBScore: 0,
    stage: "Group Stage",
    status: "Finished",
    winnerTeamId: 4,
  },
  {
    id: 7,
    date: "Sunday",
    time: "19:00",
    teamAId: 6,
    teamBId: 14,
    teamAScore: 2,
    teamBScore: 2,
    stage: "Group Stage",
    status: "Finished",
    winnerTeamId: null,
  },
];

export const facts = [
  "The 2026 FIFA World Cup will be the first tournament with 48 teams.",
  "The tournament will be hosted across Canada, Mexico and the United States.",
  "South Africa hosted the FIFA World Cup in 2010.",
  "Brazil have appeared in every FIFA World Cup tournament.",
  "The group stage is where every team starts building points toward the pool.",
];