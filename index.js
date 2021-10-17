console.log("script working")
const URL = document.getElementById("URL-input");
const Download = document.getElementById("Download-btn");
console.log(URL)
console.log(Download)

Download.addEventListener('click',()=>{
    console.log(`URL is ${URL.value}`);
    sendURLToServer(URL.value);
})

const sendURLToServer = (URL) =>{
    window.location.href = `https://ytdwnld007.herokuapp.com/download?URL=${URL}`;
}