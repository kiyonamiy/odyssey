import {
  HttpProvider,
  ProviderManager,
  Transaction,
  ServiceManager,
  BvmOperation,
  logger,
  DecodeUtil,
} from "@hyperchain/jssdk";

export default async function (globalConfig: unknown, projectConfig: unknown) {
  logger.level = "error";

  const genesisAccountJsons = [
    `{"address":"16318e532609d4b2e5345ff1cb0a9f0d5f5a5b52","publicKey":"048febfa1048c1d1bb33decf67a89efb2b90309e2e51e0f644f24bd9a6edc939854c7cbb3e3227659b085b3865f72db46a1991e92022043c0f33a18826793b4a19","privateKey":"8a1f2d6ecdab6be41e2ac8526836ddf8df311de2a4078cb7dd94c9cb968ab0b7","version":"4.0","algo":"0x13"}`,
    `{"address":"f5efc05b8a3b9fb13773c2d07b901ac4ff1cedb9","publicKey":"04cc7d42ef34586f9f1b8e85809dc0794e19a4ed3006342758bc215444c41d07a6ab839bdd14404008475da0f12b36a1c0631b371261f5007d17e1c5980680b6ad","privateKey":"b068e48beb1c21f690ddb29284ab5337863daa1c8bc78864574ed18442594c4f","version":"4.0","algo":"0x13"}`,
    `{"address":"c065e7fa0df7ffab76c3278d7b4b3835221cc8ea","publicKey":"04aa70f3459ac490bfae6ffe1553dee51d4ff5b754526ffd29f1dea3eb159b74307afe7e7637002d859b1e76c3fab484975caef34e492e276c7e32ff5eb9f8eec8","privateKey":"35cd4f77ccc388123c5a5c508d9b35432e33fe65aede21c8d264d363f047fc7c","version":"4.0","algo":"0x13"}`,
    `{"address":"b7f4b7350e5961a08e2280394862221bd9e87fb7","publicKey":"048be7a49b6487a1ead27a49cc0e5bbd19a368cc435c9870b6bbb21808330aa8def81322e6c2128db467c73c6f844ee87c91f38d3ac5511d51f675dd213e0ad6bf","privateKey":"ccfe617dcc6a604f9fe74dcefa07c4ec67a336911a44269d23e15a96f0cda7bf","version":"4.0","algo":"0x13"}`,
    `{"address":"3d8fc6d55a480c3f498b1bb6b546be832a986791","publicKey":"04eea9760919a0e107ad39171709a9c2ffe959bd5be310ce6c9998c1aa2ff772c4b309392618804a77eaa62fe197249968559c75cbc32dadabfc6c52b18aada6bc","privateKey":"8eb389539b973c16d1d6d8cd0a3b9eebbf3b1d7b307a903f125cbd59bfec50bb","version":"4.0","algo":"0x13"}`,
    `{"address":"2b01af8a84651455ede2208d94fbe64c4c7d4493","publicKey":"041ce095267e79624d9c5d8cffbdff1df662a2d467b404d63b3d0f93b0941441eab29a7a97509ca812279986e2e57230a669649e6864cf7b83d2c5739e44edeb3e","privateKey":"55b40d6b42beffc6431a43478aed96b7cc1bb2c161c5b29d9b22494efbfe7fa8","version":"4.0","algo":"0x13"}`,
  ];

  const httpProviders = [
    "localhost:8081",
    "localhost:8082",
    "localhost:8083",
    "localhost:8084",
  ].map((addr, i) => new HttpProvider(i, addr));

  // await setChainId(chainId, httpProviders, genesisAccountJsons[0]);

  const providerManager = await ProviderManager.createManager({
    httpProviders,
  });

  // Set reference to mongod in order to close the server during teardown.
  (globalThis as any).genesisAccountJsons = genesisAccountJsons;
  (globalThis as any).providerManager = providerManager;
  (globalThis as any).didService = ServiceManager.getDidService(providerManager);
  (globalThis as any).accountService = ServiceManager.getAccountService(providerManager);
  (globalThis as any).contractService = ServiceManager.getContractService(providerManager);
  (globalThis as any).txService = ServiceManager.getTxService(providerManager);
  (globalThis as any).sqlService = ServiceManager.getSqlService(providerManager);
  (globalThis as any).nodeService = ServiceManager.getNodeService(providerManager);
  (globalThis as any).blockService = ServiceManager.getBlockService(providerManager);
  (globalThis as any).versionService = ServiceManager.getVersionService(providerManager);
  (globalThis as any).state = {
    contractVoteEnable: false,
  };
}

// 链上注册 chainId
// async function setChainId(chainId: string, httpProviders: HttpProvider[], genesisJsonStr: string) {
//   const providerManager = await ProviderManager.createManager({
//     httpProviders: httpProviders,
//   });

//   const contractService = ServiceManager.getContractService(providerManager);
//   const accountService = ServiceManager.getAccountService(providerManager);

//   const genesisAccount = accountService.fromAccountJson(genesisJsonStr);

//   const transaction = new Transaction.BVMBuilder(genesisAccount.getAddress(), providerManager)
//     .invoke(new BvmOperation.DID.Builder().setChainID(chainId).build())
//     .build();
//   transaction.sign(genesisAccount);

//   const response = await (await contractService.invoke(transaction).send()).poll();
//   logger.debug(JSON.stringify(DecodeUtil.decodeBvmResultRet(response.result.ret)));
// }
