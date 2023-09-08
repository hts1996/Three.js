import React, { useEffect, useState } from 'react';
import { Engine, Render, World, Bodies, MouseConstraint, Mouse, Body,Events } from 'matter-js';
import './Game.css';
import Modal from 'react-modal';
import finball from "./assets/finball.png" 
const width = window.innerWidth;
const height = window.innerWidth*5;
const Payment = 10;
const theme = '#4C4499';
  const dummy=
    [
    {"user_name":"김정희","ball_id":0,"cnt":5,"user_color":''},
    {"user_name":"서정희","ball_id":3,"cnt":5,"user_color":''},
    {"user_name":"신현탁","ball_id":1,"cnt":5,"user_color":''},
    {"user_name":"정영빈","ball_id":2,"cnt":5,"user_color":''},
    {"user_name":"정현우","ball_id":5,"cnt":5,"user_color":''},
    {"user_name":"하성호","ball_id":5,"cnt":5,"user_color":''},
      ]
function App() {

  const [balls, setBalls] = useState([]);
  const [isGroundRemoved, setIsGroundRemoved] = useState(false);
  const [ballCount, setBallCount] = useState(0);
  const [ballCountPosition] = useState({ top: '20px', right: '20px' });
  const Pay=[];
  const [redCount, setRedCount] = useState(0);
  const [blueCount, setBlueCount] = useState(0);
  const [greenCount, setGreenCount] = useState(0);
  const [yellowCount, setYellowCount] = useState(0);
  const [purpleCount, setPurpleCount] = useState(0);
  const [orangeCount, setOrangeCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finx,finy]=[102,103];
  const word=width*0.013+'px';
  const [userColor, setUserColor] = useState({
    "red":"unknown",
    "blue":"unknown",
    "green":"unknown",
    "orange":"unknown",
    "purple":"unknown",
    "yellow":"unknown",
  });
  let engine, render;
  let angle=0;
  const Color = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
  function openModal() {
    setIsModalOpen(true);
  }
  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    location.reload();
  };
// 중복 없이 랜덤 값을 추출하는 함수
function getRandomUniqueItems(array, count) {
  const shuffled = array.slice(); // 원본 배열을 복제하여 새 배열 생성
  let currentIndex = shuffled.length, temporaryValue, randomIndex;

  // 배열을 섞는 Fisher-Yates 알고리즘
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }

  // 앞에서부터 count 개수만큼 추출
  return shuffled.slice(0, count);
}

// 예제 사용법
const myArray = [0,1,2,3,4,5];
const randomItems = getRandomUniqueItems(myArray, 6); // 3개의 중복 없는 랜덤 값 추출

