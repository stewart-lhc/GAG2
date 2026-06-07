type AnalyticsPayload = Record<string, string | number | boolean | null>;

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    eventName,
    pagePath: window.location.pathname,
    payload,
    createdAt: new Date().toISOString()
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/events/", new Blob([body], { type: "application/json" }));
    return;
  }

  fetch("/api/events/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true
  }).catch(() => undefined);
}
