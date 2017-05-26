// view层，根据model的数据变化改变用户相应的用户界面
var view = {
    displayMessage: function ( msg ) {
        var messageArea = document.getElementById( "messageArea" );
        messageArea.innerHTML = msg;
    },
    displayHit: function ( location ) {
        var cell = document.getElementById( location );
        cell.setAttribute( "class", "hit" );
    },
    displayMiss: function ( location ) {
        var cell = document.getElementById( location );
        cell.setAttribute( "class", "miss " );
    }
};


// model层，核心数据层
var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [
        {
            locations: [ 0, 0, 0 ],
            hits: [ "", "", "" ]
        },
        {
            locations: [ 0, 0, 0 ],
            hits: [ "", "", "" ]
        },
        {
            locations: [ 0, 0, 0 ],
            hits: [ "", "", "" ]
        }
	],

    fire: function ( guess ) {
        for ( var i = 0; i < this.numShips; i++ ) {
            var ship = this.ships[ i ];
            var index = ship.locations.indexOf( guess );
            if ( index >= 0 ) {
                ship.hits[ index ] = "hit";
                view.displayHit( guess );
                view.displayMessage( "击中一艘！" );
                if ( this.isSunk( ship ) ) {
                    view.displayMessage( "你击落了舰队！" );
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss( guess );
        view.displayMessage( "遗憾，未命中……" );
        return false;
    },

    // 这个方法作用于fire内，作用是判断船是否被被击中3次，即沉没。需要的参数是对象Ships的实例ship
    isSunk: function ( ship ) {
        for ( var i = 0; i < this.shipLength; i++ ) {
            if ( ship.hits[ i ] !== "hit" ) {
                return false;
            }
        }
        return true;
    },

    // 生成船的位置
    generateShipLocations: function () {
        var locations;
        for ( var i = 0; i < this.numShips; i++ ) {
            do {
                locations = this.generateShip();
            } while ( this.collosion( locations ) );
            this.ships[ i ].locations = locations;
        }
    },

    generateShip: function () {
        var direction = Math.floor( Math.random() * 2 );
        var row, col;

        if ( direction === 1 ) {
            row = Math.floor( Math.random() * this.boardSize );
            col = Math.floor( Math.random() * ( this.boardSize - this.shipLength ) );
        } else {
            row = Math.floor( Math.random() * ( this.boardSize - this.shipLength ) );
            col = Math.floor( Math.random() * this.boardSize );
        }
        var newShipLocations = [];
        for ( var i = 0; i < this.shipLength; i++ ) {
            if ( direction === 1 ) {
                newShipLocations.push( row + "" + ( col + i ) );
            } else {
                newShipLocations.push( ( row + i ) + "" + col );
            }
        }
        return newShipLocations;
    },

    collosion: function ( locations ) {
        for ( var i = 0; i < this.numShips; i++ ) {
            var ship = model.ships[ i ];
            for ( var j = 0; j < locations.length; j++ ) {
                if ( ship.locations.indexOf( locations[ j ] ) >= 0 ) {
                    return true;
                }
            }
        }
        return false;
    }
};

// controller层，操控model层的数据，无论是输入model的还是从model输出的
var controller = {
    guesses: 0,

    processGuess: function ( guess ) {
        var location = parseGuess( guess );
        if ( location ) {
            this.guesses++;
            var hit = model.fire( location );
            if ( hit && model.shipsSunk === model.numShips ) {
                view.displayMessage( "你击沉了全部战船，总共猜了 " + this.guesses + " 次！" );

            }
        }
    }
};

// 过滤并转换用户输入的位置
function parseGuess( guess ) {
    var alphabet = [ "A", "B", "C", "D", "E", "F", "G" ];

    if ( guess === null || guess.length !== 2 ) {
        alert( "哦豁，请输入一个字母加一个数字！" );
    } else {
        firstChar = guess.charAt( 0 );
        var row = alphabet.indexOf( firstChar );
        var column = guess.charAt( 1 );

        if ( isNaN( row ) || isNaN( column ) ) {
            alert( "哦豁，输入的坐标不合法！" );
        } else if ( row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize ) {
            alert( "哦豁，超出坐标范围！" );
        } else {
            return row + column;
        }
    }
    return null;
}


// event handler

// 作用：获得用户的输入，再传入controller层
function handleFireButton() {
    var guessInput = document.getElementById( "guessInput" );
    var guess = guessInput.value;
    controller.processGuess( guess );

    // 重置输入框的位置
    guessInput.value = "";
}

function handleKeyPress( e ) {
    var fireButton = document.getElementById( "fireButton" );

    // 为了预防IE9及以下版本不能正确传递事件对象给事件操作，加上window.event
    e = e || window.event;

    if ( e.keyCode === 13 ) {
        fireButton.click();
        return false;
    }
}



// 等页面加载完全后，运行 init 函数（相当于启动程序）
window.onload = init;

function init() {
    // 用DOM获得button，鼠标点击触发事件函数
    var fireButton = document.getElementById( "fireButton" );
    fireButton.onclick = handleFireButton;

    // 如果输入位置后直接点的return建，则触发相应事件函数
    var guessInput = document.getElementById( "guessInput" );
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocations();
}
