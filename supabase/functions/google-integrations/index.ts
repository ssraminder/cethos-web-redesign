import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID") || "";
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET") || "";
const GOOGLE_REFRESH_TOKEN = Deno.env.get("GOOGLE_REFRESH_TOKEN") || "";
const GADS_DEVELOPER_TOKEN = Deno.env.get("GADS_DEVELOPER_TOKEN") || "";
const GADS_API_VERSION = Deno.env.get("GADS_API_VERSION") || "v23";

const GA_PROPERTY_CETHOS = Deno.env.get("GA_PROPERTY_CETHOS") || "520428738";
const GSC_SITE_CETHOS = Deno.env.get("GSC_SITE_CETHOS") || "https://cethos.com/";
const GADS_CUSTOMER_CETHOS_SOLUTIONS = Deno.env.get("GADS_CUSTOMER_ID_1") || "6316159162";
const GADS_CUSTOMER_CETHOS_INC = Deno.env.get("GADS_CUSTOMER_ID_2") || "5680605007";
const GTM_ACCOUNT_CETHOS = Deno.env.get("GTM_ACCOUNT_CETHOS") || "6334523970";
const GTM_CONTAINER_CETHOS = Deno.env.get("GTM_CONTAINER_CETHOS") || "240921703";

const GBP_ACCOUNT_ID = Deno.env.get("GBP_ACCOUNT_ID") || "101704816258616223517";
const GBP_LOCATIONS: Record<string, string> = {
  apostille: Deno.env.get("GBP_LOCATION_APOSTILLE") || "17437340645400539830",
  oath_downtown: Deno.env.get("GBP_LOCATION_OATH_DOWNTOWN") || "12055292907279990230",
  oath_redstone: Deno.env.get("GBP_LOCATION_OATH_REDSTONE") || "1306268043800710512",
  interpretation: Deno.env.get("GBP_LOCATION_INTERPRETATION") || "6395889896577714209",
  translation: Deno.env.get("GBP_LOCATION_TRANSLATION") || "6970367773869957483",
};

const GADS_CUSTOMERS: Record<string, string> = {
  cethos_solutions: GADS_CUSTOMER_CETHOS_SOLUTIONS,
  cethos_inc: GADS_CUSTOMER_CETHOS_INC,
};

const POSTHOG_API_KEY = Deno.env.get("POSTHOG_API_KEY") || "";
const POSTHOG_PROJECT_ID = Deno.env.get("POSTHOG_PROJECT_ID") || "";
const POSTHOG_HOST = Deno.env.get("POSTHOG_HOST") || "https://us.posthog.com";

const BRIGHTLOCAL_API_KEY = Deno.env.get("BRIGHTLOCAL_API_KEY") || "";
const BRIGHTLOCAL_API_SECRET = Deno.env.get("BRIGHTLOCAL_API_SECRET") || "";
const BRIGHTLOCAL_LOCATION_IDS: number[] = (Deno.env.get("BRIGHTLOCAL_LOCATION_IDS") || "")
  .split(",").map((s) => parseInt(s.trim())).filter((n) => !isNaN(n));

const SPYFU_APP_ID = Deno.env.get("SPYFU_APP_ID") || "";
const SPYFU_SECRET = Deno.env.get("SPYFU_SECRET") || "";
const SPYFU_BASE_64_KEY = Deno.env.get("SPYFU_BASE_64_KEY") || "";
const SPYFU_DEFAULT_DOMAIN = Deno.env.get("SPYFU_DEFAULT_DOMAIN") || "cethos.com";

// Lead type → Google Ads conversion action mapping. Owned here so callers
// (cal-integrations, etc.) only pass the lead_type string. Override per-action
// values via env if you want to tune without redeploying.
//   GADS_CONVERSION_ACTION_APOSTILLE_QUOTE   default: 7586548300 (existing apostille purchase action)
//   GADS_CONVERSION_VALUE_APOSTILLE_QUOTE    default: 50 CAD
//   GADS_CONVERSION_ACTION_APOSTILLE_CONSULT must be set after creating the new action
//   GADS_CONVERSION_VALUE_APOSTILLE_CONSULT  default: 20 CAD
const LEAD_TYPE_CONVERSIONS: Record<
  string,
  { action_id: string; value_cad: number; customer_alias: string }
> = {
  apostille_quote: {
    action_id: Deno.env.get("GADS_CONVERSION_ACTION_APOSTILLE_QUOTE") || "7586548300",
    value_cad: parseFloat(Deno.env.get("GADS_CONVERSION_VALUE_APOSTILLE_QUOTE") || "50"),
    customer_alias: "cethos_solutions",
  },
  apostille_consult: {
    action_id: Deno.env.get("GADS_CONVERSION_ACTION_APOSTILLE_CONSULT") || "",
    value_cad: parseFloat(Deno.env.get("GADS_CONVERSION_VALUE_APOSTILLE_CONSULT") || "20"),
    customer_alias: "cethos_solutions",
  },
};

let _supabaseAdmin: ReturnType<typeof createClient> | null = null;
function getSupabaseAdmin() {
  if (_supabaseAdmin) return _supabaseAdmin;
  const url = Deno.env.get("SUPABASE_URL") || "";
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  _supabaseAdmin = createClient(url, key);
  return _supabaseAdmin;
}

function toUpperSnake(s: string): string {
  if (s === s.toUpperCase() && s.includes("_")) return s;
  return s.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toUpperCase();
}

let cachedToken: { access_token: string; expires_at: number } | null = null;
async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expires_at - 60000) return cachedToken.access_token;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: GOOGLE_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`Token refresh failed (${res.status}): ${await res.text()}`);
  const data = await res.json();
  cachedToken = { access_token: data.access_token, expires_at: Date.now() + (data.expires_in || 3600) * 1000 };
  return cachedToken.access_token;
}

async function googleFetch(url: string, options: RequestInit = {}): Promise<any> {
  const token = await getAccessToken();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };
  const res = await fetch(url, { ...options, headers });
  const text = await res.text();
  try {
    return { status: res.status, data: text ? JSON.parse(text) : {} };
  } catch {
    return { status: res.status, data: text };
  }
}

