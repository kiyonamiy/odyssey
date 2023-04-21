import init from "../common";

describe("accountB", () => {
  console.log("========> accountB 测试...");
  test("test1", async () => {
    const n = await init();
    console.log(`========> accountB-test1 测试... n = ${n}`);
  });
  test("test2", async () => {
    const n = await init();
    console.log(`========> accountB-test2 测试... n = ${n}`);
  });
});

describe("accountB0", () => {
  console.log("========> accountB0 测试...");

  test("test0", async () => {
    console.log(`========> accountB0-test0 测试...`);
  });
  test("test1", async () => {
    const n = await init();
    console.log(`========> accountB0-test1 测试... n = ${n}`);
  });
  test("test2", async () => {
    const n = await init();
    console.log(`========> accountB0-test2 测试... n = ${n}`);
  });
});
