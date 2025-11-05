import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GA_CLIENT_EMAIL,
        private_key: process.env.GA_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    });

    const analyticsDataClient = google.analyticsdata({
      version: "v1beta",
      auth,
    });
    const propertyId = process.env.GA_PROPERTY_ID;

    // Ambil historical total (gunakan startDate yang lebih jauh, misal "2000-01-01" untuk total seluruh waktu)
    const historicalRes = await analyticsDataClient.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dimensions: [{ name: "date" }],
        metrics: [{ name: "screenPageViews" }],
        // ambil dari 1 tahun terakhir
        dateRanges: [{ startDate: "365daysAgo", endDate: "today" }],
      },
    });

    // Realtime active users
    const realtimeRes = await analyticsDataClient.properties.runRealtimeReport({
      property: `properties/${propertyId}`,
      requestBody: { metrics: [{ name: "activeUsers" }] },
    });

    const rows = historicalRes.data.rows || [];

    return NextResponse.json({
      historical: { rows },
      realtime: {
        activeUsers: parseInt(
          realtimeRes.data.totals?.[0]?.metricValues?.[0]?.value || 0
        ),
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "GA fetch failed", message: err.message },
      { status: 500 }
    );
  }
}
