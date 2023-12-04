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
	if (hasMilestone("xp", 1)) mult = mult.mul(getBuyableAmount("xp", 11))
	mult = mult.mul(player.s.points.add(1))
	mult = mult.mul(player.s.points.add(1).logBase(10).add(1))
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
	if (hasMilestone("xp", 1)) mult = mult.mul(getBuyableAmount("xp", 11))
	mult = mult.mul(player.s.points.add(1))
	mult = mult.mul(player.s.points.add(1).logBase(10).add(1))
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
      return hasMilestone("x", 0) ? 9 * hasMilestone("x", 1) + 1 : false
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
        if (hasMilestone("xp", 1)) mult = mult.mul(getBuyableAmount("xp", 11))
	mult = mult.mul(player.s.points.add(1))
	mult = mult.mul(player.s.points.add(1).logBase(10).add(1))
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
  autoPrestige() {
    return hasMilestone("xp", 0)
  },
  resetsNothing() {
    return hasMilestone("xp", 4)
  }
})

addLayer("xp", {
    name: "expirence", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "XP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new ExpantaNum(0),
    }},
    color: "#4BDC13",
    requires: new ExpantaNum(50), // Can be a function that takes requirement increases into account
    resource: "expirence", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.m.points.add(1).log10().add(1).log10()}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
        mult = mult.mul(player.s.points.add(1))
	      
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "L: Reset for experience", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() { return player.e.points.gte(2) || player.xp.unlocked },
    prestigeButtonText() { //Is secretly HTML
        return `Gain your experience!<br>
        +${formatWhole(getResetGain(this.layer))}`
    },
    upgrades: {
      
    },
    buyables: {
      11: {
        title() {return `Level ${getBuyableAmount("xp", 11)}`},
        cost() {
          let mult = new ExpantaNum(1)
          let exp = new ExpantaNum(1)
          if (getBuyableAmount("xp", 11).gte(4)) exp = exp.mul(getBuyableAmount("xp", 11))
          return new ExpantaNum(x).div(4).mul(mult).mul(getBuyableAmount(this.layer, this.id).add(1)).pow(exp)
        },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        display() { return `XP: ${format(player.xp.points)}/${format(this.cost())}` },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        
      }
    },
    branches: ["e", "x"],
    milestones: {
      0: {
        requirementDescription: "Lvl 1",
        effectDescription: "Autoprestige Exponents",
        done() {
          return getBuyableAmount("xp", 11).gte(1)
        }
      },
      1: {
        requirementDescription: "Lvl 2",
        effectDescription: "Multiply All Point gain below xp by levels",
        done() {
          return getBuyableAmount("xp", 11).gte(2)
        }
      },
      2: {
        requirementDescription: "Lvl 3",
        effectDescription: "Unlock a new layer",
        done() {
          return getBuyableAmount("xp", 11).gte(3)
        }
      },
      3: {
        requirementDescription: "Lvl 4",
        effectDescription: "You gain 10% of stat per second",
        done() {
          return getBuyableAmount("xp", 11).gte(4)
        }
      },
      4: {
        requirementDescription: "Lvl 5",
        effectDescription: "Exponents reset nothing and unlock new stat upgrades",
        done() {
          return getBuyableAmount("xp", 11).gte(5)
        }
      },
      5: {
        requirementDescription: "Lvl 10",
        effectDescription: "Cube point gain",
        done() {
          return getBuyableAmount("xp", 11).gte(10)
        }
      },
      
    },
    onPrestige(gain) {
    player.xp.unlocked = true
  },
})

const statLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  
  ]

function getStatName(n) {
  if (n.add == undefined) n = new ExpantaNum(n)
  if (n.gte(1e100)) return `${formatWhole(n)}th stat`
  if (n.gte(26)) return getStatName(n.div(26).floor().add(-1)) + getStatName(n.mod(26))
  return statLetters[n.floor()]
}

