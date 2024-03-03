'use client';
import { useRouter } from 'next/router';

export default function Note() {
  const router = useRouter();
  return <p>Post: {router.query.slug}</p>;
}
