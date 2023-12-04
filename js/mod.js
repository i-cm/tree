let modInfo = {
	name: "The Multiplyer Tree",
	id: "hiandandp",
	author: "",
	pointsName: "cash",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.11",
	name: "The stat update",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.11</h3><br>
		<added>+ Added Experience<br>
		+ Added Stats</added>`

let winText = ``

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new ExpantaNum(0)
  
	let gain = new ExpantaNum(1)
	
	gain = gain.mul(player.m.points.add(1))
	gain = gain.mul(player.x.points.add(1))
	gain = gain.pow(player.e.points.add(1))
	if (hasMilestone("xp", 1)) gain = gain.mul(getBuyableAmount("xp", 11))
	gain = gain.mul(player.s.points.add(1))
	gain = gain.mul(player.s.points.add(1).logBase(10).add(1))
	if (hasMilestone("xp", 5)) gain = gain.pow(3)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
  function() {
    return `Cash: ${format(player.points)}`
  },
  function() {
    return `Mult: ${format(player.m.points)}`
  },
  function() {
    return `Score: ${format(player.m.points.add(1).log10())}`
  },
  function() {
    return `Points: ${format(player.m.points.add(1).log10().add(1).log10())}`
  },
  
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
