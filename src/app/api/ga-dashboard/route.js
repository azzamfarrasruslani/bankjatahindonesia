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

    const analyticsDataClient = google.analyticsdata({ version: "v1beta", auth });
    const propertyId = process.env.GA_PROPERTY_ID;

    // Historical 7 hari terakhir
    const historicalRes = await analyticsDataClient.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dimensions: [{ name: "date" }],
        metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      },
    });

    // Realtime active users
    const realtimeRes = await analyticsDataClient.properties.runRealtimeReport({
      property: `properties/${propertyId}`,
      requestBody: { metrics: [{ name: "activeUsers" }] },
    });

    // Optional: Simulasi data per menit dan event/pages
    const perMinute = [
      { minute: "-30", users: 2 },
      { minute: "-25", users: 1 },
      { minute: "-20", users: 1 },
      { minute: "-15", users: 2 },
      { minute: "-10", users: 2 },
      { minute: "-5", users: 1 },
      { minute: "-1", users: 1 },
    ];
    const events = [
      { name: "page_view", count: 14 },
      { name: "user_engagement", count: 7 },
      { name: "scroll", count: 5 },
      { name: "form_start", count: 2 },
    ];
    const pages = [{ title: "Bank Jatah Indonesia", views: 14 }];

    return NextResponse.json({
      historical: historicalRes.data,
      realtime: { activeUsers: parseInt(realtimeRes.data.totals?.[0]?.metricValues?.[0]?.value || 0), perMinute },
      events,
      pages,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "GA fetch failed", message: err.message }, { status: 500 });
  }
}
