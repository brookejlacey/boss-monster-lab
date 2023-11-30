const heroes = [
    {
        name: 'Slate Slabrock',
        type: 'dwarf',
        damage: 5,
        health: 100,
        maxHealth: 100,
        level: 0,
        base_damage: 5,
        damage_growth: 1,
        base_hp: 100,
        hp_growth: 10
    },
    {
        name: 'Flint Ironstag',
        type: 'elf',
        damage: 10,
        health: 50,
        maxHealth: 50,
        level: 0,
        base_damage: 10,
        damage_growth: 2,
        base_hp: 50,
        hp_growth: 5
    }
]

const boss = {
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 0
}

let gameRunning = true
let gold = 0

function attackBoss() {
    if (gameRunning) {
        let damage = 0
        let aliveHeroes = heroes.filter(hero => hero.health > 0)
        aliveHeroes.forEach(hero => damage += hero.damage);
        // console.log('before', boss.health);
        boss.health -= damage
        // console.log('after', boss.health);
        if (boss.health < 0) boss.health = 0
        bossHealthBar()
        checkOutcome()
    }
}

function bossAttack() {
    console.log('Boss Attack')
    heroes.forEach(hero => {
        // console.log('before', hero.name, hero.health)
        hero.health -= boss.damage
        if (hero.health < 0) hero.health = 0
        // console.log('after', hero.health)
        updateParty()
        checkOutcome()
    })


}
function bossHealthBar() {
    let hpRatio = (boss.health / boss.maxHealth) * 100
    let hpELM = document.getElementById('bossHP')
    hpELM.style = `width:${hpRatio}%;`
}
function checkOutcome() {
    let partyHealth = 0
    let message = ''
    let message2 = ''

    heroes.forEach(hero => partyHealth += hero.health)
    if (boss.health == 0) {
        message = 'You Win'
        message2 = 'Continue? y/n'
        bossLevelUp()
        loot()
    }
    if (partyHealth == 0) {
        message = 'You Loser'
        message2 = 'restart? y/n'
        bossReset()
    }
    // TODO prompt reset or continue
    // if (message) {
    //     gameRunning = false
    //     clearInterval(game)
    //     setTimeout(() => {
    //         window.alert(message)
    //         let input = window.prompt(message2)
    //     }, 500)
    //     if (input == 'y') {
    //         gameRunning = true
    //     }
    //     else (window.close)
    // }
}

function bossLevelUp() {
    boss.level++
    boss.maxHealth += (boss.level * 10)
    boss.health = boss.maxHealth
    boss.damage += boss.level
    console.log(boss)
}

function bossReset() {
    boss.health = 100
    boss.maxHealth = 100
    boss.damage = 5
    boss.level = 0
}

function loot() {
    gold += (boss.level * 10)
    updateParty()
}

function heal(name) {
    let hero = heroes.find(hero => hero.name == name)
    let hpDiff = hero.maxHealth - hero.health
    if (gold >= (hpDiff / 2)) {
        gold -= (hpDiff / 2)
        hero.health += (hpDiff)
    }
    if (2 * gold > hero.maxHealth) {
        hero.health += 2 * gold
    }
    if (hero.health > hero.maxHealth) hero.health = hero.maxHealth
    updateParty()
}

function updateParty() {
    heroes.forEach(hero => {
        let heroElm = document.getElementById(hero.name)
        heroElm.querySelector('.hp').innerText = `HP: ${hero.health}`
        document.getElementById('gold').innerText = `Gold: ${gold}`
    })
}

function heroLeveling(hero) {
    hero.level++
    hero.maxHealth = hero.base_hp + (hero.level * hero.hp_growth)
    hero.health = hero.maxHealth
    hero.damage = hero.base_damage + (hero.level * hero.damage_growth)
}


let game = setInterval(bossAttack, 1000)