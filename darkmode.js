let dark = localStorage.getItem('dark')
const theme =document.getElementById('theme')
function enableDarkmode() {
    document.body.classList.add('dark')
    localStorage.setItem('dark','active')
}
function disableDarkmode() {
    document.body.classList.remove('dark')
    localStorage.setItem('dark',null)
}
if (dark === "active"){
    enableDarkmode()
}
theme.addEventListener("click",function(){
    dark = localStorage.getItem('dark')
    dark !== "active" ? enableDarkmode() : disableDarkmode()
})