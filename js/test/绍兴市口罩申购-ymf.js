const applicant = ["叶佳", "330621199110151208", "15968540573", "B33629158"];
const inputLabel = [
  "vdab36ce1950beee28f2417d9659d9a80",
  "v475c7ffd6e5a6b9e1dd6459690b371d9",
  "v707c9b8f8b9b4f967c188613d3939d81",
  "v6f77852a5cb025c44556bcb7f0b332e5"
];

// 自动填写
document.getElementsByClassName("lbl blue store_ydmc")[33].click();
for (let i = 0; i < 4; i++) {
  document.getElementsByName(inputLabel[i])[0].value = applicant[i];
}

let interval = setInterval(() => {
  const now = new Date();
  console.log(now.getSeconds());
  if (
    now.getHours() >= 15 &&
    now.getMinutes() >= 0 &&
    now.getSeconds() >= 0 &&
    now.getMilliseconds() >= 0
  ) {
    document.getElementsByClassName("btn-success")[0].click();
    clearInterval(interval);
  }
}, 5);

// v054daabf15b550637d6f9f50316bc813 // 请输入申购人姓名
// vad47440203aba226d5ed7abb5f14b5ae // 请输入申购人身份证号
// v8930659328302e6934e3ea60ec75476f // 请输入申购人联系电话
// v2cc92a83f1d6116781e1256d6bb4fda4 // 请输入申购人医保卡号
