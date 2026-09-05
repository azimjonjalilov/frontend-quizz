"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteButton({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this? This action cannot be undone and will delete related themes and questions.")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/technologies/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success("Technology deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete technology");
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred");
      setLoading(false);
    }
  };

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={handleDelete}
      disabled={loading}
    >
      <Trash2 className="w-4 h-4 mr-2" />
      {loading ? "Deleting..." : "Delete"}
    </Button>
  );
}
