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
import Training from "./pages/Users/Training";
import TrainingModule from "./pages/Users/TrainingModule";
import { TabProvider } from "./utils/TabContext";
import StartTrainingModal from "./pages/Users/StartTrainingModal";
import TrainingAssessment from "./pages/Users/TrainingAssessment";
import ResultsScene from "./pages/Users/ResultScene";
import Profile from "./pages/Users/Profile";
import EditProfile from "./pages/Users/EditProfile";
import NoficationPage from "./pages/Users/NoficationPage";
import PhisingReport from "./pages/Users/PhisingReport";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./_Auth/Admin/ResetPassword";

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
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          <Route path="/auth/reset-password" element={<ResetPasswordLink />} />

          {/* USERS ROUTES */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<UsersLayout />}>
              <Route index element={<Overview />} />
              <Route path="/phishing-scores" element={<PhishingScores />} />
              <Route
                path="/phishing-scores/report"
                element={<PhisingReport />}
              />
              <Route path="/assets" element={<Assets />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notification" element={<NoficationPage />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/assets/:id" element={<AssetsDetails />} />
              <Route path="/training" element={<Training />} />
              <Route
                path="/training/:module"
                element={
                  <TabProvider>
                    <TrainingModule />
                  </TabProvider>
                }
              />
              <Route
                path="/training/start-assesment/:module/:moduleType"
                element={<StartTrainingModal />}
              />
              <Route
                path="/training/assesment/:module/:moduleType"
                element={<TrainingAssessment />}
              />

              <Route
                path="/training/result/:module/:moduleType"
                element={<ResultsScene />}
              />
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </Suspense>
    </>
  );
}

export default App;
