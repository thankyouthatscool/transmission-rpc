import { getSessionId } from "./getSessionId";

const localHTTPUnsecureConnectionSettings = {
  address: "http://192.168.0.40",
  port: 9091,
};

const localHTTPSecureConnectionSettings = {
  address: "http://192.168.0.40",
  port: 9091,
  username: "admin",
  password: "password",
};

// One or other other will always fail, unless I run all of the containers all of the time.
describe("getSessionId", () => {
  it("HTTP UNSECURED", async () => {
    const sessionId = await getSessionId(localHTTPUnsecureConnectionSettings);

    expect(typeof sessionId).toBe("string");
  }, 10000);

  it("HTTP SECURED", async () => {
    const sessionId = await getSessionId(localHTTPSecureConnectionSettings);

    expect(typeof sessionId).toBe("string");
  }, 10000);
});
