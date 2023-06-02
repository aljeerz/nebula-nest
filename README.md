[![CI](https://github.com/aljeerz/nebula-nest/actions/workflows/main.yml/badge.svg)](https://github.com/aljeerz/nebula-nest/actions/workflows/main.yml) [![Publish](https://github.com/aljeerz/nebula-nest/actions/workflows/publish.yml/badge.svg)](https://github.com/aljeerz/nebula-nest/actions/workflows/publish.yml)
# `@aljeerz/nebula-nest`

This Repository Provides A NestJS Module for [nebula-node](https://github.com/aljeerz/nebula-node) a utility wrapper for [nebula-node](https://github.com/nebula-contrib/nebula-node).

Check both repositories for in depth details on the underlaying code.

## Install

```
npm install @aljeerz/nebula-nest @aljeerz/nebula-node @nebula-contrib/nebula-nodejs
```

## Usage

app.module.ts
```typescript
...
import { NebulaNestModule } from '@aljeerz/nebula-nest';

@Module({
  imports: [
    NebulaNestModule.forRoot({
    // Key used for DI Token
      MAIN: {
        servers: ['127.0.0.1:9669'],
        userName: 'aljeerz',
        password: 'supersecure',
        space: 'mainspace',
        ...optionalConfig
      }
    },myGeneratorsHere // @aljeerz/nebula-node for more details
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

app.service.ts for example
```typescript
...
import { NebulaNestService } from '@aljeerz/nebula-nest';

@Injectable()
export class AppService {
  constructor(
    // DI Token: NEBULACLIENT_{clientName}
    @Inject('NEBULACLIENT_MAIN') private nebula: NebulaNestService,
  ) {}
  
  async nebulaTest() {
    // @aljeerz/nebula-node for more details about generators and funcitonality
    const query = `YIELD "$unsafeString" as safeString, aljeerz::id() as generatedId`;
    const params = {
      unsafeString: `" AND 1=1 xD'`,
    };
    const res = await this.nebula.execute(query, params);

    return {
      res,
    };
    // @aljeerz/nebula-node for more details
  }
}

```