//  adaptive text
module.exports.whiteBlackText = (stack, text, size) => {
    let textHandle = stack.addText(text);
    textHandle.font = Font.heavyMonospacedSystemFont(size);
    textHandle.textColor = Color.dynamic(Color.white(),Color.black());
    textHandle.centerAlignText();
    return textHandle;
}

module.exports.blackWhiteText = (stack, text, size) => {
    let textHandle = stack.addText(text);
    textHandle.font = Font.heavyMonospacedSystemFont(size);
    textHandle.textColor = Color.dynamic(Color.black(),Color.white());
    textHandle.centerAlignText();
    return textHandle;
}

module.exports.textColour = (stack, size, col1, col2, text) => {
    let textHandle = stack.addText(text);
    textHandle.font = Font.boldMonospacedSystemFont(size);
    textHandle.textColor = Color.dynamic(new Color('#' + col1), new Color('#' + col2));
    textHandle.centerAlignText();
    return textHandle;
}

// webcamText
module.exports.webcamText = (stack, text, size, col1, col2, opacity, radius, shadow) => {
    let textHandle = stack.addText(text);
    textHandle.font = Font.boldMonospacedSystemFont(size);
    textHandle.textColor = Color.dynamic(new Color('#' + col1), new Color('#' + col2));
    textHandle.centerAlignText();
    textHandle.textOpacity = opacity;
    textHandle.shadowRadius = radius;
    textHandle.shadowColor = new Color('#' + shadow);
    return textHandle;
}

// time
module.exports.addTime = (stack, size) => {
  const dateFormat = 'HH:mm'; 
const timeFormatter = new DateFormatter();
timeFormatter.dateFormat = dateFormat;
  let timeStack = stack.addText(timeFormatter.string(new Date()));
  timeStack.textColor = Color.dynamic(new Color('#ED98DC'), new Color('#E47406'));
    timeStack.font = Font.boldMonospacedSystemFont(size);
    timeStack.centerAlignText();
    timeStack.textOpacity = 0.5;
    timeStack.shadowRadius = 9;
    timeStack.shadowColor = new Color('#926666');
};

// gradient
module.exports.myGradient = (c1, c2) => {
const gradient = new LinearGradient();
const col1 = Color.dynamic(new Color('#' + c1, 0.8), new Color('#' + c2, 0.9));
const col2 = Color.dynamic(new Color('#' + c2, 0.9), new Color('#' + c1, 0.8)); 
gradient.colors = [col1, col2];
gradient.locations = [0, 0.5];
gradient.startPoint = new Point(0, 0);
gradient.endPoint = new Point(1, 1);
    return gradient;
}

// dynamic gradient
module.exports.dynamicGradient = (c1, c2, c3, c4) => {
const gradient = new LinearGradient();
const col1 = Color.dynamic(new Color('#' + c1, 0.8), new Color('#' + c2, 0.9));
const col2 = Color.dynamic(new Color('#' + c3, 0.9), new Color('#' + c4, 0.8)); 
gradient.colors = [col1, col2];
gradient.locations = [0, 0.75];
gradient.startPoint = new Point(0, 1);
gradient.endPoint = new Point(1, 0);
    return gradient;
}

// colour
module.exports.colour = (col1, col2, opacity) => {
const colour = Color.dynamic(new Color('#'+ col1, opacity), new Color('#' + col2, opacity));
    return colour;
};

// glowText
module.exports.glowText = (stack, text, size, glowColour) => {
    const theText = stack.addText(text);
    theText.font = Font.boldSystemFont(size);
    theText.textColor = Color.dynamic(new Color('#000000'), new Color('#FFFFFF'));
    theText.shadowRadius = 2;
    theText.shadowColor = new Color('#' + glowColour);
    theText.shadowOffset = new Point(-2,-1);
    return theText;
}

