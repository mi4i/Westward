/** Главный скрипт: параллакс, анимация, мобильное меню и форма поиска. */
document.addEventListener("DOMContentLoaded",function(){
  // 1. Параллакс фонового изображения.
  const photo=document.getElementById("parallax");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame=false;
  if(photo&&!reduce) addEventListener("scroll",function(){if(!frame){requestAnimationFrame(function(){photo.style.setProperty("--p",Math.min(scrollY*.16,120)+"px");frame=false});frame=true}},{passive:true});
  // 2. Появление блоков при прокрутке.
  const items=document.querySelectorAll(".reveal");
  if("IntersectionObserver"in window&&!reduce){const obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}})},{threshold:.12});items.forEach(function(el){obs.observe(el)})}else items.forEach(function(el){el.classList.add("visible")});
  // 3. Мобильная навигация.
  const btn=document.getElementById("menuBtn"),nav=document.getElementById("nav");
  if(btn&&nav){btn.addEventListener("click",function(){const open=nav.classList.toggle("open");btn.setAttribute("aria-expanded",String(open))});nav.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){nav.classList.remove("open");btn.setAttribute("aria-expanded","false")})})}
  // 4. Демонстрационная реакция формы. Здесь можно подключить реальный каталог/API.
  const form=document.getElementById("search"),status=document.getElementById("searchStatus");
  if(form&&status)form.addEventListener("submit",function(e){e.preventDefault();if(!form.checkValidity()){form.reportValidity();return}status.textContent="Thanks — your parts request is ready to send."});
});
