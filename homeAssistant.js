let widget = await createWidget();
if (!config.runsInWidget) {
    await widget.presentMedium();
};
Script.setWidget(widget);
Script.complete();
async function createWidget(items) {
const widget = new ListWidget();
let modules = importModule('Functions');
let secrets = importModule('Secrets');
let imageUrl = await background();
widget.backgroundImage = await loadImage(imageUrl);
let url = secrets.HAURL();
let req = new Request(url);
    req.timeoutInterval = 55;
    let token = secrets.HAToken();
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    req.headers = headers;
    req.allowInsecureRequest = true;
    let json = await req.loadJSON();
    let data = {hass: {}, hacs: {}, super: {}, njtd: {}, ipad: {}, mactemp: {}, maccpu: {}, macfan: {}, homekit: {}};
    data.hass = addDataa(json, data.hass, ['sensor.hassupdate']);
    data.super = addDataa(json, data.super, ['sensor.superupdate']);
    data.hacs = addDataa(json, data.hacs, ['sensor.hacsupdate']);
    data.homekit = addData(json, data.homekit, ['sensor.hbtemp']);
    data.mactemp = addData(json, data.mactemp, ['sensor.mactemp']);
    data.maccpu = addDataa(json, data.maccpu, ['sensor.macbook_pro_local_cpu_used']);
    data.njtd = addDataa(json, data.njtd, ['sensor.nathanjohnthedom_com']);
    data.ipad = addDataa(json, data.ipad, ['sensor.ipad_pro_mobile_app_battery_level']);
    data.macfan = addDataa(json, data.macfan, ['sensor.macfan']);
const darkBlue = modules.colour('C4CAEF', '1132E2', 0.65);
const lightBlue = modules.colour('1132E2', 'C4CAEF', 0.75); 
const grayWhite = modules.colour('BDC1CC', 'FFFFFF', 0.6);
const whiteGray = modules.colour('FFFFFF', 'BDC1CC', 0.5);
const blueGrad = modules.dynamicGradient('1132E2', 'C4CAEF', 'C4CAEF', '1132E2')
const reverseBlueGrad = modules.myGradient('C4CAEF', '1133E2');
widget.addSpacer(3);
let topStack = widget.addStack();
topStack.layoutHorizontally();
topStack.setPadding(0, 0, 2, 0);
const topNewStack = topStack.addStack();
topNewStack.layoutVertically();
topNewStack.addSpacer(20);
const topLeftStack = topStack.addStack();
      topLeftStack.layoutVertically();
      topLeftStack.addSpacer(12);
const domAddStack = topLeftStack.addStack();
    domAddStack.layoutVertically();
    domAddStack.setPadding(1, 1, 1, 1);
    domAddStack.cornerRadius = 10;
    let bG = modules.myGradient('BDC1CC', 'FFFFFF');
    domAddStack.backgroundGradient = bG;
      const domainStack = domAddStack.addStack();
      domainStack.layoutHorizontally();
      addBigBrownText(domainStack, 'nathanjohnthedom.com');
  topLeftStack.addSpacer(2);
      const addressStack = domAddStack.addStack();
      addressStack.layoutHorizontally();
      addressStack.addSpacer(36);
      const myTextIP = String(addDataa(addressStack, data.njtd.switch));
      modules.textColour(addressStack, 12, '000000', 'FFFFFF', myTextIP);
    topStack.addSpacer();
    
const topRightStack = topStack.addStack();
const updatesStack = topRightStack.addStack();
        updatesStack.layoutVertically();
  let bg = modules.myGradient('1132E2', 'C4CAEF');
        updatesStack.backgroundGradient = bg;
        updatesStack.cornerRadius = 20
        updatesStack.setPadding(2, 2, 2, 2);
  const titleStack = updatesStack.addStack();
        titleStack.layoutHorizontally();
        titleStack.addSpacer(10);
        addTitleText(titleStack, 'Updates:');
        addStatusInfo(updatesStack, data.hass, 'Home Assistant');
        addStatusInfo(updatesStack, data.super, 'Supervisor');
        addStatusInfo(updatesStack, data.hacs, 'HACS');
modules.updatedAtTime(widget);

let bottomStack = widget.addStack();
bottomStack.layoutHorizontally();
bottomStack.addSpacer(18);
const bottomLeftSpaceStack = bottomStack.addStack();
bottomLeftSpaceStack.layoutVertically();
bottomLeftSpaceStack.addSpacer(8);

const bottomLeftStack = bottomLeftSpaceStack.addStack();
bottomLeftStack.layoutVertically();
bottomLeftStack.setPadding(2, 4, 5, 4);
bottomLeftStack.backgroundGradient = reverseBlueGrad;
bottomLeftStack.cornerRadius = 14;
const leftTitleStack = bottomLeftStack.addStack();
leftTitleStack.layoutHorizontally();
leftTitleStack.addSpacer(2);
addBrownText(leftTitleStack, 'Stratton Road');

const leftInfoStack = bottomLeftStack.addStack();
leftInfoStack.layoutHorizontally();
leftInfoStack.addSpacer(1);

const leftLabelStack = leftInfoStack.addStack();
leftLabelStack.layoutVertically();
addWhiteText(leftLabelStack, 'Pi Temp:');
addWhiteText(leftLabelStack, 'iPad Batt:');
leftInfoStack.addSpacer(2);
const leftDataStack = leftInfoStack.addStack();
leftDataStack.layoutVertically();
addTemp(leftDataStack, data.homekit);
addBatt(leftDataStack, data.ipad);
bottomStack.addSpacer(40);

const rightStack = bottomStack.addStack();
rightStack.layoutVertically();
rightStack.setPadding(3, 3, 3, 3);
rightStack.backgroundGradient = blueGrad;
rightStack.cornerRadius = 14;
        
const rightTitleStack = rightStack.addStack();
rightTitleStack.addSpacer(25);
addBrownText(rightTitleStack, 'MacBook Pro');

const rightInfoStack = rightStack.addStack();
rightInfoStack.layoutHorizontally();
const rightLabelStack = rightInfoStack.addStack();
rightLabelStack.layoutVertically();
addBlackText(rightLabelStack, 'Temperature:');
addBlackText(rightLabelStack, 'Fan Speed:');
addBlackText(rightLabelStack, 'CPU:');
rightInfoStack.addSpacer(5);
const rightDataStack = rightInfoStack.addStack();
rightDataStack.layoutVertically();
addTempp(rightDataStack, data.mactemp);
addFan(rightDataStack, data.macfan);
addBattt(rightDataStack, data.maccpu);
widget.addSpacer(3);
return widget;
};
function addBlackText(stack, text) {
    let textHandle = stack.addText(text);
    textHandle.font = Font.boldMonospacedSystemFont(11);
    textHandle.textColor = Color.dynamic(Color.white(),Color.black());
    return textHandle;
};
function addBigBrownText(stack, text) {
    let textHandle = stack.addText(text);
    textHandle.font = Font.boldMonospacedSystemFont(13);
    textHandle.textColor = Color.dynamic(Color.darkGray(),new Color('#6e4626'));
    return textHandle;
};
function addWhiteText(stack, text) {
    let textHandle = stack.addText(text);
    textHandle.font = Font.heavyMonospacedSystemFont(11);
    textHandle.textColor = Color.dynamic(Color.black(),Color.white());
    textHandle.centerAlignText();
    return textHandle;
};
function addBrownText(stack, text) {
let textHandle = stack.addText(text);
    textHandle.centerAlignText();
    textHandle.font = Font.boldMonospacedSystemFont(12);
    textHandle.textColor = Color.dynamic(new Color('#6e4626'),Color.darkGray());
    textHandle.centerAlignText();
    return textHandle;
};
async function addTemp(stack, data) {
    addBlackText(stack, data.temp + "°C");
};
async function addTempp(stack, data) {
    addWhiteText(stack, data.temp + "°C");
};
async function addFan(stack, data) {
    addWhiteText(stack, data.switch + "rpm");
};
async function addBatt(stack, data) 
{
    addBlackText(stack, data.switch + "%");
};
async function addBattt(stack, data) 
{
    addWhiteText(stack, data.switch + "%");
};
async function background() {
  const currentDate = new Date();
  let background = {
    dark: 'https://i.imgur.com/GP99EhL.png',
    light: 'https://i.imgur.com/6vU5V30.png',
  };
    if (currentDate.getHours() == 0) { return background.dark };
	if (currentDate.getHours() == 1) { return background.dark };
	if (currentDate.getHours() == 2) { return background.dark };
	if (currentDate.getHours() == 3) { return background.dark };
	if (currentDate.getHours() == 4) { return background.dark };
	if (currentDate.getHours() == 5) { return background.dark };
	if (currentDate.getHours() == 6) { return background.dark };
	if (currentDate.getHours() == 22) { return background.dark };
	if (currentDate.getHours() == 23) { return background.dark };
  return background.light;
};
let imageUrl = await background(); 
async function loadImage(imageUrl) {
    const req = new Request(imageUrl);
    return await req.loadImage();
};
function addData(json, room, sensors) {
    var i;
    for (i = 0; i < json.length; i++) {
        if (json[i]['entity_id'] == sensors[0]) {
            room.temp = Math.round(json[i]['state']);
        };
    };
    return room;
};
function addDataa(json, room, sensors) {
    var i;
    for (i = 0; i < json.length; i++) {
        if (json[i]['entity_id'] == sensors[0]) {
            room.switch = (json[i]['state']);
        };
    };
    return room;
};
function addTitleText(stack, text) {
  let textHandle = stack.addText(text);
      textHandle.font = Font.boldMonospacedSystemFont(12);
      textHandle.textColor = Color.dynamic(new Color('#6e4626'),Color.darkGray());
      textHandle.centerAlignText();
  return textHandle;
};

