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

const map = [
    ['-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-',' ','-','-',' ','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-']
]

const boundaries = [];

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

boundaries.forEach(boundary => {boundary.draw()})