// titleText
module.exports.titleText = (stack, text, col1, col2, size, col3, col4) => {
const baseStack = stack.addStack();
    baseStack.layoutHorizontally();
    baseStack.addSpacer();
    const titleStack = baseStack.addStack();
    titleStack.spacing = 1;
const titleGrad = new LinearGradient();
    titleGrad.colors = [new Color(col1, 0.8), Color.dynamic(new Color('#' + col1, 0.8), new Color('#' + col2, 0.5))];
    titleGrad.locations = [0.0, 0.8];
    titleGrad.startPoint = new Point(0, 1);
    titleGrad.endPoint = new Point(1, 0.3);
    titleStack.backgroundGradient = titleGrad;
    titleStack.cornerRadius = 20; 
    const title =  titleStack.addText(' ' + text + ' ');
    title.font = Font.boldMonospacedSystemFont(size);
    title.textColor = Color.dynamic(new Color('#' + col3), new Color('#' + col4));
    title.centerAlignText();
    baseStack.addSpacer();
    return baseStack;
    };
    
// updated at time
module.exports.updatedAtTime = (stack) => {
const newStack = stack.addStack();
newStack.layoutHorizontally();
newStack.addSpacer();
const mainStack = newStack.addStack();
mainStack.layoutVertically();
mainStack.cornerRadius = 8;// 
mainStack.setPadding(2, 2, 2, 2);
const bgGrad = new LinearGradient();
const col1 = Color.dynamic(new Color('#520031', 0.1), new Color('#E6870F', 0.1));
const col2 = Color.dynamic(new Color('#E6870F', 0.2), new Color('#FDEC62', 0.2));
const col3 = Color.dynamic(new Color('#FDEC62', 0.3), new Color('#520031', 0.3));
    bgGrad.colors = [col1, col2, col3];
    bgGrad.locations = [0.25, 0.5, 0.75];
    bgGrad.startPoint = new Point(0, 0.25, 0.5);
    bgGrad.endPoint = new Point(1, 1, 1);
mainStack.backgroundGradient = bgGrad;
const titleStack = mainStack.addStack();
    titleStack.layoutHorizontally();
const refreshText = titleStack.addText('Refreshed at:');
    refreshText.font = Font.boldMonospacedSystemFont(8);
    refreshText.textColor = Color.dynamic(new Color('#FFFFFF'), new Color('#000000'));
    refreshText.centerAlignText();
const timeStack = mainStack.addStack();
timeStack.layoutHorizontally();
const dateFormat = 'HH:mm'; 
const timeFormatter = new DateFormatter();
timeFormatter.dateFormat = dateFormat;
let timeText = timeStack.addText(' ' + timeFormatter.string(new Date()));
    timeText.font = Font.boldMonospacedSystemFont(17);
    timeText.textColor = Color.dynamic(new Color('#000000'), new Color('#FFFFFF'));
    timeText.centerAlignText();
newStack.addSpacer();
stack.addSpacer(2);
return stack;
}

// time changing background
module.exports.changingBackground = (widget) => {
  const currentDate = new Date();
  let background = {
    midnight: 'https://i.imgur.com/ljhbUe6.png',
    two: 'https://i.imgur.com/64RXglG.png',
    four: 'https://i.imgur.com/7xTfWzt.png',
    six: 'https://i.imgur.com/g32ksA8.png',
    eight: 'https://i.imgur.com/BgK7M7J.png',
    ten: 'https://i.imgur.com/qeRSWcn.png',
    noon: 'https://i.imgur.com/FziXpwt.png',
    twopm: 'https://i.imgur.com/MJbXrSX.png',
    fourpm: 'https://i.imgur.com/4CmP3Bz.png',
    sixpm: 'https://i.imgur.com/Qj6CLcD.png',
    eightpm: 'https://i.imgur.com/RUibCx6.png',
    tenpm: 'https://i.imgur.com/WuFZNHH.png',
	 odd: 'https://i.imgur.com/rKPEGoP.png',
  }
  if (currentDate.getHours() == 0) { return background.midnight }
	if (currentDate.getHours() == 2) { return background.two }
	if (currentDate.getHours() == 4) { return background.four }
	if (currentDate.getHours() == 6) { return background.six }
	if (currentDate.getHours() == 8) { return background.eight }
	if (currentDate.getHours() == 10) { return background.ten }
	if (currentDate.getHours() == 12) { return background.noon }
	if (currentDate.getHours() == 14) { return background.twopm }
	if (currentDate.getHours() == 16) { return background.fourpm }
	if (currentDate.getHours() == 18) { return background.sixpm }
	if (currentDate.getHours() == 20) { return background.eightpm }
	if (currentDate.getHours() == 22) { return background.tenpm }
  return background.odd
}