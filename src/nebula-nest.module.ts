import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { NebulaGeneratorFunction, NebulaMultiClientOptions } from "@aljeerz/nebula-node";
import { NebulaNestService } from "./nebula-nest.service";

@Global()
@Module({})
export class NebulaNestModule {
  static forRoot(options: NebulaMultiClientOptions, generators?: NebulaGeneratorFunction[]): DynamicModule {
    const svcs: Provider[] = [];
    const clientNames = Object.keys(options);

    clientNames.forEach((clientName) => {
      svcs.push({
        provide: "NEBULACLIENT_" + clientName.toUpperCase(),
        useFactory: () => new NebulaNestService(options[clientName], generators),
      });
    });

    return {
      module: NebulaNestModule,
      providers: svcs,
      exports: svcs,
    };
  }
}
