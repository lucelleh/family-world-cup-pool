import { NextResponse } from "next/server";
import { fetchMatchesFromAPI, syncMatchData } from "@/lib/api";

/**
 * GET /api/matches - Fetch all matches from API
 * POST /api/matches/sync - Sync a specific match
 */

export async function GET() {
  try {
    const matches = await fetchMatchesFromAPI();
    return NextResponse.json({ success: true, matches });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { matchId } = body;

    if (!matchId) {
      return NextResponse.json(
        { success: false, error: "matchId is required" },
        { status: 400 }
      );
    }

    const updatedMatch = await syncMatchData(matchId);

    if (!updatedMatch) {
      return NextResponse.json(
        { success: false, error: "Failed to sync match data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, match: updatedMatch });
  } catch (error) {
    console.error("Error syncing match:", error);
    return NextResponse.json(
      { success: false, error: "Failed to sync match" },
      { status: 500 }
    );
  }
}
