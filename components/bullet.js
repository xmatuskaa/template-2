AFRAME.registerComponent("bullet", {
  init: function () {
  }
});

AFRAME.registerComponent("shooter", {
  init: function () {
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

    cameraEl.object3D.getWorldPosition(cameraPosition);
    cameraEl.object3D.getWorldDirection(cameraDirection);

    bulletEl.setAttribute("radius", "0.1");
    bulletEl.setAttribute("color", "#FF0000");
    bulletEl.setAttribute(
      "position",
      `${cameraPosition.x} ${cameraPosition.y} ${cameraPosition.z}`
    );
    bulletEl.setAttribute("dynamic-body", "mass: 0.3");
    bulletEl.setAttribute("bullet", "");
    sceneEl.appendChild(bulletEl);

    bulletEl.addEventListener("body-loaded", () => {
      setTimeout(() => {
        const speed = -30;
        bulletEl.body.velocity.set(
          cameraDirection.x * speed,
          cameraDirection.y * speed,
          cameraDirection.z * speed
        );
      }, 100); 
    });
  },
});
