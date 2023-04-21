import { VersionService } from "@hyperchain/jssdk";

export default async function (globalConfig: unknown, projectConfig: unknown) {
  console.log("global-teardown...");

  console.log((globalThis as any).providerManager.chainId);
  console.log((global as any).state.contractVoteEnable);
  console.log(
    "========> (globalThis as any).versionService instanceof VersionService",
    (globalThis as any).versionService instanceof VersionService
  );
}
