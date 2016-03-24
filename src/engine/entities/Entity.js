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

	movementForward(amount) {
		return {
			x: -Math.sin(this.rotation) * amount,
			y: Math.cos(this.rotation) * amount
		};
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

	getHealthRatio() {
		return (this.maxHealth <= 0) ? 0 : this.health / this.maxHealth;
	}

	removeHealth(hit) {
		this.health-=hit;
		if (this.health > 0) {
			// Dispatch event
			this.dispatchEvent(EVENTS.HEALTH_UPDATED, {health: this.health});
			
		} else {
			// Dispatch event
			this.dispatchEvent(EVENTS.DIED);
		}
	}

	isAlive() {
		return this.health > 0;
	}

	getLevel() {
		let l = this.parent, iters = 0;
		while(!(l instanceof Level)) {
			l = l.parent;
			iters++;
			if(iters > 10) { return undefined; }
		}
		return l;
	}
}