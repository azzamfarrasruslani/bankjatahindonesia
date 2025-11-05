import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { google } from "googleapis";

if (!process.env.GA_CLIENT_EMAIL || !process.env.GA_PRIVATE_KEY || !process.env.GA_PROPERTY_ID) {
  console.error("ERROR: Pastikan GA_CLIENT_EMAIL, GA_PRIVATE_KEY, GA_PROPERTY_ID sudah ada di .env.local");
  process.exit(1);
}

async function testGA() {
  // cek apakah env terbaca
  if (!process.env.GA_CLIENT_EMAIL || !process.env.GA_PRIVATE_KEY || !process.env.GA_PROPERTY_ID) {
    console.error("ERROR: Pastikan GA_CLIENT_EMAIL, GA_PRIVATE_KEY, GA_PROPERTY_ID sudah ada di .env");
    return;
  }

  try {
    // Auth dengan service account
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

    // Realtime active users
    const realtime = await analyticsDataClient.properties.runRealtimeReport({
      property: `properties/${propertyId}`,
      requestBody: {
        metrics: [{ name: "activeUsers" }],
      },
    });

    const activeUsers = realtime.data.totals?.[0]?.metricValues?.[0]?.value
      ? parseInt(realtime.data.totals[0].metricValues[0].value)
      : 0;

    console.log("Historical Data (7 hari terakhir):");
    console.log(JSON.stringify(historical.data, null, 2));

    console.log("\nRealtime Active Users:");
    console.log(activeUsers);
  } catch (err) {
    console.error("GA fetch failed:", err.message);
  }
}

// jalankan
testGA();
