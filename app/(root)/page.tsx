"use client";

import StoreModal from "@/components/modals/store-modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { stat } from "fs";
import { useEffect } from "react";

export default function SetUpPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div className="p-4">{/* <StoreModal /> */}</div>;
}
