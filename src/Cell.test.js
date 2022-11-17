import { render } from "@testing-library/react";
import Cell from "./Cell.js";

import { board } from './Board.js';


describe("Renders Cell", function () {

  it("renders without crashing", function () {
    let container;
    let tr = document.createElement("tr");
    container = document.body.appendChild(tr);
    render(<Cell />, { container });
  });

  it("matches snapshot", function () {
    const { container } = render(<Cell isLit={true} />);
    expect(container).toMatchSnapshot();

  });

});
