import { sm2 } from "sm-crypto";
import init from "../common";

describe("accountA", () => {
  console.log("========> accountA 测试...");
  test("test1", async () => {
    const n = await init();
    console.log(`========> accountA-test1 测试... n = ${n}`);
    // lite sdk 生成的 public private key
    // const address = "6275b09dbb9d49252150e52647101665f8f60ca4";
    const liteSdkKeypair = {
      publicKey:
        "045906bf3063dced2488e04cda8227321428b8ef22a07dbe026ed77cbd100594a2fcddd4fda5a98597dd61eb69fbd08ced97a4ef80159c900a5fb845478327aacf",
      privateKey: "2806197d247c5208c49528b46fdfa31c7e1457109f4e984f89e01bb6ed18dc4f",
    };

    const message = "hello world~~~";

    const signature1 = sm2.doSignature(message, liteSdkKeypair.privateKey);
    const signature2 = sm2.doSignature(message, liteSdkKeypair.privateKey);
    const signature3 = sm2.doSignature(message, liteSdkKeypair.privateKey);
    expect(
      signature1 === signature2 || signature1 === signature3 || signature2 === signature3
    ).toBe(false);

    const verifyResult1 = sm2.doVerifySignature(message, signature1, liteSdkKeypair.publicKey);
    const verifyResult2 = sm2.doVerifySignature(message, signature2, liteSdkKeypair.publicKey);
    const verifyResult3 = sm2.doVerifySignature(message, signature3, liteSdkKeypair.publicKey);
    expect(verifyResult1).toBe(true);
    expect(verifyResult2).toBe(true);
    expect(verifyResult3).toBe(true);
  });
  test("test2", async () => {
    const n = await init();
    console.log(`========> accountA-test2 测试... n = ${n}`);
  });
});

describe("accountA0", () => {
  console.log("========> accountA0 测试...");
  console.log((global as any).chainId);
  // 最后还是在 global-teardown 打印出 providerManager，说明修改无效（和文档保持一致）
  (global as any).providerManager = "accountA0-providerManager";
  // 生效
  (global as any).state.contractVoteEnable = true;
});
