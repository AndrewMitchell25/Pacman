const pacCanvas = document.getElementById("pacCanvas");
const c = pacCanvas.getContext('2d');

pacCanvas.width = innerWidth;
pacCanvas.height = innerHeight;

class Boundary{
    static width = 40;
    static height = 40;
    constructor({position}){
        this.position = position;
        this.width = Boundary.width;
        this.height = Boundary.height;
    }

    draw(){
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Player{
    constructor({position, velocity}){
        this.position = position;
        this.veloctiy = velocity;
        this.radius = 15;
    }

    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
        c.fillStyle = 'yellow';
        c.fill();
        c.closePath();
    }

    update(){
        this.draw();
        this.position.x += this.veloctiy.x;
        this.position.y += this.veloctiy.y;
    }
}

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const map = [
    ['-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-',' ','-','-',' ','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-']
]

const boundaries = [];
const player = new Player({position: {x: Boundary.width + Boundary.width/2, y: Boundary.height + Boundary.height/2}, velocity: {x: 0, y: 0}});

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch(symbol){
            case '-':
                boundaries.push(new Boundary({position: {x: j * Boundary.width, y: i * Boundary.height}}));
                break;
            case ' ':
                break;
        }
    });
});

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, pacCanvas.width, pacCanvas.height);
    boundaries.forEach(boundary => {boundary.draw()})
    player.update();
}

window.addEventListener('keydown', ({key}) => {
    switch(key){
        case 'w':
            player.veloctiy.y = -5;
            break;
        case 'a':
            player.veloctiy.x = -5;
            break;
        case 's':
            player.veloctiy.y = 5;
            break;
        case 'd':
            player.veloctiy.x = 5;
            break;
    }
});

animate();