// --- Google Business Profile ---
async function handleGBP(action: string, params: any): Promise<any> {
  const locationId = params.location_id || GBP_LOCATIONS[params.location] || params.location;
  const accountId = params.account_id || GBP_ACCOUNT_ID;
  const acctMgmt = "https://mybusinessaccountmanagement.googleapis.com/v1";
  const bizInfo = "https://mybusinessbusinessinformation.googleapis.com/v1";
  const perf = "https://businessprofileperformance.googleapis.com/v1";
  const calls = "https://mybusinesscalls.googleapis.com/v1";
  const v4 = "https://mybusiness.googleapis.com/v4";

  switch (action) {
    case "list_accounts":
      return googleFetch(`${acctMgmt}/accounts`);
    case "list_locations":
      return googleFetch(`${bizInfo}/accounts/${accountId}/locations?readMask=name,title,storefrontAddress`);
    case "get_location": {
      const rm = params.readMask || "name,title,phoneNumbers,categories,storefrontAddress,websiteUri,regularHours,profile,openInfo,serviceArea";
      return googleFetch(`${bizInfo}/locations/${locationId}?readMask=${encodeURIComponent(rm)}`);
    }
    case "update_location":
      return googleFetch(
        `${bizInfo}/locations/${locationId}?updateMask=${encodeURIComponent(params.updateMask)}`,
        { method: "PATCH", body: JSON.stringify(params.body) },
      );
    case "get_services":
      return googleFetch(`${bizInfo}/locations/${locationId}/serviceList?readMask=serviceItems`);
    case "get_reviews": {
      const ps = params.pageSize || 50;
      const ob = params.orderBy || "updateTime desc";
      return googleFetch(
        `${v4}/accounts/${accountId}/locations/${locationId}/reviews?pageSize=${ps}&orderBy=${encodeURIComponent(ob)}`,
      );
    }
    case "reply_review":
      return googleFetch(
        `${v4}/accounts/${accountId}/locations/${locationId}/reviews/${params.review_id}/reply`,
        { method: "PUT", body: JSON.stringify({ comment: params.comment }) },
      );
    case "delete_reply":
      return googleFetch(
        `${v4}/accounts/${accountId}/locations/${locationId}/reviews/${params.review_id}/reply`,
        { method: "DELETE" },
      );
    case "get_posts":
      return googleFetch(
        `${v4}/accounts/${accountId}/locations/${locationId}/localPosts?pageSize=${params.pageSize || 10}`,
      );
    case "create_post":
      return googleFetch(`${v4}/accounts/${accountId}/locations/${locationId}/localPosts`, {
        method: "POST",
        body: JSON.stringify(params.body),
      });
    case "update_post":
      return googleFetch(
        `${v4}/accounts/${accountId}/locations/${locationId}/localPosts/${params.post_id}`,
        { method: "PATCH", body: JSON.stringify(params.body) },
      );
    case "delete_post":
      return googleFetch(
        `${v4}/accounts/${accountId}/locations/${locationId}/localPosts/${params.post_id}`,
        { method: "DELETE" },
      );
    case "get_media":
      return googleFetch(`${v4}/accounts/${accountId}/locations/${locationId}/media`);
    case "get_daily_metrics": {
      const sr = params.start_date;
      const er = params.end_date;
      const m = params.metric || "BUSINESS_IMPRESSIONS_DESKTOP_SEARCH";
      return googleFetch(
        `${perf}/locations/${locationId}:getDailyMetricsTimeSeries?dailyMetric=${m}&dailyRange.startDate.year=${sr.year}&dailyRange.startDate.month=${sr.month}&dailyRange.startDate.day=${sr.day}&dailyRange.endDate.year=${er.year}&dailyRange.endDate.month=${er.month}&dailyRange.endDate.day=${er.day}`,
      );
    }
    case "get_multi_metrics": {
      const sr = params.start_date;
      const er = params.end_date;
      const metrics = params.metrics || [
        "BUSINESS_IMPRESSIONS_DESKTOP_SEARCH",
        "BUSINESS_IMPRESSIONS_MOBILE_SEARCH",
        "WEBSITE_CLICKS",
        "CALL_CLICKS",
        "BUSINESS_DIRECTION_REQUESTS",
      ];
      const mParams = metrics.map((m: string) => `dailyMetrics=${m}`).join("&");
      return googleFetch(
        `${perf}/locations/${locationId}:fetchMultiDailyMetricsTimeSeries?${mParams}&dailyRange.startDate.year=${sr.year}&dailyRange.startDate.month=${sr.month}&dailyRange.startDate.day=${sr.day}&dailyRange.endDate.year=${er.year}&dailyRange.endDate.month=${er.month}&dailyRange.endDate.day=${er.day}`,
      );
    }
    case "get_search_keywords": {
      const sm = params.start_month;
      const em = params.end_month;
      return googleFetch(
        `${perf}/locations/${locationId}/searchkeywords/impressions/monthly?monthlyRange.startMonth.year=${sm.year}&monthlyRange.startMonth.month=${sm.month}&monthlyRange.endMonth.year=${em.year}&monthlyRange.endMonth.month=${em.month}&pageSize=${params.pageSize || 20}`,
      );
    }
    case "get_calls_settings":
      return googleFetch(`${calls}/locations/${locationId}/businesscallssettings`);
    case "update_calls_settings":
      return googleFetch(
        `${calls}/locations/${locationId}/businesscallssettings?updateMask=${encodeURIComponent(params.updateMask || "callsState")}`,
        { method: "PATCH", body: JSON.stringify(params.body) },
      );
    case "list_calls_insights": {
      let url = `${calls}/locations/${locationId}/businesscallsinsights`;
      if (params.filter) url += `?filter=${encodeURIComponent(params.filter)}`;
      else if (params.start_date && params.end_date) {
        url += `?filter=start_date>="${params.start_date}" AND end_date<="${params.end_date}"`;
      }
      return googleFetch(url);
    }
    case "get_all_calls": {
      const results: any[] = [];
      for (const [name, locId] of Object.entries(GBP_LOCATIONS)) {
        const [s, i] = await Promise.all([
          googleFetch(`${calls}/locations/${locId}/businesscallssettings`),
          googleFetch(`${calls}/locations/${locId}/businesscallsinsights`),
        ]);
        results.push({
          location: name,
          location_id: locId,
          settings: s.data,
          insights: i.data,
          settings_status: s.status,
          insights_status: i.status,
        });
      }
      return { status: 200, data: results };
    }
    case "get_all_reviews": {
      const acctRes = await googleFetch(`${acctMgmt}/accounts`);
      let acctName = `accounts/${accountId}`;
      if (acctRes.data?.accounts) {
        const found = acctRes.data.accounts.find(
          (a: any) => a.name === `accounts/${accountId}` || a.accountNumber === accountId,
        );
        if (found) acctName = found.name;
        else if (acctRes.data.accounts.length > 0) acctName = acctRes.data.accounts[0].name;
      }
      const results: any[] = [];
      for (const [name, locId] of Object.entries(GBP_LOCATIONS)) {
        const res = await googleFetch(
          `${v4}/${acctName}/locations/${locId}/reviews?pageSize=50&orderBy=${encodeURIComponent("updateTime desc")}`,
        );
        const reviews = res.data?.reviews || [];
        const unreplied = reviews.filter((r: any) => !r.reviewReply);
        results.push({
          location: name,
          location_id: locId,
          account_name: acctName,
          total_reviews: reviews.length,
          unreplied_count: unreplied.length,
          unreplied,
          raw_status: res.status,
        });
      }
      return { status: 200, data: results };
    }
    default:
      return { status: 400, data: { error: `Unknown GBP action: ${action}` } };
  }
}

