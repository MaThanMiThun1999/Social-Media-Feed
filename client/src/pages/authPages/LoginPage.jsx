import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../components/base/Input";
import { useAuthStore } from "../../store/authStore";
import ShinyButton from "../../components/framer-motion/animations/ShinyButton";
import ErrorThrower from "../../components/base/ErrorThrower";
import EventLoggingButton from "../../components/global/EventLoggingButton";
import GoogleLoginButton from "../../components/global/GoogleLoginButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative max-w-md w-[95%] rounded-3xl p-2">
        <div className="  w-full ring-0 rounded-3xl ring-cyber-purple">
          <div className=" w-full bg-slate-500 rounded-3xl dark:bg-slate-600 bg-opacity-50 glass-panel overflow-hidden">
            <div className="p-5">
              <h2 className="h1 text-text-subdued mb-6 dark:text-dark-text font-share-tech-mono text-center">Login</h2>
               <form className="max-w-md mx-auto" onSubmit={handleLogin} autoComplete="false">
                <Input icon={Mail} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />

                <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                {error && <ErrorThrower error={error} />}

                <div className="flex flex-col gap-3 justify-center items-center w-[100%]">
                  <EventLoggingButton category="auth" action="click" label="login" className="w-full">
                    <ShinyButton classNames="rounded-md" addType="submit">
                      <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className=" transition duration-200 " type="submit" disabled={isLoading}>
                        {isLoading ? <Loader className="w-6 h-6 animate-spin  mx-auto" /> : "Login"}
                      </motion.span>
                    </ShinyButton>
                  </EventLoggingButton>

                  <EventLoggingButton className="md:w-[100%]" category="auth" action="googleClick" label="google-login-button">
                    <GoogleLoginButton chooseBtn="login" />
                  </EventLoggingButton>
                </div>

                <div className="lg:w-[70%] w-[90%]  md:pl-10 mx-auto">
                  <Link to="/forget-password">
                    <EventLoggingButton className="w-full" category="auth" action="navigate" label="forget-password">
                      <button
                        // classNamesForAnimatedSpan="absolute bg-gradient-to-r from-blue-100 to-cyan-100 left-[50%] top-[50%] h-32 w-44 ring-2 -translate-x-[50%] -translate-y-[50%] rounded-full"
                        className="rounded bg-black mt-4 ring-1 px-4 py-[1px] ring-[1px] shadow-glow-primary ring-dark-primary focus:ring-blue-400 font-medium lg:w-[90%] w-full text-white"
                      >
                        Forgot Password?{" "}
                      </button>
                    </EventLoggingButton>
                  </Link>
                </div>
              </form>
            </div>
            <div className="px-8 py-4  bg-opacity-50 flex justify-center">
              <p className="text-sm text-dark-text-subdued">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary duration-slow dark:text-primary-dark hover:underline">
                  <EventLoggingButton category="auth" action="navigate" label="signup">
                    Sign Up
                  </EventLoggingButton>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default LoginPage;
