// Maps the Make token response to RetellWebClient.startCall() options.
// Today Make calls /v2/create-web-call, which returns only access_token (and call_id).
// After Make switches to /v3/create-web-call the response also carries transport and
// ice_servers, which v3 calls need. Pass whatever is present; leave the rest out so the
// SDK falls back to its defaults for v2 tokens.
export function startCallOptions(data) {
  if (!data || typeof data.access_token !== "string" || !data.access_token) {
    throw new Error("no access token returned");
  }
  const options = { accessToken: data.access_token };
  if (typeof data.call_id === "string" && data.call_id) options.callId = data.call_id;
  if (typeof data.transport === "string" && data.transport) options.transport = data.transport;
  if (Array.isArray(data.ice_servers) && data.ice_servers.length) options.iceServers = data.ice_servers;
  return options;
}
