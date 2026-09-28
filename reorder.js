const fs = require('fs');

const file = 'src/app/video-production/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const newVideos = [
  '"https://www.youtube.com/embed/al2-Z6In15g"', // 1. Nusura
  '"https://www.youtube.com/embed/kvfm2SDB5kY"', // 2. Juntos
  '"https://www.youtube.com/embed/WWhk9-676B4"', // 3. Taduist (tomList)
  '"https://www.youtube.com/embed/gfA6n3WsJRM"', // 4. Zcash
  '"https://www.youtube.com/embed/vWUibV-K26Q"', // 5. Building Resilience (J.O.T Method?)
  '"https://www.youtube.com/embed/_TiAqILfnnY"', // 6. The Abbey Collection
  '"https://www.youtube.com/embed/H67F8PTbFG0"', // 7. Crispy Crunchy Chicken
  '"https://www.youtube.com/embed/7ndTpuihViw"', // 8. Playfonceon de Parte (Prévention des Pertes)
  '"https://player.vimeo.com/video/717062892"',  // 9. VCA
  // The rest
  '"https://www.youtube.com/embed/PP_sy2iCunU"', // Photoroom
  '"https://www.youtube.com/embed/VrTrPhwDLF4"', // Hamburger
  '"https://www.youtube.com/embed/a_UbLqPFSfI"', // Nickel
  '"https://www.youtube.com/embed/dNkey5ZnJFU"', // Family Rides
  '"https://www.youtube.com/embed/jWetGNIH4_M"', // House In Order
  '"https://www.youtube.com/embed/LLJTQz26UHo"', // Porsches
  '"https://www.youtube.com/embed/jLSga0jrztI"'  // Eastwood
];

const videosString = 'const HIGHLIGHT_VIDEOS = [\n  ' + newVideos.join(',\n  ') + '\n];';

content = content.replace(/const HIGHLIGHT_VIDEOS = \[[\s\S]*?\];/, videosString);

fs.writeFileSync(file, content);
