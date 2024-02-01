'use client'
import { StateContext } from "@/context/Context";
import { Button } from "@mui/material";
import { useContext } from "react";
import Login from './Login/page'
export default function Home() {
  const {state, setState} = useContext(StateContext);
  return (
    <div>
    <Login/>
    </div>
  );
}
