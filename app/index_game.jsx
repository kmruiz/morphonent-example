import { element, transition, renderOn } from 'morphonent'

function popup(content) {
    return element('div', { class: 'popup-holder' }, element('div', { class: 'popup' }, content))
}

const sleep = async (time) => await new Promise(r => setTimeout(r, time))
const playerWonTurn = async (player1, player2, winner) => {
    return transition(
        element('div', {}, game(player1, player2, 'TX'), popup('Player ' + winner + ' won turn.')),
        sleep(1000).then(() => game(player1, player2, 'DRAW1'))
    )
}

function initialDraw(player) {
    player.deck.sort((a, b) => (a * Math.random()) - (b * Math.random()));

    for (let i = 0; i < 4; i++) {
        player = draw(player)
    }

    return player;
}

function draw(player) {
    const cardToAdd = player.deck.splice(0, 1)
    const newHand = player.hand.concat([cardToAdd])

    return { ...player, hand: newHand }
}

function card(strength, {onPlay}) {
    return element('button', { onclick: () => onPlay(strength)}, 'S: ' + strength);
}

function hand(player, events) {
    return element('ul', {}, player.hand.map(cardInfo => element('li', {}, card(cardInfo, events))))
}

function deck(player, {onDraw}) {
    return element('button', { onclick: () => onDraw(player) }, 'Draw Card (' + player.deck.length + ' remaining)')
}

function score(player) {
    return element('div', {}, element('u', {}, player.name), ': ', element('b', {}, player.score))
}

function playedCard(player) {
    return element('div', {}, player.play ? 'Playing: ' + player.play : '')
}

function player(playerInfo, events) {
    return element('div', {},
        hand(playerInfo, events), score(playerInfo), playedCard(playerInfo), deck(playerInfo, events)
    )
}

function play(player, playedCard) {
    const cardIndex = player.hand.indexOf(playedCard);
    player.hand.splice(cardIndex, 1);

    return { ...player, play: playedCard, hand: player.hand };
}

function winner(player) {
    return element('h1', {}, player.name + ' won!');
}

function game(firstPlayer, secondPlayer, turnInfo) {
    if (firstPlayer.play && secondPlayer.play) {
        if (firstPlayer.play < secondPlayer.play) {
            secondPlayer.score += +secondPlayer.play;
            firstPlayer.play = secondPlayer.play = undefined;
            return playerWonTurn(firstPlayer, secondPlayer, secondPlayer.name)
        } else if (firstPlayer.play > secondPlayer.play) {
            firstPlayer.score += +firstPlayer.play;
            firstPlayer.play = secondPlayer.play = undefined;
            return playerWonTurn(firstPlayer, secondPlayer, firstPlayer.name)
        }
    }

    if (firstPlayer.score > 10) {
        return winner(firstPlayer);
    } else if (secondPlayer.score > 10) {
        return winner(secondPlayer);
    }

    const keepItLikeThat = () => game(firstPlayer, secondPlayer, turnInfo)
    return element('div', {},
        element('h1', {}, 'Current turn: ', element('u', {}, turnInfo)),
        player(firstPlayer, { onDraw: () => {
            if (turnInfo === 'DRAW1'){
                return game(draw(firstPlayer), secondPlayer, 'PLAY1')
            } else {
                return keepItLikeThat();
            }
        }, onPlay: (playedCard) => {
            if (turnInfo === 'PLAY1') {
                return game(play(firstPlayer, playedCard), secondPlayer, 'DRAW2')
            } else {
                return keepItLikeThat();
            }
        }}),
        player(secondPlayer, { onDraw: () => {
            if (turnInfo === 'DRAW2'){
                return game(firstPlayer, draw(secondPlayer), 'PLAY2')
            } else {
                return keepItLikeThat();
            }
        }, onPlay: (playedCard) => {
            if (turnInfo === 'PLAY2') {
                return game(firstPlayer, play(secondPlayer, playedCard), 'DRAW1')
            } else {
                return keepItLikeThat();
            }
        }})
    )
}

window.onload = function () {
    const arrayOf20Cards = () => [...Array(20).keys()].map(e => e + 1)

    const player1Data = {
        name: 'Foo',
        hand: [],
        deck: arrayOf20Cards(),
        play: undefined,
        score: 0
    }

    const player2Data = {
        name: 'Bar',
        hand: [],
        deck: arrayOf20Cards(),
        play: undefined,
        score: 0
    }

    renderOn('body', game(initialDraw(player1Data), initialDraw(player2Data), 'DRAW1'));
}