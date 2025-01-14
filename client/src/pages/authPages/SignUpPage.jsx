import { motion } from "framer-motion";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import PasswordStrengthMeter from "../../components/base/PasswordStrengthMeter";
import Input from "../../components/base/Input";
import ErrorThrower from "../../components/base/ErrorThrower";
import ShinyButton from "../../components/framer-motion/animations/ShinyButton";
import EventLoggingButton from "../../components/global/EventLoggingButton";
import GoogleLoginButton from "../../components/global/GoogleLoginButton";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, username);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative max-w-xl w-[95%] rounded-3xl p-2">
      <div className="  w-full ring-0 rounded-3xl ring-cyber-purple">
        <div className=" w-full bg-slate-500 rounded-3xl dark:bg-slate-600 bg-opacity-50 glass-panel overflow-hidden">
          <div className="p-5 pt-0">
            <h2 className="h3 text-text-subdued dark:text-dark-text font-share-tech-mono text-center">Create Account</h2>

            <form onSubmit={handleSignUp}>
              <Input classNames="mb-2" icon={User} type="text" classNamesForInputTag="h-10 pl-10 w-full" placeholder="Full Name" value={username} onChange={(e) => setUsername(e.target.value)} />
              <Input icon={Mail} type="email" classNames="mb-1" classNamesForInputTag="h-10 pl-10 w-full" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input icon={Lock} type="password" classNames="mb-0" classNamesForInputTag="h-10 pl-10 w-full" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

              {error && <ErrorThrower error={error} />}

              <div className="w-[100%] mb-2 mx-auto">
                <PasswordStrengthMeter password={password} />
              </div>

              <div className="flex flex-col gap-3 justify-center items-center w-[100%]">
                <ShinyButton classNames="rounded-md" addType="submit">
                  <EventLoggingButton category="auth" action="click" label="sign-up-button">
                    <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className=" transition duration-200 " type="submit" disabled={isLoading}>
                      {isLoading ? <Loader className="w-6 h-6 animate-spin  mx-auto" /> : "Sign Up"}
                    </motion.span>
                  </EventLoggingButton>
                </ShinyButton>

                <EventLoggingButton className="md:w-[100%]" category="auth" action="googleClick" label="google-sign-up-button">
                  <GoogleLoginButton chooseBtn="signup" />
                </EventLoggingButton>
              </div>
            </form>
          </div>
          <div className="px-8 py-0  bg-opacity-50 flex justify-center">
            <p className="text-sm text-dark-text-subdued">
              Already have an account?
              <Link to="/login" className="text-primary pl-1 duration-slow dark:text-primary-dark hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default SignUpPage;