// --- Google Analytics (GA4) ---
async function handleGA(action: string, params: any): Promise<any> {
  const propertyId = params.property_id || GA_PROPERTY_CETHOS;
  const baseUrl = "https://analyticsdata.googleapis.com/v1beta";
  const adminUrl = "https://analyticsadmin.googleapis.com/v1beta";
  switch (action) {
    case "run_report": {
      const body = {
        dateRanges: [{ startDate: params.start_date || "30daysAgo", endDate: params.end_date || "today" }],
        dimensions: (params.dimensions || ["sessionSource", "sessionMedium"]).map((d: string) => ({ name: d })),
        metrics: (params.metrics || ["sessions", "totalUsers", "engagementRate"]).map((m: string) => ({ name: m })),
        limit: params.limit || 25,
        orderBys: params.orderBys || [{ metric: { metricName: params.sort_by || "sessions" }, desc: true }],
      };
      return googleFetch(`${baseUrl}/properties/${propertyId}:runReport`, { method: "POST", body: JSON.stringify(body) });
    }
    case "realtime_report": {
      const body = {
        dimensions: (params.dimensions || ["country"]).map((d: string) => ({ name: d })),
        metrics: (params.metrics || ["activeUsers"]).map((m: string) => ({ name: m })),
        limit: params.limit || 25,
      };
      return googleFetch(`${baseUrl}/properties/${propertyId}:runRealtimeReport`, { method: "POST", body: JSON.stringify(body) });
    }
    case "list_properties":
      return googleFetch(`${adminUrl}/accountSummaries`);
    case "get_property":
      return googleFetch(`${adminUrl}/properties/${propertyId}`);
    case "list_data_streams":
      return googleFetch(`${adminUrl}/properties/${propertyId}/dataStreams`);
    case "send_event": {
      // GA4 Measurement Protocol — server-side event firing.
      // Required env: GA_MEASUREMENT_ID (e.g. "G-XXXXXXXXXX") and GA_API_SECRET.
      // Required params: client_id (string), events (array of {name, params}).
      const measurementId = params.measurement_id || Deno.env.get("GA_MEASUREMENT_ID") || "";
      const apiSecret = params.api_secret || Deno.env.get("GA_API_SECRET") || "";
      if (!measurementId || !apiSecret) {
        return { status: 500, data: { error: "Missing GA_MEASUREMENT_ID or GA_API_SECRET" } };
      }
      const clientId = params.client_id || crypto.randomUUID();
      const events = Array.isArray(params.events) ? params.events : [];
      if (events.length === 0) {
        return { status: 400, data: { error: "events array is required" } };
      }
      const body: any = {
        client_id: clientId,
        events,
        non_personalized_ads: false,
      };
      if (params.user_id) body.user_id = params.user_id;
      if (params.user_properties) body.user_properties = params.user_properties;
      const debug = params.debug === true;
      const url =
        `https://www.google-analytics.com/${debug ? "debug/" : ""}mp/collect` +
        `?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const text = await res.text();
      return {
        status: res.status,
        data: {
          ok: res.ok,
          measurement_id: measurementId,
          client_id: clientId,
          ...(text ? { response: text } : {}),
        },
      };
    }
    default:
      return { status: 400, data: { error: `Unknown GA action: ${action}` } };
  }
}

// --- Google Search Console ---
async function handleGSC(action: string, params: any): Promise<any> {
  const siteUrl = params.site_url || GSC_SITE_CETHOS;
  const baseUrl = "https://searchconsole.googleapis.com";
  switch (action) {
    case "search_analytics": {
      const body: any = {
        startDate: params.start_date,
        endDate: params.end_date,
        dimensions: params.dimensions || ["query"],
        rowLimit: params.row_limit || 25,
      };
      if (params.filters) body.dimensionFilterGroups = params.filters;
      return googleFetch(
        `${baseUrl}/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
        { method: "POST", body: JSON.stringify(body) },
      );
    }
    case "list_sites":
      return googleFetch(`${baseUrl}/webmasters/v3/sites`);
    case "get_site":
      return googleFetch(`${baseUrl}/webmasters/v3/sites/${encodeURIComponent(siteUrl)}`);
    case "add_site":
      return googleFetch(`${baseUrl}/webmasters/v3/sites/${encodeURIComponent(siteUrl)}`, { method: "PUT" });
    case "delete_site":
      return googleFetch(`${baseUrl}/webmasters/v3/sites/${encodeURIComponent(siteUrl)}`, { method: "DELETE" });
    case "list_sitemaps":
      return googleFetch(`${baseUrl}/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps`);
    case "submit_sitemap":
      return googleFetch(
        `${baseUrl}/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(params.sitemap_url)}`,
        { method: "PUT" },
      );
    case "delete_sitemap":
      return googleFetch(
        `${baseUrl}/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(params.sitemap_url)}`,
        { method: "DELETE" },
      );
    case "inspect_url":
      return googleFetch(`${baseUrl}/v1/urlInspection/index:inspect`, {
        method: "POST",
        body: JSON.stringify({ inspectionUrl: params.url, siteUrl }),
      });
    case "request_indexing":
      return googleFetch(`https://indexing.googleapis.com/v3/urlNotifications:publish`, {
        method: "POST",
        body: JSON.stringify({ url: params.url, type: params.type || "URL_UPDATED" }),
      });
    default:
      return { status: 400, data: { error: `Unknown GSC action: ${action}` } };
  }
}

