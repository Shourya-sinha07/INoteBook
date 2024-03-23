import { createContext } from "react"; //importing createContext function from the react library

const noteContext=createContext(); // This line creates a new context object called noteContext using the createContext function imported from React. This context object will serve as a container for sharing data between components
export default noteContext;