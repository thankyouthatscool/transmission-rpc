import { getSessionId } from "./getSessionId";

import {
  localHTTPSecureConnectionSettings,
  localHTTPUnsecureConnectionSettings,
} from "../tests";

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