// --- Google Ads ---
async function handleGAds(action: string, params: any): Promise<any> {
  const customerId = params.customer_id || GADS_CUSTOMERS[params.customer] || GADS_CUSTOMERS.cethos_solutions;
  const baseUrl = `https://googleads.googleapis.com/${GADS_API_VERSION}/customers/${customerId}`;
  const token = await getAccessToken();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "developer-token": GADS_DEVELOPER_TOKEN,
  };
  const loginCid = Deno.env.get("GADS_LOGIN_CUSTOMER_ID");
  if (loginCid) headers["login-customer-id"] = loginCid;

  const doFetch = async (url: string, opts: RequestInit = {}) => {
    const res = await fetch(url, { ...opts, headers });
    const text = await res.text();
    try {
      return { status: res.status, data: JSON.parse(text) };
    } catch {
      return { status: res.status, data: text };
    }
  };

  const dateFilter = (dr: any): string => {
    if (!dr) return `AND segments.date DURING LAST_30_DAYS`;
    if (typeof dr === "string") return `AND segments.date DURING ${dr}`;
    return `AND segments.date BETWEEN '${dr.start_date}' AND '${dr.end_date}'`;
  };

  switch (action) {
    case "query":
      return doFetch(`${baseUrl}/googleAds:searchStream`, {
        method: "POST",
        body: JSON.stringify({ query: params.query }),
      });
    case "list_campaigns":
      return doFetch(`${baseUrl}/googleAds:searchStream`, {
        method: "POST",
        body: JSON.stringify({
          query: `SELECT campaign.id, campaign.name, campaign.status, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions FROM campaign WHERE campaign.status != 'REMOVED' ORDER BY metrics.cost_micros DESC LIMIT ${params.limit || 20}`,
        }),
      });
    case "campaign_performance":
      return doFetch(`${baseUrl}/googleAds:searchStream`, {
        method: "POST",
        body: JSON.stringify({
          query: `SELECT campaign.id, campaign.name, campaign.status, metrics.impressions, metrics.clicks, metrics.ctr, metrics.average_cpc, metrics.cost_micros, metrics.conversions, metrics.cost_per_conversion FROM campaign WHERE campaign.status != 'REMOVED' ${dateFilter(params.date_range)} ORDER BY metrics.cost_micros DESC LIMIT ${params.limit || 20}`,
        }),
      });
    case "search_terms": {
      const cf = params.campaign_id ? `AND campaign.id = ${params.campaign_id}` : "";
      return doFetch(`${baseUrl}/googleAds:searchStream`, {
        method: "POST",
        body: JSON.stringify({
          query: `SELECT search_term_view.search_term, campaign.name, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions FROM search_term_view WHERE campaign.status != 'REMOVED' ${dateFilter(params.date_range)} ${cf} ORDER BY metrics.impressions DESC LIMIT ${params.limit || 50}`,
        }),
      });
    }
    case "keyword_performance":
      return doFetch(`${baseUrl}/googleAds:searchStream`, {
        method: "POST",
        body: JSON.stringify({
          query: `SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, campaign.name, ad_group.name, metrics.impressions, metrics.clicks, metrics.ctr, metrics.average_cpc, metrics.cost_micros, metrics.conversions FROM keyword_view WHERE campaign.status != 'REMOVED' ${dateFilter(params.date_range)} ORDER BY metrics.cost_micros DESC LIMIT ${params.limit || 50}`,
        }),
      });
    case "list_accessible_customers":
      return doFetch(
        `https://googleads.googleapis.com/${GADS_API_VERSION}/customers:listAccessibleCustomers`,
        {},
      );
    case "mutate_conversion_actions":
      return doFetch(`${baseUrl}/conversionActions:mutate`, {
        method: "POST",
        body: JSON.stringify({
          operations: params.operations,
          partialFailure: params.partial_failure ?? false,
          validateOnly: params.validate_only ?? false,
        }),
      });
    case "mutate":
      return doFetch(`${baseUrl}/${params.resource}:mutate`, {
        method: "POST",
        body: JSON.stringify({
          operations: params.operations,
          partialFailure: params.partial_failure ?? false,
          validateOnly: params.validate_only ?? false,
        }),
      });
    case "apply_recommendations":
      return doFetch(`${baseUrl}/recommendations:apply`, {
        method: "POST",
        body: JSON.stringify({ operations: params.operations, partialFailure: params.partial_failure ?? true }),
      });
    case "queue_offline_conversion": {
      // Enqueue an Offline Conversion Import row for push-ads-conversions to
      // upload on its next cron tick. Resolves customer_id + conversion_action
      // resource name + default value from this function's config based on the
      // lead_type — callers (cal-integrations, etc.) only pass the per-lead
      // payload (gclid, lead_type, customer_alias).
      const { lead_type, customer_alias, gclid, gbraid, wbraid, conversion_date_time, order_id_for_upload } = params || {};
      if (!lead_type) return { status: 400, data: { error: "lead_type required" } };
      if (!gclid && !gbraid && !wbraid) return { status: 400, data: { error: "one of gclid/gbraid/wbraid required" } };

      const conversionAction = LEAD_TYPE_CONVERSIONS[lead_type as keyof typeof LEAD_TYPE_CONVERSIONS];
      if (!conversionAction) {
        return { status: 400, data: { error: `Unknown lead_type: ${lead_type}` } };
      }
      const cid = GADS_CUSTOMERS[(customer_alias as string) || conversionAction.customer_alias] ||
        GADS_CUSTOMERS.cethos_solutions;

      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase
        .from("ads_offline_conversions")
        .insert({
          order_id: null,
          quote_id: null,
          gclid: gclid || null,
          gbraid: gbraid || null,
          wbraid: wbraid || null,
          customer_id: cid,
          conversion_action: `customers/${cid}/conversionActions/${conversionAction.action_id}`,
          conversion_date_time: conversion_date_time || new Date().toISOString(),
          conversion_value: conversionAction.value_cad,
          currency_code: "CAD",
          order_id_for_upload: order_id_for_upload || null,
        })
        .select("id")
        .single();
      if (error) return { status: 500, data: { error: error.message } };
      return { status: 200, data: { ok: true, id: data?.id, conversion_action: conversionAction, customer_id: cid } };
    }
    default:
      return { status: 400, data: { error: `Unknown GAds action: ${action}` } };
  }
}

