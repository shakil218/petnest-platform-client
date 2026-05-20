import Contacts from '@/components/contacts/Contacts';

export const metadata = {
  title: "Contact Us - Pet Adoption Platform",
  description: "Get in touch with us for any inquiries, support, or feedback regarding our pet adoption platform. We're here to help you find your perfect pet match.",
};

const ContactPage = () => {
  return (
    <div>
      <Contacts />
    </div>
  );
};

export default ContactPage;