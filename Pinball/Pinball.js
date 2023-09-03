// Canvas 설정
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matter.js 설정
const engine = Matter
    .Engine
    .create();
const world = engine.world;
const render = Matter
    .Render
    .create({
        element: document.body,
        canvas: canvas,
        engine: engine,
        options: {
            width: canvas.width,
            height: canvas.height,
            wireframes: false,
            bounds: {
                min: {
                    x: 0,
                    y: 0
                },
                max: {
                    x: canvas.width,
                    y: canvas.height + 1000
                }
            }
        }
    });

// 이미지 로드
const rabbit = new Image();
rabbit.src = './measure.png';

// 이미지 떨어뜨리기
const rabbits = [];
canvas.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const rabbitSize = 50;
    const newRabbit = Matter
        .Bodies
        .circle(x, y, rabbitSize / 2, {
            frictionAir: 0.02, //0.05(기본값) 중력가속도 : 값이 작아질수록 중력이 강해짐
            restitution: 0.4, //0.5(기본값) 탄력도 : 값이 작아질수록 탄성이 무뎌짐 (묵직해짐)
            // 바닥에 닿으면 움직이지 않도록 설정
            isStatic: false,
            render: {
                sprite: {
                    texture: './measure.png'
                }
            }
        });
    rabbits.push(newRabbit);
    Matter
        .World
        .add(world, newRabbit);
});

// 애니메이션 시작
Matter
    .Render
    .run(render);
Matter
    .Engine
    .run(engine);
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rabbits.length; i++) {
        ctx.save();
        ctx.translate(rabbits[i].position.x, rabbits[i].position.y);
        ctx.rotate(rabbits[i].angle);
        ctx.drawImage(
            rabbit,
            -rabbits[i].circleRadius,
            -rabbits[i].circleRadius,
            rabbits[i].circleRadius * 2,
            rabbits[i].circleRadius * 2
        );
        ctx.restore();
        // 이미지가 바닥에 닿았는지 확인하고, 닿았으면 isStatic을 true로 설정하여 더 이상 움직이지 않도록 함
        if (rabbits[i].position.y + rabbits[i].circleRadius >= canvas.height) {
            Matter
                .Body
                .setStatic(rabbits[i], true);
        }
    }
}
animate();