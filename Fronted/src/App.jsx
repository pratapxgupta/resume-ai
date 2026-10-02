import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { restoreSession, selectAuth } from "./features/auth/store/auth.slice";

function App() {
  const dispatch = useDispatch();
  const { sessionInitialized } = useSelector(selectAuth);
  const restoreStarted = useRef(false);
  useEffect(() => {
    if (!sessionInitialized && !restoreStarted.current) {
      restoreStarted.current = true;
      dispatch(restoreSession());
    }
  }, [dispatch, sessionInitialized]);
  return <RouterProvider router={router} />;
}

export default App;
