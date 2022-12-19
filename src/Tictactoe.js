import React from "react";
import { useState } from "react";
import { BsArrowCounterclockwise, BsSun, BsMoon } from "react-icons/bs";
import { AiOutlinePoweroff } from "react-icons/ai";

import("./Tictactoe.css");

const initialUsers = {
  player1: "",
  player2: "",
};

export default function Tictactoe() {
  const [formUsers, setFormUsers] = useState(initialUsers);
  const { player1, player2 } = formUsers;
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();
  const [thema, setThema] = useState("night");

  const Cell = ({ num }) => {
    return (
      <td
        className={`
        ${thema === "light" ? `bg-zinc-200` : `bg-black`}
        `}
        id="fondo"
        onClick={() => handleClick(num)}
      >
        {cells[num]}
      </td>
    );
  };

  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [6, 7, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((element) => {
        if (
          squares[element[0]] === "" ||
          squares[element[1]] === "" ||
          squares[element[2]] === ""
        ) {
          //n
        } else if (
          squares[element[0]] === squares[element[1]] &&
          squares[element[1]] === squares[element[2]]
        ) {
          setWinner(squares[element[0]]);
        }
      });
    }
  };

  const handleClick = (num) => {
    if (!winner) {
      if (cells[num] !== "") {
        alert("casillero ya acupado!");
        return;
      }
      let squares = [...cells];
      if (turn === "X") {
        squares[num] = "X";
        setTurn("O");
      } else {
        squares[num] = "O";
        setTurn("X");
      }
      checkForWinner(squares);
      setCells(squares);
    } else {
      document.getElementById("winnerPanel").style.visibility = "visible";
      <p>Juego terminado</p>;
    }
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
    setTurn("X");
    document.getElementById("winnerPanel").style.visibility = "hidden";
    document.getElementById("userBoard").style.visibility = "hidden";
  };

  const handleClose = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
    setTurn("X");
    document.getElementById("winnerPanel").style.visibility = "hidden";
    document.getElementById("mientras").style.visibility = "visible";
    document.getElementById("tableroGral").visibility = "invisible";
    document.getElementById("turno").style.visibility = "hidden";
    //Reinicia los jugadores
    setFormUsers(initialUsers);
  };

  const handleInputChange = (e) => {
    const changedFormUsers = {
      ...formUsers,
      [e.target.name]: e.target.value,
    };
    setFormUsers(changedFormUsers);
  };

  const handleUser = (e) => {
    document.getElementById("userBoard").style.visibility = "visible";
    document.getElementById("winnerPanel").style.visibility = "hidden";
  };

  const handleThema = (e) => {
    thema === "light" ? setThema("night") : setThema("light");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("mientras").style.visibility = "hidden";
    document.getElementById("tableroGral").style.display = "block";
    document.getElementById("tableroGral").visibility = "visible";
    if (player1.trim() === "") {
      alert("Debes ingresar el 1° Jugador!");
      return;
    } else if (player2.trim() === "") {
      alert("Debes ingresar el 2° Jugador!");
      return;
    } else {
      document.getElementById("userBoard").style.visibility = "hidden";
      document.getElementById("turno").style.visibility = "visible";
    }
  };

  return (
    <div className="flex flex-row">
      <div id="tabla" className="">
        <div id="mientras" className="">
          <img
            src="https://steamuserimages-a.akamaihd.net/ugc/829076308997656227/E68907B7F79FA31994EE56BA822C099CC914D5B9/?imw=512&imh=384&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
            className="w-96 h-60 -mt-1 -ml-5 rounded-3xl "
            alt="mostrar"
          />
        </div>
        <div>
          <table id="tableroGral" className="hidden">
            <tbody className="fichas ">
              <tr className="">
                <Cell num={0} />
                <Cell num={1} />
                <Cell num={2} />
              </tr>
              <tr>
                <Cell num={3} />
                <Cell num={4} />
                <Cell num={5} />
              </tr>
              <tr>
                <Cell num={6} />
                <Cell num={7} />
                <Cell num={8} />
              </tr>
            </tbody>
          </table>
        </div>
        <div id="turno" className="w-48 ml-20 mt-6 h-20 rounded-bl-lg invisible">
          {!winner ? (
            <>
              <h3 className="flex text-sm align-middle justify-center">
                It's the turn of:
              </h3>
              <h3
                className={`text-4xl ${
                  turn === "X" ? `text-green-500` : `text-red-500`
                } ml-2`}
              >
                {turn}
              </h3>
            </>
          ) : (
            <>
              {
                (document.getElementById("winnerPanel").style.visibility =
                  "visible")
              }
              <h3 className="flex text-sm align-middle justify-center">
                The game is finned!
              </h3>
            </>
          )}
        </div>
        <div id="btn-again" className="bg-yellow-400 h-12 w-12 rounded-3xl">
          <button
            onClick={() => handleRestart()}
            className=" btn btn-circle btn-outline text-red-500  "
          >
            <BsArrowCounterclockwise className="h-12 w-8" />
          </button>
        </div>
        <div id="btn-close" className="bg-red-500  rounded-3xl -mt-4">
          <button
            onClick={() => handleClose()}
            className=" btn btn-circle btn-outline text-red-500"
          >
            <AiOutlinePoweroff className="w-6 h-6" />
          </button>
        </div>
        <div id="btn-players" className="">
          <button
            onClick={() => handleThema()}
            className=" btn rounded-md text-white text-sm w-16 h-6"
          >
            <BsSun />/<BsMoon />
          </button>
        </div>
        <div id="btn-tema" className="">
          <button
            onClick={() => handleUser()}
            className=" btn rounded-md text-white text-xs w-16 h-6"
          >
            START
          </button>
        </div>
      </div>
      <div
        id="lateral"
        className="flex flex-col gap-5 self-center items-center ml-32"
      >
        <form
          onSubmit={handleSubmit}
          id="userBoard"
          className="invisible flex flex-col gap-10 border rounded-3xl p-8"
        >
          <div className=" flex flex-row gap-4">
            <div className="form-control w-full max-w-xs  text-red-500">
              <label className="label text-slate-300 text-xl">
                <span className="label-text mb-5">Player #1: </span>
              </label>
              <input
                type="text"
                placeholder="Player #1..."
                className="input input-bordered w-full max-w-xs text-xl"
                value={player1}
                name="player1"
                onChange={handleInputChange}
              />
              <h4 className="label-text mb-5">(Will Play with "X")</h4>
            </div>
            <div className="form-control w-full max-w-xs  text-red-500">
              <label className="label text-slate-300 text-xl">
                <span className="label-text mb-5 ">Player #2: </span>
              </label>
              <input
                type="text"
                placeholder="Player #2..."
                className="input input-bordered w-full max-w-xs text-xl"
                value={player2}
                name="player2"
                onChange={handleInputChange}
              />
              <h4 className="label-text mb-5">(Will Play with "0")</h4>
            </div>
          </div>

          <button className="self-center w-32">Play</button>
        </form>

        <div id="winnerPanel" className="invisible">
          <div className="-mt-80">
            {winner && winner === "X" ? (
              <>
                <p className=" text-yellow-100 w-28 ml-80 mt-64 text-6xl absolute">
                  {player1}
                </p>
              </>
            ) : (
              <>
                <p className=" text-yellow-100 w-28 ml-80 mt-64 text-6xl absolute">
                  {player2}
                </p>
              </>
            )}
            <img
              src="https://i.pinimg.com/originals/84/1b/c0/841bc0cec76cedec84168a6dc367f870.gif"
              alt="win"
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
