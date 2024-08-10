"use client";
import { StyledWrapper, Subtitle, Paragraph, Button } from "@/app/styles";
import { useCounterStore } from "./exampleStore";

// you can also use Zustand to get the state outside of the component using the .getState() method
const logCount = () => {
  const count = useCounterStore.getState().count;
  // or const count = useCounterStore.getState().count;
  console.log("count:", count);
};

// and you can set the state outside of the component using the .setState() method
const setCount = () => {
  useCounterStore.setState({ count: 10 });
};

export default function Counter() {
  // even though this destructuring is cleaner, it is less performant than rendering only the state and actions you need
  const { count, increment, decrement } = useCounterStore();

  // this would be more performant
  // const count = useCounterStore((state) => state.count);
  // const increment = useCounterStore((state) => state.increment);
  // const decrement = useCounterStore((state) => state.decrement);

  return (
    <StyledWrapper>
      <Subtitle>Counter</Subtitle>
      <Paragraph>{count}</Paragraph>
      <Button onClick={increment}>Increment</Button>
      <Button onClick={decrement}>Decrement</Button>
      <Button onClick={logCount}>Log Count</Button>
      <Button onClick={setCount}>Set Count</Button>
    </StyledWrapper>
  );
}
