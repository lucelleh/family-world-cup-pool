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
  teamAName?: string;
  teamBName?: string;
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
  { id: 1, name: "Diane" },
  { id: 2, name: "Elle" },
  { id: 3, name: "Gerrit" },
  { id: 4, name: "Jude" },
  { id: 5, name: "Lucelle" },
  { id: 6, name: "Mannetjies" },
  { id: 7, name: "Maritsa" },
  { id: 8, name: "Wayne" },
  { id: 9, name: "Xavier" },
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
  { id: 46, name: "Ukraine" },
  { id: 47, name: "Poland" },
  { id: 48, name: "Turkey" },
  { id: 49, name: "Jordan" },
  { id: 50, name: "DR Congo" },
  { id: 51, name: "Sweden" },
  { id: 52, name: "Côte d'Ivoire" },
  { id: 53, name: "Uzbekistan" },
];

export const playerTeams: PlayerTeam[] = [
  // Diane
  { playerId: 1, teamId: 10, teamType: "random" },
  { playerId: 1, teamId: 13, teamType: "random" },
  { playerId: 1, teamId: 18, teamType: "random" },
  { playerId: 1, teamId: 30, teamType: "random" },
  { playerId: 1, teamId: 36, teamType: "random" },
  { playerId: 1, teamId: 4, teamType: "favorite" },

  // Elle
  { playerId: 2, teamId: 8, teamType: "random" },
  { playerId: 2, teamId: 16, teamType: "random" },
  { playerId: 2, teamId: 22, teamType: "random" },
  { playerId: 2, teamId: 46, teamType: "random" },
  { playerId: 2, teamId: 49, teamType: "random" },
  { playerId: 2, teamId: 30, teamType: "favorite" },

  // Gerrit
  { playerId: 3, teamId: 2, teamType: "random" },
  { playerId: 3, teamId: 12, teamType: "random" },
  { playerId: 3, teamId: 21, teamType: "random" },
  { playerId: 3, teamId: 47, teamType: "random" },
  { playerId: 3, teamId: 40, teamType: "random" },
  { playerId: 3, teamId: 4, teamType: "favorite" },

  // Jude
  { playerId: 4, teamId: 4, teamType: "random" },
  { playerId: 4, teamId: 11, teamType: "random" },
  { playerId: 4, teamId: 48, teamType: "random" },
  { playerId: 4, teamId: 44, teamType: "random" },
  { playerId: 4, teamId: 41, teamType: "random" },
  { playerId: 4, teamId: 30, teamType: "favorite" },

  // Lucelle
  { playerId: 5, teamId: 1, teamType: "random" },
  { playerId: 5, teamId: 17, teamType: "random" },
  { playerId: 5, teamId: 19, teamType: "random" },
  { playerId: 5, teamId: 29, teamType: "random" },
  { playerId: 5, teamId: 37, teamType: "random" },
  { playerId: 5, teamId: 4, teamType: "favorite" },

  // Mannetjies
  { playerId: 6, teamId: 6, teamType: "random" },
  { playerId: 6, teamId: 14, teamType: "random" },
  { playerId: 6, teamId: 20, teamType: "random" },
  { playerId: 6, teamId: 35, teamType: "random" },
  { playerId: 6, teamId: 50, teamType: "random" },
  { playerId: 6, teamId: 4, teamType: "favorite" },

  // Maritsa
  { playerId: 7, teamId: 3, teamType: "random" },
  { playerId: 7, teamId: 38, teamType: "random" },
  { playerId: 7, teamId: 51, teamType: "random" },
  { playerId: 7, teamId: 27, teamType: "random" },
  { playerId: 7, teamId: 28, teamType: "random" },
  { playerId: 7, teamId: 4, teamType: "favorite" },

  // Wayne
  { playerId: 8, teamId: 7, teamType: "random" },
  { playerId: 8, teamId: 15, teamType: "random" },
  { playerId: 8, teamId: 26, teamType: "random" },
  { playerId: 8, teamId: 52, teamType: "random" },
  { playerId: 8, teamId: 53, teamType: "random" },
  { playerId: 8, teamId: 4, teamType: "favorite" },

  // Xavier
  { playerId: 9, teamId: 45, teamType: "random" },
  { playerId: 9, teamId: 5, teamType: "random" },
  { playerId: 9, teamId: 23, teamType: "random" },
  { playerId: 9, teamId: 33, teamType: "random" },
  { playerId: 9, teamId: 24, teamType: "random" },
  { playerId: 9, teamId: 3, teamType: "favorite" },
];

export const matches: Match[] = [
  {
    id: 1,
    date: "2026-06-10",
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
    date: "2026-06-10",
    time: "18:00",
    teamAId: 10,
    teamBId: 18,
    teamAScore: null,
    teamBScore: null,
    stage: "Group Stage",
    status: "Upcoming",
    winnerTeamId: null,
  },
  {
    id: 3,
    date: "2026-06-11",
    time: "21:00",
    teamAId: 3,
    teamBId: 12,
    teamAScore: null,
    teamBScore: null,
    stage: "Group Stage",
    status: "Upcoming",
    winnerTeamId: null,
  },
  {
    id: 4,
    date: "2026-06-12",
    time: "17:00",
    teamAId: 1,
    teamBId: 15,
    teamAScore: null,
    teamBScore: null,
    stage: "Group Stage",
    status: "Upcoming",
    winnerTeamId: null,
  },
  {
    id: 5,
    date: "2026-06-12",
    time: "20:00",
    teamAId: 2,
    teamBId: 31,
    teamAScore: null,
    teamBScore: null,
    stage: "Group Stage",
    status: "Upcoming",
    winnerTeamId: null,
  },
  {
    id: 6,
    date: "2026-06-13",
    time: "16:00",
    teamAId: 4,
    teamBId: 32,
    teamAScore: null,
    teamBScore: null,
    stage: "Group Stage",
    status: "Upcoming",
    winnerTeamId: null,
  },
  {
    id: 7,
    date: "2026-06-13",
    time: "19:00",
    teamAId: 6,
    teamBId: 14,
    teamAScore: null,
    teamBScore: null,
    stage: "Group Stage",
    status: "Upcoming",
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