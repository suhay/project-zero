import { Models } from "appwrite";

import { functions } from "./appwrite";

export function executeFunction(
  functionId: string,
  body?: Record<string, unknown> | undefined,
  async?: boolean | undefined,
  xpath?: string | undefined,
  method?: string | undefined,
  headers?: object | undefined,
): Promise<Models.Execution> {
  return functions.createExecution(
    functionId,
    JSON.stringify(body),
    async,
    xpath,
    method,
    headers,
  );
}
