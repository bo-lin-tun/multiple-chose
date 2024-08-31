// components/AppRouter.js
import {
  BrowserRouter,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import Home from "@/pages";
import Question from "./QuestionPages";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Question />} />
        <Route path="/about" element={<Home />} />
      </Router>
    </BrowserRouter>
  );
};

export default AppRouter;
