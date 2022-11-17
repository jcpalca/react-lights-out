import { render } from "@testing-library/react";
import Board from "./Board.js";


describe("Tests Board", function () {

  it("renders without crashing", function () {

    render(<Board nrows={5} ncols={5} chanceLightStartsOn={1} />);


  });
  it("renders snapshot", function () {

    const { container } = render(<Board nrows={5} ncols={5} chanceLightStartsOn={1} />);

    expect(container).toMatchSnapshot();

  });




});