const setColor = () => {
  for (let i = 0; i < Color.length; i++) {
    dummy[i]["user_color"] = Color[randomItems[i]];
    setUserColor(prevState => ({
      ...prevState,
      [Color[randomItems[i]]]: dummy[i]["user_name"],
    }));
  }
};
  useEffect(() => {
    console.log(userColor)
    engine = Engine.create({
      timing:{
        frameRate:10,
      }});
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
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      engine.gravity.y = 0.15
    } else {
      engine.gravity.y = 0.27
    }
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
        fillStyle: theme,
        strokeStyle: 'transparent',
      },
    });
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
        const ball = Bodies.circle(X[Math.floor(Math.random() * X.length)], Y[Math.floor(Math.random() * Y.length)], width/70, {
          restitution: 0.9,
          friction: 0.01,
          density: 0.1,
          label:"red",
          isStatic: false,
          render: {
            fillStyle: Color[Math.floor(Math.random() * Color.length)],
            strokeStyle: 'black',
            lineWidth: 3,
          },
        });
        balls.push(ball);
        World.add(engine.world, ball);
      }}
    );

    const Boundary = [ground];
    setColor()
    World.add(engine.world, Boundary);
    Engine.run(engine)
    Render.run(render);
  }, []);

  const removeGround = () => {
    if (!isGroundRemoved) {
      for (let i=0;i<8;i++){
      World.remove(engine.world, engine.world.bodies[0]);}
      setIsGroundRemoved(true);
  
      const updatedBalls = [...balls];

      updatedBalls.forEach(ball => {
        Body.set(ball, { isStatic: false });
      });
  
      Engine.update(engine, 1000 / 240);
  
      const updateScroll = () => {
        if (updatedBalls.length > 0) {
          let highestYBall = updatedBalls[0];
          for (let i = 1; i < updatedBalls.length; i++) {
            if (updatedBalls[i].position.y > highestYBall.position.y) {
              highestYBall = updatedBalls[i];
            }
          }
  
          if (!Pay.includes(highestYBall) && highestYBall.position.y >= height) {
            Pay.push(highestYBall);
            // 복사한 배열에서 해당 공 제거
            const indexToRemove = updatedBalls.findIndex(ball => ball.id === highestYBall.id);
            if (indexToRemove !== -1) {
              updatedBalls.splice(indexToRemove, 1);
            }
            setBalls(updatedBalls);
            setBallCount(Pay.length);
            setRedCount(Pay.filter(ball => ball.render.fillStyle === "red").length)
            setBlueCount(Pay.filter(ball => ball.render.fillStyle === "blue").length)
            setGreenCount(Pay.filter(ball => ball.render.fillStyle === "green").length)
            setYellowCount(Pay.filter(ball => ball.render.fillStyle === "yellow").length)
            setOrangeCount(Pay.filter(ball => ball.render.fillStyle === "orange").length)
            setPurpleCount(Pay.filter(ball => ball.render.fillStyle === "purple").length)
            if (Pay.length==Payment){
              openModal()
              return;
            }
          }
  
          const targetScrollTop = highestYBall.position.y - window.innerHeight / 2;
          const currentScrollTop = window.pageYOffset;
          const scrollDiff = targetScrollTop - currentScrollTop;
  
          if (Math.abs(scrollDiff) > 1) {
            window.scrollTo(0, currentScrollTop + scrollDiff / 50);
          }
  
          requestAnimationFrame(updateScroll);
        }
      };
      updateScroll();

    }
  };
  return (
    <div id="canvas">
      <button onClick={removeGround}>Remove Ground</button>
      <div
        id="ballCount"
        style={{
          position: 'fixed',
          background: 'rgba(255, 255, 255, 0.7)',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize:word,
          ...ballCountPosition, // ballCountPosition의 위치를 적용
        }}
      >
        <div>Ball Count: {ballCount}</div>
        <div>{userColor["red"]} : {redCount}</div>
        <div>{userColor["blue"]} : {blueCount}</div>
        <div>{userColor["green"]} : {greenCount}</div>
        <div>{userColor["yellow"]} : {yellowCount}</div>
        <div>{userColor["orange"]} : {orangeCount}</div>
        <div>{userColor["purple"]} : {purpleCount}</div>
      </div>
      <Modal
      ariaHideApp={false}
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Custom Modal" // 모달의 레이블 설정
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    content: {
      width: '50%', // 모달의 너비
      height: '50%', // 모달의 높이
      top: '25%', // 모달을 수직으로 가운데 정렬
      left: '25%', // 모달을 수평으로 가운데 정렬
    },
  }}
>
        <h2>게임결과</h2>
        <p style={{fontSize:word}}>다음 사람들은 돈을 지불하시오</p>
        {/* <div>Ball Count: {ballCount}</div> */}
        <div style={{fontSize:word}}>red : {redCount}</div>
        <div style={{fontSize:word}}>blue : {blueCount}</div>
        <div style={{fontSize:word}}>green : {greenCount}</div>
        <div style={{fontSize:word}}>yellow : {yellowCount}</div>
        <div style={{fontSize:word}}>orange : {orangeCount}</div>
        <div style={{fontSize:word}}>purple : {purpleCount}</div>
        <button onClick={closeModal} style={{width:'20%',height:'10%', top:'80%',left:"40%",fontSize:word}}>Close</button>
      </Modal>
    </div>
    
  );
}

export default App;