// --- PageSpeed Insights (lab + CrUX field via PSI v5) ---
async function handlePSI(action: string, params: any): Promise<any> {
  const apiKey = Deno.env.get("GOOGLE_API_KEY") || Deno.env.get("PSI_API_KEY") || "";
  if (action !== "run") return { status: 400, data: { error: `Unknown PSI action: ${action}` } };
  const url = params.url;
  if (!url) return { status: 400, data: { error: "Missing url" } };
  const strategy = params.strategy || "mobile";
  const cats: string[] = params.categories || ["performance"];
  const qs = new URLSearchParams({ url, strategy });
  for (const c of cats) qs.append("category", c);
  if (apiKey) qs.set("key", apiKey);
  if (params.locale) qs.set("locale", params.locale);
  const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${qs}`);
  const text = await res.text();
  let parsed: any;
  try { parsed = JSON.parse(text); } catch { parsed = text; }
  if (!res.ok) return { status: res.status, data: parsed };
  const lhr = parsed.lighthouseResult || {};
  const audits = lhr.audits || {};
  const num = (k: string) => audits[k]?.numericValue ?? null;
  const auditSummary = (id: string) => {
    const a = audits[id];
    if (!a) return null;
    return { id, title: a.title, score: a.score, displayValue: a.displayValue, savings_ms: a.numericValue ?? null };
  };
  const fieldOf = (le: any) => {
    const m = le?.metrics || {};
    const get = (k: string) => m[k] ? { p75: m[k].percentile, category: m[k].category } : null;
    return {
      overall_category: le?.overall_category || null,
      lcp: get("LARGEST_CONTENTFUL_PAINT_MS"),
      inp: get("INTERACTION_TO_NEXT_PAINT"),
      cls: get("CUMULATIVE_LAYOUT_SHIFT_SCORE"),
      fcp: get("FIRST_CONTENTFUL_PAINT_MS"),
      ttfb: get("EXPERIMENTAL_TIME_TO_FIRST_BYTE"),
    };
  };
  const oppIds = ["render-blocking-resources","uses-text-compression","uses-optimized-images","modern-image-formats","unused-javascript","unused-css-rules","uses-rel-preconnect","third-party-summary","largest-contentful-paint-element","layout-shift-elements","long-tasks","non-composited-animations","unminified-javascript","unminified-css","duplicated-javascript","legacy-javascript","prioritize-lcp-image","total-byte-weight","mainthread-work-breakdown","bootup-time","dom-size","critical-request-chains","redirects","server-response-time","uses-responsive-images","efficient-animated-content","offscreen-images","preload-lcp-image"];
  const auditList = oppIds.map(auditSummary).filter((a): a is NonNullable<typeof a> => a !== null && (a.score === null || (a.score ?? 1) < 0.9));
  return { status: 200, data: {
    score: lhr.categories?.performance?.score ?? null,
    lab: {
      lcp_ms: num("largest-contentful-paint"),
      cls: num("cumulative-layout-shift"),
      tbt_ms: num("total-blocking-time"),
      inp_ms: num("interaction-to-next-paint"),
      fcp_ms: num("first-contentful-paint"),
      ttfb_ms: num("server-response-time"),
      speed_index_ms: num("speed-index"),
    },
    field_url: fieldOf(parsed.loadingExperience),
    field_origin: fieldOf(parsed.originLoadingExperience),
    flagged_audits: auditList,
    analysisUTCTimestamp: lhr.analysisUTCTimestamp || null,
  } };
}

// --- CrUX (28-day rolling field data) ---
async function handleCrUX(action: string, params: any): Promise<any> {
  const apiKey = Deno.env.get("GOOGLE_API_KEY") || Deno.env.get("CRUX_API_KEY") || "";
  if (!apiKey) return { status: 400, data: { error: "GOOGLE_API_KEY required for CrUX API" } };
  if (action !== "query" && action !== "query_history") {
    return { status: 400, data: { error: `Unknown CrUX action: ${action}` } };
  }
  const endpoint = action === "query_history" ? "queryHistoryRecord" : "queryRecord";
  const body: any = { formFactor: params.form_factor || "PHONE" };
  if (params.url) body.url = params.url;
  else if (params.origin) body.origin = params.origin;
  else return { status: 400, data: { error: "Missing url or origin" } };
  if (params.metrics) body.metrics = params.metrics;
  const res = await fetch(`https://chromeuxreport.googleapis.com/v1/records:${endpoint}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  try { return { status: res.status, data: JSON.parse(text) }; } catch { return { status: res.status, data: text }; }
}

