addLayer("m", {
    name: "multipler", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "x", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
    }},
    color: "#DC1313",
    requires: new ExpantaNum(10), // Can be a function that takes requirement increases into account
    resource: "multiplier", // Name of prestige currency
    baseResource: "cash", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
        if (hasUpgrade("m", 11)) mult = mult.mul(2)
        if (hasUpgrade("m", 12)) mult = mult.mul(3)
        if (hasUpgrade("m", 13)) mult = mult.mul(10)
        mult = mult.mul(player.r.points.add(1))
        mult = mult.mul(player.x.points.add(1))
	
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for multiplier", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    prestigeButtonText() { //Is secretly HTML
        return hasMilestone("r", 0) ? `Your points are multipling!<br>
        +${formatWhole(getResetGain(this.layer))}/s` : `Multiply your points!<br>
        +${formatWhole(getResetGain(this.layer))}`
    },
    upgrades: {
      11: {
        title: "Multi Multiplier",
        description: "Double Mult gain",
        cost: new OmegaNum(2500)
      },
      12: {
        title: "Triple Multi",
        description: "Triple Mult gain",
        cost: new OmegaNum(25000)
      },
      13: {
        title: "Multi-Multi",
        description: "10x Mult gain",
        cost: new OmegaNum(2500000)
      },
      
    },
    branches: ["r"],
    passiveGeneration() {
      return hasMilestone("r", 0)
    },
    autoUpgrade() {
      return hasMilestone("r", 1)
    },
    softcap: new ExpantaNum("ee50"),
    softcapPower: 0.25
})

addLayer("r", {
    name: "rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new ExpantaNum(0),
    }},
    color: "#4B13DC",
    requires: new ExpantaNum(20), // Can be a function that takes requirement increases into account
    resource: "rebirth", // Name of prestige currency
    baseResource: "score", // Name of resource prestige is based on
    baseAmount() {return player.m.points.add(1).log10()}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
        mult = mult.mul(player.x.points.add(1))
	
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Rebirth for rebirth", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("m", 13) || player.r.unlocked},
    milestones: {
      0: {
        requirementDescription: "Do a rebirth",
        effectDescription: "Gain Multiplier per second",
        done() {
          return player.r.unlocked
        }
      },
      1: {
        requirementDescription: "3 rebirths",
        effectDescription: "Autobuy multipler upgrades",
        done() {
          return player.r.points.gte(3)
        }
      },
      
    },
    onPrestige(gain) {
      player.r.unlocked = true
    },
    tabFormat: [
    "main-display",
    ["prestige-button", function() { return "Melt your points into " }],
    "blank",
    "resource-display",
    "blank",
    ["toggle", ["c", "beep"]],
    "milestones",
    "blank",
    "blank",
    "upgrades"
],
branches: ["x"],
passiveGeneration() {
      return hasMilestone("x", 0) ?  hasMilestone("x", 1) * 10 : false
    },
})

addLayer("x", {
    name: "super mult", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "x²", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new ExpantaNum(0),
    }},
    color: "#1313DC",
    requires: new ExpantaNum(10), // Can be a function that takes requirement increases into account
    resource: "super multi", // Name of prestige currency
    baseResource: "rebirth", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "x", description: "X: Rebirth for multiplier", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone("r", 1) || player.x.unlocked},
    
    onPrestige(gain) {
      player.x.unlocked = true
    },
    tabFormat: [
    "main-display",
    ["prestige-button", function() { return "Melt your points into " }],
    "blank",
    "resource-display",
    "blank",
    ["toggle", ["c", "beep"]],
    "milestones",
    "blank",
    "blank",
    "upgrades"
],
milestones: {
      0: {
        requirementDescription: "20 super mults",
        effectDescription: "Gain Rebirths per second",
        done() {
          return player.x.points.gte(20)
        }
      },
      1: {
        requirementDescription: "250 super mults",
        effectDescription: "Milestone 0 effect is multiplied by 10x",
        done() {
          return player.x.points.gte(250)
        }
      },
      2: {
        requirementDescription: "10B super mults",
        effectDescription: "Gain Super Mult per second",
        done() {
          return player.x.points.gte(100000000000)
        }
      },
      
    },
    passiveGeneration() {
      return hasMilestone("x", 2)
    },
    branches: ["e"]
})

addLayer("e", {
  name: "exponent", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "^", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: false,
      points: new ExpantaNum(0),
    }
  },
  color: "#13DCDC",
  requires: new ExpantaNum(1000000), // Can be a function that takes requirement increases into account
  resource: "exponent", // Name of prestige currency
  baseResource: "score", // Name of resource prestige is based on
  baseAmount() { return player.m.points.add(1).log10() }, // Get the current amount of baseResource
  type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 3, // Prestige currency exponent
  base: 10000,
  gainMult() { // Calculate the multiplier for main currency from bonuses
    mult = new ExpantaNum(1)

    return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
    return new ExpantaNum(1)
  },
  row: 2, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    { key: "e", description: "E: Rebirth for multiplier", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
  layerShown() { return hasMilestone("x", 2) || player.e.unlocked },

  onPrestige(gain) {
    player.e.unlocked = true
  },
  tabFormat: [
    "main-display",
    ["prestige-button", function() { return "Melt your points into " }],
    "blank",
    "resource-display",
    "blank",
    ["toggle", ["c", "beep"]],
    "milestones",
    "blank",
    "blank",
    "upgrades"
],
    
})