function addStatusInfo(stack, status, text) {
  let itemStack = stack.addStack();
      itemStack.layoutHorizontally();
      itemStack.addSpacer(5);
      addStatusIcon(itemStack, status);
      itemStack.addSpacer(2);
      addInfoText(itemStack, status, text);
      itemStack.addSpacer(3);
};

function addInfoText(stack, status, text) {
  let color;
  if (status === undefined) {
    color = new Color('#FFFF00');
   } else if (status === "on") {
    color = new Color('#FF0000');
   } else if (status === '"!Update!"') {
    color = new Color('#FF0000');
   } else {
    color = new Color('#00FF00');
   }
  let textHandle = stack.addText(text);
      textHandle.font = Font.heavyMonospacedSystemFont(11);
      textHandle.textColor = Color.dynamic(Color.black(),Color.white());
      textHandle.shadowColor = color;
      textHandle.shadowRadius = 2;
      textHandle.shadowOffset = new Point(-2,-1);
      textHandle.centerAlignText();
  return textHandle;
};
     
function addStatusIcon(stack, status) {
  let name = '';
  let color;
  let colour;
  if (status === undefined) {
    name = 'infinity';
    color = new Color('#FFFF00');
   } else if (status === "on") {
    name = 'xmark';
    color = new Color('#FF0000');
   } else if (status === '"!Update!"') {
    name = 'xmark';
    color = new Color('#FF0000');
   } else {
    name = 'checkmark';
    color = new Color('#00FF00');
   }
  addIcon(stack, name, color);
};

function addIcon(stack, name, color) {
  let sf = SFSymbol.named(name);
      sf.applyFont(Font.heavySystemFont(8));
  let iconImage = sf.image;
  let imageWidget = stack.addImage(iconImage);
      imageWidget.resizable = true;
      imageWidget.imageSize = new Size(11, 11);
      imageWidget.tintColor = color;
};