// --- Google Tag Manager ---
async function handleGTM(action: string, params: any): Promise<any> {
  const base = "https://tagmanager.googleapis.com/tagmanager/v2";
  const accountId = params.account_id || GTM_ACCOUNT_CETHOS;
  const containerId = params.container_id || GTM_CONTAINER_CETHOS;
  const workspaceId = params.workspace_id || "Default";
  const acctPath = `accounts/${accountId}`;
  const containerPath = `${acctPath}/containers/${containerId}`;
  const wsPath = `${containerPath}/workspaces/${workspaceId}`;

  switch (action) {
    case "list_accounts":
      return googleFetch(`${base}/accounts`);
    case "list_containers":
      return googleFetch(`${base}/${acctPath}/containers`);
    case "get_container":
      return googleFetch(`${base}/${containerPath}`);
    case "list_workspaces":
      return googleFetch(`${base}/${containerPath}/workspaces`);
    case "get_workspace":
      return googleFetch(`${base}/${wsPath}`);
    case "get_status":
      return googleFetch(`${base}/${wsPath}/status`);
    case "list_tags":
      return googleFetch(`${base}/${wsPath}/tags`);
    case "get_tag":
      return googleFetch(`${base}/${wsPath}/tags/${params.tag_id}`);
    case "create_tag":
      return googleFetch(`${base}/${wsPath}/tags`, { method: "POST", body: JSON.stringify(params.body) });
    case "update_tag":
      return googleFetch(`${base}/${wsPath}/tags/${params.tag_id}`, { method: "PUT", body: JSON.stringify(params.body) });
    case "delete_tag":
      return googleFetch(`${base}/${wsPath}/tags/${params.tag_id}`, { method: "DELETE" });
    case "list_triggers":
      return googleFetch(`${base}/${wsPath}/triggers`);
    case "get_trigger":
      return googleFetch(`${base}/${wsPath}/triggers/${params.trigger_id}`);
    case "create_trigger":
      return googleFetch(`${base}/${wsPath}/triggers`, { method: "POST", body: JSON.stringify(params.body) });
    case "update_trigger":
      return googleFetch(`${base}/${wsPath}/triggers/${params.trigger_id}`, { method: "PUT", body: JSON.stringify(params.body) });
    case "delete_trigger":
      return googleFetch(`${base}/${wsPath}/triggers/${params.trigger_id}`, { method: "DELETE" });
    case "list_variables":
      return googleFetch(`${base}/${wsPath}/variables`);
    case "get_variable":
      return googleFetch(`${base}/${wsPath}/variables/${params.variable_id}`);
    case "create_variable":
      return googleFetch(`${base}/${wsPath}/variables`, { method: "POST", body: JSON.stringify(params.body) });
    case "update_variable":
      return googleFetch(`${base}/${wsPath}/variables/${params.variable_id}`, { method: "PUT", body: JSON.stringify(params.body) });
    case "delete_variable":
      return googleFetch(`${base}/${wsPath}/variables/${params.variable_id}`, { method: "DELETE" });
    case "list_builtin_variables":
      return googleFetch(`${base}/${wsPath}/built_in_variables`);
    case "enable_builtin_variable": {
      const types: string[] = Array.isArray(params.type) ? params.type : [params.type];
      const typeParams = types.map((t: string) => `type=${toUpperSnake(t)}`).join("&");
      return googleFetch(`${base}/${wsPath}/built_in_variables?${typeParams}`, { method: "POST" });
    }
    case "list_folders":
      return googleFetch(`${base}/${wsPath}/folders`);
    case "create_folder":
      return googleFetch(`${base}/${wsPath}/folders`, { method: "POST", body: JSON.stringify({ name: params.name }) });
    case "create_version":
      return googleFetch(`${base}/${wsPath}:create_version`, {
        method: "POST",
        body: JSON.stringify({ name: params.name || "Auto version", notes: params.notes || "Created via API" }),
      });
    case "publish_version":
      return googleFetch(`${base}/${containerPath}/versions/${params.version_id}:publish`, { method: "POST" });
    case "list_versions":
      return googleFetch(`${base}/${containerPath}/version_headers`);
    case "get_version":
      return googleFetch(`${base}/${containerPath}/versions/${params.version_id}`);
    case "get_live_version":
      return googleFetch(`${base}/${containerPath}/versions:live`);
    case "list_environments":
      return googleFetch(`${base}/${containerPath}/environments`);
    case "list_destinations":
      return googleFetch(`${base}/${containerPath}/destinations`);
    default:
      return { status: 400, data: { error: `Unknown GTM action: ${action}` } };
  }
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

function mask(s: string): string {
  if (!s) return "(empty)";
  if (s.length < 10) return s.substring(0, 2) + "***";
  return s.substring(0, 6) + "..." + s.substring(s.length - 4);
}

// --- PostHog ---
async function handlePostHog(action: string, params: any): Promise<any> {
  const projectId = params.project_id || POSTHOG_PROJECT_ID;
  const host = params.host || POSTHOG_HOST;
  const baseUrl = `${host}/api/projects/${projectId}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${POSTHOG_API_KEY}`,
    "Content-Type": "application/json",
  };

  const doFetch = async (url: string, opts: RequestInit = {}) => {
    const res = await fetch(url, { ...opts, headers: { ...headers, ...(opts.headers as Record<string, string> || {}) } });
    const text = await res.text();
    try { return { status: res.status, data: JSON.parse(text) }; }
    catch { return { status: res.status, data: text }; }
  };

  // Build HogQL date filter
  const dateFilter = (dr: any): string => {
    if (!dr) return "timestamp >= now() - interval 7 day";
    if (typeof dr === "string") {
      const map: Record<string, string> = {
        today: "toStartOfDay(now())",
        yesterday: "toStartOfDay(now()) - interval 1 day",
        last_7_days: "now() - interval 7 day",
        last_30_days: "now() - interval 30 day",
      };
      return `timestamp >= ${map[dr] || map["last_7_days"]}`;
    }
    if (dr.start_date && dr.end_date) return `timestamp >= '${dr.start_date}' AND timestamp <= '${dr.end_date} 23:59:59'`;
    return "timestamp >= now() - interval 7 day";
  };

  switch (action) {
    // Raw HogQL query — full flexibility
    case "query":
      return doFetch(`${baseUrl}/query`, {
        method: "POST",
        body: JSON.stringify({ query: { kind: "HogQLQuery", query: params.query } }),
      });

    // Pageviews by URL, session count, unique users
    case "pageviews":
      return doFetch(`${baseUrl}/query`, {
        method: "POST",
        body: JSON.stringify({
          query: {
            kind: "HogQLQuery",
            query: `
              SELECT
                properties.$current_url AS url,
                count() AS pageviews,
                count(DISTINCT person_id) AS unique_users
              FROM events
              WHERE event = '$pageview'
                AND ${dateFilter(params.date_range)}
              GROUP BY url
              ORDER BY pageviews DESC
              LIMIT ${params.limit || 20}
            `,
          },
        }),
      });

    // Sessions overview: sessions, unique users, avg duration
    case "sessions":
      return doFetch(`${baseUrl}/query`, {
        method: "POST",
        body: JSON.stringify({
          query: {
            kind: "HogQLQuery",
            query: `
              SELECT
                count(DISTINCT $session_id) AS sessions,
                count(DISTINCT person_id) AS unique_users,
                round(avg(session.$session_duration), 0) AS avg_duration_sec
              FROM events
              WHERE event = '$pageview'
                AND ${dateFilter(params.date_range)}
            `,
          },
        }),
      });

    // Top events by count
    case "events":
      return doFetch(`${baseUrl}/query`, {
        method: "POST",
        body: JSON.stringify({
          query: {
            kind: "HogQLQuery",
            query: `
              SELECT
                event,
                count() AS total,
                count(DISTINCT person_id) AS unique_users
              FROM events
              WHERE event NOT IN ('$pageview', '$pageleave', '$autocapture')
                AND ${dateFilter(params.date_range)}
              GROUP BY event
              ORDER BY total DESC
              LIMIT ${params.limit || 20}
            `,
          },
        }),
      });

    // Quote funnel: pageview → quote_started → quote_submitted
    case "quote_funnel":
      return doFetch(`${baseUrl}/query`, {
        method: "POST",
        body: JSON.stringify({
          query: {
            kind: "HogQLQuery",
            query: `
              SELECT
                countIf(event = '$pageview') AS site_visits,
                countIf(event = 'quote_started') AS quote_started,
                countIf(event = 'quote_submitted') AS quote_submitted,
                round(countIf(event = 'quote_started') / countIf(event = '$pageview') * 100, 1) AS start_rate_pct,
                round(countIf(event = 'quote_submitted') / nullIf(countIf(event = 'quote_started'), 0) * 100, 1) AS submit_rate_pct
              FROM events
              WHERE ${dateFilter(params.date_range)}
            `,
          },
        }),
      });

    // Daily trend for a metric (pageviews or custom event)
    case "trend":
      return doFetch(`${baseUrl}/query`, {
        method: "POST",
        body: JSON.stringify({
          query: {
            kind: "HogQLQuery",
            query: `
              SELECT
                toDate(timestamp) AS date,
                count() AS total,
                count(DISTINCT person_id) AS unique_users
              FROM events
              WHERE event = '${params.event || "$pageview"}'
                AND ${dateFilter(params.date_range)}
              GROUP BY date
              ORDER BY date ASC
            `,
          },
        }),
      });

    // Live: active users in last 5 minutes
    case "live":
      return doFetch(`${baseUrl}/query`, {
        method: "POST",
        body: JSON.stringify({
          query: {
            kind: "HogQLQuery",
            query: `
              SELECT
                properties.$current_url AS url,
                count(DISTINCT person_id) AS active_users
              FROM events
              WHERE event = '$pageview'
                AND timestamp >= now() - interval 5 minute
              GROUP BY url
              ORDER BY active_users DESC
              LIMIT 10
            `,
          },
        }),
      });

    // Recent session recordings list
    case "recordings":
      return doFetch(
        `${baseUrl}/session_recordings?limit=${params.limit || 10}${params.person_id ? `&person_uuid=${params.person_id}` : ""}`,
      );

    // Persons / identified users list
    case "persons":
      return doFetch(
        `${baseUrl}/persons?limit=${params.limit || 20}${params.search ? `&search=${encodeURIComponent(params.search)}` : ""}`,
      );

    default:
      return { status: 400, data: { error: `Unknown PostHog action: ${action}` } };
  }
}

