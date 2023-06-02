import { ClientOption } from "@nebula-contrib/nebula-nodejs/nebula/types";
import { NebulaGeneratorFunction, NebulaGraphClient } from "@aljeerz/nebula-node";

export class NebulaNestService {
  private ngc_client?: NebulaGraphClient;
  constructor(oprions: ClientOption, generators?: NebulaGeneratorFunction[]) {
    this.ngc_client = new NebulaGraphClient(oprions, generators);
  }

  execute(query: string, params: any) {
    return this.ngc_client?.execute(query, params);
  }

  client() {
    return this.ngc_client;
  }
}
