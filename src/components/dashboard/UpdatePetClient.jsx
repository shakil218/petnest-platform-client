"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Loader2, Check } from "lucide-react";
import { Button, Form, Input, Label, TextArea, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function UpdatePetClient({ pet }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());

    updatedData.age = Number(updatedData.age);
    updatedData.adoptionFee = Number(updatedData.adoptionFee);

    const {data:tokenData}= await authClient.token();

    try {
      const res = await fetch(`http://localhost:5000/pets/${pet._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error("Failed to update pet");
      }

      toast.success("Pet updated successfully!");

      router.push("/dashboard/my-listings");
    } catch (error) {
      toast.error(error.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!pet) {
    return (
      <div className="text-center py-10 text-base-content/60">
        Pet not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">

      <div className="border-b pb-4">
        <h1 className="text-2xl font-black">Update Pet Listing</h1>
        <p className="text-xs opacity-60">
          Edit pet details and save changes
        </p>
      </div>

      <Form
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        render={(props) => <form {...props} />}
        onSubmit={handleUpdate}
      >

        {/* NAME */}
        <TextField name="name" defaultValue={pet.name} isRequired>
          <Label>Pet Name</Label>
          <Input />
        </TextField>

        {/* SPECIES */}
        <TextField name="species" defaultValue={pet.species} isRequired>
          <Label>Species</Label>
          <Input />
        </TextField>

        {/* BREED */}
        <TextField name="breed" defaultValue={pet.breed} isRequired>
          <Label>Breed</Label>
          <Input />
        </TextField>

        {/* AGE */}
        <TextField name="age" defaultValue={pet.age} isRequired>
          <Label>Age</Label>
          <Input type="number" />
        </TextField>

        {/* IMAGE */}
        <TextField name="imageUrl" defaultValue={pet.imageUrl} isRequired>
          <Label>Image URL</Label>
          <Input />
        </TextField>

        {/* LOCATION */}
        <TextField name="location" defaultValue={pet.location} isRequired>
          <Label>Location</Label>
          <Input />
        </TextField>

        {/* ADOPTION FEE */}
        <TextField name="adoptionFee" defaultValue={pet.adoptionFee} isRequired>
          <Label>Adoption Fee</Label>
          <Input type="number" />
        </TextField>

        {/* DESCRIPTION */}
        <div className="md:col-span-2 flex flex-col gap-1">
          <Label>Description</Label>
          <TextArea
            name="description"
            defaultValue={pet.description}
            rows={4}
          />
        </div>

        {/* SUBMIT */}
        <div className="md:col-span-2 flex justify-end">
          <Button
            type="submit"
            isDisabled={loading}
            className="bg-linear-to-r from-orange-500 to-pink-500 text-white font-bold px-6 py-2 rounded-lg"
          >
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            Update Pet
          </Button>
        </div>

      </Form>
    </div>
  );
}