// --- BrightLocal ---
// Auth: api-key, plus optional HMAC-SHA1 sig+expires when API_SECRET is set.
// The apiSecret was deprecated by BrightLocal; newer accounts use api-key only.
async function blAuthParams(): Promise<Record<string, string>> {
  const base: Record<string, string> = { "api-key": BRIGHTLOCAL_API_KEY };
  if (!BRIGHTLOCAL_API_SECRET) return base;
  const expires = Math.floor(Date.now() / 1000) + 1800;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(BRIGHTLOCAL_API_SECRET),
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"],
  );
  const raw = await crypto.subtle.sign("HMAC", key, enc.encode(BRIGHTLOCAL_API_KEY + expires));
  const sig = btoa(String.fromCharCode(...new Uint8Array(raw)));
  return { ...base, sig, expires: String(expires) };
}

async function handleBrightLocal(action: string, params: any): Promise<any> {
  const baseUrl = "https://tools.brightlocal.com/seo-tools/api";
  const locationIds: number[] = params.location_ids
    ? (Array.isArray(params.location_ids) ? params.location_ids : [params.location_ids])
    : BRIGHTLOCAL_LOCATION_IDS;

  // GET — auth params in query string
  const doGet = async (path: string, extra?: Record<string, any>) => {
    const auth = await blAuthParams();
    const qp = new URLSearchParams({
      ...auth,
      ...Object.fromEntries(Object.entries(extra || {}).map(([k, v]) => [k, String(v)])),
    });
    const res = await fetch(`${baseUrl}${path}?${qp}`);
    const text = await res.text();
    try { return { status: res.status, data: JSON.parse(text) }; }
    catch { return { status: res.status, data: text }; }
  };

  // POST — auth params in form body
  const doPost = async (path: string, body?: Record<string, any>) => {
    const auth = await blAuthParams();
    const form = new URLSearchParams({
      ...auth,
      ...Object.fromEntries(Object.entries(body || {}).map(([k, v]) => [k, String(v)])),
    });
    const res = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
    });
    const text = await res.text();
    try { return { status: res.status, data: JSON.parse(text) }; }
    catch { return { status: res.status, data: text }; }
  };

  switch (action) {
    // Raw debug — test any path/method manually
    case "_raw": {
      const method = (params.method || "GET").toUpperCase();
      if (method === "GET") return doGet(params.path, params.query || {});
      return doPost(params.path, params.body || {});
    }

    // GET single location details
    case "location": {
      const id = params.location_id || locationIds[0];
      return doGet(`/v2/clients-and-locations/locations/${id}`);
    }

    // GET all configured locations
    case "locations": {
      const results = await Promise.all(
        locationIds.map(async (id) => {
          const r = await doGet(`/v2/clients-and-locations/locations/${id}`);
          return { location_id: id, ...r.data };
        })
      );
      return { status: 200, data: results };
    }

    // GET all rank-checker campaigns (reports)
    case "lsrc_reports":
      return doGet("/v2/lsrc/get-all");

    // GET rank-checker results for a campaign
    case "rankings": {
      const campaignId = params.campaign_id;
      if (!campaignId) return { status: 400, data: { error: "campaign_id required" } };
      return doGet("/v2/lsrc/results/get", { "campaign-id": campaignId });
    }

    // GET all reputation-manager (review) reports
    case "reputation_reports":
      return doGet("/v4/rf/");

    // GET reviews for a specific reputation report
    case "reviews": {
      const reportId = params.report_id;
      if (!reportId) return { status: 400, data: { error: "report_id required" } };
      return doGet(`/v4/rf/${reportId}/reviews`, {
        ...(params.star_rating ? { "star-rating": params.star_rating } : {}),
        ...(params.directory ? { directory: params.directory } : {}),
      });
    }

    // GET all citation-tracker reports
    case "citation_reports":
      return doGet("/v2/ct/get-all");

    // GET citation-tracker results for a report
    case "citations": {
      const reportId = params.report_id;
      if (!reportId) return { status: 400, data: { error: "report_id required" } };
      return doGet("/v2/ct/get-results", { "report-id": reportId });
    }

    // POST create a batch (needed for async review-fetch jobs)
    case "create_batch":
      return doPost("/v4/batch", { "stop-on-job-error": "0" });

    // GET batch results
    case "batch_results": {
      const batchId = params.batch_id;
      if (!batchId) return { status: 400, data: { error: "batch_id required" } };
      return doGet("/v4/batch", { "batch-id": batchId });
    }

    default:
      return { status: 400, data: { error: `Unknown BrightLocal action: ${action}` } };
  }
}

// --- SpyFu ---
// Auth: HTTP Basic with base64(APP_ID:SECRET). Prefer pre-computed SPYFU_BASE_64_KEY
// when set; otherwise encode APP_ID:SECRET on the fly.
function spyfuAuthHeader(): string {
  const token = SPYFU_BASE_64_KEY || btoa(`${SPYFU_APP_ID}:${SPYFU_SECRET}`);
  return `Basic ${token}`;
}

