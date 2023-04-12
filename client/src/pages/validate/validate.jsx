import React, { useState } from "react";
import Challenges from "./Challenges";

const validate = ({PUF}) => {

  const [challenges, setChallenges] = useState([
    "Xd029Fbk",
    "nTU4L8Ew",
    "ufbtytzQ",
    "IHZkHYRt",
    "kmJ3HTL7",
    "gkijnFJ0",
    "tTegClpt",
    "YsLA4ExP",
    "2wlsVny3",
    "ha2i0sTF",
    "Kpts9cbp",
    "fL7UGquq",
    "wDPJinLp",
    "OXfwJZMz",
    "0RUStqNZ",
    "9AAyxpvq",
    "oNnpdKqF",
    "TNp18FJZ",
    "EsezbCkA",
    "2SIYLw5w",
    "JNEPb0SK",
    "wm5VCEPV",
    "Z3VyuimI",
    "2rEcxo4p",
    "Pz4Q2H89",
    "faChURoS",
    "UG8SzIXd",
    "tx7b8Ym2",
    "Wyc2fuUJ",
    "Muub6cEq",
    "SfA7TqiI",
    "xUejIJzB",
    "LGoSL5pB",
    "jTGsFJBE",
    "PsFt0Qmp",
    "b5L9QOig",
    "BimcSZFQ",
    "yePxKqkr",
    "yTDE0JgB",
    "4k1gMlEf",
    "I4D11ofc",
    "mWftjfG8",
    "reSiNltV",
    "qSBlwsxn",
    "c6JbZcft",
    "PSEVqs3E",
    "eRL0uS2O",
    "Xi4Yxpgp",
    "l8fG0bJG",
    "F6kh3u9z",
    "CXt1xlI4",
    "uW8PeAjY",
    "6PAdmDvY",
    "SBgVQ8jA",
    "xMCOSI7m",
    "YCyCzL5e",
    "AT0Acr6s",
    "LoYXBUrr",
    "jxXriRJS",
    "5I903SC9",
    "6WITfzob",
    "K3hCS938",
    "iHWzEjVv",
    "FU5lgZcA",
    "n92MsSDM",
    "GOw8p8rp",
    "kvvxV7Kc",
    "Sd3xuO4R",
    "mr6631fy",
    "d7pi9qie",
    "IAQ1BsOY",
    "ewddBuSk",
    "eKGre12v",
    "U8LiFJKj",
    "fBPriDME",
    "qjs38Y3i",
    "d0RGa0TI",
    "OTTyY8GJ",
    "vQCFunj6",
    "jrGJdDC0",
    "DbVRAJhl",
    "0t4o8Fei",
    "p5b8QJVa",
    "cgC9gsqQ",
    "n7FUiRLb",
    "asCRDP0S",
    "xCeXbRnk",
    "F1iX3Qc5",
    "GF3QeZy1",
    "BJOaJqmD",
    "pBKUgFXj",
    "zsszau5Y",
    "FNufaA92",
    "kKCRYWav",
    "YYvwX4oR",
    "eIsggSvg",
    "1C69oyJK",
    "qky2kKzw",
    "c8O4mn3z",
    "3xB8zJ2y"
  ]);

  var currChallenges = [];
  while (currChallenges.length < 3) {
    var r = Math.floor(Math.random() * 95) + 1;
    if (currChallenges.indexOf(r) === -1) currChallenges.push(challenges[r]);
  }
  console.log(currChallenges); 

  return (
    <div>
      <Challenges 
      challenges={currChallenges} 
      PUF={PUF}/>
    </div>
  )
}

export default validate;