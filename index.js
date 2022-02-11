const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  const date = new Date();
  res.send(`Hello ${req.body.name}, ${date}`);
});

app.post("/ttt/play", (req, res) => {
  //res.send("Sent from the server /ttt/play");
  let board = req.body;
  let winner = " ";
  //   let altered = 0;
  // CHECKING WINNER AFTER USER INPUT
  let potentialWinner = checkWinner(board);
  if (potentialWinner != " ") {
    winner = potentialWinner;
    return res.json({ grid: board.grid, winner });
  }
  for (let i = 0; i < board.grid.length; i++) {
    if (board.grid[i] == " ") {
      board.grid[i] = "X";
      altered = 1;
      break;
    }
  }

  //   // CHECK IF LAST INPUT WAS BOT AND GAME IS OVER
  //   const remainigSpace = calculateRemainingSpace(board);

  // IF NO MORE INPUT IS POSSIBLE AND NO WINNER...
  //   if (altered == 0) {
  //     board.winner = "Q"; // GAME OVER
  //     return res.json(board);
  //   }

  // CHECKING WINNER AFTER BOT INPUT
  potentialWinner = checkWinner(board);
  if (potentialWinner != " ") {
    winner = potentialWinner;
    return res.json({ grid: board.grid, winner });
  }
  res.json({ grid: board.grid, winner });
});

const checkWinner = (board) => {
  let winner = " ";
  const grid = board.grid;
  // HORIZONTAL
  if (grid[0] == grid[1] && grid[1] == grid[2]) winner = grid[0];
  else if (grid[3] == grid[4] && grid[4] == grid[5]) winner = grid[3];
  else if (grid[6] == grid[7] && grid[7] == grid[8]) winner = grid[6];
  // VERTICAL
  else if (grid[0] == grid[3] && grid[3] == grid[6]) winner = grid[0];
  else if (grid[1] == grid[4] && grid[4] == grid[7]) winner = grid[1];
  else if (grid[2] == grid[5] && grid[5] == grid[8]) winner = grid[2];
  // DIAGONAL
  else if (grid[0] == grid[4] && grid[4] == grid[8]) winner = grid[0];
  else if (grid[2] == grid[4] && grid[4] == grid[6]) winner = grid[2];
  return winner;
};

// const calculateRemainingSpace = (board) => {
//   let spaceRemaining = 0;
//   for (let i = 0; i < board.grid.length; i++) {
//     if (board.grid[i] == " ") spaceRemaining++;
//   }
//   return spaceRemaining;
// };

app.listen(port, () => {
  console.log(`Example App For Deploying Nginx SSL on port: ${port}`);
});
