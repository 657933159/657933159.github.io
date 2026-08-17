/* MOXDESIGN 作品集 · 3D 环形画廊辅助脚本
 * 环形旋转由 CSS 动画（ringSpin，22s/圈）驱动；
 * 本脚本负责：跟踪"正前方"（面向观众、最大那张）的作品、显示其名称、点击进入作品页。 */
(() => {
  const caption = document.querySelector(".portfolio-ring-caption");
  const cards = [...document.querySelectorAll(".orbit-card")];
  if (!caption || cards.length < 2) return;

  const DURATION = 22;            // 转一圈秒数，与 CSS ringSpin 一致
  const STEP_ANGLE = 360 / cards.length;   // 每张卡片在环上的角度间隔

  const works = [
    { name: "淘气堡蹦蹦床紫色", route: "/duotrampoline/" },
    { name: "淘气堡双人自行车", route: "/duobike/" },
    { name: "王者枪神",         route: "/gunhero/" },
    { name: "雪舞熊欢",         route: "/snowbear/" },
    { name: "迷你LED悬空剧场",  route: "/ledtheater/" },
    { name: "百慕大冒险",       route: "/bermuda/" },
    { name: "淘气堡滑雪",       route: "/duoski/" },
    { name: "淘气堡三人自行车", route: "/tricycle/" },
    { name: "美食点点乐",       route: "/foodmatch/" },
    { name: "电玩帮帮龙",       route: "/bobbi/" },
    { name: "电玩蹦蹦熊",       route: "/hopbear/" },
    { name: "潮玩飞船",         route: "/spaceship/" },
    { name: "小狮王",           route: "/lionking/" }
  ];

  // 环在时刻 t 的旋转角；正前方卡片：i × STEP + spin ≈ 0 (mod 360)
  function frontIndex(t) {
    const spin = ((t % DURATION) / DURATION) * 360;
    const i = Math.round(-spin / STEP_ANGLE);
    return ((i % works.length) + works.length) % works.length;
  }

  function update() {
    const t = performance.now() / 1000;
    const i = frontIndex(t);
    caption.textContent = works[i].name;
    caption.dataset.route = works[i].route;
  }

  caption.addEventListener("click", () => {
    const route = caption.dataset.route;
    if (route) window.location.href = route;
  });

  update();
  setInterval(update, 120);
})();
