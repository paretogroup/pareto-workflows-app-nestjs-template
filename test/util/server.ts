import { Test } from '@nestjs/testing';

export async function createTestServer(rootModule) {
  const moduleRef = await Test.createTestingModule({
    imports: [rootModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  await app.init();

  return app;
}
