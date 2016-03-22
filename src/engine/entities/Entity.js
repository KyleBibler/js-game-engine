"use strict";

var ROTATION = {
	S: 0,
	SW: Math.PI/4,
	W: Math.PI/2,
	NW: 3 * Math.PI/4,
	N: Math.PI,
	NE: 5 * Math.PI/4,
	E: 3 * Math.PI/2,
	SE: 7 * Math.PI/4
};

class Entity extends AnimatedSprite {
	constructor(id, health, idle) {
		super(id, idle);
		this.maxHealth = health;
		this.health = health;
		this.xMovement = 0;
		this.yMovement = 0;
	}

	update(pressedKeys) {
		// Update animated sprite
		super.update(pressedKeys);
	}

	addToMovement(x, y) {
		this.xMovement += x;
		this.yMovement += y;
	}

	resetMovement() {
		this.xMovement = 0;
		this.yMovement = 0;
	}

	move() {
		this.setPosition({x: this.position.x + this.xMovement, y: this.position.y + this.yMovement});
		this.resetMovement();
	}

	draw(g) {
		// Draw animated sprite
		super.draw(g);
	}

	isAlive() {
		return this.health > 0;
	}

	getLevel() {
		let l = this.parent;
		while(typeof this.parent !== "Level") {
			l = l.parent;
		}
		return l;
	}
}