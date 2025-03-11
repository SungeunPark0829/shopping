import React, { useState } from "react";
import { uploadImage } from "../api/uploader";
import Button from "../components/ui/Button";
import useProducts from "../hooks/useProducts";

export default function NewProducts() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {addProduct} = useProducts();
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addProduct.mutate({ product, url }, 
          {
            onSuccess: () => {
              setSuccess("제품이 성공적으로 등록되었습니다.");
              setTimeout(() => {
              setSuccess(null);
              }, 4000);
            }
          }
        );
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <section className="w-full text-center">
      <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="my-2">🎉 {success}</p>}
      {file && (
        <img
          className="w-96 mx-auto mb-2"
          src={URL.createObjectURL(file)}
          alt="preview"
        />
      )}
      <form 
      className='flex flex-col px-12'
      onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          accept="image/*"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={product.title ?? ""}
          required
          placeholder="제품명"
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          value={product.price ?? ""}
          required
          placeholder="가격"
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ""}
          placeholder="옵션"
          onChange={handleChange}
        />
        <Button
          text={isUploading ? "업로드중..." : "제품 등록하기"}
          disabled={isUploading}
        />
      </form>
    </section>
  );
}
