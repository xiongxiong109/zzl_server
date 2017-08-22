let { m4aUrl, songname } = window.songlist[0];
console.log(m4aUrl);
document.body.onclick = () => {
	location.href = m4aUrl;
}