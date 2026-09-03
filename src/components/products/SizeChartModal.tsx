"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { SizeChart } from "./SizeChart";
import { genericBoyswearChart } from "@/data/sizeChart";

interface SizeChartModalProps {
  category?: string;
}

export function useSizeChart() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}

export function SizeChartModal({
  category,
  open,
  onClose,
}: SizeChartModalProps & { open: boolean; onClose: () => void }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Size Chart"
      description="Reference sizing for Sidrah Fashion boyswear."
      size="lg"
    >
      <SizeChart rows={genericBoyswearChart} category={category} />
    </Modal>
  );
}
