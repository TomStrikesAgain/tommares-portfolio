const urls = [
  "VrTrPhwDLF4", "_TiAqILfnnY", "a_UbLqPFSfI", "dNkey5ZnJFU",
  "jWetGNIH4_M", "717062892", "7ndTpuihViw", "H67F8PTbFG0",
  "LLJTQz26UHo", "PP_sy2iCunU", "WWhk9-676B4", "al2-Z6In15g",
  "gfA6n3WsJRM", "jLSga0jrztI", "kvfm2SDB5kY", "vWUibV-K26Q"
];

async function fetchTitles() {
  for (let id of urls) {
    try {
      let url = id === "717062892" 
        ? `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`
        : `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${id}&format=json`;
      
      const response = await fetch(url);
      const data = await response.json();
      console.log(`${id} => ${data.title}`);
    } catch (e) {
      console.log(`${id} => Error`);
    }
  }
}
fetchTitles();
