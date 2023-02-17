import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import ProductCard from "./ProductCard";

export default function ProductList() {
  let keys = useRef([]);
  let [data, setData] = useState([]);
  let [filters, setFilters] = useState({});
  let [pageNumber, setPageNumber] = useState(1);
  let [numberOfItems, setNumberOfItems] = useState(12);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      return await fetch(
        `http://localhost:5000/${location.pathname.split("/")[1]}`
      ).then((result) =>
        result.status === 404 ? navigate("/404") : result.json()
      );
    }

    fetchData().then((res) => {
      keys.current = res;
      let aux = {};
      for (const prop in keys.current)
        if (prop === "price") aux.price = keys.current[prop];
        else aux[prop] = [];
      setFilters(aux);
    });
  }, [location, navigate]);

  useEffect(() => {
    async function fetchData() {
      return await fetch(
        `http://localhost:5000/${location.pathname.split("/")[1]}`,
        {
          body: JSON.stringify({ pageNumber, numberOfItems, filters }),
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      ).then((result) =>
        result.status === 404 ? navigate("/404") : result.json()
      );
    }

    fetchData().then((res) => setData(res));
  }, [pageNumber, numberOfItems, filters, location, navigate]);

  return (
    <Container
      component={"div"}
      maxwidth="md"
      sx={{
        padding: "10px",
        minWidth: "650px",
        margin: 0,
      }}
    >
      <Grid container>
        <Grid item xs={3}>
          <Stack
            divider={<Divider orientation="horizontal" flexItem />}
            direction="column"
            sx={{ maxWidth: "200px" }}
          >
            {Object.entries(keys.current).map((x) => {
              if (x[0] === "price") return;
              return (
                <Card elevation={4}>
                  <Box
                    sx={{
                      padding: 2,
                      fontSize: 20,
                    }}
                  >{`${x[0]} : `}</Box>
                  <FormGroup
                    sx={{
                      padding: "5px 10px 15px",
                      maxHeight: "300px",
                      overflowY: "scroll",
                      flexWrap: "nowrap",
                    }}
                  >
                    {x[1].map((y) => (
                      <FormControlLabel
                        sx={{ paddingLeft: 1, height: "36px", fontSize: "10px" }}
                        control={
                          <Checkbox
                            onInput={() => {}}
                            sx={{
                              color: "#FFA500",
                              "&.Mui-checked": {
                                color: "#DF9000",
                              },
                              "& .MuiTypography-root": {
                                fontSize: "12px"
                              }
                            }}
                          />
                        }
                        label={y}
                      />
                    ))}
                  </FormGroup>
                </Card>
              );
            })}
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <Card elevation={5}>
            <Stack>
              <Grid container spacing={2} columns={{ xs: 6, md: 9 }}>
                {data.map((item) => (
                  <Grid item xs={3} sx={{ position: "relative" }}>
                    <ProductCard
                      _id={item._id}
                      name={item.name}
                      price={item.price}
                      brand={item.brand}
                    />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
