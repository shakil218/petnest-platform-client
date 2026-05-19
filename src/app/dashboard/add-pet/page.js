"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Plus, Check, Loader2 } from "lucide-react";
import {
  Button,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";

export default function AddPetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const ownerName = user?.name || "PetNest User";
  const ownerEmail = user?.email || "loading@petnest.com";

  const speciesOptions = [
    { label: "Dog", value: "dog" },
    { label: "Cat", value: "cat" },
    { label: "Bird", value: "bird" },
    { label: "Rabbit", value: "rabbit" },
    { label: "Other", value: "other" },
  ];

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const healthOptions = [
    { label: "Healthy & Active", value: "healthy" },
    { label: "Undergoing Treatment", value: "treatment" },
    { label: "Special Needs", value: "special_needs" },
  ];

  const vaccinationOptions = [
    { label: "Fully Vaccinated", value: "fully_vaccinated" },
    { label: "Partially Vaccinated", value: "partially_vaccinated" },
    { label: "Not Vaccinated", value: "not_vaccinated" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formData.entries());

    petData.age = Number(petData.age);
    petData.adoptionFee = Number(petData.adoptionFee);
    petData.ownerName = ownerName; 
    petData.ownerEmail = ownerEmail; 

    try {
      // MongoDB API route call here:
      const res = await fetch("http://localhost:5000/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (!res.ok) {
        throw new Error("Failed to post pet listing");
      }

      toast.success("🐾 Pet listing successfully posted to PetNest!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      router.push("/dashboard/my-listings");
    } catch (err) {
      toast.error(err.message || "Failed to finalize insertion on the MongoDB pets collection.", {
        position: "top-right",
        autoClose: 4000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      
      <div className="border-b border-base-100 pb-4">
        <h1 className="text-2xl font-black tracking-tight text-base-content flex items-center gap-2">
          <Plus className="text-orange-500 w-6 h-6" /> Rehome a Pet Listing
        </h1>
        <p className="text-xs text-base-content/60 mt-1">
          Fill out all crucial details and system parameters below to register your listing on the MongoDB data engine.
        </p>
      </div>

      <Form
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
        render={(props) => <form {...props} />}
        onSubmit={handleSubmit}
      >
        {/* PET NAME */}
        <TextField isRequired name="name" type="text" className="w-full">
          <Label className="text-xs font-bold text-base-content/80 mb-1 block">Pet Name</Label>
          <Input placeholder="e.g., Buddy" className="input input-bordered w-full bg-base-300 border-base-100 text-sm text-base-content" />
        </TextField>

        {/* SPECIES SELECT */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-base-content/80 mb-1">Species</label>
          <select
            required
            name="species"
            className="select select-bordered w-full rounded-xl bg-base-300 text-sm text-base-content border-base-100 h-10.5 px-3 focus:outline-hidden"
          >
            <option value="" disabled selected>Select species profile</option>
            {speciesOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* BREED */}
        <TextField isRequired name="breed" type="text" className="w-full">
          <Label className="text-xs font-bold text-base-content/80 mb-1 block">Breed</Label>
          <Input placeholder="e.g., Golden Retriever / Persian" className="input input-bordered w-full bg-base-300 border-base-100 text-sm text-base-content" />
        </TextField>

        {/* AGE */}
        <TextField isRequired name="age" type="number" min={0} className="w-full">
          <Label className="text-xs font-bold text-base-content/80 mb-1 block">Age (Months or Years)</Label>
          <Input placeholder="e.g., 2" className="input input-bordered w-full bg-base-300 border-base-100 text-sm text-base-content" />
        </TextField>

        {/* GENDER SELECT */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-base-content/80 mb-1">Gender</label>
          <select
            required
            name="gender"
            className="select select-bordered w-full rounded-xl bg-base-300 text-sm text-base-content border-base-100 h-10.5 px-3 focus:outline-hidden"
          >
            <option value="" disabled selected>Select gender</option>
            {genderOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* IMAGE URL */}
        <TextField isRequired name="imageUrl" type="url" className="w-full">
          <Label className="text-xs font-bold text-base-content/80 mb-1 block">Image URL Link</Label>
          <Input placeholder="https://i.ibb.co/your-pet-image.jpg" className="input input-bordered w-full bg-base-300 border-base-100 text-sm text-base-content" />
        </TextField>

        {/* HEALTH STATUS SELECT */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-base-content/80 mb-1">Health Status</label>
          <select
            required
            name="healthStatus"
            className="select select-bordered w-full rounded-xl bg-base-300 text-sm text-base-content border-base-100 h-10.5 px-3 focus:outline-hidden"
          >
            <option value="" disabled selected>Identify health condition</option>
            {healthOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* VACCINATION STATUS SELECT */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-base-content/80 mb-1">Vaccination Status</label>
          <select
            required
            name="vaccinationStatus"
            className="select select-bordered w-full rounded-xl bg-base-300 text-sm text-base-content border-base-100 h-10.5 px-3 focus:outline-hidden"
          >
            <option value="" disabled selected>Select immunization tier</option>
            {vaccinationOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* LOCATION */}
        <TextField isRequired name="location" type="text" className="w-full">
          <Label className="text-xs font-bold text-base-content/80 mb-1 block">Location / City</Label>
          <Input placeholder="e.g., Dhaka, Bangladesh" className="input input-bordered w-full bg-base-300 border-base-100 text-sm text-base-content" />
        </TextField>

        {/* ADOPTION FEE */}
        <TextField isRequired name="adoptionFee" type="number" min={0} className="w-full">
          <Label className="text-xs font-bold text-base-content/80 mb-1 block">Adoption Fee ($ USD)</Label>
          <Input placeholder="Enter 0 for free adoption matches" className="input input-bordered w-full bg-base-300 border-base-100 text-sm text-base-content" />
        </TextField>

        {/* OWNER NAME AUTO FILLED READ-ONLY */}
        <div className="col-span-1">
          <TextField isReadOnly name="ownerName" type="text" className="w-full opacity-70">
            <Label className="text-xs font-bold text-base-content/80 mb-1 block">Owner Name</Label>
            <Input value={ownerName} className="input input-bordered w-full bg-base-100 border-base-100 text-sm text-base-content/50 select-none cursor-not-allowed font-medium" />
          </TextField>
        </div>

        {/* OWNER EMAIL AUTO FILLED READ-ONLY */}
        <div className="col-span-1">
          <TextField isReadOnly name="ownerEmail" type="email" className="w-full opacity-70">
            <Label className="text-xs font-bold text-base-content/80 mb-1 block">Owner Email</Label>
            <Input value={ownerEmail} className="input input-bordered w-full bg-base-100 border-base-100 text-sm text-base-content/50 select-none cursor-not-allowed font-medium" />
          </TextField>
        </div>

        {/* DESCRIPTION DETAILS TEXTAREA */}
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-xs font-bold text-base-content/80">Detailed Pet Biography & Story</label>
          <TextArea
            isRequired
            name="description"
            minRows={4}
            placeholder="Tell future owners about their temperament, background rescue story, food choices, habits..."
            className="w-full bg-base-300 rounded-xl text-sm text-base-content p-2"
          />
        </div>

        {/* SUBMIT ACTION BUTTON ROW */}
        <div className="md:col-span-2 pt-4 flex gap-3 justify-end">
          <Button
            type="submit"
            isDisabled={loading}
            className="btn bg-linear-to-r from-orange-500 to-pink-500 text-white font-bold px-6 py-2.5 rounded-xl border-0 shadow-md gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            <span>{loading ? "Publishing Listing..." : "Publish Pet Listing"}</span>
          </Button>
        </div>
      </Form>
    </div>
  );
}