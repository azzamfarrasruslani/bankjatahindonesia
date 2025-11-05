// src/app/api/ga-dashboard/route.js
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

    // Historical 7 hari terakhir
    const historical = await analyticsDataClient.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dimensions: [{ name: "date" }],
        metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      },
    });

    // Realtime tanpa dimensi agar total active users muncul
    const realtime = await analyticsDataClient.properties.runRealtimeReport({
      property: `properties/${propertyId}`,
      requestBody: {
        metrics: [{ name: "activeUsers" }],
      },
    });

    const activeUsers =
      realtime.data.totals?.[0]?.metricValues?.[0]?.value
        ? parseInt(realtime.data.totals[0].metricValues[0].value)
        : 0;

    return NextResponse.json({
      historical: historical.data,
      realtime: { activeUsers },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "GA fetch failed", message: err.message },
      { status: 500 }
    );
  }
}
