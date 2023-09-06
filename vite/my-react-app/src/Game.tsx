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
  console.log(width,height)
  useEffect(() => {
    engine = Engine.create({});
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0.25;

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

    const wall1 = Bodies.rectangle(width, height*0.5, width*0.01, height, {
      isStatic: true,
      render: {
        fillStyle: 'blue',
        strokeStyle: 'transparent',
      },
    });
    const block = Bodies.rectangle(width*0.5, height*0.03, width*0.01, height*0.06, {
      isStatic: true,
      render: {
        fillStyle: 'blue',
        strokeStyle: 'transparent',
      },
    });

    const wall2 = Bodies.rectangle(0, height*0.5, width*0.01, height, {
      isStatic: true,
      render: {
        fillStyle: 'green',
        strokeStyle: 'transparent',
      },
    });

    const wall3 = Bodies.rectangle(width*0.5, 0, width, width*0.01, {
      isStatic: true,
      render: {
        fillStyle: 'red',
        strokeStyle: 'transparent',
      },
    });

    const wall4 = Bodies.rectangle(width*0.5, height*0.06, width, width*0.01, {
      isStatic: true,
      label:"start",
      render: {
        fillStyle: 'black',
        strokeStyle: 'transparent',
      },
    });
    //x,y,width,height
    //대각선
    const dia1 = Bodies.rectangle(width*3/4, height*0.0888, height*0.1152, width*0.01, {
        isStatic: true,
        angle: Math.PI /6, 
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });

      const dia2 = Bodies.rectangle(height*0.0866, height*0.13, height*0.2, width*0.01, {
        isStatic: true,
        angle: Math.PI /6, 
        render: {
          fillStyle: 'aqua',
          strokeStyle: 'transparent',
        },
      });
      //순서
      const wall5 = Bodies.rectangle(height*0.173, height*0.2, width*0.01, height*0.041, {
        isStatic: true,
        render: {
          fillStyle: 'blue',
          strokeStyle: 'transparent',
        },
      });
      const dia3 = Bodies.rectangle(height*0.1065, height*0.258, height*0.15357, width*0.01, {
        isStatic: true,
        angle: -Math.PI/6, 
        render: {
          fillStyle: 'grey',
          strokeStyle: 'transparent',
        },
      });
      const dia4 = Bodies.rectangle(width, height*0.258, height*0.15357, width*0.01, {
        isStatic: true,
        angle: -Math.PI /6, 
        render: {
          fillStyle: 'grey',
          strokeStyle: 'transparent',
        },
      });
      const wall6 = Bodies.rectangle(height*0.13299, height*0.335, width*0.01, height*0.08, {
        isStatic: true,
        render: {
          fillStyle: 'blue',
          strokeStyle: 'transparent',
        },
      });
      const wall7 = Bodies.rectangle(width*0.2, height*0.335, width*0.01, height*0.08, {
        isStatic: true,
        render: {
          fillStyle: 'green',
          strokeStyle: 'transparent',
        },
      });
      const dia5 = Bodies.rectangle(0, height*0.398094, height*0.09236, width*0.01, {
        isStatic: true,
        angle: -Math.PI/6, 
        render: {
          fillStyle: 'orange',
          strokeStyle: 'transparent',
        },
      });
      const dia6 = Bodies.rectangle(width, height*0.4136, height*0.154, width*0.01, {
        isStatic: true,
        angle: +Math.PI /6, 
        render: {
          fillStyle: 'grey',
          strokeStyle: 'transparent',
        },
      });
      const dia7 = Bodies.rectangle(0, height*0.9, height*0.2, width*0.01, {
        isStatic: true,
        angle: Math.PI/6, 
        render: {
          fillStyle: 'orange',
          strokeStyle: 'transparent',
        },
      });
      const dia8 = Bodies.rectangle(width, height*0.9, height*0.2, width*0.01, {
        isStatic: true,
        angle: -Math.PI /6, 
        render: {
          fillStyle: 'grey',
          strokeStyle: 'transparent',
        },
      });
      const wall8 = Bodies.rectangle(height*0.08660, height*0.975, width*0.01, height*0.05, {
        isStatic: true,
        render: {
          fillStyle: 'green',
          strokeStyle: 'transparent',
        },
      });
      const wall9 = Bodies.rectangle(height*0.1134, height*0.975, width*0.01, height*0.05, {
        isStatic: true,
        render: {
          fillStyle: 'orange',
          strokeStyle: 'transparent',
        },
      });
      const little1 = Bodies.rectangle(width * 0.5, height * 0.5, width *0.3 ,width *0.3 ,  {
        isStatic: true,
        label:"TEST",
        angle: +Math.PI /4, 
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const little2 = Bodies.rectangle(width * 4 / 8, height *  0.45,  width *0.3,width *0.3, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const little3 = Bodies.rectangle(width * 1 / 8, height *  0.45,  width *0.3,width *0.3, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const little4 = Bodies.circle(width * 2.5 / 8, height *  0.45,  width / 20, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const little5 = Bodies.circle(width * 5.5 / 8, height *  0.45,  width / 20, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const rot1 = Bodies.rectangle(height*0.0866, height*0.13,width *0.3, width *0.3, {
        isStatic: true,
        label:"TEST",
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const rot2 = Bodies.rectangle(width*3/4, height*0.0888, width *0.2, width *0.2, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const rot3 = Bodies.rectangle(width * 0.15, height * 0.5, width  *0.2, width  *0.01, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const rot4 = Bodies.rectangle(width * 0.85, height * 0.5, width *0.2, width  *0.01, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00', 
          strokeStyle: 'transparent',
        },
      });
      const rot5 = Bodies.rectangle(width * 0.5, height * 0.4, width  *0.2, width  *0.01, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const stick1 = Bodies.rectangle(width*0.3, height*0.95,width *0.3+height*0.0268, width  *0.01, {
        isStatic: true,
        angle: -Math.PI /4, 
        label:"TEST",
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const stick2 = Bodies.rectangle(width*0.7, height*0.95,width *0.3+height*0.0268, width  *0.01, {
        isStatic: true,
        angle: -Math.PI /6, 
        label:"TEST",
        render: {
          fillStyle: '#ffcc00',
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
      for (let i = 0; i < 5; i++) {
        const ball = Bodies.circle(X[Math.floor(Math.random() * X.length)], Y[Math.floor(Math.random() * Y.length)], width/70, {
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

    const Boundary = [wall4,rot1,rot2,rot3,rot4,rot5,stick1,stick2, wall1, wall2, wall3,block,wall5,dia1,dia2,dia3,dia4,wall6,wall7,wall8,wall9,dia5,dia6,dia7,dia8,little1];
    World.add(engine.world, Boundary);

    Engine.run(engine)
    Render.run(render);
  }, []);
  const removeGround = () => {
    if (!isGroundRemoved) {
      for (let i=0;i<8;i++){
      World.remove(engine.world, engine.world.bodies[0]);}
      setIsGroundRemoved(true);
  
      balls.forEach(ball => {
        Body.set(ball, { isStatic: false });
      });
  
      Engine.update(engine, 1000 / 240);
  
      // rot1을 함수 내부에서 정의
      const rot1 = Bodies.rectangle(height*0.0866, height*0.13,width *0.3, width *0.3, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const rot2 = Bodies.rectangle(width*3/4, height*0.0888, width *0.2, width *0.2, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const rot3 = Bodies.rectangle(width * 0.15, height * 0.5, width  *0.2, width  *0.01, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const rot4 = Bodies.rectangle(width * 0.85, height * 0.5, width *0.2, width  *0.01, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const rot5 = Bodies.rectangle(width * 0.5, height * 0.4, width  *0.2, width  *0.01, {
        isStatic: true,
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const stick1 = Bodies.rectangle(width*0.3, height*0.95,width *0.3+height*0.0268, width  *0.01, {
        isStatic: true,
        angle: -Math.PI /4, 
        label:"TEST",
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      const stick2 = Bodies.rectangle(width*0.7, height*0.95,width *0.3+height*0.0268, width  *0.01, {
        isStatic: true,
        angle: -Math.PI /6, 
        label:"TEST",
        render: {
          fillStyle: '#ffcc00',
          strokeStyle: 'transparent',
        },
      });
      // Engine 객체에 각도를 변경하는 함수를 등록
      let angle1 = 0;
      let angle2 = 0;
      Events.on(engine, 'beforeUpdate', () => {
        angle1 += 0.03; // 매 업데이트마다 각도를 변경 (원하는 속도로 조절)
        Body.setAngle(rot1, angle1+1); // rot1 요소의 각도를 변경
        Body.setAngle(rot2, angle1+2); // rot1 요소의 각도를 변경
        Body.setAngle(rot3, angle1); // rot1 요소의 각도를 변경
        Body.setAngle(rot4, -angle1); // rot1 요소의 각도를 변경
        Body.setAngle(rot5, -angle1+1); // rot1 요소의 각도를 변경
      });
  
      World.add(engine.world, rot1);
      World.add(engine.world, rot2);
      World.add(engine.world, rot3);
      World.add(engine.world, rot4);
      World.add(engine.world, rot5);

      Events.on(engine, 'beforeUpdate', () => {
        angle2 += 0.015; // 매 업데이트마다 각도를 변경 (원하는 속도로 조절)
        Body.setAngle(stick1, -angle2+2); // rot1 요소의 각도를 변경
        Body.setAngle(stick2, angle2+2); // rot1 요소의 각도를 변경
      });
  
      World.add(engine.world, stick1);
      World.add(engine.world, stick2);
  
      const updateScroll = () => {
        if (balls.length > 0) {
          // 가장 높은 Y 좌표를 가진 공을 찾습니다.
          let highestYBall = balls[0];
          for (let i = 1; i < balls.length; i++) {
            if (balls[i].position.y > highestYBall.position.y) {
              highestYBall = balls[i];
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
    }
  };
  
  

  return (
    <div id="canvas">
      <button onClick={removeGround}>Remove Ground</button>
    </div>
  );
}

export default App;
