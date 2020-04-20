import { element, renderOn, listeningTo, dispatch } from 'morphonent'

function _svg(name, props) {
    return element({ name, namespace: "http://www.w3.org/2000/svg"}, props, [].concat.apply([], Array.from(arguments).slice(2)))
}

function svg({ width, height }) {
    return _svg('svg', { width, height }, ...Array.prototype.slice.bind(arguments)(1))
}

function line({ from, to, style }) {
    return _svg('line', { x1: from.x, y1: from.y, x2: to.x, y2: to.y, ...style })
}

function rect({ position, width, height, style }) {
    return _svg('rect', { ...position, width, height, ...style })
}

function circle({ position, radius, style }) {
    return _svg('circle', { cx: position.x, cy: position.y, r: radius, ...style })
}

function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * (-angle),
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

function hourMarks(cx, cy, r, l) {
    let ret = []
    const baseFrom = { x: cx, y: cy }
    const baseTo = { x: cx, y: cy - r - l}

    for (let i = 0; i < 12; i++) {
        const [ rx, ry ] = rotate(baseFrom.x, baseFrom.y, baseTo.x, baseTo.y, i * 30.0)

        ret = ret.concat({ from: baseFrom, to: {x: rx, y: ry }})
    }

    return ret
}

const markLine = (mark, index) => line({ from: mark.from, to: mark.to, style: { stroke: "black", "stroke-width": index % 3 === 0 ? "4px" : "2px" }})
function clock(hour, minute, seconds) {
    if (seconds === 60) {
        return clock(hour, minute + 1, 0)
    }

    if (minute === 60) {
        return clock(hour + 1, 0, 0)
    }

    if (hour === 12) {
        return clock(0, 0, 0)
    }

    const [ rsx, rsy ] = rotate(500, 500, 500, 230, seconds * 6.0);
    const [ rmx, rmy ] = rotate(500, 500, 500, 300, minute * 6.0);
    const [ rhx, rhy ] = rotate(500, 500, 500, 380, hour * 30.0);
    
    return listeningTo({ 'tick': () => clock(hour, minute, seconds + 1) },
        svg({ width: 1000, height: 1000 },
            [
                circle({ position: { x: 500, y: 500 }, radius: 300, style: { stroke: "black", "stroke-width": "12px", fill: "white" }}),
                // ...hourMarks(500, 500, 280, 20).map(markLine),
                line({ from: { x: 500, y: 500 }, to: { x: rhx, y: rhy }, style: { stroke: "black", "stroke-width": "16px" }}),
                line({ from: { x: 500, y: 500 }, to: { x: rmx, y: rmy }, style: { stroke: "black", "stroke-width": "8px" }}),
                circle({ position: { x: 500, y: 500 }, radius: 10, style: { stroke: "gold", "stroke-width": "1px", fill: "gold" }}),
                line({ from: { x: 500, y: 500 }, to: { x: rsx, y: rsy }, style: { stroke: "red", "stroke-width": "4px"}}),
            ]
        ))
}

window.onload = function () {
    const time = new this.Date()
    renderOn('body', clock((time.getHours() % 12), time.getMinutes(), time.getSeconds() + 1))
    this.setInterval(() => dispatch('tick'), 1000)
}