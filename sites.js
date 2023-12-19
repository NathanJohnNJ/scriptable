const initialData = {
    servers: [
      {
      url: 'https://www.njtd.xyz',
			title: ' NJTD  ',
			emoji: '💻 ',
			online: null,
		},
		{
			url: 'https://cookieclub.njtd.xyz',
			title: ' The Cookie Club',
			emoji: '🍪 ',
			online: null,
		},
	  {
			url: 'http://alien.njtd.xyz',
			title: ' Alien Game',
			emoji: '👽 ',
			online: null
		},
    {
      url: 'https://dice.njtd.xyz',
      title: ' Dice Game ',
			emoji: ' 🎲',
      online: null
    },
    {
      url: 'https://cats.njtd.xyz',
		  title: ' Cats 4 Lyf ',
			emoji: ' 😸',
      online: null
    },
    {
      url: 'https://clone.njtd.xyz',
		  title: ' Clone Websie ',
			emoji: ' ©️',
      online: null
    },
		{
      url: 'https://keycode.njtd.xyz',
      title: ' KeyCode Generator ',
			emoji: ' 🆎',
      online: null
    },
		{
      url: 'https://calc.njtd.xyz',
      title: ' React Calculator ',
			emoji: ' 🔢',
      online: null
    },
   ],
	lastUpdate: null
}
const refreshInterval = 600; //seconds
const blackWhite = Color.dynamic(new Color('#0A0A0C'), new Color('#D6D7DC'));
const whiteBlack = Color.dynamic(new Color('#D6D7DC'), new Color('#0A0A0C'));
const darkLightGrey = Color.dynamic(new Color('#5D5D5F'), new Color('#9B9CA1'));
const lightDarkGold = Color.dynamic(new Color('#9B7E56'), new Color('#E4D094'));
const lightestGold = new Color('#E4D094');
const lightDarkBlue = Color.dynamic(new Color('#1E4E8C'), new Color('#011039'));
const titleGrad = new LinearGradient();
    titleGrad.colors = [lightDarkGold, lightDarkBlue];
    titleGrad.locations = [0.0, 0.8];
    titleGrad.startPoint = new Point(0, 1);
    titleGrad.endPoint = new Point(1, 0.3);
const widget = await createWidget()
if (!config.runsInWidget) {
	await widget.presentMedium()
}
Script.setWidget(widget)
Script.complete()

async function createWidget(items) {
	const data = await refresh()
	const widget = new ListWidget()
	widget.backgroundColor = whiteBlack;
	const titleStack = widget.addStack();
	titleStack.addSpacer();
    const headerStack = titleStack.addStack();
    
    headerStack.backgroundGradient = titleGrad;
		headerStack.layoutHorizontally();
    headerStack.cornerRadius = 20; 
		headerStack.addSpacer(2);
    const title =  headerStack.addText("W  e  b  s  i  t  e  s");
    title.font = Font.boldMonospacedSystemFont(22);
    title.textColor = Color.dynamic(lightDarkBlue, darkLightGrey);
    title.centerAlignText();
		headerStack.addSpacer();
		const title2 =  headerStack.addText("S  t  a  t  u  s ");
    title2.font = Font.boldMonospacedSystemFont(22);
    title2.textColor = Color.dynamic(darkLightGrey, lightDarkBlue);
    title2.centerAlignText();
		headerStack.addSpacer(2);
		titleStack.addSpacer();
	widget.addSpacer(15);
 let serverStack = widget.addStack();
       serverStack.layoutHorizontally();
			serverStack.addSpacer();
   let leftStack = serverStack.addStack();
       leftStack.layoutVertically();
	 let middleStack = serverStack.addStack();
	     middleStack.layoutVertically();
   let rightStack = serverStack.addStack();
       rightStack.layoutVertically();
			serverStack.addSpacer();
   let arr = [];
      data.servers.forEach((server) => {
    let status = '';
    let title = ' ' + server.title;
    let colour = '';
		let emoji = server.emoji;
		console.log(String(server.online))
    if (String(server.online) == 200) {
      status = '✅';
      colour = "00FF00";
    } else {
      status = '❌ ';
      colour = 'FF0000';
    }
		let output = {status, title, colour, emoji};
		arr = arr.concat(output);
		return arr;
});
console.log(arr);
addToLeft(leftStack, arr[0].title, arr[0].emoji, arr[0].colour);
addToLeft(leftStack, arr[1].title, arr[1].emoji, arr[1].colour);
addToLeft(leftStack, arr[2].title, arr[2].emoji, arr[2].colour);
addToLeft(leftStack, arr[7].title, arr[7].emoji, arr[7].colour);
addCentreColumn(middleStack, arr);
addToRight(rightStack, arr[3].title, arr[3].emoji, arr[3].colour);
addToRight(rightStack, arr[4].title, arr[4].emoji, arr[4].colour);
addToRight(rightStack, arr[5].title, arr[5].emoji, arr[5].colour);
addToRight(rightStack, arr[6].title, arr[6].emoji, arr[6].colour);
widget.addSpacer(10);
const updateStack = widget.addStack();
updateStack.addSpacer(15);
const lastRefreshLabel = updateStack.addText('Last refresh: ' + data.lastUpdate);

lastRefreshLabel.font = Font.mediumSystemFont(10);
return widget
}
   
