import { render, screen } from "@testing-library/react";
import Table from "../components/table/Table";

test("renders table headers", () => {
  const columns = ["name", "role", "active", "actions"];
  const data = [{ name: "John", role: "Admin", active: true }];

  render(<Table data={data} columns={columns} />);

  columns.forEach((column) => {
    const headerElement = screen.getByText(new RegExp(column, "i"));
    expect(headerElement).toBeInTheDocument();
  });
});

test("renders table rows", () => {
  const columns = ["name", "role", "active", "actions"];
  const data = [{ name: "John", role: "Admin", active: true }];

  render(<Table data={data} columns={columns} />);

  data.forEach((item) => {
    const rowElement = screen.getByText(new RegExp(item.name, "i"));
    expect(rowElement).toBeInTheDocument();
  });
});

test('renders "No data available" when data is empty', () => {
  const columns = ["name", "role", "active", "actions"];
  const data = [];

  render(<Table data={data} columns={columns} />);

  const noDataElement = screen.getByText(/No data available/i);
  expect(noDataElement).toBeInTheDocument();
});
