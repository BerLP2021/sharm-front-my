"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";
import { useApi } from "@/hooks/useApi";
import DataTable from "@/components/UI/DataTable/DataTable";
import MyBtn from "@/components/UI/MyBtn/MyBtn";


import "./ProductsWrapper.scss";

interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
}

interface ProductsWrapperProps {
  products: any;
}

const ProductsWrapper: FC<ProductsWrapperProps> = ({ products }) => {
  const router = useRouter();
  const {sendRequest, loading, error} = useApi();

  const deleteProduct = (id: string) => {
    sendRequest(`products/${id}`, 'DELETE', null)
      .then((res) => router.refresh())
  }

  if (!products || products?.length === 0) {
    return <p>Немає продуктів для відображення.</p>;
  }

  const editProduct = (id: string) => {
    router.push(`products/${id}`);
  }

  const columns = [
    {
      id: 'skus',
      headerName: 'SKU',
      width: 85,
      render: (item: any) => item.items[0]?.sku || "-",
    },
    {
      id: 'image',
      headerName: 'Image',
      width: 100,
      render: (item: any) => <Image src={item.img} alt="Product" />,
    },
    {
      id: 'name',
      headerName: 'Name',
      width: 120,
      render: (item: any) => item.translations[0]?.title || "No name",
    },
    {
      id: 'price',
      headerName: 'Price',
      width: 85,
      render: (item: any) => item.items[0]?.prise || "0",
    },
    {
      id: 'old price',
      headerName: 'Old price',
      width: 85,
      render: (item: any) => item.items[0]?.oldPrise || "0",
    },
    {
      id: 'visited',
      headerName: 'Visited',
      width: 100,
      render: (item: any) => item.visited.toString(),
    },
    {
      id: 'saleCount',
      headerName: 'Sale Count',
      width: 100,
      render: (item: any) => item.saleCount.toString(),
    },
    {
      id: 'edit',
      headerName: 'Edit',
      width: 120,
      render: (item: any) => <MyBtn text={"Edit"} color={"attention"} click={() => editProduct(item.id)}/>,
    },
    {
      id: 'delete',
      headerName: 'Delete',
      width: 120,
      render: (item: any) => <MyBtn text={"Delete"} color={"attention"} click={() => deleteProduct(item.id)}/>,
    },
  ];


  return (
    <>
      <div className="products-container">
        <div className="products-title">
          <div className="product-create">
            <Link href={"create-product"}>
              <button className="create-product-btn" type="button">Create product</button>    
            </Link>
          </div>
        </div>

        <div className="products-wrapper"> 
          <DataTable
            initialSelectedOptions={columns}
            columns={columns}
            data={products?.data || []}
          />
        </div>
      </div>
    </>

  );
};
        
export default ProductsWrapper;