addLayer("s", {
    name: "stats", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "s", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
    }},
    color: "#DCDCDC",
    requires: new ExpantaNum(2.5), // Can be a function that takes requirement increases into account
    resource: "a", // Name of prestige currency
    baseResource: "exponents", // Name of resource prestige is based on
    baseAmount() {return player.e.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
        if (hasUpgrade("s", 11)) mult = mult.mul(10)
        if (hasUpgrade("s", 12)) mult = mult.mul(3)
        if (hasUpgrade("s", 13)) mult = mult.mul(2.5)
        if (hasUpgrade("s", 14)) mult = mult.mul(5)
        if (hasUpgrade("s", 21)) mult = mult.mul(upgradeEffect("s", 21))
        if (hasUpgrade("s", 22)) mult = mult.mul(3.75)
        if (hasUpgrade("s", 23)) mult = mult.mul(3.75)
        if (hasUpgrade("s", 24)) mult = mult.mul(6)
        if (hasUpgrade("s", 31)) mult = mult.mul(50)
        if (hasUpgrade("s", 32)) mult = mult.mul(4.25)
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for stats", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone("xp", 2)},
    prestigeButtonText() { //Is secretly HTML
        return `Increse your stats!<br>
        +${format(getResetGain(this.layer).div(new ExpantaNum(10).pow(getResetGain(this.layer).add(1).logBase(10).floor())))} ${getStatName(getResetGain(this.layer).add(1).logBase(10))}<br>Stat: ${getStatName(player.s.points.add(getResetGain(this.layer)).add(1).logBase(10))}`
    },
    upgrades: {
      11: {
        title: "Stat Multiplier",
        description: "10x Stat gain",
        cost: new OmegaNum(2)
      },
      12: {
        title: "Triple Stat",
        description: "Triple Stat gain",
        cost: new OmegaNum(100)
      },
      13: {
        title: "Stat Buff",
        description: "2.5x Stat gain",
        cost: new OmegaNum(425)
      },
      14: {
        title: "More Stat Buff",
        description: "5x Stat gain",
        cost: new OmegaNum(750)
      },
      21: {
        title: "Stat Synergy",
        description: "Stat number boosts Stats",
        cost: new OmegaNum(10000),
        unlocked() {
          return hasMilestone("xp", 4)
        },
        effect() {
          return player.s.points.add(1).logBase(10).add(1)
        },
        effectDisplay() {
          return `${format(upgradeEffect("s", 21))}x`
        }
      },
      22: {
        title: "Stat Boost",
        description: "3.75x Stat gain",
        cost: new OmegaNum(12500),
        unlocked() {
          return hasUpgrade("s", 21)
        },
      },
      23: {
        title: "Stat Boost again",
        description: "3.75x Stat gain",
        cost: new OmegaNum(75000),
        unlocked() {
          return hasUpgrade("s", 22)
        },
      },
      24: {
        title: "Press F to pay respects",
        description: "6x Stat gain",
        cost: new OmegaNum(100000),
        unlocked() {
          return hasUpgrade("s", 22)
        },
      },
      31: {
        title: "Pretty big bonus",
        description: "50x Stat gain",
        cost: new OmegaNum(60000000),
        unlocked() {
          return hasUpgrade("s", 22)
        },
      },
      32: {
        title: "Bonus Stats",
        description: "4.25x Stat gain",
        cost: new OmegaNum(200000000),
        unlocked() {
          return hasUpgrade("s", 22)
        },
      },
      
    },
    branches: ["xp", "e"],
    
    
    softcap: new ExpantaNum("ee50"),
    softcapPower: 0.25,
    midsection: [["display-text", function() {
      return `You have ${format(player.s.points.div(new ExpantaNum(10).pow(player.s.points.add(1).logBase(10).floor())))} ${getStatName(player.s.points.add(1).logBase(10))}`
    }]],
    passiveGeneration() {
      return hasMilestone("xp", 3) / 10
    },
})

