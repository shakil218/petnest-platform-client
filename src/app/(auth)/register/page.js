import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: "Register - Pet Adoption Platform",
  description: "Create an account on our pet adoption platform to start your journey in finding the perfect pet for you. Join our community of pet lovers and make a difference in the lives of pets in need.",
};

const RegisterPage = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;