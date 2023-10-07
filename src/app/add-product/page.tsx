import FormSubmitButton from "@/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Product - Flowmazon",
};

/*
since we are not using 'use client', 
we can use new NextJs Sever Actions - for server side data rendering
without 'use client' our server actions will not render on client side
so our DB credentials and server code will not visible on client
*/

// Server Action
async function addProduct(formData: FormData) {
  "use server"; // tells nextjs this is a server action

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required field");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/");
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          type="text"
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          name="description"
          placeholder="description"
          required
          className="textarea textarea-bordered mb-3 w-full"
        ></textarea>
        <input
          type="url"
          required
          name="imageUrl"
          placeholder="Image URL"
          className="input input-bordered mb-3 w-full"
        />
        <input
          type="number"
          required
          name="price"
          placeholder="Price"
          className="input input-bordered mb-3 w-full"
        />
        <FormSubmitButton className="btn-block">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
