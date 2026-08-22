import Barplot from "./Barplot";
import "./App.css";
import { data } from "./data";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h3>My Barplot </h3>
      <Barplot data={data} />
    </div>
  );
}
