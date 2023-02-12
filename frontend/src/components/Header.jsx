import React from "react";
import "../styles/Header.css";
import "@mui/material"
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <ul className="main">
        <li>
            <Link to="/laptops">Laptops</Link>
        </li>
        <li>
            <Link to="/phones">Phones</Link>
        </li>
        <li>
          Components
          <ul>
            <li>
                <Link to="/ram">RAM</Link>
            </li>
            <li>
                <Link to="/processor">Processors</Link>
            </li>
            <li>
                <Link to="/drive">Hard Drives</Link>
            </li>
          </ul>
        </li>
      </ul>
    )
}