import React, { useEffect, useState } from 'react';
import { Engine, Render, World, Bodies, MouseConstraint, Mouse, Body,Events } from 'matter-js';
import './Game.css';
const width = window.innerWidth;
const height = window.innerWidth*5;

function App() {
  const [balls, setBalls] = useState([]);
  const [isGroundRemoved, setIsGroundRemoved] = useState(false);
  const Pay=[];
  let engine, render;
  let angle=0;
  useEffect(() => {
    engine = Engine.create({
      timing:{
        frameRate:10,
      },
    });
    engine.world.gravity.x = 0;
    engine.gravity.y = 0.25;

    render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerWidth * 5,
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
    const ground = Bodies.rectangle(width/2, height , width, height*0.005, {
      isStatic: true,
      label:"Ground",
      render: {
        fillStyle: '#ffcc00',
        strokeStyle: 'transparent',
      },
    });
    const wall1 = Bodies.rectangle(width, height*0.5, width*0.02, height, {
      isStatic: true,
      render: {
        fillStyle: 'blue',
        strokeStyle: 'transparent',
      },
    });
    const block = Bodies.rectangle(width*0.5, height*0.03, width*0.02, height*0.06, {
      isStatic: true,
      render: {
        fillStyle: 'blue',
        strokeStyle: 'transparent',
      },
    });
    const wall2 = Bodies.rectangle(0, height*0.5, width*0.02, height, {
      isStatic: true,
      render: {
        fillStyle: 'green',
        strokeStyle: 'transparent',
      },
    });
    const wall3 = Bodies.rectangle(width*0.5, 0, width, width*0.02, {
      isStatic: true,
      render: {
        fillStyle: 'red',
        strokeStyle: 'transparent',
      },
    });
    const wall4 = Bodies.rectangle(width*0.5, height*0.06, width, width*0.02, {
      isStatic: true,
      label:"start",
      render: {
        fillStyle: 'black',
        strokeStyle: 'transparent',
      },
    });
    const Color = ['red', 'green', 'blue', 'aqua', 'yellow', 'green', 'purple', 'grey'];
    const X = [
      width / 40, 
      width * 2 / 40,
      width * 3 / 40, 
      width * 4 / 40,
      width * 5 / 40,
      width * 6 / 40,
      width * 7 / 40,
      width * 8 / 40,
      width * 9 / 40,
      width * 10 / 40,
      width * 11 / 40,
      width * 12/ 40,
      width * 13/ 40,
      width * 14 / 40,
      width * 15 / 40,
      width * 16 / 40,
      width * 17 / 40,
      width * 18 / 40,
      width * 19 / 40,
    ];
    const Y = [height / 30,height / 40,height / 35];
    const clickEvent = (function() {
      if ('ontouchstart' in document.documentElement === true) {
        return 'touchstart';
      } else {
        return 'click';
      }
    })();
    render.canvas.addEventListener(clickEvent, () => {
      for (let i = 0; i < 10; i++) {
        const ball = Bodies.circle(X[Math.floor(Math.random() * X.length)], Y[Math.floor(Math.random() * Y.length)], width/50, {
          restitution: 0.9,
          friction: 0.001,
          density: 0.1,
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
    const Boundary = [wall4, wall1, wall2, wall3,block,ground];
    World.add(engine.world, Boundary);
    Engine.run(engine)
    Render.run(render);
  }, []);
  const removeGround = () => {
    if (!isGroundRemoved) {
      for (let i = 0; i < 8; i++) {
        World.remove(engine.world, engine.world.bodies[0]);
      }
      setIsGroundRemoved(true);
  
      // balls 배열을 업데이트하는 대신 상태로 업데이트합니다.
      setBalls(prevBalls => {
        const updatedBalls = [...prevBalls]; // 기존 배열을 복사
        updatedBalls.forEach(ball => {
          Body.set(ball, { isStatic: false });
        });
        Engine.update(engine, 1000 / 240);
        const updateScroll = () => {
          if (updatedBalls.length > 0) {
            // 가장 높은 Y 좌표를 가진 공을 찾습니다.
            let highestYBall = updatedBalls[0];
            for (let i = 1; i < updatedBalls.length; i++) {
              if (updatedBalls[i].position.y > highestYBall.position.y) {
                highestYBall = updatedBalls[i];
              }
            }
            const targetScrollTop = highestYBall.position.y - window.innerHeight / 2;
            const currentScrollTop = window.pageYOffset;
            const scrollDiff = targetScrollTop - currentScrollTop;
  
            if (Math.abs(scrollDiff) > 1) {
              window.scrollTo(0, currentScrollTop + scrollDiff / 50); // 더 빠른 스크롤
            }
            requestAnimationFrame(updateScroll); // 계속해서 업데이트
          }
        };
        updateScroll();
        return setBalls(updatedBalls); // 업데이트된 배열을 반환하여 상태를 업데이트합니다.
      });
    }
  };
  
  return (
    <div id="canvas">
      <button onClick={removeGround}>Remove Ground</button>
    </div>
  );
}

export default App;
