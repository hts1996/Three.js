import React, { useEffect, useState } from 'react';
import { Engine, Render, World, Bodies, MouseConstraint, Mouse, Body } from 'matter-js';
import './Pinball.module.css'
const width = window.innerWidth;
const height = window.innerHeight;

function App() {
  console.log(width, height);
  const [balls, setBalls] = useState([]);
  const [isGroundRemoved, setIsGroundRemoved] = useState(false);
  let engine, render;

  useEffect(() => {
    // Create a Matter.js engine
    engine = Engine.create({});

    // 중력 설정
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0.5;

    // Create a renderer
    render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight*5,
        wireframes: false,
        background: "white"

      }
    });



    // Create ground
    const ground = Bodies.rectangle(width, height*5, width*2, 40, { isStatic: true,render: {
      fillStyle: '#ffcc00', // 노란색으로 색칠
      strokeStyle: 'transparent', // 테두리를 투명하게
  } });
  const wall1 = Bodies.rectangle(width, height, 40, height*10, { isStatic: true,render: {
    fillStyle: 'blue', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });
const wall2 = Bodies.rectangle(0, 0, 40, height*10, { isStatic: true,render: {
    fillStyle: 'green', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });
const wall3 = Bodies.rectangle(0, 0, width*2, 40, { isStatic: true,render: {
    fillStyle: 'red', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });
const wall4 = Bodies.rectangle(width/2, height/2, width, 40, { isStatic: true,render: {
  fillStyle: '#ffcc00', // 노란색으로 색칠
  strokeStyle: 'transparent', // 테두리를 투명하게
} });

    // Create balls array
    const Color = ['red', 'green', 'blue', 'aqua', 'yellow', 'green', 'purple', 'grey'];
    const X = [width / 10, width * 3 / 10, width * 5 / 10, width * 7 / 10, width * 9 / 10];
    const Y = [height / 10];
    // Listen for mouse clicks to create balls
    const clickEvent = (function() {
      if ('ontouchstart' in document.documentElement === true) {
        return 'touchstart';
      } else {
        return 'click';
      }
    })();
    render.canvas.addEventListener(clickEvent, () => {
      for (let i = 0; i < 10; i++) {
        const ball = Bodies.circle(X[Math.floor(Math.random() * X.length)], Y[0], 16.5, {
          restitution: 1,
          friction: 0.001,
          density: 1,
          isStatic: false,
          render: {
            fillStyle: Color[Math.floor(Math.random() * Color.length)],
            strokeStyle: 'white',
            lineWidth: 3,
          },
        });
        balls.push(ball);
        World.add(engine.world, ball);
      }
    });

    // Add ground to the world
    const Boundary=[wall4,wall1,wall2,wall3,ground]
    World.add(engine.world, Boundary);

    // Run the engine and renderer
    Engine.run(engine);
    Render.run(render);
  }, []);

  const removeGround = () => {
    if (!isGroundRemoved) {
      World.remove(engine.world, engine.world.bodies[0]); // Remove the first body (ground)
      setIsGroundRemoved(true);

      // Adjust ball properties to make them fall down
      balls.forEach(ball => {
        Body.set(ball, { isStatic: false });
      });

      Engine.update(engine, 1000 / 60); // Manually update the engine to apply changes
    }
  }
  

  return (
    <div id="canvas">
      <button onClick={removeGround}>Remove Ground</button>
    </div>
  );
}

export default App;
