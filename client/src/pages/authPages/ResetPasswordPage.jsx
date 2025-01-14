import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/base/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import ErrorThrower from "../../components/base/ErrorThrower";
import ShinyButton from "../../components/framer-motion/animations/ShinyButton";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading, message } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password);

      toast.success("Password reset successfully, redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl w-[95%] bg-gray-800  bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="bbg-slate-500 rounded-3xl dark:bg-slate-600 bg-opacity-50 glass-panel overflow-hidden">
        <div className="lg:p-8 p-2">
          <h2 className="text-3xl font-bold mb-6 text-center text-white bg-clip-text">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <Input icon={Lock} type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <Input icon={Lock} type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            {error && <ErrorThrower error={error} />}

            <ShinyButton classNames={isLoading ? "rounded-full" : "rounded-md"}>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Set New Password"}
              </motion.button>
            </ShinyButton>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
export default ResetPasswordPage;
