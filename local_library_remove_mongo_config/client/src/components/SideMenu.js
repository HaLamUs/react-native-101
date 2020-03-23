import React from "react";
import { Link } from "react-router-dom";

// Create a link can be used to navigate between routes

const SideMenu = () => (
  <div className="col-lg-2">
    <ul className="nav nav-pills nav-stacked">
      <li className="active">
        <Link to="/"> Home </Link>
      </li>
      <li>
        <Link to="/book"> All books </Link>
      </li>
      <li>
        <Link to="/author"> All authors </Link>
      </li>
      <li>
        <Link to="/genre">All genres</Link>
      </li>
      <li>
        <Link to="/bookinstance">All book-instances</Link>
      </li>
      <li>
        <hr />
      </li>
      <li>
        <a href="catalog/author/create">Create new author</a>
      </li>
      <li>
        <a href="catalog/genre/create">Create new genre</a>
      </li>
      <li>
        <a href="/catalog/book/create">Create new book</a>
      </li>
      <li>
        <a href="catalog/bookinstance/create">Create new book instance</a>
      </li>
    </ul>
  </div>
);

export default SideMenu;
