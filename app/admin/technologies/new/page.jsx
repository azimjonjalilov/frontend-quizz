"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function NewTechnologyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    icon: "./assets/icon-html.svg",
    color: "#FFF1E9",
    order: 0,
    isPublished: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/technologies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        toast.success("Technology created");
        router.push("/admin/technologies");
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to create");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">New Technology</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>Fill in the details to create a new technology category.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name"
                required 
                placeholder="e.g. HTML"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon Path</Label>
              <Input 
                id="icon"
                placeholder="e.g. ./assets/icon-html.svg"
                value={form.icon}
                onChange={(e) => setForm({...form, icon: e.target.value})}
              />
              <p className="text-xs text-slate-500">Put your SVG icon in the public/assets folder.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Background Color</Label>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200">
                  <input 
                    type="color" 
                    className="w-16 h-16 -m-2 cursor-pointer"
                    value={form.color}
                    onChange={(e) => setForm({...form, color: e.target.value})}
                  />
                </div>
                <Input 
                  id="color"
                  className="flex-1"
                  value={form.color}
                  onChange={(e) => setForm({...form, color: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input 
                id="order"
                type="number" 
                required
                value={form.order}
                onChange={(e) => setForm({...form, order: Number(e.target.value)})}
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input 
                type="checkbox" 
                id="published"
                className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                checked={form.isPublished}
                onChange={(e) => setForm({...form, isPublished: e.target.checked})}
              />
              <Label htmlFor="published" className="font-normal cursor-pointer">
                Is Published (Visible to students)
              </Label>
            </div>
            
            <div className="pt-4 border-t flex justify-end gap-4 border-slate-200 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={loading} className="bg-violet-600 hover:bg-violet-700">
                {loading ? "Saving..." : "Save Technology"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
