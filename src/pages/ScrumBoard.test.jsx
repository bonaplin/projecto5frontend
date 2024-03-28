import { render, screen, fireEvent } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import ScrumBoard from "./ScrumBoard"; // Ajuste o caminho de importação conforme necessário

describe("ScrumBoard", () => {
  test("renders ScrumBoard component", () => {
    render(
      <MemoryRouter>
        <ScrumBoard />
      </MemoryRouter>
    );
    // Verifique se o título "Tasks" está presente
    expect(screen.getByText("Tasks")).toBeInTheDocument();

    // Verifique se o botão "Add task" está presente e simule um clique
    const addButton = screen.getByLabelText("Add task");
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);

    // Verifique se o botão "My Tasks" está presente e simule um clique
    const myTasksButton = screen.getByLabelText("My Tasks");
    expect(myTasksButton).toBeInTheDocument();
    fireEvent.click(myTasksButton);

    // Verifique se o botão "Reset Filter / Order" está presente e simule um clique
    const resetButton = screen.getByLabelText("Reset Filter / Order");
    expect(resetButton).toBeInTheDocument();
    fireEvent.click(resetButton);
  });
});
