var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'gameDiv');
game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
game.scale.pageAlignHorizontally = true;
game.scale.pageAlignVertically = true;

//adding states
game.state.add('load', load);
game.state.add('menu', menuState);
game.state.add('controls', controlsState);
game.state.add('play', playState);
game.state.add('end', endState);

game.state.start('load'); //start at load