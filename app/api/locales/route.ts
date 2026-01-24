diff --git a/app/api/locales/route.ts b/app/api/locales/route.ts
index 1111111..2222222 100644
--- a/app/api/locales/route.ts
+++ b/app/api/locales/route.ts
@@ -1,6 +1,7 @@
 import { createServerSupabaseClient } from '@/lib/supabase'
 import { NextResponse } from 'next/server'
 
 // Fallback locales in case database fetch fails
 const FALLBACK_LOCALES = [
@@ -17,6 +18,51 @@ const FALLBACK_LOCALES = [
   { id: '15', language_name: 'Dutch', country_name: 'Netherlands', locale_code: 'nl-NL' },
 ]
 
+function formatFallback(reason: string) {
+  const formattedFallback = FALLBACK_LOCALES.map(locale => ({
+    id: locale.id,
+    value: locale.locale_code,
+    label: locale.country_name
+      ? `${locale.language_name} (${locale.country_name})`
+      : locale.language_name,
+    languageName: locale.language_name,
+    countryName: locale.country_name,
+  }))
+
+  return NextResponse.json({
+    locales: formattedFallback,
+    source: 'fallback',
+    reason,
+  })
+}
+
+function isMissingColumnError(err: any, columnName: string) {
+  const msg = String(err?.message || '').toLowerCase()
+  const code = String(err?.code || '')
+  return code === '42703' && msg.includes(`column`) && msg.includes(columnName.toLowerCase())
+}
+
 export async function GET() {
   console.log('[API/locales] Starting locale fetch...')
   console.log('[API/locales] Environment check:', {
     SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
     SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET (length: ' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length + ')' : 'NOT SET',
     SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET',
   })
 
   try {
     const supabase = createServerSupabaseClient()
     console.log('[API/locales] Supabase client created successfully')
 
-    console.log('[API/locales] Querying cethosweb_locales table...')
-    const { data: locales, error, status, statusText } = await supabase
-      .from('cethosweb_locales')
-      .select('id, language_name, country_name, locale_code')
-      .order('language_name')
+    // Attempt #1: schema with language_name
+    console.log('[API/locales] Querying cethosweb_locales table (language_name)...')
+    const q1 = await supabase
+      .from('cethosweb_locales')
+      .select('id, language_name, country_name, locale_code')
+      .order('language_name')
+
+    console.log('[API/locales] Query response (language_name):', {
+      status: q1.status,
+      statusText: q1.statusText,
+      hasData: !!q1.data,
+      dataCount: q1.data?.length || 0,
+      error: q1.error ? { message: q1.error.message, code: q1.error.code, details: q1.error.details } : null
+    })
+
+    // If language_name column doesn't exist, retry with language_code
+    if (q1.error && isMissingColumnError(q1.error, 'language_name')) {
+      console.warn('[API/locales] language_name missing; retrying with language_code...')
+
+      const q2 = await supabase
+        .from('cethosweb_locales')
+        .select('id, language_code, country_name, locale_code')
+        .order('language_code')
+
+      console.log('[API/locales] Query response (language_code):', {
+        status: q2.status,
+        statusText: q2.statusText,
+        hasData: !!q2.data,
+        dataCount: q2.data?.length || 0,
+        error: q2.error ? { message: q2.error.message, code: q2.error.code, details: q2.error.details } : null
+      })
+
+      if (q2.error) {
+        console.error('[API/locales] Supabase error (language_code):', q2.error)
+        return formatFallback(q2.error.message)
+      }
+
+      const locales2 = q2.data
+      if (!locales2 || locales2.length === 0) {
+        console.warn('[API/locales] No locales returned (language_code), using fallback')
+        return formatFallback('no_data_returned')
+      }
+
+      const formattedLocales = locales2.map((locale: any) => ({
+        id: locale.id,
+        value: locale.locale_code,
+        label: locale.country_name
+          ? `${locale.language_code} (${locale.country_name})`
+          : locale.language_code,
+        languageName: locale.language_code,
+        countryName: locale.country_name,
+      }))
+
+      return NextResponse.json({
+        locales: formattedLocales,
+        source: 'database',
+        count: formattedLocales.length,
+        schema: 'language_code',
+      })
+    }
 
-    console.log('[API/locales] Query response:', {
-      status,
-      statusText,
-      hasData: !!locales,
-      dataCount: locales?.length || 0,
-      error: error ? { message: error.message, code: error.code, details: error.details } : null
-    })
-
-    if (error) {
-      console.error('[API/locales] Supabase error:', error)
-      console.log('[API/locales] Using fallback locales due to error')
-
-      // Return fallback locales with source indicator
-      const formattedFallback = FALLBACK_LOCALES.map(locale => ({
-        id: locale.id,
-        value: locale.locale_code,
-        label: locale.country_name
-          ? `${locale.language_name} (${locale.country_name})`
-          : locale.language_name,
-        languageName: locale.language_name,
-        countryName: locale.country_name,
-      }))
-
-      return NextResponse.json({
-        locales: formattedFallback,
-        source: 'fallback',
-        reason: error.message
-      })
-    }
+    const locales = q1.data
+    const error = q1.error
+    if (error) {
+      console.error('[API/locales] Supabase error:', error)
+      console.log('[API/locales] Using fallback locales due to error')
+      return formatFallback(error.message)
+    }
 
     if (!locales || locales.length === 0) {
       console.warn('[API/locales] No locales returned from database, using fallback')
-
-      const formattedFallback = FALLBACK_LOCALES.map(locale => ({
-        id: locale.id,
-        value: locale.locale_code,
-        label: locale.country_name
-          ? `${locale.language_name} (${locale.country_name})`
-          : locale.language_name,
-        languageName: locale.language_name,
-        countryName: locale.country_name,
-      }))
-
-      return NextResponse.json({
-        locales: formattedFallback,
-        source: 'fallback',
-        reason: 'no_data_returned'
-      })
+      return formatFallback('no_data_returned')
     }
 
     console.log(`[API/locales] Successfully fetched ${locales.length} locales from database`)
     console.log('[API/locales] Sample locales:', locales.slice(0, 3))
 
     // Format locales for display
     const formattedLocales = locales.map(locale => ({
       id: locale.id,
       value: locale.locale_code,
       label: locale.country_name
         ? `${locale.language_name} (${locale.country_name})`
         : locale.language_name,
       languageName: locale.language_name,
       countryName: locale.country_name,
     }))
 
     return NextResponse.json({
       locales: formattedLocales,
       source: 'database',
-      count: formattedLocales.length
+      count: formattedLocales.length,
+      schema: 'language_name',
     })
   } catch (error) {
     console.error('[API/locales] Unexpected error:', error)
-
-    // Return fallback locales
-    const formattedFallback = FALLBACK_LOCALES.map(locale => ({
-      id: locale.id,
-      value: locale.locale_code,
-      label: locale.country_name
-        ? `${locale.language_name} (${locale.country_name})`
-        : locale.language_name,
-      languageName: locale.language_name,
-      countryName: locale.country_name,
-    }))
-
-    return NextResponse.json({
-      locales: formattedFallback,
-      source: 'fallback',
-      reason: error instanceof Error ? error.message : 'unknown_error'
-    })
+    return formatFallback(error instanceof Error ? error.message : 'unknown_error')
   }
 }
