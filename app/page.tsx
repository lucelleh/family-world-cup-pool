"use client";

import { useState, useEffect } from "react";
import { facts, matches, players } from "./data";
import {
  calculateLeaderboard,
  getPlayerTeamNames,
  getTeamName,
} from "./scoring";
import { formatSASTTime, formatSASTTimeOnly } from "@/lib/time-utils";

type Tab = "pool" | "total" | "teams" | "matches" | "facts";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "pool", label: "Pool", icon: "🏆" },
  { id: "total", label: "Total", icon: "➕" },
  { id: "teams", label: "Teams", icon: "👕" },
  { id: "matches", label: "Matches", icon: "📅" },
  { id: "facts", label: "Facts", icon: "💡" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("pool");

  const syncAllMatches = async () => {
    try {
      const response = await fetch("/api/matches");
      const data = await response.json();
      if (data.success) {
        console.log("Matches synced:", data.matches);
        // In a production app, you would update state here and refresh the data
        alert("Match data synced! Refresh the page to see updates.");
      }
    } catch (error) {
      console.error("Error syncing matches:", error);
      alert("Failed to sync matches");
    }
  };

  const mainPool = calculateLeaderboard("random");

  const combinedPool = calculateLeaderboard("combined").sort((a, b) => {
    if (b.randomPoints !== a.randomPoints) {
      return b.randomPoints - a.randomPoints;
    }

    return b.totalPoints - a.totalPoints;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        <header className="border-b border-slate-800 px-4 py-5">
          <p className="text-sm font-medium text-emerald-400">
            Family World Cup Pool
          </p>
          <h1 className="text-2xl font-bold tracking-tight">
            FIFA World Cup 2026
          </h1>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-5 pb-28">
          {activeTab === "pool" && (
            <section>
              <ScreenTitle
                title="Main Pool"
                subtitle="Official ranking. Winner is decided by randomly assigned teams only."
                emoji="🏆"
              />

              <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-lg">
                <div className="grid grid-cols-[44px_1fr_80px] border-b border-slate-800 bg-slate-800 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-300">
                  <div>#</div>
                  <div>Name</div>
                  <div className="text-right">Points</div>
                </div>

                {mainPool.map((player, index) => (
                  <div
                    key={player.name}
                    className="grid grid-cols-[44px_1fr_80px] items-center border-b border-slate-800 px-4 py-4 last:border-b-0"
                  >
                    <div className="font-bold text-emerald-400">
                      {index + 1}
                    </div>
                    <div className="font-medium">{player.name}</div>
                    <div className="text-right text-lg font-bold text-emerald-400">
                      {player.totalPoints}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "total" && (
            <section>
              <ScreenTitle
                title="Pool + Favorite"
                subtitle="Still ordered by random-team points. Favorite team points are shown as an add-on."
                emoji="➕"
              />

              <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-lg">
                <div className="grid grid-cols-[36px_1fr_68px_54px_62px] border-b border-slate-800 bg-slate-800 px-3 py-3 text-xs font-bold uppercase tracking-wide text-slate-300">
                  <div>#</div>
                  <div>Name</div>
                  <div className="text-right">Pool</div>
                  <div className="text-right text-slate-400">Fav</div>
                  <div className="text-right">Total</div>
                </div>

                {combinedPool.map((player, index) => (
                  <div
                    key={player.name}
                    className="grid grid-cols-[36px_1fr_68px_54px_62px] items-center border-b border-slate-800 px-3 py-4 text-sm last:border-b-0"
                  >
                    <div className="font-bold text-emerald-400">
                      {index + 1}
                    </div>
                    <div className="font-medium">{player.name}</div>
                    <div className="text-right text-base font-bold text-emerald-400">
                      {player.randomPoints}
                    </div>
                    <div className="text-right font-medium text-slate-500">
                      +{player.favoritePoints}
                    </div>
                    <div className="text-right font-semibold text-slate-300">
                      {player.totalPoints}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 rounded-2xl bg-slate-900 p-3 text-sm leading-6 text-slate-400">
                The official winner is determined by the Pool column only. The
                favorite team score is just an extra comparison for interest.
              </p>
            </section>
          )}

          {activeTab === "teams" && (
            <section>
              <ScreenTitle
                title="Family Teams"
                subtitle="Random teams and selected favorite teams."
                emoji="👕"
              />

              <div className="space-y-4">
                {players.map((player) => {
                  const randomTeams = getPlayerTeamNames(player.id, "random");
                  const favoriteTeams = getPlayerTeamNames(
                    player.id,
                    "favorite",
                  );

                  return (
                    <div
                      key={player.id}
                      className="rounded-3xl bg-slate-900 p-4 shadow-lg"
                    >
                      <h3 className="text-lg font-bold">{player.name}</h3>

                      <p className="mt-3 text-xs uppercase tracking-wide text-slate-400">
                        Random teams
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {randomTeams.length > 0 ? (
                          randomTeams.map((team) => (
                            <span
                              key={team}
                              className="rounded-full bg-slate-800 px-3 py-1 text-sm"
                            >
                              {team}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">
                            Not added yet
                          </p>
                        )}
                      </div>

                      <p className="mt-4 text-xs uppercase tracking-wide text-slate-500">
                        Favorite team
                      </p>

                      {favoriteTeams.length > 0 ? (
                        <p className="mt-2 inline-block rounded-full bg-slate-700 px-3 py-1 text-sm font-medium text-slate-300">
                          {favoriteTeams[0]}
                        </p>
                      ) : (
                        <p className="mt-2 text-sm text-slate-500">
                          Not added yet
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {activeTab === "matches" && (
            <section>
              <ScreenTitle
                title="Matches"
                subtitle="Fixtures and results shown in South African time."
                emoji="📅"
              />

              <div className="mb-4 flex gap-2">
                <button
                  onClick={() => syncAllMatches()}
                  className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Sync Results
                </button>
              </div>

              <div className="space-y-3">
                {matches.map((match) => {
                  const matchDate = new Date(match.date);
                  const displayDate = matchDate.toLocaleDateString("en-ZA", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  });
                  
                  return (
                    <div
                      key={match.id}
                      className="rounded-3xl bg-slate-900 p-4 shadow-lg"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400">{displayDate}</p>
                        <p className={`rounded-full px-3 py-1 text-xs font-medium ${
                          match.status === "Finished"
                            ? "bg-emerald-500 text-slate-950"
                            : "bg-slate-800 text-slate-300"
                        }`}>
                          {match.status}
                        </p>
                      </div>

                      <p className="mt-3 text-lg font-bold">
                        {getTeamName(match.teamAId)} vs{" "}
                        {getTeamName(match.teamBId)}
                      </p>

                      {match.status === "Finished" ? (
                        <div>
                          <p className="mt-2 text-2xl font-bold text-emerald-400">
                            {match.teamAScore} - {match.teamBScore}
                          </p>
                          {match.winnerTeamId && (
                            <p className="mt-1 text-sm text-slate-400">
                              Winner: {getTeamName(match.winnerTeamId)}
                            </p>
                          )}
                          {!match.winnerTeamId && match.teamAScore === match.teamBScore && (
                            <p className="mt-1 text-sm text-slate-400">
                              Draw
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="mt-2 text-lg font-bold text-emerald-400">
                          {match.time} SAST
                        </p>
                      )}

                      <p className="mt-2 text-sm text-slate-400">
                        {match.stage}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {activeTab === "facts" && (
            <section>
              <ScreenTitle
                title="Facts"
                subtitle="Interesting World Cup context for the family."
                emoji="💡"
              />

              <div className="space-y-3">
                {facts.map((fact, index) => (
                  <div
                    key={fact}
                    className="rounded-3xl bg-slate-900 p-4 shadow-lg"
                  >
                    <p className="text-sm leading-6 text-slate-300">
                      <span className="font-bold text-emerald-400">
                        {index + 1}.
                      </span>{" "}
                      {fact}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <nav className="fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 border-t border-slate-800 bg-slate-950 px-2 py-3">
          <div className="grid grid-cols-5 gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-2xl px-2 py-2 text-xs font-medium transition ${
                    isActive
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-900 text-slate-400"
                  }`}
                >
                  <span className="block text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </main>
  );
}

function ScreenTitle({
  title,
  subtitle,
  emoji,
}: {
  title: string;
  subtitle: string;
  emoji: string;
}) {
  return (
    <div className="mb-5">
      <p className="text-4xl">{emoji}</p>
      <h2 className="mt-2 text-2xl font-bold">{title}</h2>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}