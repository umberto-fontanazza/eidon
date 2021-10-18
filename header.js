window.addEventListener('scroll',function(){
    let breakpoint = document.querySelector("header").style.marginTop;
    let className = "sticky";
    if (window.scrollY > breakpoint)
        document.querySelector("header").classList.add(className);
    else
        document.querySelector("header").classList.remove(className);
});