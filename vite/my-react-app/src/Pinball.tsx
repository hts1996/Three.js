import React, { useEffect } from 'react';
import { Engine, Render, World, Bodies, MouseConstraint, Mouse } from 'matter-js';
import './Pinball.css'
const width = window.innerWidth;
const height = window.innerHeight;
function App() {
  useEffect(() => {
    // Create a Matter.js engine
    const engine = Engine.create({});

    // Create a renderer
    const render = Render.create({
      element: document.body,
      engine: engine,
      options: {
          width: window.innerWidth,
          height: window.innerHeight,
          wireframes: false,
          
      }
  });

    // Create a mouse and add mouse interaction
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        }
      }
    });

    // Add mouse constraint to the world
    World.add(engine.world, mouseConstraint);

    // Create ground

    console.log(width,height  )
    const ground = Bodies.rectangle(width, height, width*2, 40, { isStatic: true,render: {
      fillStyle: '#ffcc00', // 노란색으로 색칠
      strokeStyle: 'transparent', // 테두리를 투명하게
  } });
  const wall1 = Bodies.rectangle(width, height, 40, height*2, { isStatic: true,render: {
    fillStyle: '#ffcc00', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });
const wall2 = Bodies.rectangle(0, 0, 40, height*2, { isStatic: true,render: {
    fillStyle: '#ffcc00', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });
const wall3 = Bodies.rectangle(0, 0, width*2, 40, { isStatic: true,render: {
    fillStyle: '#ffcc00', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });
const wall4 = Bodies.circle(width/2, height/2, 100, { isStatic: true,render: {
    fillStyle: '#ffcc00', // 노란색으로 색칠
    strokeStyle: 'transparent', // 테두리를 투명하게
} });

    // Create cup-shaped boundary using vertices

    // Create balls array
    function rand(min:number, max:number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const balls = [];
    const Color=['red','green','blue','white','yellow','green','purple','grey']

    // Listen for mouse clicks to create balls
    render.canvas.addEventListener('mousedown', () => {
      for (let i = 0; i < 10; i++) {
      const ball = Bodies.circle(mouse.position.x, mouse.position.y, 50, {
          restitution: 0.5,
          friction: 0.01,
          density: 0.04,
          isStatic: false,
          render: {
          fillStyle: Color[rand(0,7)], // 공의 색상을 빨간색으로 설정
          strokeStyle: 'transparent', // 테두리를 투명하게
      },
      });
      balls.push(ball);
      World.add(engine.world, ball);
  }});

    // Add all bodies to the world
    const Boundary=[ground,wall1,wall2,wall3,wall4]
    World.add(engine.world, Boundary);

    // Run the engine and renderer
    Engine.run(engine);
    Render.run(render);

    // Cleanup when the component unmounts
    return () => {
      Render.stop(render);
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div id="canvas"></div>
  );
}

export default App;
