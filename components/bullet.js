AFRAME.registerComponent("bullet", {
  init: function () {
    this.velocity = new CANNON.Vec3(0, 0, -10);
    this.el.addEventListener("body-loaded", () => {
      this.el.body.velocity.set(
        this.velocity.x,
        this.velocity.y,
        this.velocity.z
      );
    });
  },
  tick: function () {
    if (this.velocity !== null && this.el.body) {
            const sceneEl = this.el.sceneEl;
    const cameraEl = sceneEl.querySelector("[camera]");
      const cameraPosition = new THREE.Vector3();
      const cameraDirection = new THREE.Vector3();

      // Get the camera's position and direction
      cameraEl.object3D.getWorldPosition(cameraPosition);
      cameraEl.object3D.getWorldDirection(cameraDirection);
        const speed = 30;
        console.log(cameraDirection);
      this.el.body.velocity.set(
        cameraDirection.x * speed,
        cameraDirection.y * speed,
        cameraDirection.z * speed
      );
    }
  },
});

AFRAME.registerComponent("shooter", {
  init: function () {
    // Listen for the 'v' key press
    window.addEventListener("keydown", (event) => {
      if (event.key === "v" || event.key === "V") {
        this.shootBullet();
      }
    });
  },
  shootBullet: function () {
    const sceneEl = this.el.sceneEl;
    const cameraEl = sceneEl.querySelector("[camera]");
    const bulletEl = document.createElement("a-sphere");
    const cameraPosition = new THREE.Vector3();
    const cameraDirection = new THREE.Vector3();

    // Get the camera's position and direction
    cameraEl.object3D.getWorldPosition(cameraPosition);
    cameraEl.object3D.getWorldDirection(cameraDirection);

    // Set bullet attributes
    bulletEl.setAttribute("radius", "0.1");
    bulletEl.setAttribute("color", "#FF0000");
    bulletEl.setAttribute(
      "position",
      `${cameraPosition.x} ${cameraPosition.y} ${cameraPosition.z}`
    );
    bulletEl.setAttribute("dynamic-body", "mass: 0.3");
    bulletEl.setAttribute("bullet", "");

    // Append bullet to the scene
    sceneEl.appendChild(bulletEl);

  },
});
