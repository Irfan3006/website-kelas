function play_game() {
  let level = 160; // level game
  let rect_w = 45; // lebar
  let rect_h = 30; // tinggi
  let inc_score = 50; // score
  let snake_color = "#9dc425"; // warna ular
  let ctx; // attribute canvas
  let tn = []; // penyimpanan arah sementara
  let x_dir = [-1, 0, 1, 0]; // penyesuaian posisi horizontal
  let y_dir = [0, -1, 0, 1]; // penyesuaian posisi vertikal
  let queue = [];
  let frog = 5; // default tubuh ular
  let map = [];
  let MR = Math.random;
  let X = (5 + MR() * (rect_w - 10)) | 0; // menghitung posisi
  let Y = (5 + MR() * (rect_h - 10)) | 0; // menghitung posisi
  let direction = (MR() * 3) | 0;
  let interval = 0;
  let score = 0;
  let sum = 0,
    easy = 0;
  let i, dir;
  // Mendapatkan area game
  let c = document.getElementById("playArea");
  ctx = c.getContext("2d");
  // Posisi peta
  for (i = 0; i < rect_w; i++) {
    map[i] = [];
  }
  // penempatan makanan ular secara acak
  function rand_frog() {
    let x, y;
    do {
      x = (MR() * rect_w) | 0;
      y = (MR() * rect_h) | 0;
    } while (map[x][y]);
    map[x][y] = 1;
    ctx.fillStyle = snake_color;
    ctx.strokeRect(x * 10 + 1, y * 10 + 1, 8, 8);
  }
  //fungsi game speed
  rand_frog();
  function set_game_speed() {
    if (easy) {
      X = (X + rect_w) % rect_w;
      Y = (Y + rect_h) % rect_h;
    }
    --inc_score;
    if (tn.length) {
      dir = tn.pop();
      if (dir % 2 !== direction % 2) {
        direction = dir;
      }
    }
    if ((easy || (0 <= X && 0 <= Y && X < rect_w && Y < rect_h)) && 2 !== map[X][Y]) {
      if (1 === map[X][Y]) {
        score += Math.max(5, inc_score);
        inc_score = 50;
        rand_frog();
        frog++;
      }
      //ctx.fillStyle("#ffffff");
      ctx.fillRect(X * 10, Y * 10, 9, 9);
      map[X][Y] = 2;
      queue.unshift([X, Y]);
      X += x_dir[direction];
      Y += y_dir[direction];
      if (frog < queue.length) {
        dir = queue.pop();
        map[dir[0]][dir[1]] = 0;
        ctx.clearRect(dir[0] * 10, dir[1] * 10, 10, 10);
      }
    } else if (!tn.length) {
      let msg_score = document.getElementById("msg");
      msg_score.innerHTML = "HAHAHAHAHA NOOB MATI MULU<br />Skor anda :<b>" + score + "</b><br /><br /><input type='button' value='Main LAGI' onclick='window.location.reload();' />";
      document.getElementById("playArea").style.display = "none";
      window.clearInterval(interval);
    }
  }
  interval = window.setInterval(set_game_speed, level);
  document.onkeydown = function (e) {
    let code = e.keyCode - 37;
    if (0 <= code && code < 4 && code !== tn[0]) {
      tn.unshift(code);
    } else if (-5 == code) {
      if (interval) {
        window.clearInterval(interval);
        interval = 0;
      } else {
        interval = window.setInterval(set_game_speed, 60);
      }
    } else {
      dir = sum + code;
      if (dir == 44 || dir == 94 || dir == 126 || dir == 171) {
        sum += code;
      } else if (dir === 218) easy = 1;
    }
  };
}