async function handleSpyFu(action: string, params: any): Promise<any> {
  const baseUrl = "https://api.spyfu.com/apis";
  const domain = params.domain || SPYFU_DEFAULT_DOMAIN;
  const countryCode = params.country_code || params.countryCode || "US";
  const pageSize = params.page_size || params.pageSize;

  const doGet = async (path: string, query: Record<string, any> = {}) => {
    const filtered = Object.fromEntries(
      Object.entries(query)
        .filter(([, v]) => v !== undefined && v !== null && v !== "")
        .map(([k, v]) => [k, String(v)]),
    );
    const qs = new URLSearchParams(filtered);
    const url = `${baseUrl}${path}${qs.toString() ? `?${qs}` : ""}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: spyfuAuthHeader(), Accept: "application/json" },
    });
    const text = await res.text();
    try { return { status: res.status, data: JSON.parse(text) }; }
    catch { return { status: res.status, data: text }; }
  };

  switch (action) {
    // Raw debug — call any path with arbitrary query params
    case "_raw":
      return doGet(params.path, params.query || {});

    // === Domain Stats ===
    // Latest snapshot of organic + paid stats for a domain
    case "domain_stats":
    case "latest_domain_stats":
      return doGet("/domain_stats_api/v2/getLatestDomainStats", { domain, countryCode });

    // Full historical time-series
    case "all_domain_stats":
      return doGet("/domain_stats_api/v2/getAllDomainStats", { domain, countryCode });

    // === SEO Keywords ===
    // SpyFu's SERP keyword endpoints use `query` (domain | URL | subdomain | path),
    // not `domain` — pass either via params.query or fall back to the domain.
    // Highest-value organic keywords the domain ranks for
    case "most_valuable_keywords":
    case "top_seo_keywords":
      return doGet("/serp_api/v2/seo/getMostValuableKeywords", { query: params.query || domain, countryCode, pageSize });

    // Keywords the domain just started ranking for
    case "newly_ranked_keywords":
      return doGet("/serp_api/v2/seo/getNewlyRanked", { query: params.query || domain, countryCode, pageSize });

    // Keywords that just hit page 1
    case "just_made_first_page":
      return doGet("/serp_api/v2/seo/getJustMadeFirstPage", { query: params.query || domain, countryCode, pageSize });

    // Keywords lost from rankings
    case "lost_rankings":
      return doGet("/serp_api/v2/seo/getLostRankings", { query: params.query || domain, countryCode, pageSize });

    // Top SERP competitors for a specific keyword
    case "serp_analysis":
      if (!params.keyword) return { status: 400, data: { error: "keyword required" } };
      return doGet("/serp_api/v2/seo/getSerpAnalysisKeywords", {
        keyword: params.keyword,
        countryCode,
        pageSize,
      });

    // === PPC Keywords ===
    case "top_ppc_keywords":
    case "most_successful_ppc":
      return doGet("/serp_api/v2/ppc/getMostSuccessful", { query: params.query || domain, countryCode, pageSize });

    case "newly_purchased_ppc":
      return doGet("/serp_api/v2/ppc/getNewlyPurchased", { query: params.query || domain, countryCode, pageSize });

    // === Competitors ===
    case "top_seo_competitors":
      return doGet("/competitors_api/v2/seo/getTopCompetitors", { domain, countryCode, pageSize });

    case "top_ppc_competitors":
      return doGet("/competitors_api/v2/ppc/getTopCompetitors", { domain, countryCode, pageSize });

    // === Keyword Research ===
    case "related_keywords":
      if (!params.keyword) return { status: 400, data: { error: "keyword required" } };
      return doGet("/keyword_api/v2/related/getRelatedKeywords", {
        keyword: params.keyword,
        countryCode,
        pageSize,
      });

    case "keyword_overview":
      if (!params.keyword) return { status: 400, data: { error: "keyword required" } };
      return doGet("/keyword_api/v2/related/getKeywordOverview", {
        keyword: params.keyword,
        countryCode,
      });

    default:
      return { status: 400, data: { error: `Unknown SpyFu action: ${action}` } };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({
          status: "ok",
          version: 2,
          project: "cethos-main-web",
          platforms: ["gbp", "ga", "gsc", "gads", "gtm", "psi", "crux", "posthog", "brightlocal", "spyfu", "diag"],
          ads_version: GADS_API_VERSION,
          ga_property: GA_PROPERTY_CETHOS,
          gsc_site: GSC_SITE_CETHOS,
          gbp: { account: GBP_ACCOUNT_ID, locations: GBP_LOCATIONS },
          gtm: { account: GTM_ACCOUNT_CETHOS, container: GTM_CONTAINER_CETHOS },
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const body = await req.json();
    const { platform, action, params = {} } = body;

    if (platform === "diag") {
      try {
        const t = await getAccessToken();
        return new Response(
          JSON.stringify({
            success: true,
            token_preview: mask(t),
            ads_version: GADS_API_VERSION,
            ga_property: GA_PROPERTY_CETHOS,
            gsc_site: GSC_SITE_CETHOS,
            gads_customers: { cethos_solutions: GADS_CUSTOMER_CETHOS_SOLUTIONS, cethos_inc: GADS_CUSTOMER_CETHOS_INC },
            gbp: { account: GBP_ACCOUNT_ID, locations: GBP_LOCATIONS },
            gtm: { account: GTM_ACCOUNT_CETHOS, container: GTM_CONTAINER_CETHOS },
            dev_token_set: !!GADS_DEVELOPER_TOKEN,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ success: false, error: (err as Error).message }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    if (!platform || !action) {
      return new Response(JSON.stringify({ error: "Missing platform/action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let result;
    switch (platform) {
      case "gbp":
        result = await handleGBP(action, params);
        break;
      case "ga":
        result = await handleGA(action, params);
        break;
      case "gsc":
        result = await handleGSC(action, params);
        break;
      case "gads":
        result = await handleGAds(action, params);
        break;
      case "gtm":
        result = await handleGTM(action, params);
        break;
      case "psi":
        result = await handlePSI(action, params);
        break;
      case "crux":
        result = await handleCrUX(action, params);
        break;
      case "posthog":
        result = await handlePostHog(action, params);
        break;
      case "brightlocal":
        result = await handleBrightLocal(action, params);
        break;
      case "spyfu":
        result = await handleSpyFu(action, params);
        break;
      default:
        result = { status: 400, data: { error: `Unknown platform: ${platform}` } };
    }

    const emptyBody = result.status === 204 || result.status === 205 || result.status === 304;
    return new Response(emptyBody ? null : JSON.stringify(result.data), {
      status: result.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
