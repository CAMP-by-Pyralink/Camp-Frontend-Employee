import { Suspense } from "react";
import "./App.css";
import { ClipLoader } from "react-spinners";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import SignIn from "./_Auth/Admin/SignIn";
import ForgotPassword from "./_Auth/Admin/ForgotPassword";
import ResetPasswordLink from "./_Auth/Admin/ResetPasswordLink";
import UsersLayout from "./layout/UsersLayout";
import Overview from "./pages/Users/Overview";
import PhishingScores from "./pages/Users/PhishingScores";
import Assets from "./pages/Users/Assets";
import AssetsDetails from "./pages/Users/AssetsDetails";

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="loading-container">
            <ClipLoader size={50} color="#123abc" />
          </div>
        }
      >
        <Routes>
          {/* PUBLIC ROUTES */}

          {/* AUTH ROUTES */}
          <Route element={<AuthLayout />}>
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          </Route>

          <Route path="/auth/reset-password" element={<ResetPasswordLink />} />

          {/* USERS ROUTES */}
          <Route path="/" element={<UsersLayout />}>
            <Route index element={<Overview />} />
            <Route path="/phishing-scores" element={<PhishingScores />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/assets/:id" element={<AssetsDetails />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
