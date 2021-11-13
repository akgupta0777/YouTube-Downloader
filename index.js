const URLInput = document.getElementById("URL-input");
const Download = document.querySelector("button");
// const videoDiv = document.getElementById('videos')
const Host = `https://ytytd.herokuapp.com`
const formatInfo = {
    'mp4':'video',
    '3gp':'video',
    'avi':'video',
    'flv':'video',
    'webm':'video',
    'mp3':'audio',
    'ogg':'audio',
    'aac':'audio',
    'm4a':'audio'
}
const wakeup = fetch(Host)
                .then((res) => res.text())
                .then((data) => data);

const loadVideo = async () => {
    document.querySelector('div#videos').style.display = 'none'
    document.querySelector('div.animation').style.display = 'block';
    const url = URLInput.value;
    const videoInfo = await fetch(`${Host}/getVideo?url=${url}`)
                    .then((res) => res.json());
    const {thumbnail,title,channel,length} = videoInfo[0];
    document.querySelector('img#thumbnail').src = thumbnail;
    document.querySelector('p#title').innerText = title;
    document.querySelector('p#channel').innerText = channel;
    document.querySelector('p#duration').innerText = `Duration: ${length}`;
    const [videoTable,audioTable] = document.querySelectorAll('table');
    let videoHTML = `
    <tbody>
    <tr>
      <th>Resolution</th>
      <th>Size</th>
      <th>Download</th>
    </tr>`;
    let audioHTML = `
    <tbody>
    <tr>
      <th>Resolution</th>
      <th>Size</th>
      <th>Download</th>
    </tr>`;
    const videos = videoInfo[1];
    videos.forEach(media => {
        let {value,format,size} = media;
        const link = `${Host}/download?url=${url}&v=${value}&f=${format}`;
        if(!!formatInfo[media.format]){
        let HTML = `
        <tr>
            <td class="align-middle py-4">
                <span class="d-block"> ${value} ${format}</span>
            </td>
            <td class="align-middle">
                <span class="d-block"> ${size} </span>
            </td>
            <td class="align-middle">
                <a
                class="btn btn-primary btn-sm mb-0"
                href=${link}
                title="Download"
                >
                Download
                </a>
            </td>
        </tr>`
        if(formatInfo[media.format] == 'video'){
            videoHTML+= HTML;
        }else{
            audioHTML+= HTML;
        }
    }else return ;
    });
    videoHTML+='</tbody>';
    audioHTML+='</tbody>';
    videoTable.innerHTML = videoHTML;
    audioTable.innerHTML = audioHTML;
    document.querySelector('div.animation').style.display = 'none';
    document.querySelector('div#videos').style.display = 'block'
}

Download.addEventListener('click',loadVideo);
URLInput.addEventListener('keyup',(event) => {
    if(event.keyCode === 13){
        event.preventDefault();
        loadVideo();
    }
});