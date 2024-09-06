"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

const StoreModal = () => {
  const storeModal = useStoreModal();
  return (
    <Modal
      title="Create Store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      description="Add a new store to manage products and categories"
    >
      Create store form
    </Modal>
  );
};

export default StoreModal;
