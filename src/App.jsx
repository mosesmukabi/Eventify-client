import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./pages/Home/Hero";
import Signup from "./pages/SignUp/Signup";
import Login from "./pages/Login/Login";
import { UserProvider, useUser } from "./utils/userContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventsHeader from "./components/EventsHeader";
import Events from "./pages/Eventy/Events";
import PostEvent from "./pages/PostEvent/PostEvent";
import FullEvent from "./pages/FullEvent/fullEvent";
import MyEvents from "./pages/MyEvent/MyEvent";
import EditEvent from "./pages/EditEvent/EditEvent";
import UpdateProfile from "./pages/personalDetails/personalDetails";
import JoinedEvents from "./pages/JoinedEvents/JoinedEvents";
import EventParticipants from "./pages/EventParticipants/EventParticipants";
// Create a QueryClient instance for react-query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <ConditionalHeader />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/events" element={<Events />} /> 
                <Route path="/postEvent" element={<PostEvent />} />
                <Route path="/event/:id" element={<FullEvent />} />
                <Route path="/myEvents" element={<MyEvents />} />
                <Route path="/edit/:id" element={<EditEvent />} />
                <Route path="/profile" element={<UpdateProfile />} /> 
                <Route path="/joinedEvents" element={<JoinedEvents />} />
                <Route path="/eventParticipants/:id" element={<EventParticipants />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer

            position="top-right"
            autoClose={3000} 
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable

           />
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
}


const ConditionalHeader = () => {
  const { isLoggedIn } = useUser();
  return isLoggedIn ? <EventsHeader /> : <Header />;
};

export default App;
