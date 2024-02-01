// pages/ProductWithId/[id].js
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProductWithId = ({ id }) => {
  const router = useRouter();

  useEffect(() => {
    // ตรวจสอบว่า id เป็น '1234' หรือไม่
    const isValidId = id === '1234';

    if (!isValidId) {
      // ถ้า id ไม่ถูกต้อง สามารถ redirect ไปยังหน้าที่คุณต้องการ
      router.push('/ShareDocument');
    }
  }, [id, router]);

  return <h1>📦 Individual product with id: {id} </h1>;
};

export default ProductWithId;
