import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login - Pet Adoption Platform",
  description: "Access your account on our pet adoption platform to manage your profile, view your favorite pets, and stay updated on the latest adoption news.",
};

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;