addLayer("a", {
        startData() { return {
            unlocked: true,
			points: new OmegaNum(0),
        }},
        color: "yellow",
        resource: "achievements", 
        row: "side",
        tooltip() { // Optional, tooltip displays when the layer is locked
            return ("Achievements")
        },
        achievementPopups: true,
        achievements: {
            11: {
                name: "We must start somewhere",
                done() {return player.m.points.gte(1)},
                tooltip: "Get a multipler.", // Showed when the achievement is completed
                onComplete() {player.a.points = player.a.points.add(1)}
            },
            12: {
                name: "Rebirths",
                done() {return player.r.points.gte(1)},
                tooltip: "Get a rebirth.", // Showed when the achievement is completed
                onComplete() {player.a.points = player.a.points.add(1)},
            },
            13: {
                name: "Super Multi???",
                done() {return player.x.points.gte(1)},
                tooltip: "Get a super multipler", // Showed when the achievement is completed
                onComplete() {player.a.points = player.a.points.add(1)}
            },
            14: {
                name: "Exponents!",
                done() {return player.e.points.gte(1)},
                tooltip: "Get an exponent", // Showed when the achievement is completed
                onComplete() {player.a.points = player.a.points.add(1)}
            },
            15: {
                name: "Impossible?",
                done() {return player.e.points.gte(4)},
                tooltip: "Get 4 exponents", // Showed when the achievement is completed
                onComplete() {player.a.points = player.a.points.add(1)}
            },
            21: {
                name: "Level Up!",
                done() {return player.xp.points.gte(1)},
                tooltip: "Get 1 XP", // Showed when the achievement is completed
                onComplete() {player.a.points = player.a.points.add(1)}
            },
            22: {
                name: "Level 5 is a lot",
                done() {return getBuyableAmount("xp", 11).gte(5)},
                tooltip: "Reach level 5", // Showed when the achievement is completed
                onComplete() {player.a.points = player.a.points.add(1)}
            },
            23: {
                name: "Looks Impossible",
                done() {return getBuyableAmount("xp", 11).gte(10)},
                tooltip: "Reach level 10", // Showed when the achievement is completed
                onComplete() {player.a.points = player.a.points.add(1)}
            },
            24: {
                name: "25!",
                done() {return getBuyableAmount("xp", 11).gte(25)},
                tooltip: "Reach level 25", // Showed when the achievement is completed
                onComplete() {player.a.points = player.a.points.add(1)}
            },
            25: {
                name: "Max level",
                done() {return getBuyableAmount("xp", 11).gte(99)},
                tooltip: "Reach level 99", // Showed when the achievement is completed
                onComplete() {player.a.points = player.a.points.add(1)}
            },
            31: {
                name: "🅱️",
                done() {return player.s.points.gte(10)},
                tooltip: "Reach b", // Showed when the achievement is completed
                onComplete() {player.a.points = player.a.points.add(1)}
            },
            32: {
                name: "Isn't it thousand?",
                done() {return player.s.points.gte(1000)},
                tooltip: "Reach d", // Showed when the achievement is completed
                onComplete() {player.a.points = player.a.points.add(1)}
            },
            33: {
                name: "Press F",
                done() {return player.s.points.gte(100000)},
                tooltip: "Reach f", // Showed when the achievement is completed
                onComplete() {player.a.points = player.a.points.add(1)}
            },
            34: {
                name: "Is it grams or millions?",
                done() {return player.s.points.gte(1000000)},
                tooltip: "Reach g", // Showed when the achievement is completed
                onComplete() {player.a.points = player.a.points.add(1)}
            },
            35: {
                name: "Why is it trillions?",
                done() {return player.s.points.gte(1000000000000)},
                tooltip: "Reach m", // Showed when the achievement is completed
                onComplete() {player.a.points = player.a.points.add(1)}
            },
            
        },
})
