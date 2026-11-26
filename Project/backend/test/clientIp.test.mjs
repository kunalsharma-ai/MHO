// Which address the API believes: only proxies in MHO_TRUSTED_PROXIES may speak for the visitor.
//   node --test test/clientIp.test.mjs   (no database needed)
import test from "node:test";
import assert from "node:assert/strict";
import { clientIp, setTrustedProxies, normalizeIp, compileTrust } from "../utils/clientIp.js";

const req = (peer, headers = {}) => ({ socket: { remoteAddress: peer }, headers });

test("default: the local gateway (docker network or loopback) is trusted, the right end of X-Forwarded-For wins", () => {
    setTrustedProxies(undefined);
    assert.equal(clientIp(req("172.18.0.5", { "x-forwarded-for": "203.0.113.9" })), "203.0.113.9");
    assert.equal(clientIp(req("::ffff:172.18.0.5", { "x-forwarded-for": "6.6.6.6, 203.0.113.9" })), "203.0.113.9", "made-up front entries are ignored");
    assert.equal(clientIp(req("10.0.0.2", { "x-forwarded-for": "203.0.113.9, 172.18.0.7" })), "203.0.113.9", "second docker hop (frontend-1 nginx) is skipped");
    assert.equal(clientIp(req("127.0.0.1", { "x-real-ip": "203.0.113.4" })), "203.0.113.4", "X-Real-IP from the gateway when there is no chain");
});

test("a caller that reaches the API directly cannot pick its own address", () => {
    setTrustedProxies(undefined);
    assert.equal(clientIp(req("198.51.100.20", { "x-forwarded-for": "1.2.3.4", "x-real-ip": "5.6.7.8" })), "198.51.100.20");
});

test("a CDN in front of the gateway is only skipped when it is listed", () => {
    const viaCdn = req("172.18.0.5", { "x-forwarded-for": "203.0.113.9, 104.16.1.1" });
    setTrustedProxies("loopback,uniquelocal");
    assert.equal(clientIp(viaCdn), "104.16.1.1", "unlisted CDN: every visitor shares the CDN address (safe, but coarse)");
    setTrustedProxies("loopback,uniquelocal,104.16.0.0/13");
    assert.equal(clientIp(viaCdn), "203.0.113.9");
    setTrustedProxies(undefined);
});

test("'none' ignores the headers; garbage in the chain stops the walk", () => {
    setTrustedProxies("none");
    assert.equal(clientIp(req("127.0.0.1", { "x-forwarded-for": "203.0.113.9" })), "127.0.0.1");
    setTrustedProxies(undefined);
    assert.equal(clientIp(req("172.18.0.5", { "x-forwarded-for": "203.0.113.9, not-an-ip" })), "172.18.0.5");
    assert.equal(normalizeIp("[2001:db8::1]:443"), "2001:db8::1");
    assert.equal(normalizeIp("203.0.113.9:5555"), "203.0.113.9");
    assert.equal(compileTrust("2001:db8::/32")("2001:db8::5"), true);
});
