import React from "react";
import { createRoot } from "react-dom/client";
import "@testing-library/jest-dom";
import Input from "../../components/Input/Input";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Input", () => {
  it("should render input component", () => {
    // const props = {
    //   placeholder: "Pick a time",
    // };
    // const elem = <Input {...props} />;
    // createRoot(elem);
    // const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(<Input />);
  });
});
