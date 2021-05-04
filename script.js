const parallax = document.querySelector(".parallax");
const content = document.querySelector(".parallax__container");
const clouds = document.querySelector(".images-parallax__clouds");
const mountains = document.querySelector(".images-parallax__mountains");
const human = document.querySelector(".images-parallax__human");

const forClouds = 40;
const forMountains = 20;
const forHuman = 10;
const speed = 0.05;

window.addEventListener("DOMContentLoaded", () => {
  let posX = 0;
  let posY = 0;
  let coordXprct = 0;
  let coordYprct = 0;

  // рекурсивное обновление координат
  const setMouseParallaxStyle = () => {
    posX = posX + (coordXprct - posX) * speed;
    posY = posY + (coordYprct - posY) * speed;

    clouds.style.cssText = `transform: translate(${posX / forClouds}%, ${posY / forClouds}%);`;
    mountains.style.cssText = `transform: translate(${posX / forMountains}%, ${posY / forMountains}%);`;
    human.style.cssText = `transform: translate(${posX / forHuman}%, ${posY / forHuman}%);`;
    requestAnimationFrame(setMouseParallaxStyle);
  };

  setMouseParallaxStyle();

  // изменение позиции при движении курсора
  parallax.addEventListener("mousemove", event => {
    const parallaxWidth = parallax.offsetWidth;
    const parallaxHeight = parallax.offsetHeight;

    coordXprct = ((event.pageX - parallaxWidth / 2) / parallaxWidth) * 100;
    coordYprct = ((event.pageY - parallaxHeight / 2) / parallaxHeight) * 100;
  });

  // скролл
  let thresholdSets = [];
  for (let i = 0; i <= 1.0; i += 0.005) {
    thresholdSets.push(i);
  }

  const observer = new IntersectionObserver(() => {
    const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;

    content.style.cssText = `transform: translate(0%, -${scrollTopProcent / 15}%);`;
    mountains.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 6}%);`;
    human.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 12}%);`;
  }, { thresholdSets });

  observer.observe(parallax);
});
