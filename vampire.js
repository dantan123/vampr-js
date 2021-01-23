class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while(currentVampire.creator) {
      numberOfVampires++;
      currentVampire = currentVampire.creator;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    // if two same vampires
    if (this === vampire) {
      return this;
    }

    // direct ancesor case
    if (this.hasChildren(vampire)) {
      return this;
    }
    if (vampire.hasChildren(this)) {
      return vampire;
    }

    // non-direct case
    let ancestor = this;
    while (ancestor !== null) {
      if (ancestor.hasChildren(vampire)) {
        return ancestor;
      }
      ancestor = ancestor.creator;
    }
  }

  // BFS search
  hasChildren(vampire) {
    let queue = [this];
    let currentVampire;

    while (queue.length !== 0) {
      currentVampire = queue.shift();
      if (currentVampire.offspring.includes(vampire)) {
        return this;
      }
      queue = queue.concat(currentVampire.offspring);
    }
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (const child of this.offspring) {
      if (child.name === name) {
        return child;
      }
      if (child.vampireWithName(name) !== null) {
        return child.vampireWithName(name);
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;
    for (const child of this.offspring) {
      count += child.totalDescendents + 1;
    }
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = [];
    for (const child of this.offspring) {
      if (child.yearConverted > 1980) {
        millenials.push(child);
      }
      millenials = millenials.concat(child.allMillennialVampires);
    }
    return millenials;
  }
}

module.exports = Vampire;