async function refresh() {
  let data = initialData;
  for (let server of data.servers) {
    let request = new Request(server.url);
    request.allowInsecureRequest = true;
		request.timeoutInterval = 3;
    request.method = 'GET';
    try {
      await request.load();
      server.online = request.response.statusCode;
    } catch (response) {
      server.online = 0;
    }
  }
  let now = new Date();
  let hours = now.getHours();
  let mins = now.getMinutes();
  data.lastUpdate = (hours > 9 ? hours : '0' + hours) + ':' + (mins > 9 ? mins : '0' + mins);
	return data
}

function addToLeft(stack, title, emoji, colour){
      let labelStack = stack.addStack();
      labelStack.layoutHorizontally();
			let emojiText = labelStack.addText(emoji);
			emojiText.font = Font.boldSystemFont(12);
      glowText(labelStack, title, colour);
		stack.addSpacer(3)
}

function addToRight(stack, title, emoji, colour){
      let labelStack = stack.addStack();
      labelStack.layoutHorizontally();
      glowText(labelStack, title, colour);
			let emojiText = labelStack.addText(emoji);
			emojiText.font = Font.boldSystemFont(12);
		stack.addSpacer(3)
}
function addCentreColumn(stack, arr){
	 let topStack = stack.addStack();
	     topStack.layoutHorizontally();
	 let centreStack = stack.addStack();
	     centreStack.layoutHorizontally();
	 let bottomStack = stack.addStack();
	     bottomStack.layoutHorizontally();
	 let veryBottomStack = stack.addStack();
		   veryBottomStack.layoutHorizontally();
			let label1 = topStack.addText(arr[0].status
			 + '  ' + arr[3].status);
			label1.font = Font.boldSystemFont(13);
			let label2 = centreStack.addText(arr[1].status
			+ '  ' + arr[4].status);
			label2.font = Font.boldSystemFont(13);
			let label3 = bottomStack.addText(arr[2].status
			+ ' ' + arr[5].status);
			label3.font = Font.boldSystemFont(13);
			let label4 = veryBottomStack.addText(arr[7].status + ' ' + arr[6].status);
			label4.font = Font.boldSystemFont(13);
}
function glowText(stack, text, glowColour){
    const theText = stack.addText(text);
    theText.font = Font.boldSystemFont(12);
    theText.textColor = Color.dynamic(new Color('#000000'), new Color('#FFFFFF'));
    theText.shadowRadius = 2;
    theText.shadowColor = new Color('#' + glowColour);
    theText.shadowOffset = new Point(-2,-1);
    return theText;
}
// async function sendNotification(server) {
//   let alert = new Notification();
//   alert.sound = 'failure';
//   alert.title = 'Server down';
//   alert.body = 'Status of server "' + server.title + '" is down.';
//   alert.openURL = server.url;
//   await alert.schedule();
// };