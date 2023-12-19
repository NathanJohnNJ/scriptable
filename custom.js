const widget = new ListWidget();
let bgSettings = await background();
bgurl = bgSettings;
widget.backgroundImage = await loadImage(bgurl);
if (!config.runsInWidget) {
  await widget.presentLarge();
}
Script.setWidget(widget);
Script.complete();

async function background() {
  const currentDate = new Date();
  let background = {
    midnight: 'https://i.imgur.com/ljhbUe6.png',
    two: 'https://i.imgur.com/64RXglG.png',
    four: 'https://i.imgur.com/7xTfWzt.png',
    six: 'https://i.imgur.com/g32ksA8.png',
    eight: 'https://i.imgur.com/BgK7M7J.png',
    ten: 'https://i.imgur.com/qeRSWcn.png',
    
    twopm: 'https://i.imgur.com/MJbXrSX.png',
    fourpm: 'https://i.imgur.com/4CmP3Bz.png',
    sixpm: 'https://i.imgur.com/Qj6CLcD.png',
    eightpm: 'https://i.imgur.com/RUibCx6.png',
    tenpm: 'https://i.imgur.com/WuFZNHH.png',
	 noon: 'https://i.imgur.com/rKPEGoP.png',
  secondOdd: 'https://i.imgur.com/pxCjsln.jpg',
  odd: 'https://i.imgur.com/o2PU4wx.jpg',
  grey: 'https://i.imgur.com/x2Rxiq0.png',
red: 'https://i.imgur.com/yuVe1ej.png',
green: 'https://i.imgur.com/YkB5nCJ.png',
orange: 'https://i.imgur.com/jAIXWum.png'
  }
  if (currentDate.getHours() == 0) { return background.grey }
	if (currentDate.getHours() == 2) { return background.secondOdd }
	if (currentDate.getHours() == 4) { return background.green }
	if (currentDate.getHours() == 6) { return background.secondOdd }
	if (currentDate.getHours() == 8) { return background.red }
	if (currentDate.getHours() == 10) { return background.secondOdd }
	if (currentDate.getHours() == 12) { return background.orange }
	if (currentDate.getHours() == 14) { return background.secondOdd }
	if (currentDate.getHours() == 16) { return background.green }
	if (currentDate.getHours() == 18) { return background.secondOdd }
	if (currentDate.getHours() == 20) { return background.grey }
	if (currentDate.getHours() == 22) { return background.secondOdd }
  return background.odd
}
let imageUrl = await bgSettings
async function loadImage(imageUrl) {
    const req = new Request(imageUrl);
    return await req.loadImage();
}