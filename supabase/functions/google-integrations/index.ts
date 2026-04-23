import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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
    default:
      return { status: 400, data: { error: `Unknown GAds action: ${action}` } };
  }
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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({
          status: "ok",
          version: 2,
          project: "cethos-main-web",
          platforms: ["gbp", "ga", "gsc", "gads", "gtm", "diag"],
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
