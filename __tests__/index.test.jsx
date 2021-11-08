
import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import { getPage } from "next-page-tester";
import MockAdapter from "axios-mock-adapter";

const axios = require("axios");
const mock = new MockAdapter(axios);

describe('Home', () => {
  beforeEach(() => {
    mock.onGet(`localhost:3000/api/name`).reply(200, {name: "test"});
  });
  it('renders a heading (passes)', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js.*/i,
    });

    expect(heading).toBeInTheDocument();
  })

  it("renders correctly with next-page-tester", async () => {
    const { page } = await getPage({
      route: `/`,
    });

    const { container } = render(page);

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js.*/i,
    })
    expect(heading).toBeInTheDocument();
  });

  it("renders correctly with api call", async () => {
    const { page } = await getPage({
      route: `/`,
    });

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js.*/i,
    });

  });
  
  it("renders a snapshot correctly", async () => {
    const { page } = await getPage({
      route: `/`,
    });
    const { container } = render(page);

    expect(
      await screen.findByRole("heading", { name: /Let’s get started!/i })
    ).toBeVisible();

    expect(container).toMatchSnapshot();
  });
})
