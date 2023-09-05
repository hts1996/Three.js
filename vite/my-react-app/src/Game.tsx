import React, { useEffect, useState } from 'react';
import { Engine, Render, World, Bodies, MouseConstraint, Mouse, Body } from 'matter-js';
import './Pinball.css';
const width = window.innerWidth;
const height = window.innerHeight;

function App() {
  const [balls, setBalls] = useState([]);
  const [isGroundRemoved, setIsGroundRemoved] = useState(false);
  let engine, render;
  let lowestBall = undefined;

  useEffect(() => {
    engine = Engine.create({});
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0.2;

    render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight * 5,
        wireframes: false,
        background: 'white',
      },
    });

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    World.add(engine.world, mouseConstraint);

    const ground = Bodies.rectangle(width, height * 5, width * 2, 40, {
      isStatic: true,
      render: {
        fillStyle: '#ffcc00',
        strokeStyle: 'transparent',
      },
    });

    const wall1 = Bodies.rectangle(width, height, 40, height * 10, {
      isStatic: true,
      render: {
        fillStyle: 'blue',
        strokeStyle: 'transparent',
      },
    });

    const wall2 = Bodies.rectangle(0, 0, 40, height * 10, {
      isStatic: true,
      render: {
        fillStyle: 'green',
        strokeStyle: 'transparent',
      },
    });

    const wall3 = Bodies.rectangle(0, 0, width * 2, 40, {
      isStatic: true,
      render: {
        fillStyle: 'red',
        strokeStyle: 'transparent',
      },
    });

    const wall4 = Bodies.rectangle(width / 2, height / 2, width, 40, {
      isStatic: true,
      render: {
        fillStyle: 'black',
        strokeStyle: 'transparent',
      },
    });
    
    const wall5 = Bodies.rectangle(width/2, height, width/4, 40, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });

    const Color = ['red', 'green', 'blue', 'aqua', 'yellow', 'green', 'purple', 'grey'];
    const X = [width / 10, width * 3 / 10, width * 5 / 10, width * 7 / 10, width * 9 / 10];
    const Y = [height / 10];

    const clickEvent = (function() {
      if ('ontouchstart' in document.documentElement === true) {
        return 'touchstart';
      } else {
        return 'click';
      }
    })();

    render.canvas.addEventListener(clickEvent, () => {
      for (let i = 0; i < 20; i++) {
        const ball = Bodies.circle(X[Math.floor(Math.random() * X.length)], Y[0], 16.5, {
          restitution: 1,
          friction: 0.001,
          density: 0.5,
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

    const Boundary = [wall4, wall1, wall2, wall3,wall5, ground];
    World.add(engine.world, Boundary);

    Engine.run(engine)
    Render.run(render);
  }, []);

  const removeGround = () => {
    if (!isGroundRemoved) {
      World.remove(engine.world, engine.world.bodies[0]);
      setIsGroundRemoved(true);
  
      balls.forEach(ball => {
        Body.set(ball, { isStatic: false });
      });
  
      Engine.update(engine, 1000 / 240);
  
      const updateScroll = () => {
        if (balls.length > 0) {
          const randomIndex = Math.floor(Math.random() * balls.length);
          lowestBall = balls[randomIndex];
      
          const targetScrollTop = lowestBall.position.y - window.innerHeight / 2;
          const currentScrollTop = window.pageYOffset;
          const scrollDiff = targetScrollTop - currentScrollTop;
      
          if (Math.abs(scrollDiff) > 1) {
            window.scrollTo(0, currentScrollTop + scrollDiff /64); // 더 빠른 스크롤
          }
      
            requestAnimationFrame(updateScroll); // 계속해서 업데이트

        }
      };
  
      updateScroll();
    }
  };
  

  return (
    <div id="canvas">
      <button onClick={removeGround}>Remove Ground</button>
    </div>
  );
}

export default App;
