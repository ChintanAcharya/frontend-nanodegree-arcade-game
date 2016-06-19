// Enemies our player must avoid

const locations = [
    [ [0, -10], [0, 60], [0, 145], [0, 230], [0, 315], [0, 400] ],
    [ [100, -10], [100, 60], [100, 145], [100, 230], [100, 315], [100, 400] ],
    [ [200, -10], [200, 60], [200, 145], [200, 230], [200, 315], [200, 400] ],
    [ [300, -10], [300, 60], [300, 145], [300, 230], [300, 315], [300, 400] ],
    [ [400, -10], [400, 60], [400, 145], [400, 230], [400, 315], [400, 400] ],
    [ [500, -10], [500, 60], [500, 145], [500, 230], [500, 315], [500, 400] ]
];

var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    if (speed === undefined)
        this.speed = Math.random() * 200 + 100;
    else
        this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    const rightBound = 600;
    if (this.x > rightBound)
    {
        this.x = (Math.random() * 100 + 50) * -1;
        this.speed = Math.random() * 200 + 100;
    }
    this.x += dt * this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.x = locations[x][y][0];
    this.y = locations[x][y][1];
    //TODO: add row and column identifiers
    this.gridX = x;
    this.gridY = y;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    //TODO: Improve collision detection

    if ( this.y < 60 ) {
        this.reset();
        this.score++;
    }

    for (var i in allEnemies) {
        var enemyLocX = allEnemies[i].x;
        var enemyLocY = allEnemies[i].y;

        if ( ( enemyLocX > this.x - 75 && enemyLocX < this.x + 75) &&
             ( enemyLocY === this.y ) )
        {
            //collision
            this.reset();
            this.resetScore();
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    var currentX = this.gridX;
    var currentY = this.gridY;
    var newX = currentX;
    var newY = currentY;
    switch (keyCode) {
        case "left":
            newX = currentX - 1;
            break;

        case "up":
            newY = currentY - 1;
            break;

        case "right":
            newX = currentX + 1;
            break;

        case "down":
            newY = currentY + 1;
            break;
    }
    this.moveToLoc(newX, newY);
};

Player.prototype.moveToLoc = function (x, y) {
    if (x < 0 || x > 4 || y > 5) {
        this.reset();
    }
    else {
        this.x = locations[x][y][0];
        this.y = locations[x][y][1];
        this.gridX = x;
        this.gridY = y;
    }
};

Player.prototype.reset = function() {
    this.x = locations[2][5][0];
    this.y = locations[2][5][1];
    this.gridX = 2;
    this.gridY = 5;
};

Player.prototype.resetScore = function () {
    this.score = 0;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [
    new Enemy(600 * Math.random(), 60),
    new Enemy(600 * Math.random(), 145),
    new Enemy(600 * Math.random(), 230),
    new Enemy(600 * Math.random(), 315)
];
player = new Player(2, 5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
