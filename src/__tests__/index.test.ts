import test from "ava";
import { foo, bar } from "../index";

test("add()", (t) => {
  t.is(add(1, 2), 3);
});

test("subtract()", (t) => {
  t.is(subtract(2, 1), 1);
});

test("multiply()", (t) => {
  t.is(multiply(2, 6), 12);
});
